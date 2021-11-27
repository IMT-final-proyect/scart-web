import { Button, Card, Grid, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { IVehicle } from '../../../../../utils/interfaces';
import { ROUTES } from '../../../navigation/routes';

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
        <Typography className={classes.title}>Vehiculos</Typography>
      </Grid>
      <Grid className={classes.separator}/>
      <Grid container className={classes.container}>
        <Grid item xs={6}>
          <Typography className={classes.subtitle}>Fuera de regla</Typography>
            <Button
              className={classes.button}
              component={Link}
              to={ROUTES.root+ROUTES.home+ROUTES.invalidVehicles}
            >
              <Typography className={classes.number}> {invalid} </Typography>
            </Button>
        </Grid>
        <Grid item xs={6}>
          <Typography className={classes.subtitle}>En evaluación</Typography>
          <Button 
          className={classes.button}
          component={Link}
          to={ROUTES.root+ROUTES.home+ROUTES.pendingVehicles}
          >
            <Typography className={classes.number}> {pending} </Typography>
          </Button>
        </Grid>
      </Grid>
  </Card>
  )
} 

export default VehiclesCard;