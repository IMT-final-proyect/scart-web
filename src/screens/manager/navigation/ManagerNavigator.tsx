import React from 'react';

import { Button, makeStyles, Theme } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import StarIcon from '@material-ui/icons/Star';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';

import TemplateBar from '../../../components/TemplateBar';
import { ROUTES } from './routes';
import Exceptions from '../exceptions';
import Reports from '../reports';

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

const ManagerNavigator = () => {
    const classes = useStyles();
    const ButtonList = (
        <>
            <Button 
                className = {classes.button}
                component={Link}
                to={ROUTES.root+ROUTES.excepciones}
            >
                <div className={classes.icon}>
                    <HomeIcon/>
                </div>
                Excepciones
            </Button>
            <Button 
                className = {classes.button}
                component={Link}
                to={ROUTES.root+ROUTES.reportes}
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
            title='Excepciones'
            ButtonList = {ButtonList}
        />
        <Switch>
            <Route exact path={ROUTES.root+ROUTES.excepciones} component={Exceptions} />
            <Route exact path={ROUTES.root+ROUTES.reportes} component={Reports} />
            <Route path={ROUTES.root} component= {Exceptions} />
        </Switch>
    </BrowserRouter>
    )
}

export default ManagerNavigator;
