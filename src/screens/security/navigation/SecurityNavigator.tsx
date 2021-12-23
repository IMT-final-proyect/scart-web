import React, { useState } from 'react';

import { Button } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';

import TemplateBar from '../../../components/templateBar';
import { ROUTES } from './routes';
import useStyles from './styles'
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/rootReducer';
import Home from '../Home';
import EntityDetails from '../EntityDetails';
import Scanner from '../Scanner';

const SecurityNavigation = () => {
    const classes = useStyles();
    const [title, setTitle] = useState('Inicio');
    const user = useSelector((state: RootState) => state.user.userData?.name)

    const ButtonList = (
        <>
            <Button 
                className = {classes.button}
                component={Link}
                to={ROUTES.root}
                onClick={() => setTitle("Inicio")}
            >
                <div className={classes.icon}>
                    <HomeIcon/>
                </div>
                Inicio
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
            <Route exact path={ROUTES.root+ROUTES.details} component={EntityDetails} />
            <Route exact path={ROUTES.root+ROUTES.scanner} component={Scanner} />
            <Route path={ROUTES.root} component={Home} />
        </Switch>
    </BrowserRouter>
    )
}

export default SecurityNavigation;