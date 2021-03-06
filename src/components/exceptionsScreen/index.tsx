/* eslint-disable array-callback-return */
import React, { useEffect, useState } from 'react';

import { Card, CircularProgress, Grid, Typography, } from '@material-ui/core';

import useStyles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { getPendingExceptions } from '../../redux/slices/exceptionsSlice';
import { RootState } from '../../redux/rootReducer';
import { IException } from '../../utils/interfaces';
import CustomInput from '../customInput';
import CustomSnackbar from '../customSnackbar';
import ExceptionRow from './components/exceptionRow/ExceptionRow';
import { ROUTES } from '../../screens/manager/navigation/routes';
import TomisBar from '../TomisBar';
import { useHistory } from 'react-router-dom';

const Exceptions = () => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const { location } = useHistory()
    const root = location.pathname.split('/')[1]
    const [openSuccess, setOpenSuccess] = useState(false)
    const [searchContractor, setSearchContractor] = useState('')
    const exceptions = useSelector((state: RootState) => state.exceptions.data)
    const [loadingFilter, setLoadingFilter] = useState(false)
    const [exceptionsFiltered, setExceptionsFiltered] = useState<IException[]>([])
    const loading = useSelector((state: RootState) => state.exceptions.loading)
    const success = useSelector((state: RootState) => state.exceptions.success)

    useEffect(() => {
        dispatch(getPendingExceptions())
    }, [dispatch])

    useEffect(() => {
        setExceptionsFiltered(() => {
            let exceptionsAux: IException[] = []
            Object.keys(exceptions).map((key: string, i: any) => {
                exceptionsAux.push(exceptions[parseInt(key)])
            })
            return exceptionsAux
        })
    }, [exceptions])

    useEffect(() => {
        setLoadingFilter(true)
        let exceptionsAux: IException[] = []
        if(searchContractor !== ''){
            Object.keys(exceptions).map((key: string, i: any) => {
                const contractorName = exceptions[parseInt(key)].arrival.contractor?.toUpperCase()
                if (contractorName?.includes(searchContractor.toUpperCase()))
                    exceptionsAux.push(exceptions[parseInt(key)])
            })
        }
        else{
            Object.keys(exceptions).map((key: string, i: any) => {
                exceptionsAux.push(exceptions[parseInt(key)])
            })
        }
        setExceptionsFiltered(exceptionsAux)
        setLoadingFilter(false)
    }, [exceptions, searchContractor])

    useEffect(() => {
        setOpenSuccess(success)
    }, [success])

    return (
        <>
            <Grid container className={classes.container} direction='row' justifyContent='space-between'>
                <Card className={classes.titleCard}>
                    <Grid container justifyContent='space-between'>
                        <Grid item xs={11}>
                            <Grid container>
                                <TomisBar/>
                                <text className={classes.textTitle}>
                                    Excepciones
                                </text>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Typography className={classes.searchTitle}> Filtrar por </Typography>
                    <Grid className={classes.inputContainer} container  direction='row' justifyContent='space-between' >
                            <Grid item xs={10} md={5}>
                                <CustomInput variant='outlined' className={classes.input} value={searchContractor} setValue={setSearchContractor} placeholder={'Nombre del contratista'} size='small' />
                            </Grid>
                    </Grid>
                </Card>
                {loading || loadingFilter ?
                    <Grid container alignContent='center' justifyContent='center' >
                        <CircularProgress className={classes.spinner} />
                    </Grid>
                    :
                    <Card className={classes.contentCard}>
                        {exceptionsFiltered.length > 0 ?
                            <>
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
                                            Acciones
                                        </text>
                                    </Grid>
                                </Grid>
                                <Grid container direction='column' justifyContent='space-between' >
                                    {Object.keys(exceptionsFiltered).map((key: string, i: any) =>
                                        <ExceptionRow 
                                            key={exceptionsFiltered[parseInt(key)].id}
                                            exception={exceptionsFiltered[parseInt(key)]}
                                            route={'/'+root+ROUTES.exceptions+'/'+exceptionsFiltered[parseInt(key)].id+'/'+exceptionsFiltered[parseInt(key)].arrival.driverId+'/'+exceptionsFiltered[parseInt(key)].arrival.vehicleId+'/'+exceptionsFiltered[parseInt(key)].arrival.securityId}
                                        />
                                    )}
                                </Grid>
                            </>
                            :
                            <Grid className={classes.emptyText}>
                                    <text>No hay excepciones</text>
                            </Grid>
                        }
                    </Card>
                }
            </Grid>
            <CustomSnackbar open={openSuccess} message='Excepci??n evaluada con ??xito' type='success' onClose={() => setOpenSuccess(false)} />
        </>
    )
}

export default Exceptions;