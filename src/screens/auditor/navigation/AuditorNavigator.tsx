import React, { useState } from 'react';

import { Button } from '@material-ui/core';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';
import AirlineSeatReclineExtraIcon from '@mui/icons-material/AirlineSeatReclineExtra';

import TemplateBar from '../../../components/templateBar';
import { ROUTES } from './routes';
import Documentation from '../documentation';
import useStyles from './styles'
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/rootReducer';
import driversScreen from '../../../components/driversScreen';
import vehiclesScreen from '../../../components/vehiclesScreen';
import DriverDetails from '../../../components/driversScreen/components/driverDetails';
import VehicleDetails from '../../../components/vehiclesScreen/components/vehicleDetails';
import DocumentDetails from '../../../components/documentDetails';
import Evaluation from '../evaluation';

const AuditorNavigation = () => {
    const classes = useStyles();
    const [title, setTitle] = useState('Auditor');
    const user = useSelector((state: RootState) => state.user?.accountData?.username)

    const ButtonList = (
        <>
            <Button 
                className = {classes.button}
                component={Link}
                to={ROUTES.root+ROUTES.home}
            >
                <div className={classes.icon}>
                    <InsertDriveFileIcon/>
                </div>
                Documentación
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
            <Route exact path={ROUTES.root+ROUTES.home+'/:id'} component={Evaluation} />
            <Route exact path={ROUTES.root+ROUTES.drivers} component={driversScreen} />
            <Route exact path={ROUTES.root+ROUTES.vehicles} component={vehiclesScreen} />
            <Route exact path={ROUTES.root+ROUTES.drivers+'/:id'} component={DriverDetails} />
            <Route exact path={ROUTES.root+ROUTES.vehicles+'/:id'} component={VehicleDetails} />
            <Route exact path={ROUTES.root+ROUTES.document+'/:id'} component={DocumentDetails} />
            <Route path={ROUTES.root+ROUTES.home} component={Documentation} />
        </Switch>
    </BrowserRouter>
    )
}

export default AuditorNavigation;