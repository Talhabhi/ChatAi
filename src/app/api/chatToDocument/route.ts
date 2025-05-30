// /app/api/chatToDocument/route.ts
import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { documentData, question } = await req.json();

    const chatCompletion = await openai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content:
            'You are an assistant helping the user understand a document. I will provide a JSON string containing the markdown content of the document. Use this to answer the user’s question as clearly as possible. The document is:\n\n' +
            documentData,
        },
        {
          role: 'user',
          content: 'My question is: ' + question,
        },
      ],
      model: 'gpt-4.1',
      temperature: 0.5,
    });

    const response = chatCompletion.choices[0].message.content;
    return NextResponse.json({ message: response });
  } catch (error: any) {
  console.error("OpenAI Error:", error);

  // Check for OpenAI error structure
  if (error?.status === 429 || error?.code === 'insufficient_quota') {
    return NextResponse.json(
      { error: 'OpenAI quota exceeded. Please check your usage and plan.' },
      { status: 429 }
    );
  }

  return NextResponse.json(
    { error: error?.message || 'Something went wrong while processing the request.' },
    { status: 500 }
  );
}
}
