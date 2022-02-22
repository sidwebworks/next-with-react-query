import { UnstyledButton, Group, Text, ThemeIcon } from "@mantine/core";
import React, { FC } from "react";
import useStyles from "./styles";

interface NavbarProps {
  text: string;
  color: string;
}

const NavbarItem: FC<NavbarProps> = ({ children, text, color }) => {
  const { classes } = useStyles();

  return (
    <UnstyledButton className={classes.navbarItem}>
      <Group>
        <ThemeIcon size={30} variant="filled" color={color}>
          {children}
        </ThemeIcon>
        <div>
          <Text>{text}</Text>
        </div>
      </Group>
    </UnstyledButton>
  );
};
export default NavbarItem;
