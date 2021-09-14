import React from 'react';

import { Button, Card, Grid } from "@material-ui/core"
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import OpenInBrowserIcon from '@material-ui/icons/OpenInBrowser';

import ReportRow from './components/reportRow';
import useStyles from './styles';


const reports = [
    {
        'fecha': '09/12/2018',
        'entrada': '12:00',
        'salida': '15:00',
        'totalHoras': 3,
    },
    {
        'fecha': '10/12/2018',
        'entrada': '13:00',
        'salida': '15:00',
        'totalHoras': 2,
    },
    {
        'fecha': '11/12/2018',
        'entrada': '12:00',
        'salida': '14:00',
        'totalHoras': 2,
    },
    {
        'fecha': '12/12/2018',
        'entrada': '15:00',
        'salida': '19:00',
        'totalHoras': 4,
    },
]

const ReportDetails = () => {
    const classes = useStyles();

    return (
        <Grid container className={classes.container} direction='column' justifyContent='space-between'>
            <Card className={classes.cardContainer}>
                <Grid container justifyContent='flex-start'>
                    <Grid item xs={11}>
                        <div className={classes.dataContainer}>
                            <text className={classes.dataField}> Marca: </text>
                            <text className={classes.data}> Mercedes Benz </text>
                        </div>
                        <div className={classes.dataContainer}>
                            <text className={classes.dataField}> Modelo: </text>
                            <text className={classes.data}> W12 E 2021 </text>
                        </div>
                        <div className={classes.dataContainer}>
                            <text className={classes.dataField}> Patente: </text>
                            <text className={classes.data}> 111 ADDD 1111 </text>
                        </div>
                    </Grid>
                    <Grid item xs={1}>
                        <CloudDownloadIcon className={classes.icon} />
                        <OpenInBrowserIcon className={classes.icon} />
                    </Grid>
                </Grid>
            </Card>
            <Grid container className={classes.container} direction='row' justifyContent='space-between'>
                <Grid item xs={12}>
                    <Card className={classes.leftCard}>
                        <Grid container justifyContent='space-between'>
                            <Grid item xs={3} className={classes.headerText}>
                                <text className={classes.headerText}>
                                    Fecha
                                </text>
                            </Grid>
                            <Grid item xs={3} className={classes.headerText}>
                                <text className={classes.headerText}>
                                    Hora de Entrada
                                </text>
                            </Grid>
                            <Grid item xs={3} className={classes.headerText}>
                                <text className={classes.headerText}>
                                    Hora de Salida
                                </text>
                            </Grid>
                            <Grid item xs={3} className={classes.headerText}>
                                <text className={classes.headerText}>
                                    Total de Horas
                                </text>
                            </Grid>
                        </Grid>
                        <Grid container direction='column' justifyContent='space-between' >
                            {reports.map((report) =>
                                <ReportRow 
                                    fecha={report.fecha}
                                    entrada={report.entrada}
                                    salida={report.salida}
                                    totalHoras={report.totalHoras}
                                />)
                            }
                        </Grid>
                    </Card>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default ReportDetails;