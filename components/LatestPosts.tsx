import { memo } from 'react';
import { PostFrontMatter } from 'types/PostFrontMatter';
import Link from './Link';
import { format } from 'date-fns';
interface LatestPostsProps {
  latestPosts: PostFrontMatter[];
}
const LatestPosts = ({ latestPosts }: LatestPostsProps) => {
  return (
    <div className='dark:text-white sm:col-span-4 sm:py-10 lg:col-span-5'>
      <div>
        <h2 className='text-2xl font-bold dark:text-white lg:text-3xl'>
          Recent Posts
        </h2>
      </div>
      <div className='relative divide-y-2 divide-gray-200 lg:max-w-7xl'>
        <div className='grid gap-16 pt-10 lg:grid-cols-2 lg:gap-x-5 lg:gap-y-5'>
          {latestPosts.map(post => (
            <div
              key={post.title}
              className='flex w-full flex-col gap-4 rounded-2xl bg-blue-100/25 p-6 shadow-md dark:bg-gray-600'
            >
              <p className='text-sm dark:text-white'>
                <time dateTime={post.date}>
                  {format(new Date(post.date), 'PPPP')}
                </time>
              </p>
              <Link href={`/blog/${post.slug}`}>
                <p className='text-lg font-semibold text-gray-900 dark:text-white'>
                  {post.title}
                </p>
                <p className='mt-3 text-base font-light lg:text-xl'>
                  {post.summary}
                </p>
              </Link>
              <div className='mt-3'>
                <Link
                  href={`/blog/${post.slug}`}
                  className='text-base font-semibold text-primary-500 hover:text-primary-500'
                >
                  Read full post
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default memo(LatestPosts);
