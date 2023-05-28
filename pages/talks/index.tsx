import Card from '@/components/Card';
import { Header } from '@/components/Form';
import { PageSEO } from '@/components/SEO';
import TalkCard from '@/components/TalkCard';
import siteMetadata from '@/data/siteMetadata';

export default function Talks() {
  return (
    <>
      <PageSEO
        title={`Talks - ${siteMetadata.author}`}
        description={siteMetadata.description}
      />
      <div className='fade-in divide-y-2 divide-gray-100 dark:divide-gray-800'>
        <Header title='Talks' />
        <div className='container py-12'>

               <TalkCard />
        </div>
      </div>
    </>
  );
}
