import { Button, Card, Grid, Typography } from '@material-ui/core';
import { IVehicle } from '../../../../../utils/interfaces';

import useStyles from './styles';

interface props {
  invalid: number
  pending: number
}

const VehiclesCard = ({ invalid, pending }: props) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <Grid container className={classes.container}>
        <Button className={classes.button}>
          <Typography className={classes.title}>Vehiculos</Typography>
        </Button>
      </Grid>
      <Grid className={classes.separator}/>
      <Grid container className={classes.container}>
        <Grid item xs={6}>
          <Typography className={classes.subtitle}>Fuera de regla</Typography>
            <Button className={classes.button}>
              <Typography className={classes.number}> {invalid} </Typography>
            </Button>
        </Grid>
        <Grid item xs={6}>
          <Typography className={classes.subtitle}>En evaluación</Typography>
          <Button className={classes.button}>
            <Typography className={classes.number}> {pending} </Typography>
          </Button>
        </Grid>
      </Grid>
  </Card>
  )
} 

export default VehiclesCard;