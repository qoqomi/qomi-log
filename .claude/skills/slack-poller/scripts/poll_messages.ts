export interface SlackMessage {
  ts: string;
  text: string;
  user?: string;
}

export async function pollMessages(lastTs: string): Promise<SlackMessage[]> {
  const channel = process.env.SLACK_CHANNEL_ID!;
  const token = process.env.SLACK_BOT_TOKEN!;

  const url = new URL('https://slack.com/api/conversations.history');
  url.searchParams.set('channel', channel);
  url.searchParams.set('limit', '50');
  if (lastTs) url.searchParams.set('oldest', lastTs);

  const res = await fetch(url.toString(), {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) throw new Error(`Slack API error: ${res.status}`);

  const data = (await res.json()) as {
    ok: boolean;
    messages?: Array<{ ts: string; text: string; user?: string; bot_id?: string; subtype?: string }>;
    error?: string;
  };

  if (!data.ok) throw new Error(`Slack API error: ${data.error}`);

  return (data.messages ?? [])
    .filter(m => !m.bot_id && !m.subtype && m.user && m.ts !== lastTs)
    .map(m => ({ ts: m.ts, text: m.text, user: m.user }))
    .reverse();
}
