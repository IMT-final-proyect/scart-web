import React from 'react';
import { Button, Card, makeStyles, Theme } from "@material-ui/core"
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

import globalColors from "../../../../../utils/styles/globalColors" 
import { headerSize } from '../../../../../utils/constants';
import image from '../../../../assets/images/pratto.jpg'
import Vehicle from '../vehicleRow';
import Document from '../documentRow';


const autos = [
    {
        'id': '1',
        'brand': 'BMW',
        'model': '2015',
        'plate': 'DIC912',
    },
    {
        'id': '2',
        'brand': 'Ferrari',
        'model': '2020',
        'plate': 'LEC016',
    },
    {
        'id': '3',
        'brand': 'Aston Martin',
        'model': '2021',
        'plate': 'VET005',
    },
]

const document = [
    {
        'id':'1',
        'name':'Seguro',
        'expiration': '01/01/2022',
        'state':'Vigente'
    },
    {
        'id':'2',
        'name':'VTV',
        'expiration': '30/01/2022',
        'state':'Vigente'
    },
    {
        'id':'3',
        'name':'Habilitacion',
        'expiration': '04/05/2022',
        'state':'Vigente'
    },
]

const useStyles = makeStyles((theme: Theme) => ({
    container:{
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
                            <text className={classes.dataField}> brand: </text>
                            <text className={classes.data}> Mercedes Benz </text>
                        </div>
                        <div className={classes.dataContainer}>
                            <text className={classes.dataField}> model: </text>
                            <text className={classes.data}> W12 E 2021 </text>
                        </div>
                        <div className={classes.dataContainer}>
                            <text className={classes.dataField}> plate: </text>
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
                                brand
                            </text>
                            <text className={classes.headerText}>
                                model
                            </text>
                            <text className={classes.headerText}>
                                plate
                            </text>
                            <text className={classes.headerText}>
                                Acciones
                            </text>
                        </div>
                        {autos.map((auto) =>
                                <Vehicle 
                                    key={auto.id}
                                    brand={auto.brand}
                                    model={auto.model}
                                    plate={auto.plate}
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
                                name
                            </text>
                            <text className={classes.headerText}>
                                expiration
                            </text>
                            <text className={classes.headerText}>
                                state
                            </text>
                        </div>
                        {document.map((document) => 
                                <Document 
                                    key={document.id}
                                    name={document.name}
                                    expiration={document.expiration}
                                    state={document.state}
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