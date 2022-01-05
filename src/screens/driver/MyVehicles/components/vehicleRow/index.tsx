import { Grid, } from '@material-ui/core';
import useStyles from './styles';

interface Props{
    brand: string,
    model: string,
    plate: string,
    year: number
}
const VehicleRow = ({ brand, model, plate, year }: Props) => {
    const classes = useStyles();    
    


    return(
        <Grid container direction="row" justifyContent='space-between' alignItems={'center'}>
            <Grid item xs={3} className={classes.text}>
                <text> {brand} </text>
            </Grid>
            <Grid item xs={3} className={classes.text}>
                <text> {model} </text>
            </Grid>
            <Grid item xs={3} className={classes.text}>
                <text> {plate} </text>
            </Grid>
            <Grid item xs={3} className={classes.text}>
                <text> {year} </text>
            </Grid>
    </Grid>
    )
}

export default VehicleRow;