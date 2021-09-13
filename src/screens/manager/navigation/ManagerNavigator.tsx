import React, { useState, useEffect } from 'react';

import { Button } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import StarIcon from '@material-ui/icons/Star';
import { BrowserRouter, Route, Switch, Link, useLocation } from 'react-router-dom';

import TemplateBar from '../../../components/TemplateBar';
import { ROUTES } from './routes';
import Exceptions from '../exceptions';
import Reports from '../reports';
import useStyles from './styles';

const ManagerNavigator = () => {
    const classes = useStyles();
    const [title, setTitle] = useState('');
    const location = useLocation()

    useEffect(() => {
        if(location.pathname.includes('excepciones'))
            setTitle('Excepciones')
        else if(location.pathname.includes('reportes'))
            setTitle('Reportes')
        
    }, [])
    const ButtonList = (
        <>
            <Button 
                className = {classes.button}
                component={Link}
                to={ROUTES.root+ROUTES.excepciones}
                onClick={() => setTitle("Excepciones")}
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
            title={title}
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
