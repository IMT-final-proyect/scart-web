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
import drivers from '../drivers';
import vehicles from '../vehicles';
import auditar from '../auditar'
import DocumentDetails from '../documentDetails';
const AdminNavigator = () => {
    const classes = useStyles();
    const [title, setTitle] = useState('Admin');

    const ButtonList = (
        <>
            {/* <Button 
                className = {classes.button}
                component={Link}
                to={ROUTES.root}
                onClick={() => setTitle("Home")}
            >
                <div className={classes.icon}>
                    <InsertDriveFileIcon/>
                </div>
                Home
            </Button> */}
            <Button 
                className = {classes.button}
                component={Link}
                to={ROUTES.root+ROUTES.contractors}
                onClick={() => setTitle("Contratista")}
            >
                <div className={classes.icon}>
                    <InsertDriveFileIcon/>
                </div>
                Contratistas
            </Button>
            <Button 
                className = {classes.button}
                component={Link}
                to={ROUTES.root+ROUTES.drivers}
                onClick={() => setTitle("Conductores")}
            >
                <div className={classes.icon}>
                    <InsertDriveFileIcon/>
                </div>
                Conductores
            </Button>
            <Button 
                className = {classes.button}
                component={Link}
                to={ROUTES.root+ROUTES.vehicles}
                onClick={() => setTitle("Vehiculos")}
            >
                <div className={classes.icon}>
                    <InsertDriveFileIcon/>
                </div>
                Vehiculos
            </Button>
            <Button 
                className = {classes.button}
                component={Link}
                to={ROUTES.root+ROUTES.audition}
                onClick={() => setTitle("Auditar")}
            >
                <div className={classes.icon}>
                    <InsertDriveFileIcon/>
                </div>
                Auditar
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
                <Route exact path={ROUTES.root+ROUTES.drivers} component={drivers} />
                <Route exact path={ROUTES.root+ROUTES.vehicles} component={vehicles} />
                <Route exact path={ROUTES.root+ROUTES.audition} component={auditar} />
                <Route exact path={ROUTES.root+ROUTES.audition+'/:id'} component={DocumentDetails} />
                <Route path={ROUTES.root} component={contractors} />
            </Switch>
        </BrowserRouter>
    )
}

export default AdminNavigator;