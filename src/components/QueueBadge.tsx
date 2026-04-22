import styled from '@emotion/styled';
import React from 'react';

import { QueueType } from '@/typings/typings';

const QUEUE_STYLE: Record<QueueType, { bg: string; color: string }> = {
  Later:     { bg: 'rgba(148, 163, 184, 0.15)', color: '#64748b' },
  Shortlist: { bg: 'rgba(245, 158, 11, 0.12)',  color: '#d97706' },
  Archive:   { bg: 'rgba(107, 114, 128, 0.12)', color: '#6b7280' },
};

const Badge = styled.span<{ queue: QueueType }>`
  display: inline-flex;
  align-items: center;
  padding: 0.3rem 0.9rem;
  border-radius: 0.6rem;
  font-size: 1.15rem;
  font-weight: 500;
  letter-spacing: 0.01em;
  background-color: ${({ queue }) => QUEUE_STYLE[queue].bg};
  color: ${({ queue }) => QUEUE_STYLE[queue].color};
`;

function QueueBadge({ queue }: { queue: QueueType }) {
  return <Badge queue={queue}>{queue}</Badge>;
}

export default QueueBadge;
