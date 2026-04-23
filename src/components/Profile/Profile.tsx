import React from 'react';

import Description from './Description';
import ProfileImg from './ProfileImg';


import styled from '@emotion/styled';

import { customMQ } from '@/styles/theme';

export const ProfileWrap = styled.div<{ padding: string }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 3rem;
  padding: ${props => props.padding};

  ${customMQ} {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 1.5rem;
  }
`;


interface ProfileProps {
  padding:string
}

function Profile({ padding }: ProfileProps) {
  return (
    <ProfileWrap padding={padding}>
      <ProfileImg />
      <Description />
    </ProfileWrap>
  );
}

export default Profile;
