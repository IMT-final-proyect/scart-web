import React, { useState } from 'react';
import { AppBar, Button, Drawer, Grid, Hidden, Toolbar, Typography, } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import { version } from '../../../package.json'
import logo from '../../assets/images/logo_transparent.png';
import useStyles from './styles';
import { useDispatch } from 'react-redux';
import { postLogout } from '../../redux/slices/userSlice';
import { useHistory } from 'react-router-dom';
import { ROUTES } from '../../routes/routes';

interface Props {
    user?: string;
    title: string;
    ButtonList: React.ReactNode;
}

const TemplateBar = (props : Props) => {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);

    const handleLogout = () => {
      dispatch({type: postLogout})
      history.push(ROUTES.login)
      window.location.reload();
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
        <Grid>
          <AppBar>
              <Toolbar className={classes.customizeToolbar}>
                <Grid container justifyContent='space-between' alignItems='center'>
                  <Grid item xs={2}>
                    <Button  onClick={() => setOpen(true)}>
                      <MenuIcon color='secondary'/>
                      <Hidden mdDown>
                        <Typography variant="h6" className={classes.user} color='secondary'>
                            {props.user}
                        </Typography>
                      </Hidden>
                    </Button>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant="h6" className={classes.title} color='secondary'>
                        {props.title}
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Grid container justifyContent='flex-end'>
                      <Button onClick={handleLogout}>
                        <MeetingRoomIcon  color='secondary'/>
                        <Typography variant="h6" className={classes.salir}>
                          Salir
                        </Typography>
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Toolbar>
          </AppBar>
          <Drawer open={open} onClose={toggleDrawer(false)}>
            <Grid container className={classes.drawer} direction='column' onClick={() => setOpen(false)}>
              <Grid item>
                <Typography variant="h6" className={classes.title}>
                    {props.title}
                </Typography>
                {props.ButtonList}
              </Grid>
              <Grid item className={classes.textContainer}>
                <img src={logo} alt={'Logo'} className={classes.image}/>
                <Typography className={classes.text}>
                  Version {version}
                </Typography>
              </Grid>
            </Grid>
          </Drawer>
        </Grid>
    )
}

export default TemplateBar;