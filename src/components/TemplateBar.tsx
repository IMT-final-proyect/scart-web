import React from 'react';
import clsx from 'clsx';

import { AppBar, Divider, Drawer, IconButton, makeStyles, Theme, Toolbar, Typography, useTheme } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';


const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) => ({
    customizeToolbar:{
        minHeight: 40,
        height: 40,
    },
    titleOpen:{
        marginLeft: drawerWidth,
    },
    titleClose:{
        marginLeft: 0,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
      },
      drawerPaper: {
        width: drawerWidth,
      },
      drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
      },
      content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
      },
      contentShift: {
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
      },
}));

interface Props {
    title: string;
    ButtonList: React.ReactNode;
}

const TemplateBar = (props : Props) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();

    const handleDrawerOpen = () => {
      setOpen(true);
    };
  
    const handleDrawerClose = () => {
      setOpen(false);
    };

    return(
        <>
        <AppBar>
            <Toolbar className={classes.customizeToolbar}>
                <IconButton 
                    edge="start" 
                    color="inherit" 
                    aria-label="menu" 
                    onClick={handleDrawerOpen}
                    className={clsx(classes.menuButton, open && classes.hide)}
                    >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" className={clsx(open ? classes.titleOpen : classes.titleClose)}>
                    {props.title}
                </Typography>
            </Toolbar>
        </AppBar>
        <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="left"
            open={open}
            classes={{
            paper: classes.drawerPaper,
            }}
        >
            <div className={classes.drawerHeader}>
            <IconButton onClick={handleDrawerClose}>
                {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
            </div>
            <Divider />
            {props.ButtonList}
      </Drawer>
        </>
    )
}

export default TemplateBar;