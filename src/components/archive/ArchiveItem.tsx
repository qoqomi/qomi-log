import styled from '@emotion/styled';
import Link from 'next/link';
import React from 'react';

import { ArchiveItem as ArchiveItemType } from '@/typings/typings';
import QueueBadge from './QueueBadge';

const ItemWrap = styled(Link)`
  display: flex;
  align-items: flex-start;
  gap: 1.4rem;
  padding: 1.4rem 1rem;
  border-bottom: 0.1rem solid ${props => props.theme.colors.darkgray_100};
  transition: background-color 0.15s ease-in-out;
  border-radius: 0.6rem;
  cursor: pointer;

  &:hover {
    background-color: ${props => props.theme.colors.darkgray_100};
  }
`;


const Content = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

const TopRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
`;

const ItemTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 140%;
  color: ${props => props.theme.colors.text_1000};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Meta = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-shrink: 0;
`;

const ItemDate = styled.span`
  font-size: 1.2rem;
  color: ${props => props.theme.colors.darkgray_800};
  white-space: nowrap;
`;

const ItemSummary = styled.p`
  font-size: 1.35rem;
  line-height: 155%;
  color: ${props => props.theme.colors.darkgray_800};
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
`;

const BottomRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  flex-wrap: wrap;
  margin-top: 0.2rem;
`;

const Tag = styled.span`
  font-size: 1.15rem;
  color: ${props => props.theme.colors.darkgray_800};

  &::before {
    content: '#';
    opacity: 0.5;
  }
`;

function ArchiveItem({ item }: { item: ArchiveItemType }) {
  return (
    <ItemWrap href={`/archive/${item.id}`}>
      <Content>
        <TopRow>
          <ItemTitle>{item.title}</ItemTitle>
          <Meta>
            <ItemDate>
              {new Date(item.created_at).toLocaleDateString('ko-KR')}
            </ItemDate>
            <QueueBadge queue={item.queue} />
          </Meta>
        </TopRow>
        <ItemSummary>{item.summary}</ItemSummary>
        <BottomRow>
          {item.tags.map(tag => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </BottomRow>
      </Content>
    </ItemWrap>
  );
}

export default ArchiveItem;
