import Head from 'next/head';
import Header from '../src/components/header';
import Footer from '../src/components/footer';
import DropArrow from '../src/components/droparrow';
import Front from '../src/components/front';
import Description from '../src/components/description';
import Slideshow from '../src/components/slideshow';
import Template from '../src/components/templates';
import Form from '../src/components/Form';
import ScrollStepsContainer from '../src/components/ScrollStepsContainer';

export default function Home() {
  return (
    <>
      <Head>
        <title>MB Studio</title>
        <meta name="description" content="MB Studio — Sites performants, UI/UX, e-commerce." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      
      <Header />
      <Front />
      <Description />
      <Slideshow />
      <Template />
      <ScrollStepsContainer />
      <Form />
      <Footer />
      <DropArrow />
    </>
  );
}

