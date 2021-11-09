import React, { useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import TreeStructureView from '../../elements/TreeStructureView';
import FilesView from '../../elements/FilesView';

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Auth from "../../utils/auth";
import { GlobalContext as UserContext } from "../../context/store";
import {Link} from "react-router-dom"



const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));

export default function Home() {
  const classes = useStyles();
  const { state } = useContext(UserContext);
console.log("HomeState:", state);
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
          <Stack direction="row" spacing={2}>
      <Button variant="contained">Something</Button>
      {/* <Button variant="contained" href="/dashboard">
              Login
              </Button> */}
      {
              Auth.loggedIn() ?
              <Link to="/dashboard">
              <Button variant="contained">
              Dashboard
              </Button>
              </Link>
                :
                <span>(log in to check out)</span>
            }
    </Stack>
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={classes.toolbar} />
        <TreeStructureView />
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <FilesView/>
   
      </main>
    </div>
  );
}