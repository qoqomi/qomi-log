import { IGatsbyImageData } from 'gatsby-plugin-image';
import React from 'react';

import { Img, ImgWrap } from './Thumbnail.style';

function Thumbnail({ thumbnail, alt }: { thumbnail: IGatsbyImageData; alt: string }) {
  return (
    <ImgWrap>
      <Img image={thumbnail} alt={alt} />
    </ImgWrap>
  );
}

export default Thumbnail;
