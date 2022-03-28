import {
  Box,
  Button,
  Center,
  Group,
  Table as MantineTable,
  Text,
  TextInput,
  UnstyledButton,
} from '@mantine/core';
import { useState } from 'react';
import { useIsFetching, useQueryClient } from 'react-query';
import {
  Column,
  useAsyncDebounce,
  useGlobalFilter,
  useSortBy,
  useTable,
} from 'react-table';
import { ChevronDown, ChevronUp, Rotate, Search, Selector } from 'tabler-icons-react';
import { Log } from '../../typings/types';
import { Row } from './Row';
import useStyles from './use-styles';

type Props = {
  columns: Column<Log>[];
  data: Log[];
  isLoading: boolean;
};

export const FilteredTable = ({ columns, data, isLoading }: Props) => {
  const { classes } = useStyles();
  const {
    getTableProps,
    headerGroups,
    prepareRow,
    rows,
    getTableBodyProps,
    setGlobalFilter,
    state,
  } = useTable(
    {
      data,
      columns,
    },
    useGlobalFilter,
    useSortBy
  );

  return (
    <>
      <TableSearchBar filter={state.globalFilter} onFilter={setGlobalFilter} />
      <MantineTable
        sx={{ width: '100%' }}
        my='sm'
        verticalSpacing='xs'
        {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => {
            const { key, ...rest } = headerGroup.getHeaderGroupProps();
            return (
              <tr key={key} {...rest}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className={classes.th}
                    key={column.id}>
                    <UnstyledButton className={classes.control}>
                      <Group position='apart'>
                        <Text ml={-5} weight={500} size='sm'>
                          {column.render('Header')}
                        </Text>
                        <Center className={classes.icon}>
                          {column.isSorted ? (
                            column.isSortedDesc ? (
                              <ChevronDown size={14} />
                            ) : (
                              <ChevronUp size={14} />
                            )
                          ) : (
                            <Selector size={14} />
                          )}
                        </Center>
                      </Group>
                    </UnstyledButton>
                  </th>
                ))}
              </tr>
            );
          })}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            const { key, ...rest } = row.getRowProps();
            return (
              <Row key={key} {...rest}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()} key={cell.column.id}>
                      {cell.render('Cell')}
                    </td>
                  );
                })}
              </Row>
            );
          })}
        </tbody>
      </MantineTable>
      {!rows.length ? (
        <Box my='md'>
          {isLoading ? (
            <Text align='center'>Loading...</Text>
          ) : (
            <Text align='center'>Nothing here</Text>
          )}
        </Box>
      ) : null}
    </>
  );
};

type SearchBarProps = {
  onFilter: (val: string) => void;
  filter: string;
};

const TableSearchBar = ({ filter, onFilter }: SearchBarProps) => {
  const { classes } = useStyles();
  const [value, setValue] = useState<string>(filter || '');
  const isReloading = useIsFetching('logs') > 0;
  const queryClient = useQueryClient();

  const onInputChange = useAsyncDebounce(() => {
    onFilter(value.trim());
  }, 200);

  const handleReload = () => {
    queryClient.refetchQueries('logs');
  };

  return (
    <Box className={classes.actionbar_header}>
      <Group sx={{ alignItems: 'center' }}>
        <TextInput
          onChange={(e) => {
            setValue(e.target.value);
            onInputChange();
          }}
          value={value}
          sx={{ flexGrow: '1' }}
          placeholder='Search by any field'
          icon={<Search size={14} />}
        />

        <Button
          loading={isReloading}
          onClick={handleReload}
          color={'cyan'}
          leftIcon={<Rotate size={18} />}>
          Reload
        </Button>
      </Group>
    </Box>
  );
};
