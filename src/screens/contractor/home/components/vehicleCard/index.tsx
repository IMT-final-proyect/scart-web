import { Button, Card, Grid, Typography } from '@material-ui/core';
import { IVehicle } from '../../../../../utils/interfaces';

import useStyles from './styles';

interface props {
  vehicles: IVehicle[]
}

const VehiclesCard = ({ vehicles }: props) => {
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
              <Typography className={classes.number}> {Object.keys(vehicles).length} </Typography>
            </Button>
        </Grid>
        <Grid item xs={6}>
          <Typography className={classes.subtitle}>En evaluación</Typography>
          <Button className={classes.button}>
            <Typography className={classes.number}>  </Typography>
          </Button>
        </Grid>
      </Grid>
  </Card>
  )
} 

export default VehiclesCard;