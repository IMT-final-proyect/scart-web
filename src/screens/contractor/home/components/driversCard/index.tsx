import { Button, Card, Divider, Grid, Typography } from '@material-ui/core';
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
      <Grid container className={classes.container_header}>
        <Typography className={classes.title}> Conductores </Typography>
      </Grid>
      <Grid className={classes.separator}/>
      <Grid container className={classes.container}>
        <Grid item xs={6}>
          <Typography className={classes.subtitle}> Fuera de regla </Typography>
          <Button 
            className={classes.button_OOR}
            component={Link}
            to={ROUTES.root+ROUTES.home+ROUTES.invalidDrivers}
          >
            <Typography className={classes.number_OOR}> {invalid} </Typography>
          </Button>
        </Grid>
        <Divider orientation="vertical" flexItem style={{marginRight:"-1px"}} />
        <Grid item xs={6}>
          <Typography className={classes.subtitle}> En evaluación </Typography>
          <Button 
            className={classes.button_Pending} 
            component={Link}
            to={ROUTES.root+ROUTES.home+ROUTES.pendingDrivers}
          >
            <Typography className={classes.number_Pending}> {pending} </Typography>
          </Button>
        </Grid>
      </Grid>
  </Card>
  )
} 

export default DriversCard;