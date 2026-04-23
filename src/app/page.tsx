'use client';

import styled from '@emotion/styled';
import React from 'react';
import { BsGithub } from 'react-icons/bs';
import { SiGmail } from 'react-icons/si';

import ProfileImg from '@/components/Profile/ProfileImg';
import { customMQ } from '@/styles/theme';

const PageWrap = styled.div`
  max-width: 76.8rem;
  margin: 0 auto;
  width: 100%;
  padding: 6rem 0 10rem;
`;

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
  cursor: pointer;
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

const Divider = styled.hr`
  border: none;
  border-top: 0.1rem solid ${props => props.theme.colors.darkgray_100};
  margin-bottom: 5rem;
`;

export default function HomePage() {
  return (
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
    </PageWrap>
  );
}
