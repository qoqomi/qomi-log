import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const getSupabase = () =>
  createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );

export async function GET(req: NextRequest) {
  const supabase = getSupabase();
  const { searchParams } = new URL(req.url);
  const queue = searchParams.get('queue');
  const type = searchParams.get('type');

  let query = supabase
    .from('archive')
    .select('*')
    .order('created_at', { ascending: false });

  if (queue && queue !== 'all') query = query.eq('queue', queue);
  if (type && type !== 'all') query = query.eq('type', type);

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function PATCH(req: NextRequest) {
  const supabase = getSupabase();
  const { id, queue, memo } = (await req.json()) as {
    id: string;
    queue?: string;
    memo?: string;
  };
  if (!id) return NextResponse.json({ error: 'id is required' }, { status: 400 });

  const updates: Record<string, unknown> = {};
  if (queue !== undefined) updates.queue = queue;
  if (memo !== undefined) updates.memo = memo;

  const { data, error } = await supabase
    .from('archive')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
