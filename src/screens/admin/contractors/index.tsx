import React, { useEffect, useState } from 'react';
import { Button, Card, Grid, Modal, Typography, } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import useStyles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';
import { RootState } from '../../../redux/rootReducer';
import CreateContractorModal from './components/CreateContractorModal';
import { ROUTES } from '../navigation/routes';
import { Link } from 'react-router-dom';
import { createContractor, getContractors } from '../../../redux/slices/contractorsSlice';
import ContractorRow from './components/contratorRow';
import CustomInput from '../../../components/customInput';
import { IContractor } from '../../../utils/interfaces';

const Contractors = () => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const [openModal, setOpenModal] = useState(false)
    const [searchName, setSearchName] = useState('')
    const [searchCuit, setSearchCuit] = useState('')
    const [loadingFilter, setLoadingFilter] = useState(false)
    const contractors = useSelector((state: RootState) => state.contractors.data)
    const loadingContractor = useSelector((state: RootState) => state.contractors.loading)
    const [contractorsFiltered, setContractorsFiltered] = useState<IContractor[]>([])

    useEffect(() => {
        dispatch(getContractors())
    }, [dispatch])

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
    }, [searchName, searchCuit])

    const addContractor = (username: string, password: string, name: string, cuit: string, street: string, number: string, city: string, province: string) => {
        dispatch(createContractor(username, password, name, cuit, street, number, city, province))
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
                        <text className={classes.textTitle}>
                            Contratistas
                        </text>
                        <Button onClick={() => setOpenModal(true)}>
                            <AddCircleIcon className={classes.circleIcon}/>
                        </Button>
                </Grid>
                <Typography className={classes.searchTitle}> Filtar por </Typography>
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
                                <Grid item xs={5} className={classes.headerText}>
                                    <text className={classes.headerText}>
                                        Nombre
                                    </text>
                                </Grid>
                                <Grid item xs={5} className={classes.headerText}>
                                    <text className={classes.headerText}>
                                        CUIT
                                    </text>
                                </Grid>
                            </Grid>
                            <Grid container direction='column' justifyContent='space-between' >
                                {contractorsFiltered.map(contractor =>
                                <Button
                                    className={classes.button}
                                    component={Link}
                                    to={ROUTES.root+ROUTES.contractors+'/'+contractor.id}
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
        </Grid>
        </>
    )
}

export default Contractors;