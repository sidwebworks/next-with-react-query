import { createStyles } from "@mantine/styles";

const useStyles = createStyles((theme) => {
  return {
    header: {
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
    },
    navbar: {
      width: 230,

      [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
        display: "none",
      },
    },
    navbarItem: {
      display: "block",
      margin: "0.5rem 0rem",
      padding: "0.5rem 0.5rem",
      borderRadius: "5px",
      width: "100%",
      "&:hover": {
        background: "#25262B",
      },
    },
  };
});

export default useStyles;
