import { Card, Typography } from '@material-ui/core';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import PersonIcon from '@material-ui/icons/Person';
import { Doughnut } from 'react-chartjs-2';

import useStyles from './styles';

interface props {
  drivers: number,
  vehicles: number
}

const ResourcesCard = ({
  drivers,
  vehicles 
}: props) => {
  const classes = useStyles();
  const data = {
    labels: ['Conductores', 'Vehiculos'],
    datasets: [
      {
        label: 'Recursos',
        data: [drivers, vehicles],
        backgroundColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(117, 255, 96, 1)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
        ],
        borderWidth: 1,
      }
    ]
  };

  return (
    <Card className={classes.card}>
      <div className={classes.counterContainer}>
        <div className={classes.chartContainer}>
          <Doughnut data={data} height={5} width={5}/>
        </div>
      </div>
      <div className={classes.details}>
        <div className={classes.detailsRow}>
          <PersonIcon />
          <text>
            Conductores: {drivers}
          </text>
        </div>
        <div className={classes.detailsRow}>
          <DriveEtaIcon />
          <text>
            Vehiculos: {vehicles}
          </text>
        </div>
      </div>
    </Card>
  )
} 

export default ResourcesCard;