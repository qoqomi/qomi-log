import React from 'react';

import Description from './Description';
import { ProfileWrap } from './Profile.style';
import ProfileImg from './ProfileImg';

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
