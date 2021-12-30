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
import QRGenerator from '../QRGenerator';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';

const DriverNavigation = () => {
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
            <Button 
                className = {classes.button}
                component={Link}
                to={ROUTES.root+ROUTES.QR}
                onClick={() => setTitle("Código QR")}
            >
                <div className={classes.icon}>
                    <QrCodeScannerIcon/>
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
            <Route exact path={ROUTES.root} component={Home} />
            <Route exact path={ROUTES.root+ROUTES.QR} component={QRGenerator} />
        </Switch>
    </BrowserRouter>
    )
}

export default DriverNavigation;