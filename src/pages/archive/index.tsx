import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';

import SEO from '@/components/Layout/SEO';
import ArchiveItemComp from '@/components/ArchiveItem';
import { supabase } from '@/lib/supabase';
import { ArchiveItem, ContentType, QueueType } from '@/typings/typings';

const PageWrap = styled.div`
  padding: 2rem 0 6rem;
  max-width: 76.8rem;
  margin: 0 auto;
  width: 100%;
`;

const Title = styled.h1`
  font-size: 2.8rem;
  font-weight: 700;
  margin: 0 0 3rem;
`;

const FilterBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 0 3rem;
  border-bottom: 0.1rem solid ${props => props.theme.colors.darkgray_100};
`;

const TabGroup = styled.div`
  display: flex;
  gap: 0;
`;

const Tab = styled.button<{ active: boolean }>`
  padding: 1rem 1.6rem;
  font-size: 1.4rem;
  font-weight: ${props => (props.active ? 600 : 400)};
  color: ${props =>
    props.active ? props.theme.colors.text_1000 : props.theme.colors.darkgray_800};
  border-bottom: 0.2rem solid
    ${props => (props.active ? props.theme.colors.text_1000 : 'transparent')};
  margin-bottom: -0.1rem;
  cursor: pointer;
  transition: all 0.15s ease-in-out;

  &:hover {
    color: ${props => props.theme.colors.text_1000};
  }
`;

const ChipGroup = styled.div`
  display: flex;
  gap: 0.6rem;
`;

const Chip = styled.button<{ active: boolean }>`
  padding: 0.4rem 1rem;
  border-radius: 2rem;
  font-size: 1.2rem;
  font-weight: 500;
  cursor: pointer;
  border: 0.1rem solid
    ${props =>
      props.active ? props.theme.colors.text_1000 : props.theme.colors.darkgray_300};
  background-color: ${props =>
    props.active ? props.theme.colors.text_1000 : 'transparent'};
  color: ${props =>
    props.active ? props.theme.colors.background : props.theme.colors.darkgray_800};
  transition: all 0.15s ease-in-out;
`;

const ItemGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

const EmptyMessage = styled.p`
  font-size: 1.5rem;
  color: ${props => props.theme.colors.darkgray_800};
  text-align: center;
  padding: 6rem 0;
`;

const QUEUES: Array<QueueType | 'all'> = ['all', 'Later', 'Shortlist', 'Archive'];
const TYPES: Array<ContentType | 'all'> = ['all', 'article', 'youtube'];

export default function ArchivePage() {
  const [items, setItems] = useState<ArchiveItem[]>([]);
  const [queue, setQueue] = useState<QueueType | 'all'>('all');
  const [type, setType] = useState<ContentType | 'all'>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      let query = supabase
        .from('archive')
        .select('*')
        .order('created_at', { ascending: false });

      if (queue !== 'all') query = query.eq('queue', queue);
      if (type !== 'all') query = query.eq('type', type);

      const { data } = await query;
      if (data) setItems(data as ArchiveItem[]);
      setLoading(false);
    };

    fetchItems();
  }, [queue, type]);

  return (
    <>
      <SEO title="Archive" description="AI가 요약한 링크 아카이브" />
      <PageWrap>
        <Title>Archive</Title>

        <FilterBar>
          <TabGroup>
            {QUEUES.map(q => (
              <Tab key={q} active={queue === q} onClick={() => setQueue(q)}>
                {q === 'all' ? '전체' : q}
              </Tab>
            ))}
          </TabGroup>
          <ChipGroup>
            {TYPES.filter(t => t !== 'all').map(t => (
              <Chip key={t} active={type === t} onClick={() => setType(type === t ? 'all' : t)}>
                {t}
              </Chip>
            ))}
          </ChipGroup>
        </FilterBar>

        {loading ? (
          <EmptyMessage>불러오는 중...</EmptyMessage>
        ) : items.length === 0 ? (
          <EmptyMessage>저장된 아이템이 없습니다.</EmptyMessage>
        ) : (
          <ItemGrid>
            {items.map(item => (
              <ArchiveItemComp key={item.id} item={item} />
            ))}
          </ItemGrid>
        )}
      </PageWrap>
    </>
  );
}
