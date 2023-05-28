import Link from './Link';
import config from "../config";
import React from 'react'
//
// const talks = [
//   {
//     id: 1,
//     title: 'Boost your conversion rate',
//     href: '#',
//     description:
//       'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel iusto corrupti dicta laboris incididunt.',
//     imageUrl:
//       'https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80',
//     date: 'Mar 16, 2020',
//     datetime: '2020-03-16',
//     category: { title: 'Marketing', href: '#' },
//     author: {
//       name: 'Michael Foster',
//       role: 'Co-Founder / CTO',
//       href: '#',
//       imageUrl:
//         'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
//     },
//   }, // More talks...
// ];

export default function TalkCard() {
  return (
      <div className={'flex flex-col gap-8'}>
            {React.Children.toArray(config.talks.map(talk => (
              <article
                className='relative isolate flex flex-col gap-10 lg:flex-row'
              >
                {' '}
                <div className='relative aspect-[16/9] sm:aspect-[2/1] lg:aspect-[8/6] lg:w-80 lg:shrink-0'>
                  {' '}
                  <img
                    src={talk.banner}
                    alt=''
                    className='absolute inset-0 h-full w-full rounded-2xl bg-gray-50 object-cover'
                  />{' '}
                  <div className='absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10' />{' '}
                </div>{' '}
                <div className='flex-1'>
                  {' '}
                  <div className='flex items-center gap-x-4 text-xs'>
                    {' '}
                    <time dateTime={talk.date} className='text-gray-500'>
                      {' '}
                      {talk.date}{' '}
                    </time>{' '}
                      {
                          React.Children.toArray(talk.tags.map(tag=>{ return<span
                                  className='relative z-10 rounded-full dark:text-white dark:bg-gray-800 bg-gray-100 px-3 py-1.5 transition font-medium text-gray-600 hover:bg-gray-200'
                              >{tag}</span>
                          }))
                      }

                  </div>{' '}
                  <div className='relative'>
                    {' '}
                    <h3 className='mt-3 text-lg font-semibold leading-6 text-gray-800 dark:text-white dark:hover:text-gray-100 hover:text-gray-900'>
                      {' '}
                      <Link
                          href={`/talks/${talk.slug}`}
                      >
                        {' '}
                        <span className='absolute inset-0' /> {talk.title}{' '}
                      </Link>{' '}
                    </h3>{' '}
                    <p className='mt-5 text-sm leading-6  text-gray-500 dark:text-gray-400'>
                      {talk.description}
                    </p>{' '}
                  </div>{' '}
                  <div className='mt-6 flex border-t border-gray-900/5 dark:border-gray-500/20 pt-6'>
                    <div className="flex justify-end w-full">
                      <div
                          className="text-sm font-semibold leading-6 text-white"
                      >
                      <Link
                          href={`/talks/${talk.slug}`}
                          aria-describedby="featured-talk"
                      >
                        Continue reading <span aria-hidden="true">&rarr;</span>
                      </Link>
                      </div>
                    </div>
                  </div>{' '}
                </div>{' '}
              </article>
            )))}{' '}
      </div>
  );
}
