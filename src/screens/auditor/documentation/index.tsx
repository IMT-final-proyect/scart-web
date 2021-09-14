import React from 'react';

import { Button, Card, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';

import useStyles from './styles';
import DocumentRow from './components/documentRow'
import { ROUTES } from '../navigation/routes';

const documents = [
    {
        'id':'1',
        'name':'Constancia de cuil',
        'state':'Vigente',
        'owner': 'Martin Belcic',
        'type': 'Contratista'
    },
    {
        'id':'2',
        'name':'Licencia de conducir',
        'state':'Vigente',
        'owner': 'Wenceslao Mateos',
        'type': 'Contratista'
    },
    {
        'id':'3',
        'name':'Cedula Verde',
        'state':'Vigente',
        'owner': 'Luciano Morazzo',
        'type': 'Conductor',
    },
    {
        'id':'4',
        'name':'Seguro',
        'state':'Vencido',
        'owner': 'Ferrari SF21',
        'type': 'Auto',
    },
]

const Documentation = () => {
    const classes = useStyles();

    return (
        <Grid container className={classes.container} direction='row' justifyContent='space-between'>
            <Card className={classes.leftCard}>
                <Grid container className={classes.titleContainer} justifyContent='space-between'>
                    <text className={classes.textTitle}>
                        Documentación
                    </text>
                </Grid>
                <Grid container justifyContent='space-between'>
                    <Grid item xs={4} className={classes.headerText}>
                        <text className={classes.headerText}>
                            Documento
                        </text>
                    </Grid>
                    <Grid item xs={2} className={classes.headerText}>
                        <text className={classes.headerText}>
                            Dueño
                        </text>
                    </Grid>
                    <Grid item xs={2} className={classes.headerText}>
                        <text className={classes.headerText}>
                            Tipo
                        </text>
                    </Grid>
                    <Grid item xs={2} className={classes.headerText}>
                        <text className={classes.headerText}>
                            Estado
                        </text>
                    </Grid>
                    <Grid item xs={2} className={classes.headerText}>
                        <text className={classes.headerText}>
                            Acciones
                        </text>
                    </Grid>
                </Grid>
                <Grid container direction='column' justifyContent='space-between' >
                    {documents.map((document) =>
                        <Button
                            className = {classes.button}
                            component={Link}
                            to={ROUTES.root+ROUTES.documentDetails}
                        >
                            <DocumentRow 
                                key={document.id}
                                name={document.name}
                                type={document.type}
                                owner={document.owner}
                                state={document.state}
                            />
                        </Button>)
                    }
                </Grid>
            </Card>
        </Grid>
    )
}

export default Documentation;