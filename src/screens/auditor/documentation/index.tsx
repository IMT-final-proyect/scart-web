/* eslint-disable array-callback-return */
import React, { useEffect, useState } from 'react';

import { Card, CircularProgress, Grid, Typography, } from '@material-ui/core';

import useStyles from './styles';
import DocumentRow from './components/documentRow'
import { ROUTES } from '../navigation/routes';
import { useDispatch, useSelector } from 'react-redux';
import { getDocumentByState } from '../../../redux/slices/documentsSlice';
import { States } from '../../../utils/constants';
import { RootState } from '../../../redux/rootReducer';
import { IDocument } from '../../../utils/interfaces';
import CustomInput from '../../../components/customInput';
import CustomSnackbar from '../../../components/customSnackbar';

const Documentation = () => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const [openSuccess, setOpenSuccess] = useState(false)
    const [searchContractor, setSearchContractor] = useState('')
    const [loadingFilter, setLoadingFilter] = useState(false)
    const documents = useSelector((state: RootState) => state.documents.pendingDocuments)
    const [documentsFiltered, setDocumentsFiltered] = useState<IDocument[]>([])
    const loading = useSelector((state: RootState) => state.documents.loading)
    const success = useSelector((state: RootState) => state.documents.success)
    
    useEffect(() => {
        dispatch(getDocumentByState(States.PENDING))
    }, [dispatch])

    useEffect(() => {
        setDocumentsFiltered(() => {
            let documentsAux: IDocument[] = []
            Object.keys(documents).map((key: string, i: any) => {
                documentsAux.push(documents[parseInt(key)])
            })
            return documentsAux
        })
    }, [documents])

    useEffect(() => {
        setLoadingFilter(true)
        let documentsAux: IDocument[] = []
        if(searchContractor !== ''){
            Object.keys(documents).map((key: string, i: any) => {
                const contractorName = documents[parseInt(key)].contractor?.name.toUpperCase()
                if (contractorName?.includes(searchContractor.toUpperCase()))
                    documentsAux.push(documents[parseInt(key)])
            })
        }
        else{
            Object.keys(documents).map((key: string, i: any) => {
                documentsAux.push(documents[parseInt(key)])
            })
        }
        setDocumentsFiltered(documentsAux)
        setLoadingFilter(false)
    }, [documents, searchContractor])

    useEffect(() => {
        setOpenSuccess(success)
    }, [success])


    return (
        <>
            <Grid container className={classes.container} direction='row' justifyContent='space-between'>
                <Card className={classes.titleCard}>
                    <Grid container className={classes.titleContainer} justifyContent='space-between'>
                        <text className={classes.textTitle}>
                            Documentación
                        </text>
                    </Grid>
                    <Typography className={classes.searchTitle}> Filtrar por </Typography>
                    <Grid className={classes.inputContainer} container  direction='row' justifyContent='space-between' >
                            <Grid item xs={10} md={5}>
                                <CustomInput variant='outlined' className={classes.input} value={searchContractor} setValue={setSearchContractor} placeholder={'Nombre del contratista'} size='small' />
                            </Grid>
                    </Grid>
                </Card>
                {loading || loadingFilter ?
                    <Grid container alignItems='center' justifyContent='center' >
                        <CircularProgress className={classes.spinner} />
                    </Grid>
                    :
                            <Card className={classes.contentCard}>
                                {documentsFiltered.length === 0 ? 
                                    <Typography className={classes.textCenter}>No hay documentación para evaluar</Typography>
                                :
                                    <>
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
                                            {Object.keys(documentsFiltered).map((key: string, i: any) =>
                                                <DocumentRow 
                                                    key={documentsFiltered[parseInt(key)].id}
                                                    contractor={documentsFiltered[parseInt(key)].contractor}
                                                    type={documentsFiltered[parseInt(key)].type}
                                                    owner={documentsFiltered[parseInt(key)].entityId}
                                                    route={ROUTES.root+ROUTES.home+'/'+documentsFiltered[parseInt(key)].id}
                                                />
                                            )}
                                        </Grid>
                                    </>
                                }
                            </Card>
                }
            </Grid>
            <CustomSnackbar open={openSuccess} message='Documento evaluado con éxito' type='success' onClose={() => setOpenSuccess(false)} />
        </>
    )
}

export default Documentation;