import Link from '@/components/Link';
import { useRandomColorPair } from '@/lib/hooks/useRandomColorPair';
import { memo } from 'react';
import { RoughNotation } from 'react-rough-notation';
import { AuthorFrontMatter } from 'types/AuthorFrontMatter';

interface BannerProps {
  frontMatter: AuthorFrontMatter;
}

function Banner(props: BannerProps): React.ReactElement {
  const { frontMatter } = props;
  const [aboutColor, contactColor] = useRandomColorPair();
  return (
    <div
      // className={
      //   'flex flex-col items-center justify-center gap-6 sm:grid sm:h-full sm:grid-cols-8'
      // }
      className='my-16 flex flex-col justify-center gap-4 md:flex-row md:justify-between'
    >
      <div className='fade-in my-6 flex flex-col justify-center dark:text-white sm:col-span-4 sm:py-10 lg:col-span-5 lg:px-10'>
        <h1 className='text-2xl font-bold dark:text-white lg:text-3xl'>
          Salaam-Alaikum, I am {frontMatter.shortname}
        </h1>
        <p className='my-2 text-lg lg:my-4 lg:text-2xl'>
          {frontMatter.occupation}
        </p>
        <p className='font-light lg:text-xl'>
          Read more
          <Link className='ml-2 mr-2 font-normal text-black' href='/about'>
            <RoughNotation
              show
              type='highlight'
              animationDelay={250}
              animationDuration={2000}
              color={aboutColor}
            >
              about me
            </RoughNotation>
          </Link>
          or
          <Link className='ml-2 font-normal text-black' href='/contact'>
            <RoughNotation
              show
              type='highlight'
              animationDelay={250}
              animationDuration={2000}
              color={contactColor}
            >
              contact me
            </RoughNotation>
          </Link>
        </p>
      </div>
      <div
        className={
          'flex flex-col items-center gap-4 rounded-2xl bg-blue-100/25 p-6 shadow-md dark:bg-gray-600 sm:col-span-4 lg:col-span-3'
        }
      >
        <div className='text-8xl'>🤙🏼</div>
        <div className={'text-xl font-bold'}>@miliariadnane</div>
        <div title={'description'}>
          Software Engineer 🔵 Backend Developer
          <br />
          <p className='mt-2 text-center'>Moving slowley but surley ! 🐢️️</p>
        </div>
      </div>
    </div>
  );
}

export default memo(Banner);
