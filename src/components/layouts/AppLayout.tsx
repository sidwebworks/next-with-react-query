import { AppShell, ScrollArea } from '@mantine/core';
import Head from 'next/head';
import { FC } from 'react';
import NavBar from '../common/navbar/Navbar';

const AppLayout: FC = ({ children }) => {
  return (
    <>
      <Head>
        <title>App</title>
        <meta
          name='viewport'
          content='minimum-scale=1, initial-scale=1, width=device-width'
        />
      </Head>
      <AppShell
        navbar={<NavBar />}
        padding={1}
        styles={() => ({
          root: {
            maxHeight: '100vh',
            overflow: 'hidden',
          },
        })}>
        <ScrollArea style={{ height: '100vh' }}>{children}</ScrollArea>
      </AppShell>
    </>
  );
};

export default AppLayout;
