import React from 'react';

import { Button, makeStyles, Theme } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import StarIcon from '@material-ui/icons/Star';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';

import TemplateBar from '../../../components/TemplateBar';
import { ROUTES } from './routes';
import Home from '../home';
import Resources from '../resources';
import DriverDetails from '../resources/components/driverDetails'
import VehicleDetails from '../resources/components/vehicleDetails'
import Documentation from '../documentation';

const useStyles = makeStyles((theme: Theme) => ({
    container:{
        paddingTop: '5%',
    },
    button: {
        textTransform: 'none',
        fontSize: 17,
        justifyContent: "flex-start",
        paddingLeft: '10%',
        paddingTop: '1%',
    },
    icon: {
        paddingTop: '3%',
        paddingRight: '5%',
    },
}));

const ContractorHome = () => {
    const classes = useStyles();
    const ButtonList = (
        <>
            <Button 
                className = {classes.button}
                component={Link}
                to={'/contratista'+ROUTES.home}
            >
                <div className={classes.icon}>
                    <HomeIcon/>
                </div>
                Home
            </Button>
            <Button 
                className = {classes.button}
                component={Link}
                to={'/contratista'+ROUTES.resources}
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
            >
                <div className={classes.icon}>
                    <InsertDriveFileIcon/>
                </div>
                Documentacion
            </Button>
        </>
    )

    return(
    <BrowserRouter>
        <TemplateBar
            title='Home'
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

export default ContractorHome;