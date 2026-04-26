import { NextResponse } from "next/server";

type ApplyData = {
  name: string;
  dept: string;
  email: string;
  notion: string;
};

export const runtime = "nodejs";

export async function POST(req: Request) {
  let data: ApplyData;
  try {
    data = (await req.json()) as ApplyData;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!data.email || !data.email.includes("@")) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }
  if (!data.name?.trim() || !data.dept?.trim() || !data.notion?.trim()) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const chatUrl = process.env.CHAT_WEBHOOK;
  const sheetUrl = process.env.SHEETS_WEBHOOK_URL;

  if (!chatUrl && !sheetUrl) {
    return NextResponse.json(
      { error: "Server not configured" },
      { status: 500 }
    );
  }

  const tasks: Promise<Response>[] = [];

  if (chatUrl) {
    tasks.push(
      fetch(chatUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cardsV2: [
            {
              cardId: "banner-studio-apply",
              card: {
                header: {
                  title: "🎨 Banner Studio 新申請",
                  subtitle: new Date().toLocaleString("zh-TW", {
                    timeZone: "Asia/Taipei",
                  }),
                },
                sections: [
                  {
                    widgets: [
                      { decoratedText: { topLabel: "姓名", text: data.name } },
                      { decoratedText: { topLabel: "部門", text: data.dept } },
                      { decoratedText: { topLabel: "Email", text: data.email } },
                      {
                        decoratedText: {
                          topLabel: "Notion ID",
                          text: data.notion,
                        },
                      },
                    ],
                  },
                ],
              },
            },
          ],
        }),
      })
    );
  }

  if (sheetUrl) {
    tasks.push(
      fetch(sheetUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          submittedAt: new Date().toISOString(),
        }),
      })
    );
  }

  const results = await Promise.allSettled(tasks);
  const allFailed = results.every(
    (r) => r.status === "rejected" || (r.status === "fulfilled" && !r.value.ok)
  );

  if (allFailed) {
    return NextResponse.json(
      { error: "All webhooks failed" },
      { status: 502 }
    );
  }

  return NextResponse.json({ success: true });
}
