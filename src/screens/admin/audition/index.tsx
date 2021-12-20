import React, { useEffect, useState } from 'react';

import { Card, CircularProgress, Grid, } from '@material-ui/core';

import useStyles from './styles';
import DocumentRow from './components/documentRow'
import { ROUTES } from '../navigation/routes';
import { useDispatch, useSelector } from 'react-redux';
import { getDocumentByState } from '../../../redux/slices/documentsSlice';
import { States } from '../../../utils/constants';
import { RootState } from '../../../redux/rootReducer';
import CustomSnackbar from '../../../components/customSnackbar';

const Documentation = () => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const [openSuccess, setOpenSuccess] = useState(false)
    const documents = useSelector((state: RootState) => state.documents.pendingDocuments)
    const loading = useSelector((state: RootState) => state.documents.loading)
    const success = useSelector((state: RootState) => state.documents.success)
    
    useEffect(() => {
        dispatch(getDocumentByState(States.PENDING))
    }, [dispatch])

    useEffect(() => {
        setOpenSuccess(success)
    }, [success])

    return (
        <>
            {loading ?
                <Grid container alignContent='center' justifyContent='center' >
                    <CircularProgress className={classes.spinner} />
                </Grid>
                :
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
                                    Contratista
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
                                    contractor={documents[parseInt(key)].contractor}
                                    type={documents[parseInt(key)].type}
                                    owner={documents[parseInt(key)].entityId}
                                    route={ROUTES.root+ROUTES.audition+'/'+documents[parseInt(key)].id}
                                />
                            )}
                        </Grid>
                    </Card>
                </Grid>
            }
            <CustomSnackbar open={openSuccess} message='Documento evaluado con éxito' type='success' onClose={() => setOpenSuccess(false)} />
        </>
    )
}

export default Documentation;