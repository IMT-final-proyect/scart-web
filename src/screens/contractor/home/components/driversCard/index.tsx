import { Button, Card, Grid, Typography } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { IDriver } from '../../../../../utils/interfaces';

import useStyles from './styles';

interface props {
  drivers: IDriver[]
}

const DriversCard = ({ drivers }: props) => {
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
            <Typography className={classes.number}> {Object.keys(drivers).length} </Typography>
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Typography className={classes.subtitle}> En evaluación </Typography>
          <Button className={classes.button}>
            <Typography className={classes.number}>  </Typography>
          </Button>
        </Grid>
      </Grid>
  </Card>
  )
} 

export default DriversCard;