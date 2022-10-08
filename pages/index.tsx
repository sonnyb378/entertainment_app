import type { NextPage } from 'next';
import { NextPageWithLayout } from './page';
import Head from 'next/head';
import Image from 'next/image';

const Home: NextPageWithLayout = () => {
  return (
    <div>
      <Head>
        <title>StreamX - Entertainment App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-1 items-center justify-center h-screen w-full bg-black text-white">
        Entertainment App
      </main>
      
    </div>
  );
};

export default Home;


Home.getLayout = (page) => {
  return (
      <div>
        {page}
      </div>
  );
};