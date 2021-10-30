import { Card, Typography } from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import TimerIcon from '@material-ui/icons/Timer';
import { Bar } from 'react-chartjs-2';

import useStyles from './styles';

interface props {
  valid: number,
  pending: number,
  expired: number
}

const DocumentsCard = ({
  valid,
  pending,
  expired
}: props) => {
  const classes = useStyles();
  const data = {
    labels: ['Vig.', 'Pend.', 'Venc.'],
    datasets: [
      {
        data: [valid, pending, expired],
        backgroundColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(117, 255, 96, 1)',
          'rgba(117, 255, 96, 1)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(54, 162, 235, 1)',
        ],
        borderWidth: 1,
        barThickness: 30,
      }
    ]
  };

  const options = {
    scales: {
      yAxes: {
        display: false,
      }
    }
  }

  return (
    <Card className={classes.card}>
      <div className={classes.counterContainer}>
          <div className={classes.graphContainer}>
            <Bar data={data} options={options} height={200}/>
          </div>
      </div>
      <div className={classes.details}>
          <div className={classes.row}>
              <DoneIcon className={classes.done}/>
              <text>
                  Validos: {valid}
              </text>
          </div>
          <div className={classes.row}>
              <TimerIcon className={classes.wait}/>
              <text>
                  Pendientes: {pending}
              </text>
          </div>
          <div className={classes.row}>
              <CloseIcon className={classes.wrong}/>
              <text>
                  Vencidos: {expired}
              </text>
          </div>
      </div>
  </Card>
  )
} 

export default DocumentsCard;