import React, { useEffect, useState } from 'react';
import { Button, Card, CircularProgress, Grid, Modal, Typography, } from '@material-ui/core'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import useStyles from './styles' 
import { Link, useParams } from 'react-router-dom';
import { RootState } from '../../../../../redux/rootReducer';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { IDocument, IDriver } from '../../../../../utils/interfaces';
import CreateDriverDocumentModal from './components/CreateDriverDocumentModal';
import { createDocument, getDriverDocuments } from '../../../../../redux/slices/documentsSlice';
import DocumentRow from '../../../documentation/components/documentRow/DocumentRow';
import { ROUTES } from '../../../navigation/routes';
import EditDriverModal from '../../../../../components/editDriverModal';
import EditIcon from '@mui/icons-material/Edit';


const autos: string[] = []


const DriverDetails = () => {
    const classes = useStyles();
    const params: any = useParams();
    const dispatch = useDispatch();
    const [openEditDriverModal, setOpenEditDriverModal] = useState(false)
    const [openDriverDocumentModal, setOpenDriverDocumentModal] = useState(false)
    const driver: IDriver = useSelector((state: RootState) => {
        const drivers = state.resources.drivers.data
        return drivers[params.id]
    })
    const documents: IDocument[] = useSelector((state: RootState) => state.documents.drivers.data)
    const loading: boolean = useSelector((state: RootState) => state.documents.drivers.loading)

    useEffect(() => { 
        dispatch(getDriverDocuments(driver.id))
    }, [dispatch, driver.id])

    const addDocument = (expirationDate: moment.Moment, type: number, entityType: number, entityId: number, images: string[]) => {
        dispatch(createDocument(expirationDate, type, entityType, entityId, images))
        setOpenDriverDocumentModal(false)
    }

    const editDriver = (password: string, name: string, surname: string, cuit: string, birthdate: moment.Moment) => {
        
    }


    return (
        <>
            <Modal open={openDriverDocumentModal} onClose={() => setOpenDriverDocumentModal(false)}>
                <CreateDriverDocumentModal
                    setOpenDocumentModal={setOpenDriverDocumentModal}
                    addDocument={addDocument}
                    driverId={driver.id}
                />
            </Modal>
            <Modal open={openEditDriverModal} onClose={() => setOpenEditDriverModal(false)}>
                <EditDriverModal driver={driver} editDriver={editDriver} setOpenEditDriverModal={setOpenEditDriverModal} />
            </Modal>
            {loading ?
                <Grid container alignContent='center' justifyContent='center' >
                    <CircularProgress className={classes.spinner} />
                </Grid>
                :
            <Grid container className={classes.container} direction='column' justifyContent='space-between'>
                <Card className={classes.cardContainer}>
                    <Grid container justifyContent='space-between' direction='row' alignItems={'center'}>
                        {/* <Hidden only={["xs","sm"]}>
                            <Grid item xs={2} md={6}>
                                <img src={image} className={classes.image} />
                            </Grid>
                        </Hidden> */}
                            <div className={classes.dataContainer}>
                                <text className={classes.dataField}> Nombre: </text>
                                <text className={classes.data}> {driver.name} </text>
                            </div>
                            <div className={classes.dataContainer}>
                                <text className={classes.dataField}> Apellido: </text>
                                <text className={classes.data}> {driver.surname} </text>
                            </div>
                            <div className={classes.dataContainer}>
                                <text className={classes.dataField}> Fecha de Nac.: </text>
                                <text className={classes.data}> {moment(driver.birth_date).format('DD/MM/YY')} </text>
                            </div>
                            <div className={classes.dataContainer}>
                                <text className={classes.dataField}> CUIT: </text>
                                <text className={classes.data}> {driver.cuit} </text>
                            </div>
                            <Button onClick={() => {setOpenEditDriverModal(true)}}>
                                <EditIcon />
                            </Button>
                    </Grid>
                </Card>
                <Grid container className={classes.container} direction='row' justifyContent='space-between'>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                        <Card className={classes.leftCard}>
                            <Grid container className={classes.titleContainer} justifyContent='space-between'>
                                <text className={classes.textTitle}>
                                    Vehiculos conducidos
                                </text>
                            </Grid>
                            {autos.length === 0 ? 
                            <Typography className={classes.textCenter}> El conductor no ha conducido ningún vehiculo aún</Typography>
                                :
                                <>
                                    <Grid container justifyContent='space-between'>
                                        <Grid item xs={4} className={classes.headerText}>
                                            <text className={classes.headerText}>
                                                Marca
                                            </text>
                                        </Grid>
                                        <Grid item xs={4} className={classes.headerText}>
                                            <text className={classes.headerText}>
                                                Modelo
                                            </text>
                                        </Grid>
                                        <Grid item xs={4} className={classes.headerText}>
                                            <text className={classes.headerText}>
                                                Patente
                                            </text>
                                        </Grid>
                                    </Grid>
                                    <Grid container direction='column' justifyContent='space-between' >
                                        {/* {autos.map((auto) =>
                                            <Vehicle 
                                                key={auto.id}
                                                brand={auto.brand}
                                                model={auto.model}
                                                plate={auto.plate}
                                            />)
                                        } */}
                                    </Grid>     
                                </>
                            }
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                        <Card className={classes.rightCard}>
                            <Grid container className={classes.titleContainer} justifyContent='space-between'>
                                <text className={classes.textTitle}>
                                    Documentación asociada
                                </text>
                                <Button onClick={() => setOpenDriverDocumentModal(true)}>
                                    <AddCircleIcon className={classes.circleIcon} />
                                </Button>
                            </Grid>
                            {Object.keys(documents).length !== 0 ?
                                <>
                                    <Grid container justifyContent='space-between'>
                                        <Grid item xs={5} className={classes.headerText}>
                                            <text className={classes.headerText}>
                                                Nombre
                                            </text>
                                        </Grid>
                                        <Grid item xs={3} className={classes.headerText}>
                                            <text className={classes.headerText}>
                                                Fecha de vencimiento
                                            </text>
                                        </Grid>
                                        <Grid item xs={2} className={classes.headerText}>
                                            <text className={classes.headerText}>
                                                Estado
                                            </text>
                                        </Grid>
                                        <Grid item xs={2} className={classes.headerText}>
                                            <text className={classes.headerText}>
                                                Importancia
                                            </text>
                                        </Grid>
                                    </Grid>
                                    <Grid container direction='column' justifyContent='space-between' >
                                        {Object.keys(documents).map((key: string, i: any) =>
                                        <Button
                                            className={classes.button}
                                            component={Link}
                                            to={ROUTES.root+ROUTES.documentacion+'/'+documents[parseInt(key)].id}
                                        >  
                                            <DocumentRow 
                                                key={documents[parseInt(key)].id}
                                                type={documents[parseInt(key)].type}
                                                expiration={documents[parseInt(key)].expirationDate}
                                                state={documents[parseInt(key)].state}
                                            />
                                        </Button>
                                        )}
                                    </Grid>
                                </>
                                :
                                <Typography className={classes.textCenter}>No hay documentacion asociada</Typography>
                            }
                        </Card>
                    </Grid>
                </Grid>
            </Grid>
            }
        </>
    )
}

export default DriverDetails;

