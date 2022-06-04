import React from 'react';
import { Button, Grid, } from '@material-ui/core';
import useStyles from './styles';
import { IVisit } from '../../../../../utils/interfaces';
import moment from 'moment';
import globalColors from '../../../../../utils/styles/globalColors';
import { getResultColor, getResultName } from '../../../../../utils/functions/results';

interface Props{
    index: number
    visit: IVisit
    _handleOpenModal: (id: number) => void
}
const ArrivalRow = ({ index, visit, _handleOpenModal }: Props) => {
    const classes = useStyles();
    return(
        <Grid container className={classes.container} style={{backgroundColor: (index % 2) == 0 ? globalColors.grey : globalColors.white}} direction="row" justifyContent='space-between'>
            <Grid item xs={1} className={classes.text}>
                <text> {visit.driver.name.length > 60 ? visit.driver.name.substring(0, 40)+'...' : visit.driver.name} </text>
            </Grid>
            <Grid item xs={1} className={classes.text}>
                <text> {visit.driver.phone} </text>
            </Grid>
            <Grid item xs={1} className={classes.text}>
                <text> {visit.vehicle.plate.length > 60 ? visit.vehicle.plate.substring(0, 40)+'...' : visit.vehicle.plate} </text>
            </Grid>
            <Grid item xs={1} className={classes.text}>
                <text> {visit.vehicle.type.name || '-'} </text>
            </Grid>
            <Grid item xs={1} className={classes.text}>
                <text> {visit?.driver?.contractor?.name?.length > 60 ? visit?.driver?.contractor?.name?.substring(0, 40)+'...' : visit?.driver?.contractor?.name} </text>
            </Grid>
            <Grid item xs={1} className={classes.text}>
                <text> {visit.destiny || '-'} </text>
            </Grid>
            <Grid item xs={1} className={classes.text}>
                <text> Entrada: {visit.palletsEntrada > 0 ? visit.palletsEntrada : '-'} / Salida: {parseInt(visit.palletsSalida) > -1 ? visit.palletsSalida : '-'} </text>
            </Grid>
            <Grid item xs={1} className={classes.text}>
                <text className={classes.stateColor}> Aprobado </text>
            </Grid>
            <Grid item xs={1}>
                <text> {moment(visit.arrival_at).format('DD/MM/YY - HH:mm')} hs</text>
            </Grid>
            <Grid item xs={1}>
                <text> {moment(visit.checkIn).format('DD/MM/YY - HH:mm')} hs</text>
            </Grid>
            <Grid item xs={1}>
                <text> {moment(visit.checkOut).format('DD/MM/YY - HH:mm')} hs</text>
            </Grid>
            <Grid item xs={1} className={classes.container}>
                <Button className={classes.button} onClick={() => _handleOpenModal(visit.id)} > 
                    Modificar
                </Button>    
            </Grid>
        </Grid>
    )
}

export default ArrivalRow;