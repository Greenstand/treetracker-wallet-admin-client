import React from "react";
import { withStyles } from "@material-ui/core/styles";
import SideMenu from "./SideMenu/SideMenu";
// import styles from "./Layout.module.scss";
import { Box, Drawer, Grid, Paper, makeStyles } from "@material-ui/core";
// import styles from "./Layout.styles";
// import "./Layout.css";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    width: 232,
    flexShrink: 0,
  },
  drawerPaper: {
    width: 232,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const Layout = ({ props, children }) => {
  //const classes = props.classes;
  const classes = useStyles();

  return (
    // <div className={styles.layout}>
    //   <div className={styles.layout__content}>
    //     <SideMenu />
    //     {/* <MainContent>{children}</MainContent> */}
    //     {children}
    //   </div>
    // </div>

    // <Grid className={classes.box}>
    //   <Grid className={classes.menuAside}>
    //     <Paper elevation={3} className={classes.menu}>
    //       <SideMenu />
    //     </Paper>
    //   </Grid>
    //   <Grid className={classes.rightBox}>
    //     <Box className={classes.box2}>Main body</Box>
    //   </Grid>
    // </Grid>
    <div className={classes.root}>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <SideMenu />
      </Drawer>
      <Grid container className={classes.content}>
        {children}
      </Grid>
    </div>
  );
};

// export default withStyles(styles)(Layout);
export default Layout;
