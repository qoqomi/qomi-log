import React from 'react';

import { Img, ImgWrap, PlaceholderWrap } from './ProfileImg.style';

import useProfileImage from '@/hooks/useProfileImage';

function ProfileImg() {
  const profile = useProfileImage();
  
  if (!profile) {
    return <PlaceholderWrap />;
  }

  return (
    <ImgWrap>
      <Img image={profile.childImageSharp.gatsbyImageData} alt="profile" />
    </ImgWrap>
  );
}

export default ProfileImg;
