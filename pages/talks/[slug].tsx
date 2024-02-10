import { H1, H2 } from '@/components/Form';
import { PageSEO } from '@/components/SEO';
import config from 'config';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Image from 'next/image';
import React from 'react';
import type { Talk } from '../../config/talks';

const { talks } = config;

export async function getStaticPaths() {
  return {
    paths: talks.map(({ slug }) => ({ params: { slug } })),
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps<{
  project: Talk;
}> = async ({ params }) => {
  const project = talks.find(project => project.slug === params.slug);
  return {
    props: {
      project,
    },
  };
};

export default function Talk({
  project,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { title, description, banner, tags, slides, demosList, watchTalk } =
    project;

  return (
    <>
      <PageSEO title={title} description={description} imageUrl={banner} />
      <div className='mx-auto flex justify-center overflow-hidden rounded bg-placeholder-light dark:bg-placeholder-dark lg:w-[850px]'>
        <div className='relative aspect-video lg:w-full lg:shrink-0'>
          <img src={banner} alt='' className='absolute aspect-video w-full' />
        </div>
      </div>
      <div className='mx-auto my-10 lg:w-[850px]'>
        <H1 className='lg:text-5x mb-4 text-3xl font-bold dark:text-white'>
          {title}
        </H1>

        <p className='mb-4 font-light'>{description}</p>

        <div className={'my-4 mb-10 flex gap-2'}>
          {React.Children.toArray(
            tags.map(tag => {
              return (
                <span className='relative z-10 rounded-full bg-gray-100 px-3 py-1.5 font-medium text-gray-600 transition hover:bg-gray-200 dark:bg-gray-800 dark:text-white'>
                  {tag}
                </span>
              );
            }),
          )}
        </div>
        <a href={slides}>
          <H2 className='!text-blue-500 underline'>Slides</H2>
        </a>
        <a href={watchTalk}>
          <H2 className='!text-blue-500 underline'>Watch Talk</H2>
        </a>
        <div className={'flex gap-4'}>
          {React.Children.toArray(
            demosList.map((demo: string, index: number) => {
              if (!demo) {
                return null;
              }
              return (
                <a href={demo}>
                  <H2 className='!text-blue-500 underline'>GitHub Repo Link {index + 1}</H2>
                </a>
              );
            }),
          )}
        </div>
      </div>
    </>
  );
}
