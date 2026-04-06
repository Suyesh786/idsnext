import Groq from "groq-sdk";
import dotenv from "dotenv";

dotenv.config();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const conversationHistory = {};
const quizState = {};
const topicState = {};

/* Detect what the user wants */
function detectIntent(message) {

  const text = message.toLowerCase();

  if (text.includes("hint")) return "hint";
  if (text.includes("practice") || text.includes("problem") || text.includes("quiz")) return "practice";
  if (text.includes("code") || text.includes("program")) return "code";
  if (text.includes("explain") || text.includes("what is")) return "teach";

  return "general";
}

/* Detect the main topic keyword in a message */
function detectTopic(message) {
  const text = message.toLowerCase();
  if (text.includes("queue")) return "queue";
  if (text.includes("stack")) return "stack";
  if (text.includes("recursion")) return "recursion";
  if (text.includes("iteration")) return "iteration";
  if (text.includes("linked list")) return "linked list";
  if (text.includes("tree")) return "tree";
  if (text.includes("graph")) return "graph";
  if (text.includes("sorting")) return "sorting";
  return null;
}

/* Map each topic to the next suggested concept */
const nextTopic = {
  stack: "queue",
  queue: "linked list",
  recursion: "iteration",
  iteration: "sorting",
  "linked list": "tree",
  tree: "graph",
  graph: "sorting",
  sorting: "recursion"
};

/* Detect comparison-style questions */
function isComparison(message) {
  const text = message.toLowerCase();
  return (
    text.includes("difference") ||
    text.includes("compare") ||
    text.includes("vs") ||
    text.includes("versus") ||
    text.includes("between")
  );
}

export async function askSpark(message, sessionId) {

  try {

    const intent = detectIntent(message);

    /* conversation history setup */
    if (!conversationHistory[sessionId]) {
      conversationHistory[sessionId] = [];
    }

    const history = conversationHistory[sessionId];

    /* quiz state setup */
    if (!quizState[sessionId]) {
      quizState[sessionId] = {
        active: false,
        questions: [],
        answers: [],
        index: 0,
        score: 0
      };
    }

    const quiz = quizState[sessionId];

    /* ---------- QUIZ MODE HANDLING ---------- */

    if (quiz.active) {

      const userInput = message.trim().toUpperCase();

      if (userInput.includes("HINT")) {
        return "💡 Hint: Think about how a stack removes elements (Last In First Out).";
      }

      const correctAnswer = quiz.answers[quiz.index];

      let feedback;

      if (userInput === correctAnswer) {

        quiz.score++;

        feedback = "✅ Correct!";

      } else {

        let explanation = "";

        if (quiz.index === 0) {
          explanation = "Stacks follow **Last In First Out (LIFO)**.";
        }

        if (quiz.index === 1) {
          explanation = "**Pop** removes the top element from a stack.";
        }

        if (quiz.index === 2) {
          explanation = "Stack overflow occurs when **top == size-1**.";
        }

        feedback = `❌ Incorrect.\n\nCorrect answer: ${correctAnswer}\n${explanation}`;
      }

      quiz.index++;

      if (quiz.index >= quiz.questions.length) {

        const finalScore = quiz.score;

        /* reset quiz state */
        quiz.active = false;
        quiz.index = 0;
        quiz.score = 0;
        quiz.questions = [];
        quiz.answers = [];

        return `${feedback}

🎉 Quiz complete!

Your score: ${finalScore}/3

Would you like:
1️⃣ Another quiz
2️⃣ A hint for a question
3️⃣ Explanation of an answer`;
      }

      return `${feedback}

Now try Question ${quiz.index + 1}:
${quiz.questions[quiz.index]}`;
    }

    /* ---------- START QUIZ ---------- */

    if (intent === "practice") {

      quiz.questions = [
        "Q1. What principle does a stack follow?\nA) FIFO\nB) LIFO\nC) Random\nD) Sorted",
        "Q2. Which stack operation removes the top element?\nA) Push\nB) Peek\nC) Pop\nD) Insert",
        "Q3. What condition indicates stack overflow?\nA) top == -1\nB) top == size-1\nC) size == 0\nD) stack empty"
      ];

      quiz.answers = ["B", "C", "B"];
      quiz.index = 0;
      quiz.score = 0;
      quiz.active = true;

      return `Let's start a small quiz!

${quiz.questions[0]}

Reply with A, B, C, or D.`;
    }

    /* ---------- TOPIC & COMPARISON TRACKING ---------- */

    if (!topicState[sessionId]) {
      topicState[sessionId] = { topic: null, depth: 0 };
    }

    const ts = topicState[sessionId];
    const detectedTopic = detectTopic(message);
    const comparisonMode = isComparison(message);

    if (detectedTopic) {
      if (detectedTopic === ts.topic) {
        ts.depth++;
      } else {
        ts.topic = detectedTopic;
        ts.depth = 0;
      }
    }

    /* Build dynamic suggestion instructions for the system prompt */
    let suggestionInstructions;

    if (comparisonMode && detectedTopic) {
      /* FEATURE 1: comparison question — keep suggestions in the same comparison style */
      suggestionInstructions = `
The user asked a comparison question about "${detectedTopic}".
Your 3 follow-up suggestions must also be comparison or contrast style questions strictly about the same concepts the user mentioned.
Do not suggest unrelated topics.
Keep each suggestion under 8 words.

Format exactly like this:
You might also ask:
• comparison question 1
• comparison question 2
• comparison question 3`;

    } else if (ts.topic && ts.depth >= 2) {
      /* FEATURE 2: depth limit reached — guide toward next related concept */
      const next = nextTopic[ts.topic] || "a related concept";
      suggestionInstructions = `
The student has asked about "${ts.topic}" multiple times and is ready to move on.
Suggest 1 deeper question on "${ts.topic}" and 2 questions about the next related concept: "${next}".
Keep each suggestion under 8 words.

Format exactly like this:
You might also ask:
• deeper question on ${ts.topic}
• question about ${next}
• another question about ${next}`;

    } else {
      /* Default: 2 deeper questions on same topic, 1 peek at next concept */
      const next = ts.topic ? (nextTopic[ts.topic] || null) : null;
      suggestionInstructions = `
Suggest 3 helpful follow-up questions related to the topic just discussed.
${ts.topic && next ? `Prefer 2 questions that go deeper on "${ts.topic}" and 1 question about "${next}".` : "All 3 should go deeper on the same topic."}
Keep each suggestion under 8 words.

Format exactly like this:
You might also ask:
• question 1
• question 2
• question 3`;
    }

    /* ---------- NORMAL AI RESPONSE ---------- */

    history.push({
      role: "user",
      content: `Intent: ${intent}. Question: ${message}`
    });

    if (history.length > 16) {
      history.shift();
    }

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",

      messages: [
        {
          role: "system",
content: `
You are Spark, an AI tutor helping students learn programming and data structures.

General rules:
• Always keep answers short and to the point by default.
• Avoid long Wikipedia-style explanations.
• If the user wants more detail, they will explicitly ask for it.
• Prefer bullet points instead of long paragraphs.
Only answer using the current conversation context.
Never mention topics that were not discussed in this session.

Teaching mode:
• Explain concepts clearly in simple terms.
• Use small examples.
• Guide the student step-by-step instead of giving everything immediately.

Code mode:
• When writing code, prefer the C language unless the user explicitly asks for another language.
• Write beginner-friendly code.
• Add short comments to explain key lines.
• Always format code using triple backticks.

Hint mode:
• Give hints instead of full solutions.

Important behavior:
• Default answers should be concise.

${suggestionInstructions}
`
        },

        ...history
      ]
    });

    const reply = completion.choices[0].message.content;

    history.push({
      role: "assistant",
      content: reply
    });

    if (history.length > 16) {
      history.shift();
    }

    return reply;

  } catch (error) {

    console.error("Groq error:", error);
    return "Sorry, Spark encountered an error.";

  }

}