import { AppShell, ScrollArea } from "@mantine/core";
import Head from "next/head";
import { FC } from "react";
import AppHeader from "../Home/Header";
import NavBar from "../Home/Navbar";

const AppLayout: FC = ({ children }) => {
  return (
    <>
      <Head>
        <title>Robin&apos;s App</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <AppShell
        navbar={<NavBar />}
        header={<AppHeader />}
        padding={1}
        styles={() => ({
          root: {
            maxHeight: "100vh",
            overflow: "hidden",
          },
        })}
      >
        <ScrollArea style={{ height: "calc(100vh - 60px)" }}>{children}</ScrollArea>
      </AppShell>
    </>
  );
};

export default AppLayout;
