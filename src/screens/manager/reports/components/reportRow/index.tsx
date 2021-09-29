import React from 'react';
import { Button, Grid } from '@material-ui/core';
import useStyles from './styles';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../navigation/routes';

interface Props{
    name: string,
    type: string,
    contractor: string
}
const ReportRow = ({ name, type, contractor }: Props) => {
    const classes = useStyles();
    return(
        <Grid container direction="row" justifyContent='space-between'  alignItems='center'>
            <Grid item xs={3} md={4} className={classes.text}>
                <text> {name} </text>
            </Grid>
            <Grid item xs={2} md={1} className={classes.text}>
                <text> {type} </text>
            </Grid>
            <Grid item xs={2} className={classes.text}>
                <text> {contractor} </text>
            </Grid>
            <Grid item xs={2} className={classes.container}>
                <Button color="primary" className={classes.text} component={Link}
                            to={ROUTES.root+ROUTES.reportDetails}>Generar</Button>
            </Grid>
    </Grid>
    )
}

export default ReportRow;