import React from 'react';
import { Button, Grid, } from '@material-ui/core';
import useStyles from './styles';
import { Link } from 'react-router-dom';
import { IArrival } from '../../../../../utils/interfaces';
import moment from 'moment';
import globalColors from '../../../../../utils/styles/globalColors';

interface Props{
    index: number
    arrival: IArrival
    route: string
    markAsRead: (id: number) => void
}
const ArrivalRow = ({ index, arrival, route, markAsRead }: Props) => {
    const classes = useStyles();
    const driver = JSON.parse(arrival.driver)
    const vehicle = JSON.parse(arrival.vehicle)
    return(
        <Grid container className={classes.container} style={{backgroundColor: (index % 2) == 0 ? globalColors.grey : globalColors.white}} direction="row" justifyContent='space-between'>
            <Grid item xs={2} className={classes.text}>
                <text> {driver.name.length > 60 ? driver.name.substring(0, 87)+'...' : driver.name}</text>
            </Grid>
            <Grid item xs={1} className={classes.text}>
                <text> {driver.phone} </text>
            </Grid>
            <Grid item xs={1} className={classes.text}>
                <text> {vehicle.plate.length > 60 ? vehicle.plate.substring(0, 87)+'...' : vehicle.plate} </text>
            </Grid>
            <Grid item xs={1} className={classes.text}>
                <text> {vehicle.type} </text>
            </Grid>
            <Grid item xs={1} className={classes.text}>
                <text> {arrival.contractor.length > 60 ? arrival.contractor.substring(0, 87)+'...' : arrival.contractor} </text>
            </Grid>
            <Grid item xs={1} className={classes.text}>
                <text> {arrival.palletsEntrada} </text>
            </Grid>
            <Grid item xs={1}>
                <text>{moment(arrival.arrivalTime).format('DD/MM/yy - HH:mm')} hs</text>
            </Grid>
            <Grid item xs={1} className={classes.text}>
                {(!arrival.exception || arrival.exception?.result === 0) ?
                    <text className={classes.stateColor} style={{backgroundColor: globalColors.green}}>Válida</text>
                :
                    <text className={classes.stateColor} style={{backgroundColor: globalColors.red}}>Inválida</text>
                }
            </Grid>
            <Grid item xs={2} className={classes.container}>
                {!!arrival.exception && arrival.exception.result === null &&
                    <Button
                        className={classes.button}
                        component={Link}
                        to={route}
                        disabled
                    >
                        <text>Esperando excepción</text>
                    </Button>
                }
                {(!arrival.exception || arrival.exception?.result === 0) &&
                    <>
                        <Button
                            className={classes.button}
                            component={Link}
                            to={route}
                        > 
                            Evaluar ingreso
                        </Button>
                    </>
                }
                {(!!arrival.exception && arrival.exception?.result === 1) &&
                    <>
                        <Button className={classes.button} onClick={() => markAsRead(arrival.id)} > 
                            Confirmar Excepción Rechazada
                        </Button>
                    </>
                }
            </Grid>
        </Grid>
    )
}

export default ArrivalRow;