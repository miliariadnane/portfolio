import Link from './Link';
import config from '../config';
import React from 'react';
import { format } from 'date-fns';
export default function TalkCard() {
  return (
    <div className={'flex flex-col gap-8'}>
      {React.Children.toArray(
        config.talks.map(talk => (
          <article className='relative isolate flex flex-col gap-10 lg:flex-row'>
            <div className='relative aspect-video lg:w-80 lg:shrink-0'>
              <img
                src={talk.banner}
                alt=''
                className='absolute aspect-video w-full rounded-2xl'
              />
            </div>
            <div className='flex-1'>
              <div className='flex items-center gap-x-4 text-xs'>
                <time dateTime={talk.date} className='text-gray-500'>
                  {format(new Date(talk.date), 'PPPP')}
                </time>
                {React.Children.toArray(
                  talk.tags.map(tag => {
                    return (
                      <span className='relative z-10 rounded-full bg-gray-100 px-3 py-1.5 font-medium text-gray-600 transition hover:bg-gray-200 dark:bg-gray-800 dark:text-white'>
                        {tag}
                      </span>
                    );
                  }),
                )}
              </div>
              <div className='relative'>
                <h3 className='mt-3 text-lg font-semibold leading-6 text-gray-800 hover:text-gray-900 dark:text-white dark:hover:text-gray-100'>
                  <Link href={`/talks/${talk.slug}`}>
                    <span className='absolute inset-0' /> {talk.title}
                  </Link>
                </h3>
                <p className='mt-5 line-clamp-3 text-sm leading-6 text-gray-500 dark:text-gray-400'>
                  {talk.description}
                </p>
              </div>
              <div className='mt-6 flex border-t border-gray-900/5 pt-6 dark:border-gray-500/20'>
                <div className='flex w-full justify-end'>
                  <div className='text-sm font-semibold leading-6 text-white'>
                    <Link
                      href={`/talks/${talk.slug}`}
                      aria-describedby='featured-talk'
                    >
                      Continue reading <span aria-hidden='true'>&rarr;</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </article>
        )),
      )}
    </div>
  );
}
