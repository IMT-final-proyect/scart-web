import React, { useState } from 'react';

import { Button } from '@material-ui/core';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import BusinessIcon from '@mui/icons-material/Business';
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';
import PersonIcon from '@mui/icons-material/Person';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';

import TemplateBar from '../../../components/templateBar';
import { ROUTES } from './routes';
import useStyles from './styles';
import contractors from '../contractors';
import drivers from '../drivers';
import vehicles from '../vehicles';
import audition from '../audition'
import DocumentDetails from '../documentDetails'
import contractorDetails from '../contractors/components/contractorDetails';
import DriverDetails from '../drivers/components/driverDetails';
import VehicleDetails from '../vehicles/components/vehicleDetails';
const AdminNavigator = () => {
    const classes = useStyles();
    const [title, setTitle] = useState('Contratistas');

    const ButtonList = (
        <>
            <Button 
                className = {classes.button}
                component={Link}
                to={ROUTES.root+ROUTES.contractors}
                onClick={() => setTitle("Contratistas")}
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
                <Route exact path={ROUTES.root+ROUTES.drivers+'/:id'} component={DriverDetails} />
                <Route exact path={ROUTES.root+ROUTES.vehicles} component={vehicles} />
                <Route exact path={ROUTES.root+ROUTES.vehicles+'/:id'} component={VehicleDetails} />
                <Route exact path={ROUTES.root+ROUTES.audition} component={audition} />
                <Route exact path={ROUTES.root+ROUTES.documentDetails+'/:id'} component={DocumentDetails} />
                <Route path={ROUTES.root} component={contractors} />
            </Switch>
        </BrowserRouter>
    )
}

export default AdminNavigator;