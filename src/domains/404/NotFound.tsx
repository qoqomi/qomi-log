import React from 'react';

import {
  GoToHomeLink,
  NotFoundDescription,
  NotFoundWrap,
  Warning,
} from './NotFound.style';

function NotFound() {
  return (
    <NotFoundWrap>
      <Warning>404</Warning>
      <NotFoundDescription>찾을 수 없는 페이지입니다.</NotFoundDescription>
      <GoToHomeLink to="/">홈으로 가기</GoToHomeLink>
    </NotFoundWrap>
  );
}

export default NotFound;
