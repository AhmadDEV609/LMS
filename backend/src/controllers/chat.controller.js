import asyncHandler from "../utils/asyncHandler.js";
import genAI from "../config/gemini.js";
import { Videos } from "../models/video.model.js";


function detectIntent(question) {
    const q = question.toLowerCase();

    if (
        q.includes("give code") ||
        q.includes("write code") ||
        q.includes("code only") ||
        q.includes("only code") ||
        q.includes("js code") ||
        q.includes("javascript") ||
        q.includes("function")
    ) {
        return "CODE_ONLY";
    }

    if (
        q.includes("what is") ||
        q.includes("explain") ||
        q.includes("how does") ||
        q.includes("why") ||
        q.includes("describe")
    ) {
        return "EXPLAIN";
    }

    return "SHORT";
}



function buildPrompt(video, question, mode) {
    return `
You are an expert AI tutor, senior software engineer, and system architect.

Your job is to ALWAYS give helpful, correct, and structured answers like a professional teacher.

========================
VIDEO CONTEXT (Optional Reference)
Title: ${video?.title || "N/A"}
Description: ${video?.description || "N/A"}
========================

USER QUESTION:
${question}

MODE:
${mode}

========================
STRICT INSTRUCTIONS:

1. ALWAYS answer the question (never skip it)
2. If video context is irrelevant, ignore it completely
3. If question is unclear, still try to give best possible explanation
4. Be accurate, practical, and developer-focused
5. Use clean formatting (headings, bullets, code blocks when needed)

========================
MODE RULES:

IF MODE = CODE_ONLY:
- Return ONLY working production-ready code
- No explanation
- No comments
- No markdown
- No extra text

IF MODE = EXPLAIN:
- Give detailed explanation
- Use real-world examples
- Break into sections if needed
- Keep language simple but professional

IF MODE = SHORT:
- Give crisp answer in 2–4 lines maximum

IF MODE IS EMPTY OR UNKNOWN:
- Default to EXPLAIN mode 

========================
OUTPUT STYLE (IMPORTANT):

- Use headings when helpful 
- Use bullet points for clarity
- Use code blocks only when required
- Keep response structured like a senior developer explaining to a junior

========================
FINAL RULE:
Your answer must ALWAYS be useful, complete, and easy to understand.
`;
}


const askQuestion = asyncHandler(async (req, res) => {

    try {

        const { videoId } = req.params;
        const { question } = req.body;

        if (!question) {
            return res.status(400).json({
                success: false,
                message: "Question is required"
            });
        }

        const video = await Videos.findById(videoId);

        if (!video) {
            return res.status(404).json({
                success: false,
                message: "Video not found"
            });
        }

        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash"
        });


        const mode = detectIntent(question);


        const prompt = buildPrompt(video, question, mode);

        const result = await model.generateContent(prompt);


        let answer = "";

        if (result?.response?.text) {
            answer = result.response.text().trim();
        }


        if (!answer || answer.length < 2) {
            return res.status(500).json({
                success: false,
                message: "AI returned empty response, please try again"
            });
        }

        return res.status(200).json({
            success: true,
            mode,
            answer
        });

    } catch (error) {
        console.error("Gemini Error:", error);

        return res.status(500).json({
            success: false,
            message: "AI service failed, try again later"
        });
    }
});

export { askQuestion };