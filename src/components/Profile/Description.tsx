import React from 'react';
import { BsGithub } from 'react-icons/bs';
import { SiGmail } from 'react-icons/si';

import { Contact, ContactItem, DescriptionWrap, Introduce, Name } from './Description.style';

function Description() {
  return (
    <DescriptionWrap>
      <Name>My Blog</Name>
      <Introduce>안녕하세요. 방문해 주셔서 감사합니다.</Introduce>
      <Contact>
        <ContactItem>
          <a href="mailto:sy.u@kakao.com" aria-label="Email">
            <SiGmail />
          </a>
        </ContactItem>
        <ContactItem>
          <a
            href="https://github.com/qoqomi"
            target="_blank"
            rel="noreferrer noopener"
            aria-label="Github"
          >
            <BsGithub />
          </a>
        </ContactItem>
      </Contact>
    </DescriptionWrap>
  );
}

export default Description;
