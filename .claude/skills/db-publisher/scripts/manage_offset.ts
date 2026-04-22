import { createClient } from '@supabase/supabase-js';

function getClient() {
  return createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );
}

export async function getOffset(): Promise<string> {
  const { data } = await getClient()
    .from('agent_state')
    .select('value')
    .eq('key', 'slack_last_ts')
    .single();
  return data ? (data.value as string) : '0';
}

export async function setOffset(ts: string): Promise<void> {
  await getClient()
    .from('agent_state')
    .upsert(
      {
        key: 'slack_last_ts',
        value: ts,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'key' },
    );
}
