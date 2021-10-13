import React from 'react';
import { Grid, } from '@material-ui/core';
import useStyles from './styles';

interface Props{
    name: string,
    cuit: string,
}
const ContractorRow = ({ name, cuit }: Props) => {
    const classes = useStyles()
    
    return(
        <Grid container direction="row" justifyContent='space-between'>
            <Grid item xs={5} className={classes.text}>
                <text> {name} </text>
            </Grid>
            <Grid item xs={5} className={classes.text}>
                <text> {cuit} </text>
            </Grid>
    </Grid>
    )
}

export default ContractorRow;