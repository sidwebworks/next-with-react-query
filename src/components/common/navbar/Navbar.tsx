import { Avatar, Group, Navbar, ScrollArea, Text, UnstyledButton } from '@mantine/core';
import NavbarItem from './NavbarItem';
import useStyles from './styles';

const NavBar = () => {
  const { classes } = useStyles();

  return (
    <Navbar className={classes.navbar} padding='xs' height={'100vh'}>
      <Navbar.Section grow component={ScrollArea}>
        {/* Currently used Letters as Placeholders, the svgs will go in place of Letters */}
        <NavbarItem text='Home' color='blue'>
          H
        </NavbarItem>
        <NavbarItem text='Logout' color='green'>
          L
        </NavbarItem>
        <NavbarItem text='Open Issues' color='violet'>
          O
        </NavbarItem>
        <NavbarItem text='Discussions' color='grape'>
          D
        </NavbarItem>
        <NavbarItem text='Popular Products' color='cyan'>
          P
        </NavbarItem>
      </Navbar.Section>

      <Navbar.Section>
        <UnstyledButton onClick={() => console.log('try focusing button with tab')}>
          <Group>
            <Avatar size={40} color='blue'>
              RL
            </Avatar>
            <div>
              <Text size='xs' color='gray'>
                robin@gmail.com
              </Text>
            </div>
          </Group>
        </UnstyledButton>
      </Navbar.Section>
    </Navbar>
  );
};
export default NavBar;
