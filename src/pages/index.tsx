import { Alert, Loader } from '@mantine/core';
import axios from 'axios';
import type { NextPage } from 'next';
import { useMemo } from 'react';
import { useQuery } from 'react-query';
import { Column } from 'react-table';
import { FilteredTable } from '../components/table/FilteredTable';
import { SimpleTable } from '../components/table/SimpleTable';
import { SortedTable } from '../components/table/SortedTable';
import { Log } from '../typings/types';

const Page: NextPage = () => {
  const {
    data = [],
    isLoading,
    isError,
    error,
  } = useQuery<Log[], Error>('logs', async () => (await axios('/api/logs')).data);

  const columns: Column<Log>[] = useMemo(
    () => [
      { Header: 'Log Title', accessor: 'title' },
      { Header: 'Log ID', accessor: 'id' },
      {
        Header: 'Log Completed',
        accessor: 'completed',
        Cell: ({ value }) => (value ? 'Completed' : 'Incomplete'),
      },
      { Header: 'Log User ID', accessor: 'userId' },
    ],
    []
  );

  // isLoading === true, if there is no existing data in cache, and it's fetching the data

  // isFetching === true, everytime it's fetching the data

  if (isError) {
    return (
      <Alert
        title={error.name || 'Error'}
        sx={{ maxWidth: '600px', margin: '3rem auto' }}
        color='red'>
        {error.message || 'Something went very wrong'}
      </Alert>
    );
  }

  if (isLoading) {
    //? Comes as true only if there is no existing data in the cache and the query is being fetched
    return <Loader sx={{ margin: '3rem auto', display: 'block' }} />;
  }

  /**
   ** Hey there! Sid here.
   ** Uncomment each of the table examples and see the browser
   */

  return <SimpleTable isLoading={isLoading} data={data} columns={columns} />;
  // return <SortedTable isLoading={isLoading} data={data} columns={columns} />;
  // return <FilteredTable isLoading={isLoading} data={data} columns={columns} />;
};

export default Page;
