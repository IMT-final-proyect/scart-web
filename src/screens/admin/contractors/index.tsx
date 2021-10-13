import React, { useEffect, useState } from 'react';
import { Button, Card, Grid, Modal, } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import useStyles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/rootReducer';
import CreateContractorModal from './components/CreateContractorModal';
import { ROUTES } from '../navigation/routes';
import { Link } from 'react-router-dom';
import { createContractor, getContractors } from '../../../redux/slices/contractorsSlice';
import ContractorRow from './components/contratorRow';

const Contractors = () => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const [openModal, setOpenModal] = useState(false)
    const contractors = useSelector((state: RootState) => state.contractors.data)

    useEffect(() => {
        dispatch(getContractors())
    }, [])

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
            <Card className={classes.leftCard}>
                <Grid container justifyContent='space-between'>
                    <text className={classes.textTitle}>
                        Contratistas
                    </text>
                    <Button onClick={() => setOpenModal(true)}>
                        <AddCircleIcon className={classes.circleIcon}/>
                    </Button>
                </Grid>
                {contractors.length === 0 ?
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
                            {Object.keys(contractors).map((key: string, i: any) =>
                            <Button
                                className={classes.button}
                                component={Link}
                                to={ROUTES.root+ROUTES.contractors+'/'+contractors[parseInt(key)].id}
                            >  
                                <ContractorRow 
                                    name={contractors[parseInt(key)].name}
                                    cuit={contractors[parseInt(key)].cuit}
                                />
                            </Button>
                            )}
                        </Grid>
                    </>
                }
                </Card>
        </Grid>
        </>
    )
}

export default Contractors;