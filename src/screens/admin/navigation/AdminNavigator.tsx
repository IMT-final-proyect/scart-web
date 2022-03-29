import React, { useState } from 'react';

import { Button } from '@material-ui/core';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import BusinessIcon from '@mui/icons-material/Business';
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';
import AirlineSeatReclineExtraIcon from '@mui/icons-material/AirlineSeatReclineExtra';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import GroupIcon from '@mui/icons-material/Group';
import TemplateBar from '../../../components/templateBar';
import { ROUTES } from './routes';
import useStyles from './styles';
import contractors from '../contractors';
import audition from '../audition'
import DocumentDetails from '../documentDetails'
import contractorDetails from '../contractors/components/contractorDetails';
import DriverDetails from '../../../components/driversScreen/components/driverDetails';
import VehicleDetails from '../../../components/vehiclesScreen/components/vehicleDetails';
import AuditionDetails from '../audition/components/auditionDetails'
import users from '../users'
import UserDetails from '../users/components/UserDetails';
import driversScreen from '../../../components/driversScreen';
import vehiclesScreen from '../../../components/vehiclesScreen';
const AdminNavigator = () => {
    const classes = useStyles();
    const [title, setTitle] = useState('Administrador');

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
                    <AirlineSeatReclineExtraIcon/>
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
            <Button 
                className = {classes.button}
                component={Link}
                to={ROUTES.root+ROUTES.users}
                onClick={() => setTitle("Usuarios")}
            >
                <div className={classes.icon}>
                    <GroupIcon/>
                </div>
                Usuarios
            </Button>
        </>
    )

    return(
        <BrowserRouter>
            <TemplateBar
                user='Admin'
                title={title}
                ButtonList = {ButtonList}
            />
            <Switch>
                <Route exact path={ROUTES.root+ROUTES.contractors} component={contractors} />
                <Route exact path={ROUTES.root+ROUTES.contractors+'/:id'} component={contractorDetails} />
                <Route exact path={ROUTES.root+ROUTES.drivers} component={driversScreen} />
                <Route exact path={ROUTES.root+ROUTES.drivers+'/:id'} component={DriverDetails} />
                <Route exact path={ROUTES.root+ROUTES.vehicles} component={vehiclesScreen} />
                <Route exact path={ROUTES.root+ROUTES.vehicles+'/:id'} component={VehicleDetails} />
                <Route exact path={ROUTES.root+ROUTES.audition} component={audition} />
                <Route exact path={ROUTES.root+ROUTES.audition+'/:id'} component={AuditionDetails} />
                <Route exact path={ROUTES.root+ROUTES.documentDetails+'/:id'} component={DocumentDetails} />
                <Route exact path={ROUTES.root+ROUTES.manager+'/:id'} component={UserDetails} />
                <Route exact path={ROUTES.root+ROUTES.auditor+'/:id'} component={UserDetails} />
                <Route exact path={ROUTES.root+ROUTES.security+'/:id'} component={UserDetails} />
                <Route exact path={ROUTES.root+ROUTES.users} component={users} />
                
                <Route path={ROUTES.root} component={contractors} />
            </Switch>
        </BrowserRouter>
    )
}

export default AdminNavigator;