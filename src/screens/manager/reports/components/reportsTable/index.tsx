import React from 'react';

import { Button, Card, Grid } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { Link } from 'react-router-dom';

import useStyles from './styles';
import ReportRow from '../reportRow';
import { ROUTES } from '../../../navigation/routes';

interface resource{
    id: string,
    name: string,
    contractor: string,
    type: string
}
interface Props{
    resources: resource[]
}
const ReportTable = ({resources}: Props) => {
    const classes = useStyles();

    const addDriver = () => {
        console.log("add driver");
    }

    const addCar = () => {
        console.log("add driver");
    }

    const handleBackward = () => {

    }
    const handleFoward = () => {

    }

    return (
        <Grid container className={classes.container} direction='row' justifyContent='space-between'>
            <Card className={classes.leftCard}>
                <Grid container className={classes.titleContainer} justifyContent='space-between'>
                    <text className={classes.textTitle}>
                        Reportes
                    </text>
                    <Button onClick={addDriver}>
                        <AddCircleIcon className={classes.circleIcon}/>
                    </Button>
                </Grid>
                <Grid container justifyContent='space-between'>
                    <Grid item xs={3} md={4} className={classes.headerText}>
                        <text className={classes.headerText}>
                            Nombre
                        </text>
                    </Grid>
                    <Grid item xs={2} md={1} className={classes.headerText}>
                        <text className={classes.headerText}>
                            Tipo
                        </text>
                    </Grid>
                    <Grid item xs={2} className={classes.headerText}>
                        <text className={classes.headerText}>
                            Contratista
                        </text>
                    </Grid>
                    <Grid item xs={2} className={classes.headerText}>
                        <text className={classes.headerText}>
                            Reporte
                        </text>
                    </Grid>
                </Grid>
                <Grid container direction='column' justifyContent='space-between' >
                    {resources.map((resource) =>
                        <ReportRow 
                            key={resource.id}
                            name={resource.name}
                            type={resource.type}
                            contractor={resource.contractor}
                        />)
                    }
                </Grid>
            </Card>
        </Grid>
    )
}

export default ReportTable