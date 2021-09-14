import React, { useState, useEffect } from 'react';

import { Button } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import StarIcon from '@material-ui/icons/Star';
import { BrowserRouter, Route, Switch, Link, useLocation } from 'react-router-dom';

import TemplateBar from '../../../components/TemplateBar';
import { ROUTES } from './routes';
import Home from '../home';
import Resources from '../resources';
import DriverDetails from '../resources/components/driverDetails'
import VehicleDetails from '../resources/components/vehicleDetails'
import Documentation from '../documentation';
import useStyles from './styles'

const ContractorNavigator = () => {
    const classes = useStyles();
    const [title, setTitle] = useState('Inicio');
    const location = useLocation()

    useEffect(() => {
        if(location.pathname.includes('home'))
            setTitle('Inicio')
        else if(location.pathname.includes('recursos'))
            setTitle('Recursos')
            else if(location.pathname.includes('documentacion'))
                setTitle('Documentación')
        
    }, [])

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
                    <StarIcon/>
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
            title={title}
            ButtonList = {ButtonList}
        />
        <Switch>
            <Route exact path={ROUTES.root+ROUTES.home} component={Home} />
            <Route exact path={ROUTES.root+ROUTES.resources} component={Resources} />
            <Route exact path={ROUTES.root+ROUTES.documentacion} component={Documentation} />
            <Route exact path={ROUTES.root+ROUTES.driver} component={DriverDetails} />
            <Route exact path={ROUTES.root+ROUTES.vehicle} component={VehicleDetails} />
            <Route path={ROUTES.root} component= {Home} />
        </Switch>
    </BrowserRouter>
    )
}

export default ContractorNavigator;