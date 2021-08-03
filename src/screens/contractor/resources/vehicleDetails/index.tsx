import React from 'react';
import { Button, Card, makeStyles, Theme } from "@material-ui/core"
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

import globalColors from "../../../../utils/styles/globalColors" 
import { drawerWidth, headerSize } from '../../../../utils/constants';
import image from '../../../../assets/images/pratto.jpg'
import Vehicle from '../components/vehicleRow';
import Document from '../components/documentRow';


const autos = [
    {
        'id': '1',
        'marca': 'BMW',
        'modelo': '2015',
        'patente': 'DIC912',
    },
    {
        'id': '2',
        'marca': 'Ferrari',
        'modelo': '2020',
        'patente': 'LEC016',
    },
    {
        'id': '3',
        'marca': 'Aston Martin',
        'modelo': '2021',
        'patente': 'VET005',
    },
]

const document = [
    {
        'id':'1',
        'nombre':'Seguro',
        'vigencia': '01/01/2022',
        'estado':'Vigente'
    },
    {
        'id':'2',
        'nombre':'VTV',
        'vigencia': '30/01/2022',
        'estado':'Vigente'
    },
    {
        'id':'3',
        'nombre':'Habilitacion',
        'vigencia': '04/05/2022',
        'estado':'Vigente'
    },
]

const useStyles = makeStyles((theme: Theme) => ({
    container:{
        marginLeft: drawerWidth,
    },
    cardContainer:{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        marginRight: '3%',
        marginLeft: '3%',
    },
    topCardContainer:{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        marginTop: '5%',
        marginRight: '3%',
        marginLeft: '3%',
        paddingTop: '1%',
    },
    botCardContainer:{
        display: 'flex',
        flex: 1,
        marginTop: '1%',
        marginRight: '3%',
        marginLeft: '3%',
        marginBottom: '3%'
    },
    dataContainer:{
        marginBottom: '1%',
        marginLeft: '1%'
    },
    leftData:{
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
    },
    rightData:{
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        marginLeft: '40%',
    },
    dataFieldContainer:{
        display: 'flex',
        flexDirection: 'column'
    },
    dataField:{
        marginBottom: '10%',
        color: globalColors.darkGrey
    },
    data:{
        marginLeft: '5%',
        fontWeight: 'bold'
    },
    imageContainer:{
        marginLeft: '5%',
        marginTop: '2%'
    },
    image:{
        borderRadius: '50%',
        height: 100,
    },
    titleContainer:{
        display: 'flex',
        flex:1,
        justifyContent: 'space-between',

    },
    textTitle:{
        fontSize:20,
        marginTop: '3%',
        marginBottom: '3%',
        marginLeft: '3%',
    },
    header:{
        display: 'flex',
        flex:1,
        justifyContent: 'space-between',
        marginLeft: '3%',
        marginRight: '3%',
    },
    headerText:{
        color: globalColors.darkGrey,
        fontSize: 12,
    },
    footer:{
        display: 'flex',
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    footerText:{
        marginLeft: '5%',
    },
    arrowsContainer:{
        marginRight: '3%',
    },
}));

const VehicleDetails = () => {
    const classes = useStyles();

    const handleBackward = () => {

    }
    const handleFoward = () => {

    }

    const footer = (
        <div className={classes.footer}>
            <text className={classes.footerText}>1-5 of 13</text>
            <div className={classes.arrowsContainer}>
                <Button onClick={handleBackward}>
                    <ArrowBackIosIcon />
                </Button>
                <Button onClick={handleFoward}>
                    <ArrowForwardIosIcon />
                </Button>
            </div>
        </div>
    )

    return (
        <div className={classes.container}>
            <Card className={classes.cardContainer}>
                <Card className={classes.topCardContainer}>
                    <div className={classes.dataFieldContainer}>
                        <div className={classes.dataContainer}>
                            <text className={classes.dataField}> Marca: </text>
                            <text className={classes.data}> Mercedes Benz </text>
                        </div>
                        <div className={classes.dataContainer}>
                            <text className={classes.dataField}> Modelo: </text>
                            <text className={classes.data}> W12 E 2021 </text>
                        </div>
                        <div className={classes.dataContainer}>
                            <text className={classes.dataField}> Patente: </text>
                            <text className={classes.data}> 111 ADDD 1111 </text>
                        </div>
                    </div>
                </Card>
                <div className={classes.botCardContainer}>
                    <Card className={classes.cardContainer}>
                        <div className={classes.titleContainer}>
                            <text className={classes.textTitle}>
                                Conductores
                            </text>
                        </div>
                        <div className={classes.header}>
                            <text className={classes.headerText}>
                                Marca
                            </text>
                            <text className={classes.headerText}>
                                Modelo
                            </text>
                            <text className={classes.headerText}>
                                Patente
                            </text>
                            <text className={classes.headerText}>
                                Acciones
                            </text>
                        </div>
                        {autos.map((auto) =>
                                <Vehicle 
                                    key={auto.id}
                                    brand={auto.marca}
                                    model={auto.modelo}
                                    plate={auto.patente}
                                />)
                        }
                        {footer}
                    </Card>
                    <Card className={classes.cardContainer}>
                    <div className={classes.titleContainer}>
                            <text className={classes.textTitle}>
                                Documentos
                            </text>
                        </div>
                        <div className={classes.header}>
                            <text className={classes.headerText}>
                                Nombre
                            </text>
                            <text className={classes.headerText}>
                                Vigencia
                            </text>
                            <text className={classes.headerText}>
                                Estado
                            </text>
                        </div>
                        {document.map((document) => 
                                <Document 
                                    key={document.id}
                                    document={document}
                                />)
                        }
                        {footer}
                    </Card>
                </div>
            </Card>
        </div>
    )
}

export default VehicleDetails;