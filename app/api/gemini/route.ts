import { GoogleGenAI } from "@google/genai";

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({});


// Define the shape of the incoming request body

export async function POST(req: Request): Promise<Response> {
  try {
    const { text } = await req.json();

    const response = await ai.models.generateContentStream({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [{ text }]
        }
      ],
    });

    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of response) {
            const encoded = new TextEncoder().encode(chunk.text || "");
            controller.enqueue(encoded);
          }
          controller.close();
        } catch (err) {
          controller.error(err);
        }
      }
    });

    return new Response(stream, {
      status: 200,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
      }
    });

  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown server error';
    return new Response(JSON.stringify({ error: message }), { status: 500 });
  }
}

