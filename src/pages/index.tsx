import styled from '@emotion/styled';
import React, { useState } from 'react';
import { BsGithub } from 'react-icons/bs';
import { SiGmail } from 'react-icons/si';
import { FiPlus, FiMinus } from 'react-icons/fi';

import SEO from '@/components/Layout/SEO';
import ProfileImg from '@/components/Profile/ProfileImg';
import { customMQ } from '@/styles/theme';

const PageWrap = styled.div`
  max-width: 76.8rem;
  margin: 0 auto;
  width: 100%;
  padding: 6rem 0 10rem;
`;

/* ── Hero ── */
const Hero = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 2rem 0 5rem;
  gap: 2rem;
`;

const Name = styled.h1`
  font-size: 4.8rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  line-height: 1.15;

  ${customMQ} {
    font-size: 3.4rem;
  }
`;

const Bio = styled.p`
  font-size: 1.5rem;
  color: ${props => props.theme.colors.darkgray_800};
  line-height: 1.8;
  max-width: 44rem;
`;

const SocialRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  color: ${props => props.theme.colors.text_1000};
  transition: color 0.2s ease-in-out;

  svg { font-size: 2.2rem; }

  &:hover { color: ${props => props.theme.colors.primary_1000}; }
`;

const EmailText = styled.a`
  font-size: 1.4rem;
  color: ${props => props.theme.colors.darkgray_800};
  transition: color 0.2s ease-in-out;

  &:hover { color: ${props => props.theme.colors.primary_1000}; }
`;

/* ── Divider ── */
const Divider = styled.hr`
  border: none;
  border-top: 0.1rem solid ${props => props.theme.colors.darkgray_100};
  margin-bottom: 5rem;
`;

/* ── Section ── */
const Section = styled.section`
  margin-bottom: 6rem;
`;

const SectionTitle = styled.h2`
  font-size: 2.4rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 3rem;
`;

/* ── Accordion Career ── */
const CareerList = styled.div`
  display: flex;
  flex-direction: column;
`;

const CareerRow = styled.div`
  border-bottom: 0.1rem solid ${props => props.theme.colors.darkgray_100};
`;

const CareerHeader = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem 0;
  cursor: pointer;
  background: none;
  text-align: left;
  gap: 1rem;
`;

const CareerTitle = styled.span`
  font-size: 1.6rem;
  font-weight: 500;
  color: ${props => props.theme.colors.text_1000};
`;

const ToggleIcon = styled.span`
  flex-shrink: 0;
  color: ${props => props.theme.colors.darkgray_800};
  display: flex;
  align-items: center;

  svg { font-size: 1.8rem; }
`;

const CareerBody = styled.div<{ open: boolean }>`
  display: ${props => (props.open ? 'flex' : 'none')};
  flex-direction: column;
  gap: 0.6rem;
  padding: 0 0 2.4rem;
`;

const CareerDate = styled.p`
  font-size: 1.3rem;
  color: ${props => props.theme.colors.darkgray_800};
  margin-bottom: 0.4rem;
`;

const CareerDesc = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  padding-left: 1.8rem;
`;

const CareerDescItem = styled.li`
  font-size: 1.45rem;
  color: ${props => props.theme.colors.darkgray_800};
  line-height: 1.7;
  list-style: disc;
`;

const CareerSubDesc = styled.ul`
  padding-left: 1.6rem;
  margin-top: 0.4rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

const CareerSubItem = styled.li`
  font-size: 1.35rem;
  color: ${props => props.theme.colors.darkgray_800};
  line-height: 1.7;
  list-style: '— ';
`;

interface CareerData {
  id: string;
  title: string;
  date: string;
  bullets: { text: string; subs?: string[] }[];
}

const CAREERS: CareerData[] = [
  {
    id: '1',
    title: '회사명, 직함',
    date: '2024.01 — 현재 · 정규직',
    bullets: [
      {
        text: '주요 업무 내용을 입력하세요.',
        subs: ['세부 내용 또는 사용 기술을 입력하세요.'],
      },
      { text: '성과 및 기여한 내용을 입력하세요.' },
    ],
  },
  {
    id: '2',
    title: '이전 회사명, 직함',
    date: '2022.07 — 2023.12 · 정규직',
    bullets: [
      {
        text: '주요 업무 내용을 입력하세요.',
        subs: ['세부 내용 또는 사용 기술을 입력하세요.'],
      },
      { text: '성과 및 기여한 내용을 입력하세요.' },
    ],
  },
];

const PROJECTS: CareerData[] = [
  {
    id: 'p1',
    title: '프로젝트명, 역할',
    date: '2024.03 — 현재',
    bullets: [
      { text: '프로젝트 설명을 입력하세요.' },
      { text: '사용 기술 및 특징을 입력하세요.' },
    ],
  },
];

function AccordionItem({ item }: { item: CareerData }) {
  const [open, setOpen] = useState(false);

  return (
    <CareerRow>
      <CareerHeader onClick={() => setOpen(o => !o)}>
        <CareerTitle>{item.title}</CareerTitle>
        <ToggleIcon>{open ? <FiMinus /> : <FiPlus />}</ToggleIcon>
      </CareerHeader>
      <CareerBody open={open}>
        <CareerDate>{item.date}</CareerDate>
        <CareerDesc>
          {item.bullets.map((b, i) => (
            <CareerDescItem key={i}>
              {b.text}
              {b.subs && (
                <CareerSubDesc>
                  {b.subs.map((s, j) => (
                    <CareerSubItem key={j}>{s}</CareerSubItem>
                  ))}
                </CareerSubDesc>
              )}
            </CareerDescItem>
          ))}
        </CareerDesc>
      </CareerBody>
    </CareerRow>
  );
}

export default function HomePage() {
  return (
    <>
      <SEO />
      <PageWrap>
        <Hero>
          <ProfileImg />
          <Name>
            유승연<br />YOOSEUNGYEON
          </Name>
          <Bio>사용자 경험을 중심으로 생각하는 프론트엔드 개발자입니다.</Bio>
          <SocialRow>
            <SocialLink href="mailto:sy.u@kakao.com" aria-label="Email">
              <SiGmail />
            </SocialLink>
            <SocialLink
              href="https://github.com/qoqomi"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Github"
            >
              <BsGithub />
            </SocialLink>
          </SocialRow>
          <EmailText href="mailto:sy.u@kakao.com">sy.u@kakao.com</EmailText>
        </Hero>

        <Divider />

        <Section>
          <SectionTitle>Careers</SectionTitle>
          <CareerList>
            {CAREERS.map(item => (
              <AccordionItem key={item.id} item={item} />
            ))}
          </CareerList>
        </Section>

        <Section>
          <SectionTitle>Side Projects</SectionTitle>
          <CareerList>
            {PROJECTS.map(item => (
              <AccordionItem key={item.id} item={item} />
            ))}
          </CareerList>
        </Section>
      </PageWrap>
    </>
  );
}
