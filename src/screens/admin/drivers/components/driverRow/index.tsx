import React from 'react';
import { Button, Grid, } from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import useStyles from './styles';

interface Props{
    name: string,
    surname: string,
    document: string,
    contractor: string,
    id: number,
    handleDeleteDriver: (id: number) => void
} 
const Driver = ({ name, surname, document, contractor, id, handleDeleteDriver }: Props) => {
    const classes = useStyles();
    const handleClick = (e: any) => {
        e.preventDefault()
        handleDeleteDriver(id)
    }
    return(
        <Grid container direction="row" justifyContent='space-between' alignItems={'center'}>
            <Grid item xs={3} className={classes.text}>
                <text> {name} </text>
                <text> {surname} </text>
            </Grid>
            <Grid item xs={3} className={classes.text}>
                <text> {document} </text>
            </Grid>
            <Grid item xs={3} className={classes.text}>
                <text> {contractor} </text>
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