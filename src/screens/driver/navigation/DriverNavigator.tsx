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
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import ArticleIcon from '@mui/icons-material/Article';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import MyData from '../MyData';
import MyDocuments from '../MyDocuments';
import DocumentDetails from '../../../components/documentDetails';
import MyVehicles from '../MyVehicles';
import VehicleDetails from '../MyVehicles/components/vehicleDetails';

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
                onClick={() => setTitle('Conductor')}
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
                 Mi QR
            </Button>
            <Button 
                className = {classes.button}
                component={Link}
                to={ROUTES.root+ROUTES.myData}
                onClick={() => setTitle("Mis Datos")}
            >
                <div className={classes.icon}>
                    <AssignmentIndIcon/>
                </div>
                Mis Datos
            </Button>
            <Button 
                className = {classes.button}
                component={Link}
                to={ROUTES.root+ROUTES.myDocuments}
                onClick={() => setTitle("Mis Documentos")}
            >
                <div className={classes.icon}>
                    <ArticleIcon/>
                </div>
                Mis Documentos
            </Button>
            <Button 
                className = {classes.button}
                component={Link}
                to={ROUTES.root+ROUTES.myVehicles}
                onClick={() => setTitle("Mis Vehiculos")}
            >
                <div className={classes.icon}>
                    <DirectionsCarIcon/>
                </div>
                Mis Vehiculos
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
            <Route exact path={ROUTES.root+ROUTES.myData} component={MyData} />
            <Route exact path={ROUTES.root+ROUTES.myDocuments} component={MyDocuments} />
            <Route exact path={ROUTES.root+ROUTES.documentDetails+'/:id'} component={DocumentDetails} />
            <Route exact path={ROUTES.root+ROUTES.myVehicles} component={MyVehicles} />
            <Route exact path={ROUTES.root+ROUTES.myVehicles+'/:id'} component={VehicleDetails} />

        </Switch>
    </BrowserRouter>
    )
}

export default DriverNavigation;