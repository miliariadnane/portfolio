import { PageSEO } from '@/components/SEO';
import siteMetadata from '@/data/siteMetadata';
import { getFileBySlug } from '@/lib/mdx';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import dynamic from 'next/dynamic';
import { AuthorFrontMatter } from 'types/AuthorFrontMatter';
import { getAllFilesFrontMatter } from '@/lib/mdx';
import { PostFrontMatter } from 'types/PostFrontMatter';
import SocialIcons from '@/components/SocialIcons';

// TODO: Direct share functionality.
// TODO: Switch geist-ui with something simple.
// @ts-ignore
export const getStaticProps: GetStaticProps<{
  author: AuthorFrontMatter;
  latestPosts: PostFrontMatter[];
}> = async () => {
  const authorDetails = await getFileBySlug<AuthorFrontMatter>('authors', [
    'default',
  ]);

  const { frontMatter: author } = authorDetails;
  const posts = await getAllFilesFrontMatter('blog');

  return { props: { author, latestPosts: posts.slice(0, 4) } };
};

const Banner = dynamic(import('@/components/Banner'));
const LatestPosts = dynamic(import('@/components/LatestPosts'));

export default function Home({
  author,
  latestPosts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <PageSEO
        title={siteMetadata.title}
        description={siteMetadata.description}
      />
      <Banner frontMatter={author} />
      <LatestPosts latestPosts={latestPosts} />
    </>
  );
}
