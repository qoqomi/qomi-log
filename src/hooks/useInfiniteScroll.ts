import { MutableRefObject, useEffect, useRef, useState } from 'react'

import { ContentProps } from '@/typings/typings'

export type UseInfiniteScrollType = {
  containerRef: MutableRefObject<HTMLDivElement | null>
  postList: ContentProps[]
}

const NUMBER_OF_POSTS_PER_PAGE = 10

const useInfiniteScroll = function (posts: ContentProps[]): UseInfiniteScrollType {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [count, setCount] = useState(1)

  useEffect(() => {
    if (
      NUMBER_OF_POSTS_PER_PAGE * count >= posts.length ||
      containerRef.current === null ||
      containerRef.current.children.length === 0
    )
      return

    const observer = new IntersectionObserver((entries, obs) => {
      if (!entries[0].isIntersecting) return
      setCount(prev => prev + 1)
      obs.disconnect()
    })

    observer.observe(
      containerRef.current.children[containerRef.current.children.length - 1],
    )

    return () => observer.disconnect()
  }, [count, posts.length])

  return {
    containerRef,
    postList: posts.slice(0, count * NUMBER_OF_POSTS_PER_PAGE),
  }
}

export default useInfiniteScroll
