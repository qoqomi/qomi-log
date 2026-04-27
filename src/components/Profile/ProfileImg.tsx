import Image from 'next/image';
import React from 'react';

import styled from '@emotion/styled';

export const ImgWrap = styled.div`
  position: relative;
  width: 13rem;
  height: 13rem;
  border-radius: 6.5rem;
  overflow: hidden;
  text-align: center;
  z-index: 0;
  flex-shrink: 0;
`;

export const PlaceholderWrap = styled.div`
  width: 13rem;
  height: 13rem;
  border-radius: 6.5rem;
  background-color: ${props => props.theme.colors.lightprimary_500};
  flex-shrink: 0;
`;


function ProfileImg() {
  return (
    <ImgWrap>
      <Image src="/images/profile.png" alt="profile" fill style={{ objectFit: 'cover' }} priority />
    </ImgWrap>
  );
}

export default ProfileImg;
