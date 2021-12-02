import { Button, Card, Grid, Typography } from '@material-ui/core';
import { Divider } from '@mui/material';
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
      <Grid container className={classes.container_header}>
        <Typography className={classes.title}>Vehiculos</Typography>
      </Grid>
      <Grid className={classes.separator}/>
      <Grid container className={classes.container}>
        <Grid item xs={6}>
          <Typography className={classes.subtitle}>Fuera de regla</Typography>
            <Button
              className={classes.button_OOR}
              component={Link}
              to={ROUTES.root+ROUTES.home+ROUTES.invalidVehicles}
            >
              <Typography className={classes.number_OOR}> {invalid} </Typography>
            </Button>
        </Grid>
        <Divider orientation="vertical" flexItem style={{marginRight:"-1px"}} />
        <Grid item xs={6}>
          <Typography className={classes.subtitle}>En evaluación</Typography>
          <Button 
          className={classes.button_Pending}
          component={Link}
          to={ROUTES.root+ROUTES.home+ROUTES.pendingVehicles}
          >
            <Typography className={classes.number_Pending}> {pending} </Typography>
          </Button>
        </Grid>
      </Grid>
  </Card>
  )
} 

export default VehiclesCard;