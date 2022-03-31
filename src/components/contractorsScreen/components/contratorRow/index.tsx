import React from 'react';
import { Grid, } from '@material-ui/core';
import useStyles from './styles';
import { IContractor } from '../../../../utils/interfaces';

interface Props{
    contractor: IContractor
}
const ContractorRow = ({ contractor }: Props) => {
    const classes = useStyles()
    return(
        <>
            <Grid container direction="row" justifyContent='space-between'>
                <Grid item xs={4} className={classes.text}>
                    <text> {contractor.name} </text>
                </Grid>
                <Grid item xs={4} className={classes.text}>
                    <text> {contractor.cuit} </text>
                </Grid>
                <Grid item xs={4} className={classes.text}>
                    <text> {contractor?.username || '-'} </text>
                </Grid>
            </Grid>
        </>
    )
}

export default ContractorRow;