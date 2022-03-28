import {
  Box,
  Center,
  Group,
  Table as MantineTable,
  Text,
  UnstyledButton,
} from '@mantine/core';
import { Column, useSortBy, useTable } from 'react-table';
import { ChevronDown, ChevronUp, Selector } from 'tabler-icons-react';
import { Log } from '../../typings/types';
import { Row } from './Row';
import useStyles from './use-styles';

type Props = {
  columns: Column<Log>[];
  data: Log[];
  isLoading: boolean;
};

export const SortedTable = ({ columns, data, isLoading }: Props) => {
  const { classes } = useStyles();
  const { getTableProps, headerGroups, prepareRow, rows, getTableBodyProps } = useTable(
    {
      data,
      columns,
    },
    useSortBy
  );

  return (
    <>
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
