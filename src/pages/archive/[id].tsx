import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import SEO from '@/components/Layout/SEO';
import QueueBadge from '@/components/QueueBadge';
import { supabase } from '@/lib/supabase';
import { ArchiveItem, QueueType } from '@/typings/typings';

const PageWrap = styled.div`
  padding: 2rem 0 6rem;
  max-width: 76.8rem;
  margin: 0 auto;
  width: 100%;
`;

const TopRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 0 0 2rem;
`;

const TypeLabel = styled.span`
  font-size: 1.2rem;
  color: ${props => props.theme.colors.darkgray_800};
  text-transform: uppercase;
`;

const Title = styled.h1`
  font-size: 2.8rem;
  font-weight: 700;
  line-height: 140%;
  word-break: keep-all;
  margin: 0 0 1.5rem;
`;

const OriginalLink = styled.a`
  display: inline-flex;
  align-items: center;
  font-size: 1.3rem;
  color: ${props => props.theme.colors.primary_1000};
  text-decoration: underline;
  margin: 0 0 2.5rem;
  word-break: break-all;
`;

const Summary = styled.p`
  font-size: 1.6rem;
  line-height: 180%;
  word-break: keep-all;
  margin: 0 0 2.5rem;
`;

const Divider = styled.hr`
  margin: 2.5rem 0;
  border: none;
  border-top: 0.1rem solid ${props => props.theme.colors.darkgray_100};
`;

const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin: 0 0 2.5rem;
`;

const Tag = styled.span`
  padding: 0.4rem 1rem;
  border-radius: 2rem;
  font-size: 1.3rem;
  background-color: ${props => props.theme.colors.lightprimary_500};
  color: ${props => props.theme.colors.primary_1000};
`;

const MemoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const MemoLabel = styled.p`
  font-size: 1.3rem;
  font-weight: 600;
  color: ${props => props.theme.colors.darkgray_800};
`;

const MemoTextarea = styled.textarea`
  width: 100%;
  min-height: 12rem;
  padding: 1.2rem;
  border-radius: 0.8rem;
  border: 0.1rem solid ${props => props.theme.colors.darkgray_300};
  background-color: ${props => props.theme.colors.surface};
  color: ${props => props.theme.colors.text_1000};
  font-size: 1.4rem;
  line-height: 160%;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary_1000};
  }
`;

const QueueSelect = styled.select`
  padding: 0.6rem 1.2rem;
  border-radius: 0.8rem;
  border: 0.1rem solid ${props => props.theme.colors.darkgray_300};
  background-color: ${props => props.theme.colors.surface};
  color: ${props => props.theme.colors.text_1000};
  font-size: 1.4rem;
  cursor: pointer;
`;

const SaveButton = styled.button`
  align-self: flex-end;
  padding: 0.8rem 2rem;
  border-radius: 0.8rem;
  font-size: 1.4rem;
  font-weight: 600;
  background-color: ${props => props.theme.colors.primary_1000};
  color: white;
  cursor: pointer;
  transition: opacity 0.2s ease-in-out;

  &:hover {
    opacity: 0.85;
  }
`;

const MetaDate = styled.p`
  font-size: 1.2rem;
  color: ${props => props.theme.colors.darkgray_800};
  margin: 0 0 2.5rem;
`;

export default function ArchiveDetailPage() {
  const { query } = useRouter();
  const [item, setItem] = useState<ArchiveItem | null>(null);
  const [memo, setMemo] = useState('');
  const [queueVal, setQueueVal] = useState<QueueType>('Later');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!query.id) return;
    supabase
      .from('archive')
      .select('*')
      .eq('id', query.id)
      .single()
      .then(({ data }) => {
        if (data) {
          const item = data as ArchiveItem;
          setItem(item);
          setMemo(item.memo ?? '');
          setQueueVal(item.queue);
        }
      });
  }, [query.id]);

  const handleSave = async () => {
    if (!item) return;
    setSaving(true);
    await supabase
      .from('archive')
      .update({ memo, queue: queueVal })
      .eq('id', item.id);
    setItem(prev => (prev ? { ...prev, memo, queue: queueVal } : prev));
    setSaving(false);
  };

  if (!item) return null;

  return (
    <>
      <SEO title={item.title} description={item.summary} />
      <PageWrap>
        <TopRow>
          <QueueBadge queue={item.queue} />
          <TypeLabel>{item.type}</TypeLabel>
        </TopRow>

        <Title>{item.title}</Title>
        <MetaDate>
          {new Date(item.created_at).toLocaleDateString('ko-KR')}
        </MetaDate>

        <OriginalLink href={item.url} target="_blank" rel="noreferrer noopener">
          {item.url}
        </OriginalLink>

        <Summary>{item.summary}</Summary>

        <TagList>
          {item.tags.map(tag => (
            <Tag key={tag}>#{tag}</Tag>
          ))}
        </TagList>

        <Divider />

        <MemoSection>
          <MemoLabel>큐 상태</MemoLabel>
          <QueueSelect
            value={queueVal}
            onChange={e => setQueueVal(e.target.value as QueueType)}
          >
            <option value="Later">Later</option>
            <option value="Shortlist">Shortlist</option>
            <option value="Archive">Archive</option>
          </QueueSelect>

          <MemoLabel>메모</MemoLabel>
          <MemoTextarea
            value={memo}
            onChange={e => setMemo(e.target.value)}
            placeholder="개인 메모를 입력하세요..."
          />

          <SaveButton onClick={handleSave} disabled={saving}>
            {saving ? '저장 중...' : '저장'}
          </SaveButton>
        </MemoSection>
      </PageWrap>
    </>
  );
}
