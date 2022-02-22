import { Box, Center, Loader, Table, Button, Alert } from "@mantine/core";
import type { NextPage } from "next";
import { useEffect } from "react";
import { dehydrate, QueryClient, useQuery } from "react-query";
import { fetchLogs } from "../../lib/api";
import { Log } from "../../lib/types";

const LogsPage: NextPage = () => {
  const {
    data = [],
    isLoading,
    isError,
    error,
  } = useQuery<Log[], Error>("logs", fetchLogs);

  const rows = data.map((element) => (
    <tr key={element.id}>
      <td>{element.title}</td>
      <td>{element.id}</td>
      <td>{element.completed ? "Completed" : "Incomplete"}</td>
      <td>{element.userId}</td>
    </tr>
  ));

  if (isError) {
    return (
      <Alert
        title={error.name || "Error"}
        sx={{ maxWidth: "600px", margin: "3rem auto" }}
        color="red"
      >
        {error.message || "Something went very wrong"}
      </Alert>
    );
  }

  if (isLoading) {
    //? Comes as true only if there is no existing data in the cache and the query is being fetched
    return <Loader sx={{ margin: "3rem auto", display: "block" }} />;
  }

  return (
    <>
      <Table>
        <thead>
          <tr>
            <th>Title</th>
            <th>ID</th>
            <th>Completed</th>
            <th>User ID</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </>
  );
};

export default LogsPage;

export async function getServerSideProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery("logs", fetchLogs);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
