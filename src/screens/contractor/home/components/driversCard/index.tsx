import { Button, Card, Grid, Typography } from '@material-ui/core';

import useStyles from './styles';

interface props {
  drivers: number,
  vehicles: number
}

const DriversCard = ({
  drivers,
  vehicles 
}: props) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <Grid container className={classes.container}>
        <Button className={classes.button}>
          <Typography className={classes.title}> Conductores </Typography>
        </Button>
      </Grid>
      <Grid className={classes.separator}/>
      <Grid container className={classes.container}>
        <Grid item xs={6}>
          <Typography className={classes.subtitle}> Fuera de regla </Typography>
          <Button className={classes.button}>
            <Typography className={classes.number}> 7 </Typography>
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Typography className={classes.subtitle}> En evaluación </Typography>
          <Button className={classes.button}>
            <Typography className={classes.number}> 3 </Typography>
          </Button>
        </Grid>
      </Grid>
  </Card>
  )
} 

export default DriversCard;