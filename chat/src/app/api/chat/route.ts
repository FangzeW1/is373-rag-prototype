import { NextRequest } from "next/server";


export async function POST(request: NextRequest) {
  const key = process.env.GROQ_API_KEY;

  if (!key) {
    return Response.json(
      { error: "GROQ_API_KEY is not configured." },
      { status: 500 }
    );
  }

  const body = await request.json();
  const question = body.question;

  if (typeof question !== "string" || !question.trim() || question.length > 2000) {
    return Response.json({ error: "Invalid question." }, { status: 400 });
  }

  try {
    const upstream = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${key}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "openai/gpt-oss-20b",
          stream: true,
          max_tokens: 500,
          messages: [
            {
              role: "system",
              content: "You are a helpful assistant. Give concise answers.",
            },
            { role: "user", content: question },
          ],
        }),
      }
    );

    if (!upstream.ok || !upstream.body) {
      return Response.json(
        { error: `Model API returned HTTP ${upstream.status}.` },
        { status: 502 }
      );
    }

    return new Response(upstream.body, {
      headers: {
        "Content-Type": "text/event-stream; charset=utf-8",
        "Cache-Control": "no-cache",
      },
    });
  } catch {
    return Response.json(
      { error: "Could not reach the model API." },
      { status: 502 }
    );
  }
}
