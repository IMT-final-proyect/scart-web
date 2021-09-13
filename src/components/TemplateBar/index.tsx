import React, { useState } from 'react';
import { AppBar, Button, Drawer, Toolbar, Typography, useTheme } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';


import useStyles from './styles'

interface Props {
    title: string;
    ButtonList: React.ReactNode;
}

const TemplateBar = (props : Props) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const theme = useTheme();

    const handleDrawerOpen = () => {
      setOpen(true);
    };
  
    const handleDrawerClose = () => {
      setOpen(false);
    };

    const toggleDrawer = (value: boolean) => (
      event: React.KeyboardEvent | React.MouseEvent,
    ) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }
      setOpen(value);
    };

    return(
        <>
        <AppBar>
            <Toolbar className={classes.customizeToolbar}>
                <Button  onClick={() => setOpen(true)}>
                  <MenuIcon color='secondary'/>
                </Button>
                <Typography variant="h6" className={classes.title}>
                    {props.title}
                </Typography>
            </Toolbar>
        </AppBar>
        <Drawer open={open} onClose={toggleDrawer(false)}>
          <div className={classes.drawer} onClick={() => setOpen(false)}>
              <Typography variant="h6" className={classes.title}>
                  {props.title}
              </Typography>
              {props.ButtonList}
          </div>
        </Drawer>
        </>
    )
}

export default TemplateBar;