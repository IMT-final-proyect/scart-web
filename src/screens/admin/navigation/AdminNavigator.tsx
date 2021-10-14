import React, { useState, useEffect } from 'react';

import { Button } from '@material-ui/core';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import BusinessIcon from '@mui/icons-material/Business';
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';
import PersonIcon from '@mui/icons-material/Person';
import { BrowserRouter, Route, Switch, Link, useLocation } from 'react-router-dom';

import TemplateBar from '../../../components/TemplateBar';
import { ROUTES } from './routes';
import useStyles from './styles';
import Home from '../home';
import contractors from '../contractors';
import drivers from '../drivers';
import vehicles from '../vehicles';
import auditar from '../auditar'
import DocumentDetails from '../../../components/documentDetails';
import contractorDetails from '../contractors/components/contractorDetails';
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
                    <BusinessIcon/>
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
                    <PersonIcon/>
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
                    <DirectionsCarFilledIcon/>
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
                    <FindInPageIcon/>
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
                <Route exact path={ROUTES.root+ROUTES.contractors+'/:id'} component={contractorDetails} />
                <Route exact path={ROUTES.root+ROUTES.drivers} component={drivers} />
                <Route exact path={ROUTES.root+ROUTES.vehicles} component={vehicles} />
                <Route exact path={ROUTES.root+ROUTES.audition} component={auditar} />
                <Route exact path={ROUTES.root+ROUTES.documentDetails+'/:id'} component={DocumentDetails} />
                <Route path={ROUTES.root} component={contractors} />
            </Switch>
        </BrowserRouter>
    )
}

export default AdminNavigator;