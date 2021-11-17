import React from 'react';
import { Grid, Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import useStyles from './styles';
import moment from 'moment';

interface Props{
    name: string,
    surname: string,
    document: string,
    birthday: moment.Moment
    id: number
    handleDeleteDriver: (id: number) => void
} 
const Driver = ({ name, surname, document, birthday, id, handleDeleteDriver }: Props) => {
    const classes = useStyles();

    const handleClick = (e: any) => {
        e.preventDefault()
        handleDeleteDriver(id)
    }
    return(
        <Grid container direction="row" justifyContent='space-between'>
            <Grid item xs={3} className={classes.text}>
                <text> {name} </text>
                <text> {surname} </text>
            </Grid>
            <Grid item xs={3} className={classes.text}>
                <text> {document} </text>
            </Grid>
            <Grid item xs={3} className={classes.text}>
                <text> {moment(birthday).format('DD/MM/YY')} </text>
            </Grid>
            <Grid item xs={2} className={classes.iconContainer}>
                <Button onClick={handleClick} >
                    <DeleteIcon />
                </Button>
            </Grid>
        </Grid>
    )
}

export default Driver;