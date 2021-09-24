import React, { useState, useEffect } from 'react';

import { Button } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import StarIcon from '@material-ui/icons/Star';
import { BrowserRouter, Route, Switch, Link, useLocation } from 'react-router-dom';

import TemplateBar from '../../../components/TemplateBar';
import { ROUTES } from './routes';
import useStyles from './styles';
import Home from '../home';
import contractors from '../contractors';

const AdminNavigator = () => {
    const classes = useStyles();
    const [title, setTitle] = useState('Admin');

    const ButtonList = (
        <>
            <Button 
                className = {classes.button}
                component={Link}
                to={ROUTES.root}
                onClick={() => setTitle("Home")}
            >
                <div className={classes.icon}>
                    <InsertDriveFileIcon/>
                </div>
                Home
            </Button>
            <Button 
                className = {classes.button}
                component={Link}
                to={ROUTES.root+ROUTES.contractors}
                onClick={() => setTitle("Contractor")}
            >
                <div className={classes.icon}>
                    <InsertDriveFileIcon/>
                </div>
                Contractors
            </Button>
        </>
    )

    return(
    <BrowserRouter>
        <TemplateBar
            title={title}
            ButtonList = {ButtonList}
        />
        <Switch>
            <Route exact path={ROUTES.root+ROUTES.contractors} component={contractors} />
            <Route path={ROUTES.root} component={Home} />
        </Switch>
    </BrowserRouter>
    )
}

export default AdminNavigator;