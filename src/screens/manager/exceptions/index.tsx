import React, { useEffect, useState } from 'react';

import { Card, CircularProgress, Grid, Typography, } from '@material-ui/core';

import useStyles from './styles';
import { ROUTES } from '../navigation/routes';
import { useDispatch, useSelector } from 'react-redux';
import { getPendingExceptions } from '../../../redux/slices/exceptionsSlice';
import { RootState } from '../../../redux/rootReducer';
import { IException } from '../../../utils/interfaces';
import CustomInput from '../../../components/customInput';
import CustomSnackbar from '../../../components/customSnackbar';
import ExceptionRow from './components/exceptionRow/ExceptionRow';

const Exceptions = () => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const [openSuccess, setOpenSuccess] = useState(false)
    const [searchContractor, setSearchContractor] = useState('')
    const exceptions = useSelector((state: RootState) => state.exceptions.data)
    // const [loadingFilter, setLoadingFilter] = useState(false)
    // const [exceptionsFiltered, setExceptionsFiltered] = useState<IException[]>([])
    const loading = useSelector((state: RootState) => state.exceptions.loading)
    const success = useSelector((state: RootState) => state.exceptions.success)
    
    useEffect(() => {
        dispatch(getPendingExceptions())
    }, [dispatch])

    // useEffect(() => {
    //     setExceptionsFiltered(() => {
    //         let exceptionsAux: IException[] = []
    //         Object.keys(exceptions).map((key: string, i: any) => {
    //             exceptionsAux.push(exceptions[parseInt(key)])
    //         })
    //         return exceptionsAux
    //     })
    // }, [exceptions])

    // useEffect(() => {
    //     setLoadingFilter(true)
    //     let exceptionsAux: IException[] = []
    //     if(searchContractor !== ''){
    //         Object.keys(exceptions).map((key: string, i: any) => {
    //             const contractorName = exceptions[parseInt(key)].contractor?.name.toUpperCase()
    //             if (contractorName?.includes(searchContractor.toUpperCase()))
    //                 exceptionsAux.push(exceptions[parseInt(key)])
    //         })
    //     }
    //     else{
    //         Object.keys(exceptions).map((key: string, i: any) => {
    //             exceptionsAux.push(exceptions[parseInt(key)])
    //         })
    //     }
    //     setExceptionsFiltered(exceptionsAux)
    //     setLoadingFilter(false)
    // }, [exceptions, searchContractor])

    useEffect(() => {
        setOpenSuccess(success)
    }, [success])

    return (
        <>
            <Grid container className={classes.container} direction='row' justifyContent='space-between'>
                <Card className={classes.titleCard}>
                    <Grid container className={classes.titleContainer} justifyContent='space-between'>
                        <text className={classes.textTitle}>
                            Excepciones
                        </text>
                    </Grid>
                    <Typography className={classes.searchTitle}> Filtrar por </Typography>
                    <Grid className={classes.inputContainer} container  direction='row' justifyContent='space-between' >
                            <Grid item xs={10} md={5}>
                                <CustomInput variant='outlined' className={classes.input} value={searchContractor} setValue={setSearchContractor} placeholder={'Nombre del contratista'} size='small' />
                            </Grid>
                    </Grid>
                </Card>
                {loading ?
                    <Grid container alignContent='center' justifyContent='center' >
                        <CircularProgress className={classes.spinner} />
                    </Grid>
                    :
                    <Card className={classes.contentCard}>
                        <Grid container justifyContent='space-between'>
                            <Grid item xs={3} className={classes.headerText}>
                                <text className={classes.headerText}>
                                    Conductor
                                </text>
                            </Grid>
                            <Grid item xs={3} className={classes.headerText}>
                                <text className={classes.headerText}>
                                    Vehiculo
                                </text>
                            </Grid>
                            <Grid item xs={3} className={classes.headerText}>
                                <text className={classes.headerText}>
                                    Contratista
                                </text>
                            </Grid>
                            <Grid item xs={2} className={classes.headerText}>
                                <text className={classes.headerText}>
                                    Seguridad
                                </text>
                            </Grid>
                            <Grid item xs={1} className={classes.headerText}>
                                <text className={classes.headerText}>
                                    Acciones
                                </text>
                            </Grid>
                        </Grid>
                        <Grid container direction='column' justifyContent='space-between' >
                            {Object.keys(exceptions).map((key: string, i: any) =>
                                <ExceptionRow 
                                    key={exceptions[parseInt(key)].id}
                                    driverId={exceptions[parseInt(key)].driverId}
                                    vehicleId={exceptions[parseInt(key)].vehicleId}
                                    securityId={exceptions[parseInt(key)].securityId}
                                />
                            )}
                        </Grid>
                    </Card>
                }
            </Grid>
            <CustomSnackbar open={openSuccess} message='Documento evaluado con éxito' type='success' onClose={() => setOpenSuccess(false)} />
        </>
    )
}

export default Exceptions;