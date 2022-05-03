/* eslint-disable array-callback-return */
import React, { useEffect, useState } from 'react';
import { Button, Card, Grid, Modal, Typography, } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import useStyles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';
import { RootState } from '../../redux/rootReducer';
import CreateContractorModal from './components/CreateContractorModal';
import { ROUTES } from '../../screens/admin/navigation/routes';
import { Link, useHistory } from 'react-router-dom';
import { createContractor, getContractors } from '../../redux/slices/contractorsSlice';
import ContractorRow from './components/contratorRow';
import CustomInput from '../customInput';
import { IContractor } from '../../utils/interfaces';
import CustomSnackbar from '../customSnackbar';
import TomisBar from '../TomisBar';
import { useRol } from '../../customHooks';
import { AllowedRol } from '../../utils/constants';

const Contractors = () => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const rol = useRol()
    const { location } = useHistory()
    const path =  location.pathname.split('/')

    const [openModal, setOpenModal] = useState(false)
    const [searchName, setSearchName] = useState('')
    const [searchCuit, setSearchCuit] = useState('')
    const [loadingFilter, setLoadingFilter] = useState(false)
    const [contractorsFiltered, setContractorsFiltered] = useState<IContractor[]>([])
    const [openCreateSuccess, setOpenCreateSuccess] = useState(false)
    const [openCreateFailure, setOpenCreateFailure] = useState(false)
    const contractors = useSelector((state: RootState) => state.contractors.data)
    const loadingContractor = useSelector((state: RootState) => state.contractors.loading)
    const success = useSelector((state: RootState) => state.contractors.success)
    const error = useSelector((state: RootState) => state.contractors.error)

    useEffect(() => {
        dispatch(getContractors())
    }, [dispatch])

    useEffect(() => {
        setOpenCreateSuccess(success)
    }, [success])

    useEffect(() => {
        setOpenCreateFailure(!!error)
    }, [error])

    useEffect(() => {
        setContractorsFiltered(() => {
            let contractorsAux: IContractor[] = []
            Object.keys(contractors).map((key: string, i: any) => {
                contractorsAux.push(contractors[parseInt(key)])
            })
            return contractorsAux
        })
    }, [contractors])

    useEffect(() => {
        setLoadingFilter(true)
        let contractorsAux: IContractor[] = []
        if(searchName !== '' || searchCuit !== ''){
            if(searchCuit === ''){
                Object.keys(contractors).map((key: string, i: any) => {
                    const contractorName = contractors[parseInt(key)].name.toUpperCase()
                    if (contractorName.includes(searchName.toUpperCase()))
                        contractorsAux.push(contractors[parseInt(key)])
                })
            }
            else{
                if(searchName === ''){
                    Object.keys(contractors).map((key: string, i: any) => {
                        if (contractors[parseInt(key)].cuit.includes(searchCuit))
                            contractorsAux.push(contractors[parseInt(key)])
                    })
                }
                else{
                    Object.keys(contractors).map((key: string, i: any) => {
                        const contractorName = contractors[parseInt(key)].name.toUpperCase()
                        if (contractorName.includes(searchName.toUpperCase()) && contractors[parseInt(key)].cuit.includes(searchCuit))
                            contractorsAux.push(contractors[parseInt(key)])
                    })
                }
            }
        }
        else{
            Object.keys(contractors).map((key: string, i: any) => {
                contractorsAux.push(contractors[parseInt(key)])
            })
        }
        setContractorsFiltered(contractorsAux)
        setLoadingFilter(false)
    }, [searchName, searchCuit, contractors])

    const addContractor = (username: string, password: string, email: string, name: string, cuit: string, phone: string, street: string, number: string, city: string, province: string) => {
        dispatch(createContractor(username, password, email, name, cuit, phone, street, number, city, province))
        setOpenModal(false)
    }

    return (
        <>
        <Modal open={openModal} onClose={() => setOpenModal(false)}>
            <CreateContractorModal
                setOpenModal={setOpenModal}
                addContractor={addContractor}
            />
        </Modal>
        <Grid container className={classes.container} direction='row' justifyContent='space-between'>
            <Card className={classes.card}>
                <Grid container justifyContent='space-between' >
                    <Grid item xs={11}>
                        <Grid container>
                            <TomisBar/>
                            <text className={classes.textTitle}>
                                Contratistas
                            </text>
                        </Grid>
                    </Grid>
                    <Grid item xs={1}>
                    {rol !== AllowedRol.auditor && 
                        <Button onClick={() => setOpenModal(true)}>
                            <AddCircleIcon className={classes.circleIcon}/>
                        </Button>
                    }
                    </Grid>
                </Grid>
                <Typography className={classes.searchTitle}> Filtrar por </Typography>
                <Grid className={classes.inputContainer} container  direction='row' justifyContent='space-between' >
                        <Grid item xs={10} md={5}>
                            <CustomInput variant='outlined' className={classes.input} value={searchName} setValue={setSearchName} placeholder={'Nombre del contratista'} size='small' />
                        </Grid>
                        <Grid item xs={10} md={5}>
                            <CustomInput variant='outlined' className={classes.input} value={searchCuit} setValue={setSearchCuit}  placeholder={'CUIT'} size='small'/>
                        </Grid>
                </Grid>
            </Card> 
            {loadingFilter || loadingContractor ?
                <Grid container alignContent='center' justifyContent='center' >
                    <CircularProgress className={classes.spinner} />
                </Grid>
                :
                <Card className={classes.contractorCard}>
                    {contractorsFiltered.length === 0 ?
                        <text className={classes.textCenter}> No hay contratistas registrados</text>
                        :
                        <>
                            <Grid container justifyContent='space-between'>
                                <Grid item xs={4} className={classes.headerText}>
                                    <text className={classes.headerText}>
                                        Nombre
                                    </text>
                                </Grid>
                                <Grid item xs={4} className={classes.headerText}>
                                    <text className={classes.headerText}>
                                        CUIT
                                    </text>
                                </Grid>
                                <Grid item xs={4} className={classes.headerText}>
                                    <text className={classes.headerText}>
                                        Usuario
                                    </text>
                                </Grid>
                            </Grid>
                            <Grid container direction='column' justifyContent='space-between' >
                                {contractorsFiltered.map(contractor =>
                                <Button
                                    className={classes.button}
                                    component={Link}
                                    to={'/'+path[1]+ROUTES.contractors+'/'+contractor.id}
                                >  
                                    <ContractorRow 
                                        contractor={contractor}
                                    />
                                </Button>
                                )}
                            </Grid>
                        </>
                    }
                </Card>
            }
            <CustomSnackbar open={openCreateSuccess} message='Contratista creado con éxito' type='success' onClose={() => setOpenCreateSuccess(false)} />
            <CustomSnackbar open={openCreateFailure} message={error?.message || 'Ha ocurrido un error'} type='error' onClose={() => setOpenCreateFailure(false)} />
        </Grid>
        </>
    )
}

export default Contractors;