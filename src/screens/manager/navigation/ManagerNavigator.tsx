import React, { useState, useEffect } from 'react';

import { Button } from '@material-ui/core';
import { useSelector } from 'react-redux';
import BusAlertIcon from '@mui/icons-material/BusAlert';
import StarIcon from '@material-ui/icons/Star';
import { BrowserRouter, Route, Switch, Link, useLocation } from 'react-router-dom';
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';
import AirlineSeatReclineExtraIcon from '@mui/icons-material/AirlineSeatReclineExtra';
import BusinessIcon from '@mui/icons-material/Business';

import TemplateBar from '../../../components/templateBar';
import { ROUTES } from './routes';
import Exceptions from '../../../components/exceptionsScreen';
import Reports from '../reports';
import useStyles from './styles';
import { RootState } from '../../../redux/rootReducer';
import ExceptionDetails from '../../../components/exceptionDetails';
import driversScreen from '../../../components/driversScreen';
import DriverDetails from '../../../components/driversScreen/components/driverDetails';
import vehiclesScreen from '../../../components/vehiclesScreen';
import VehicleDetails from '../../../components/vehiclesScreen/components/vehicleDetails';
import contractors from '../../../components/contractorsScreen';
import contractorDetails from '../../../components/contractorsScreen/components/contractorDetails';
import DocumentDetails from '../../../components/documentDetails';

const ManagerNavigator = () => {
    const classes = useStyles();
    const [title, setTitle] = useState('Excepciones');
    const location = useLocation()
    const user = useSelector((state: RootState) => state.user.accountData?.username)

    useEffect(() => {
        if(location.pathname.includes('excepciones'))
            setTitle('Excepciones')
        else if(location.pathname.includes('reportes'))
            setTitle('Reportes')
        
    }, [location.pathname])
    const ButtonList = (
        <>
            <Button 
                className = {classes.button}
                component={Link}
                to={ROUTES.root+ROUTES.exceptions}
                onClick={() => setTitle("Excepciones")}
            >
                <div className={classes.icon}>
                    <BusAlertIcon/>
                </div>
                Excepciones
            </Button>
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
                to={ROUTES.root+ROUTES.reports}
                onClick={() => setTitle("Reportes")}
            >
                <div className={classes.icon}>
                    <StarIcon/>
                </div>
                Reportes
            </Button>
        </>
    )

    return(
    <BrowserRouter>
        <TemplateBar
            user={user}
            title={title}
            ButtonList = {ButtonList}
        />
        <Switch>
            <Route exact path={ROUTES.root+ROUTES.exceptions} component={Exceptions} />
            <Route exact path={ROUTES.root+ROUTES.exceptions+'/:id/:driverId/:vehicleId/:securityId'} component={ExceptionDetails} />
            <Route exact path={ROUTES.root+ROUTES.drivers} component={driversScreen} />
            <Route exact path={ROUTES.root+ROUTES.drivers+'/:id'} component={DriverDetails} />
            <Route exact path={ROUTES.root+ROUTES.vehicles} component={vehiclesScreen} />
            <Route exact path={ROUTES.root+ROUTES.vehicles+'/:id'} component={VehicleDetails} />
            <Route exact path={ROUTES.root+ROUTES.contractors} component={contractors} />
            <Route exact path={ROUTES.root+ROUTES.contractors+'/:id'} component={contractorDetails} />
            <Route exact path={ROUTES.root+ROUTES.document+'/:id'} component={DocumentDetails} />
            <Route exact path={ROUTES.root+ROUTES.reports} component={Reports} />
            <Route path={ROUTES.root} component= {Exceptions} />
        </Switch>
    </BrowserRouter>
    )
}

export default ManagerNavigator;
