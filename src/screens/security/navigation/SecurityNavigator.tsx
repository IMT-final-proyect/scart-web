import React, { useState } from 'react';

import { Button } from '@material-ui/core';
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';
import AirlineSeatReclineExtraIcon from '@mui/icons-material/AirlineSeatReclineExtra';
import EmojiTransportationIcon from '@mui/icons-material/EmojiTransportation';
import BusinessIcon from '@mui/icons-material/Business';

import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';

import TemplateBar from '../../../components/templateBar';
import { ROUTES } from './routes';
import useStyles from './styles'
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/rootReducer';
import DriversInside from '../../../components/DriversInside';
import driversScreen from '../../../components/driversScreen';
import vehiclesScreen from '../../../components/vehiclesScreen';
import DriverDetails from '../../../components/driversScreen/components/driverDetails';
import VehicleDetails from '../../../components/vehiclesScreen/components/vehicleDetails';
import contractorDetails from '../../../components/contractorsScreen/components/contractorDetails';
import DocumentDetails from '../../../components/documentDetails';
import contractors from '../../../components/contractorsScreen';

const SecurityNavigation = () => {
    const classes = useStyles();
    const [title, setTitle] = useState('Conductores en planta');
    const user = useSelector((state: RootState) => state.user.accountData?.username)

    const ButtonList = (
        <>
            <Button 
                className = {classes.button}
                component={Link}
                to={ROUTES.root}
                onClick={() => setTitle("Conductores en planta")}
            >
                <div className={classes.icon}>
                    <EmojiTransportationIcon/>
                </div>
                Conductores en planta
            </Button>
            <Button 
                className = {classes.button}
                component={Link}
                to={ROUTES.root+ROUTES.drivers}
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
            <Route exact path={ROUTES.root+ROUTES.drivers} component={driversScreen} />
            <Route exact path={ROUTES.root+ROUTES.drivers+'/:id'} component={DriverDetails} />
            <Route exact path={ROUTES.root+ROUTES.vehicles} component={vehiclesScreen} />
            <Route exact path={ROUTES.root+ROUTES.vehicles+'/:id'} component={VehicleDetails} />
            <Route exact path={ROUTES.root+ROUTES.contractors} component={contractors} />
            <Route exact path={ROUTES.root+ROUTES.contractors+'/:id'} component={contractorDetails} />
            <Route exact path={ROUTES.root+ROUTES.document+'/:id'} component={DocumentDetails} />
            <Route path={ROUTES.root} component={DriversInside} />
        </Switch>
    </BrowserRouter>
    )
}

export default SecurityNavigation;