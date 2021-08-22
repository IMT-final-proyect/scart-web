import React, { useState } from 'react';

import { AppBar, Divider, Drawer, makeStyles, Theme, Toolbar, Typography, useTheme } from '@material-ui/core';

import { headerSize } from '../utils/constants';




const useStyles = makeStyles((theme: Theme) => ({
    customizeToolbar:{
        minHeight: headerSize,
        height: headerSize,
    },
    title:{
        marginLeft: theme.spacing(2),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
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
    const [open, setOpen] = useState(true);
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
                <Typography variant="h6" className={classes.title}>
                    {props.title}
                </Typography>
                {props.ButtonList}
            </Toolbar>
        </AppBar>
        </>
    )
}

export default TemplateBar;