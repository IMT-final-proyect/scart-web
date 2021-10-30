import React, { useEffect } from 'react';

import { Card, Grid, } from '@material-ui/core';

import useStyles from './styles';
import DocumentRow from './components/documentRow'
import { ROUTES } from '../navigation/routes';
import { useDispatch, useSelector } from 'react-redux';
import { getDocumentByState } from '../../../redux/slices/documentsSlice';
import { States } from '../../../utils/constants';
import { RootState } from '../../../redux/rootReducer';

const Documentation = () => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const documents = useSelector((state: RootState) => state.documents.pendingDocuments)

    useEffect(() => {
        dispatch(getDocumentByState(States.PENDING))
    }, [dispatch])

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
                            Pertenece a
                        </text>
                    </Grid>
                    <Grid item xs={2} className={classes.headerText}>
                        <text className={classes.headerText}>
                            Tipo
                        </text>
                    </Grid>
                    <Grid item xs={2} className={classes.headerText}>
                        <text className={classes.headerText}>
                            Importancia
                        </text>
                    </Grid>
                    <Grid item xs={2} className={classes.headerText}>
                        <text className={classes.headerText}>
                            Acciones
                        </text>
                    </Grid>
                </Grid>
                <Grid container direction='column' justifyContent='space-between' >
                    {Object.keys(documents).map((key: string, i: any) =>
                        <DocumentRow 
                            key={documents[parseInt(key)].id}
                            type={documents[parseInt(key)].type}
                            owner={documents[parseInt(key)].entityId}
                            route={ROUTES.root+'/'+documents[parseInt(key)].id}
                        />
                    )}
                </Grid>
            </Card>
        </Grid>
    )
}

export default Documentation;