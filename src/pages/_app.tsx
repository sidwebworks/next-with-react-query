import { AppProps } from 'next/app';
import { MantineProvider } from '@mantine/core';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { useState } from 'react';
import AppLayout from '../components/layouts/AppLayout';

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {/* HYDRATE is require for the RQ to work on the Server Side aka SSR */}
      <Hydrate state={pageProps.dehydratedState}>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            colorScheme: 'dark',
          }}>
          <AppLayout>
            <Component {...pageProps} />
          </AppLayout>
        </MantineProvider>
      </Hydrate>

      {/* Uncomment this to enable devtools for live debugging */}
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
