import { useState } from 'react';

import { Button } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';

import TemplateBar from '../../../components/templateBar';
import { ROUTES } from './routes';
import useStyles from './styles'
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/rootReducer';
import Home from '../Home';
import ArrivalDetails from '../ArrivalDetails';

const ExpeditionNavigator = () => {
    const classes = useStyles();
    const [title, setTitle] = useState('Inicio');
    const user = useSelector((state: RootState) => state.user.userData?.name)

    const ButtonList = (
        <>
            <Button 
                className = {classes.button}
                component={Link}
                to={ROUTES.root}
                onClick={() => setTitle('Vehiculos en espera')}
            >
                <div className={classes.icon}>
                    <HomeIcon/>
                </div>
                Vehiculos en espera
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
            <Route exact path={ROUTES.root+'/:id'} component={ArrivalDetails} />
            <Route path={ROUTES.root} component={Home} />
        </Switch>
    </BrowserRouter>
    )
}

export default ExpeditionNavigator;