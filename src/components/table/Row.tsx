import { FC } from 'react';
import useStyles from './use-styles';

type Props = {
  checked?: boolean;
};

export const Row: FC<Props> = ({ children, ...props }) => {
  const { classes, cx } = useStyles();
  return (
    <tr {...props} className={cx({ selected: props?.checked || false }, classes.row)}>
      {children}
    </tr>
  );
};
