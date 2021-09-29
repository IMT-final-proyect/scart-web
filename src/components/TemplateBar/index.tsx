import React, { useState } from 'react';
import { AppBar, Button, Drawer, Toolbar, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';


import useStyles from './styles'
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/userSlice';
import { useHistory } from 'react-router-dom';

interface Props {
    title: string;
    ButtonList: React.ReactNode;
}

const TemplateBar = (props : Props) => {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);

    const handleLogout = () => {
      dispatch(logout())
      history.push('/login')
      window.location.reload(true);
    }

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
                <Button onClick={handleLogout}>
                  <MeetingRoomIcon  color='secondary'/>
                  <Typography variant="h6" className={classes.salir}>
                    Salir
                  </Typography>
                </Button>
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