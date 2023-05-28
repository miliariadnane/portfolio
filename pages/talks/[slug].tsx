import { H1, H2 } from '@/components/Form';
import { PageSEO } from '@/components/SEO';
import config from 'config';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Image from 'next/image';
import React from 'react';
import type {Talk} from "../../config/talks";

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
  const {
    title,
    description,
    banner,
  tags,
  date,
      slides,
  demosList,
  watchTalk,
  } = project;




  return (
    <>
      <PageSEO
        title={title}
        description={ description}
        imageUrl={banner}
      />
        <div
            className='flex justify-center overflow-hidden lg:w-[850px] mx-auto rounded bg-placeholder-light dark:bg-placeholder-dark'
        >
            <Image
                loading='eager'
                src={banner}
                height={300}
                width={850}
                alt={title}
            />
        </div>
        <div
            className='lg:w-[850px] mx-auto my-10'

        >


      <H1 className='lg:text-5x mb-4 text-3xl font-bold dark:text-white'>
        {title}
      </H1>


      <p className='mb-4 font-light'>{description}</p>

        <div  className={'flex gap-2 my-4 mb-10'}>

            {
                React.Children.toArray(tags.map(tag=>{ return <span
                    className='relative z-10 rounded-full dark:text-white dark:bg-gray-800 bg-gray-100 px-3 py-1.5 transition font-medium text-gray-600 hover:bg-gray-200'
                >{tag}</span>
                }))
            }
        </div>
      <a href={slides}>
          <H2 className='!text-blue-500 underline'>Slides</H2>
        </a>
        <a href={watchTalk}>
            <H2 className='!text-blue-500 underline'>Watch Talk</H2>
        </a>
        <div className={'flex gap-4'}>

        {
            React.Children.toArray(demosList.map((demo,index)=>{
                return <a href={watchTalk}>
                    <H2 className='!text-blue-500 underline'>Demo {index+1}</H2>
                </a>
            }))
        }
        </div>
        </div>


    </>
  );
}
