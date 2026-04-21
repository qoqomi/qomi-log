

import { ContentProps, PostItemListProps } from '@/typings/typings';
import { PostItemListWrap } from './PostItemList.style';
import PostItem from './PostItem';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';

function PostItemList({ posts }: PostItemListProps) {
    const { containerRef } = useInfiniteScroll(posts)
  
  return (
    <PostItemListWrap ref={containerRef}>
      {posts.map(
        ({
          node: {
            id,
            fields: { slug },
            timeToRead,
            frontmatter,
          },
        }: ContentProps) => (
          <PostItem {...frontmatter} link={slug} key={id} time={timeToRead} />
        ),
      )}
    </PostItemListWrap>
  );
}

export default PostItemList;
