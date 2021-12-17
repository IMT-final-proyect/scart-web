import React, { useState, useEffect } from 'react';

import { Button } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import DriveEtaIcon from '@mui/icons-material/DriveEta';
import { BrowserRouter, Route, Switch, Link, useLocation } from 'react-router-dom';
import TemplateBar from '../../../components/templateBar';
import { ROUTES } from './routes';
import Home from '../home';
import Resources from '../resources';
import DriverDetails from '../resources/components/driverDetails'
import VehicleDetails from '../resources/components/vehicleDetails'
import Documentation from '../documentation';
import useStyles from './styles'
import DocumentDetails from '../../../components/documentDetails';
import InvalidDrivers from '../home/invalidDrivers';
import InvalidVehicles from '../home/invalidVehicles';
import PendingVehicles from '../home/pendingVehicles';
import PendingDrivers from '../home/pendingDrivers';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/rootReducer';


const ContractorNavigator = () => {
    const classes = useStyles();
    const [title, setTitle] = useState('Inicio');
    const location = useLocation()
    const user = useSelector((state: RootState) => state.user.userData?.name)

    useEffect(() => {
        if(location.pathname.includes('home'))
            setTitle('Inicio')
        else if(location.pathname.includes('recursos'))
            setTitle('Recursos')
            else if(location.pathname.includes('documentacion'))
                setTitle('Documentación')
        
    }, [location.pathname])

    const ButtonList = (
        <>
            <Button 
                className = {classes.button}
                component={Link}
                to={ROUTES.root+ROUTES.home}
                onClick={() => setTitle("Inicio")}
            >
                <div className={classes.icon}>
                    <HomeIcon/>
                </div>
                Inicio
            </Button>
            <Button 
                className = {classes.button}
                component={Link}
                to={ROUTES.root+ROUTES.resources}
                onClick={() => setTitle("Recursos")}
            >
                <div className={classes.icon}>
                    <DriveEtaIcon/>
                </div>
                Recursos
            </Button>
            <Button 
                className = {classes.button}
                component={Link}
                to={'/contratista'+ROUTES.documentacion}
                onClick={() => setTitle("Documentación")}
            >
                <div className={classes.icon}>
                    <InsertDriveFileIcon/>
                </div>
                Documentación
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
            <Route exact path={ROUTES.root+ROUTES.home} component={Home} />
            <Route exact path={ROUTES.root+ROUTES.home+ROUTES.invalidDrivers} component={InvalidDrivers} />
            <Route exact path={ROUTES.root+ROUTES.home+ROUTES.pendingDrivers} component={PendingDrivers} />
            <Route exact path={ROUTES.root+ROUTES.home+ROUTES.invalidVehicles} component={InvalidVehicles} />
            <Route exact path={ROUTES.root+ROUTES.home+ROUTES.pendingVehicles} component={PendingVehicles} />
            <Route exact path={ROUTES.root+ROUTES.resources} component={Resources} />
            <Route exact path={ROUTES.root+ROUTES.documentacion} component={Documentation} />
            <Route exact path={ROUTES.root+ROUTES.driver+'/:id'} component={DriverDetails} />
            <Route exact path={ROUTES.root+ROUTES.vehicle+'/:id'} component={VehicleDetails} />
            <Route exact path={ROUTES.root+ROUTES.documentacion+'/:id'} component={DocumentDetails} />
            <Route path={ROUTES.root} component= {Home} />
        </Switch>
    </BrowserRouter>
    )
}

export default ContractorNavigator;