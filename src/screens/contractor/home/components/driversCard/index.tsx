import { Button, Card, Grid, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../navigation/routes';

import useStyles from './styles';

interface props {
  invalid: number
  pending: number
}

const DriversCard = ({ invalid, pending }: props) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <Grid container className={classes.container}>
          <Typography className={classes.title}> Conductores </Typography>
      </Grid>
      <Grid className={classes.separator}/>
      <Grid container className={classes.container}>
        <Grid item xs={6}>
          <Typography className={classes.subtitle}> Fuera de regla </Typography>
          <Button 
          className={classes.button}
          component={Link}
          to={ROUTES.root+ROUTES.home+ROUTES.invalidDrivers}
        >
            <Typography className={classes.number}> {invalid} </Typography>
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Typography className={classes.subtitle}> En evaluación </Typography>
          <Button 
            className={classes.button} 
            component={Link}
            to={ROUTES.root+ROUTES.home+ROUTES.pendingDrivers}
          >
            <Typography className={classes.number}> {pending} </Typography>
          </Button>
        </Grid>
      </Grid>
  </Card>
  )
} 

export default DriversCard;