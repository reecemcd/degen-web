import { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import Head from 'next/head';
import Layout from '../src/layout/layout';
import theme from '../src/core/chakra-theme';
import './styles.scss';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Degen Bot</title>
      </Head>
      <ChakraProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </>
  );
}

export default CustomApp;
