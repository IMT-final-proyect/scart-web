import React, { useState } from 'react';

import { Button } from '@material-ui/core';
import AirlineSeatReclineExtraIcon from '@mui/icons-material/AirlineSeatReclineExtra';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';

import TemplateBar from '../../../components/templateBar';
import { ROUTES } from './routes';
import useStyles from './styles'
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/rootReducer';
import EntityDetails from '../EntityDetails';
import Scanner from '../Scanner';
import DriversInside from '../../../components/DriversInside';

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
                    <AirlineSeatReclineExtraIcon/>
                </div>
                Conductores en planta
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
            <Route path={ROUTES.root} component={DriversInside} />
        </Switch>
    </BrowserRouter>
    )
}

export default SecurityNavigation;