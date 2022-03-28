import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  th: {
    padding: '0 !important',
  },

  control: {
    'width': '100%',
    'padding': `${theme.spacing.xs}px ${theme.spacing.md}px`,

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },
  },

  icon: {
    width: 21,
    height: 21,
    borderRadius: 21,
  },

  row: {
    'width': '100%',
    '&.selected': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.fn.rgba(theme.colors[theme.primaryColor][7], 0.2)
          : theme.colors[theme.primaryColor][0],
    },
  },

  actionbar_header: {
    position: 'sticky',
    top: '-20px',
    backgroundColor: theme.colors.dark[7],
    padding: '1em',
    zIndex: 30,
    alignSelf: 'flex-start',
  },
}));

export default useStyles;
