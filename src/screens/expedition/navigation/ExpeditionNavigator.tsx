import { useState } from 'react';

import { Button } from '@material-ui/core';
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';
import BusinessIcon from '@mui/icons-material/Business';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';

import TemplateBar from '../../../components/templateBar';
import { ROUTES } from './routes';
import useStyles from './styles'
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/rootReducer';
import Home from '../Home';
import ArrivalDetails from '../ArrivalDetails';
import Today from '../Today';

const ExpeditionNavigator = () => {
    const classes = useStyles();
    const [title, setTitle] = useState('Inicio');
    const user = useSelector((state: RootState) => state.user.userData?.name)

    const ButtonList = (
        <>
            <Button 
                className = {classes.button}
                component={Link}
                to={ROUTES.root+ROUTES.anounces}
                onClick={() => setTitle('Vehiculos en espera')}
            >
                <div className={classes.icon}>
                    <DirectionsCarFilledIcon/>
                </div>
                Vehiculos en espera
            </Button>
            <Button 
                className = {classes.button}
                component={Link}
                to={ROUTES.root+ROUTES.today}
                onClick={() => setTitle('Vehiculos en espera')}
            >
                <div className={classes.icon}>
                    <BusinessIcon/>
                </div>
                Anuncios del día
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
            <Route exact path={ROUTES.root+ROUTES.today} component={Today} />
            <Route exact path={ROUTES.root+ROUTES.anounces} component={Home} />
            <Route exact path={ROUTES.root+'/:id'} component={ArrivalDetails} />
            <Route path={ROUTES.root} component={Home} />
        </Switch>
    </BrowserRouter>
    )
}

export default ExpeditionNavigator;