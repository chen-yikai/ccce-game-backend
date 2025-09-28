import { Hono } from "hono";

const app = new Hono();

app.get("/question", async (c) => {
  const request = JSON.stringify({
    contents: [
      {
        parts: [
          {
            text: '用繁體中文出一題簡單隨機出一題出其不意的生活數學應用題目，如有題目中含有人名（如小明、小美）可使用以下名字代替貓咪、華華、滷味、京都念慈安，字數在30字內，並且提供該題目的答案(答案只需提供數字無需單位)。請使用 JSON Object格式回覆(不包含[])如：{"question": "題目敘述", "answer": "答案"}，不要加上其他文字或解釋。',
          },
        ],
      },
    ],
    generationConfig: {
      response_mime_type: "application/json",
    },
  });
  const error = {
    question: "後端服務發生錯誤，請稍後再試",
    answer: "",
  };
  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
      {
        method: "POST",
        headers: {
          "X-goog-api-key": process.env.GEMINI_API_TOKEN!,
          "Content-Type": "application/json",
        },
        body: request,
      }
    );
    const data: any = await response.json();
    const text = data.candidates[0].content.parts[0].text;
    const parsedResponse = JSON.parse(text);
    return c.json({
      question: parsedResponse.question,
      answer: parsedResponse.answer,
    });
  } catch (e) {
    return c.json(error);
  }
});

export default app;
