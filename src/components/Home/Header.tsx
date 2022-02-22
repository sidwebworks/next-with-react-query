import { Button, Header as MantineHeader, Title } from "@mantine/core";
import { useEffect } from "react";
import { useQueryClient, useIsFetching } from "react-query";
import useStyles from "./styles";

const Header = () => {
  const { classes } = useStyles();
  const client = useQueryClient();
  const isFetching = useIsFetching("logs");

  const handleRefetch = () => {
    client.refetchQueries("logs");
  };

  return (
    <MantineHeader height={60} padding="xs" className={classes.header}>
      <Title order={2}>Log Dog</Title>

      <Button loading={!!isFetching} onClick={handleRefetch} ml="auto">
        Refetch
      </Button>
    </MantineHeader>
  );
};
export default Header;
