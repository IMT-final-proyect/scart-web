import React from 'react';
import { Grid, } from '@material-ui/core';
import useStyles from './styles';
import { IContractor } from '../../../../utils/interfaces';
import globalColors from '../../../../utils/styles/globalColors';

interface Props{
    contractor: IContractor
}
const ContractorRow = ({ contractor }: Props) => {
    const classes = useStyles()
    return(
        <>
            <Grid container direction="row" justifyContent='space-between'>
                <Grid item xs={3} className={classes.text}>
                    <text> {contractor.name} </text>
                </Grid>
                <Grid item xs={3} className={classes.text}>
                    <text> {contractor.cuit} </text>
                </Grid>
                <Grid item xs={3} className={classes.text}>
                    <text> {contractor?.username || '-'} </text>
                </Grid>
                <Grid item xs={3} className={classes.text}>
                {contractor.is_valid ? 
                    <div className={classes.state}>
                        <text className={classes.stateColor} style={{backgroundColor: globalColors.green}}>Válida</text>
                    </div>
                :
                    <div className={classes.state}>
                        <text className={classes.stateColor} style={{backgroundColor: globalColors.red}}>Inválida</text>
                    </div>
                }
            </Grid>
            </Grid>
        </>
    )
}

export default ContractorRow;