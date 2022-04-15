import React from 'react';
import { Button, Grid, } from '@material-ui/core';
import useStyles from './styles';
import { IDriverInside } from '../../../../utils/interfaces';
import moment from 'moment';

interface Props{
    driverInside: IDriverInside
    openDriverLeavesModal: (driver: IDriverInside) => void
}
const DriverInsideRow = ({ driverInside, openDriverLeavesModal }: Props) => {
    const classes = useStyles();
    const driverFullName = driverInside.driver.name + ' ' + driverInside.driver.surname
    const vehicle = driverInside.vehicle.plate
    const contractor = driverInside.contractor.name
    const checkIn = moment(driverInside.checkIn).format('DD/MM/yy - HH:mm')

    const handleCheckOutModal = () => {
        openDriverLeavesModal(driverInside)
    }

    return(
        <Grid container className={classes.container} direction="row" justifyContent='space-between'>
            <Grid item xs={3} className={classes.text}>
                <text> {driverFullName.length > 60 ? driverFullName.substring(0, 87)+'...' : driverFullName} </text>
            </Grid>
            <Grid item xs={3} className={classes.text}>
                <text> {vehicle.length > 60 ? vehicle.substring(0, 87)+'...' : vehicle} </text>
            </Grid>
            <Grid item xs={2} className={classes.text}>
                <text> {contractor.length > 60 ? contractor.substring(0, 87)+'...' : contractor} </text>
            </Grid>
            <Grid item xs={2}>
                <div className={classes.severity}>
                    <text className={classes.stateColor}> {checkIn} </text>
                </div>
            </Grid>
            <Grid item xs={2} className={classes.container}>
                <Button className={classes.button} onClick={handleCheckOutModal} > 
                    Registrar Salida
                </Button>
            </Grid>
        </Grid>
    )
}

export default DriverInsideRow;