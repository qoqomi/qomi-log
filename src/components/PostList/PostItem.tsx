
import { PostItemProps } from 'typings/typings';
import {
  CardDescription,
  CardSummary,
  CardTitle,
  PostCard,
  PostItemWrap,
} from './PostItem.style';
import ThumbnailImg from './Thumbnail';


function PostItem({
  title,
  date,
  summary,
  thumbnail: {
    childImageSharp: { gatsbyImageData },
  },
  link,
  time,
}: PostItemProps) {
  return (
    <PostItemWrap
      to={link}
      aria-label={`${title} 포스트 읽기, ${date}, 읽는 시간 ${time}분`}
    >
      <ThumbnailImg thumbnail={gatsbyImageData} alt={title} />

      <PostCard>
        <CardTitle>{title}</CardTitle>
        <CardSummary>{summary}</CardSummary>
        <CardDescription>
          {date} &middot; {time} min read
        </CardDescription>
      </PostCard>
    </PostItemWrap>
  );
}

export default PostItem;