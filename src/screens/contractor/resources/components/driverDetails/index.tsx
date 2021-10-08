import React, { useEffect, useState } from 'react';
import { Button, Card, Grid, Modal, Typography, } from '@material-ui/core'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import useStyles from './styles' 
import { Link, useParams } from 'react-router-dom';
import { RootState } from '../../../../../redux/rootReducer';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { IDocument, IDriver } from '../../../../../utils/interfaces';
import CreateDriverDocumentModal from './components/CreateDriverDocumentModal';
import { createDocument, getDriverDocuments } from '../../../../../redux/slices/contractorSlices/documentsSlice';
import DocumentRow from '../../../documentation/components/documentRow/DocumentRow';
import { ROUTES } from '../../../navigation/routes';


const autos: string[] = []


const DriverDetails = () => {
    const classes = useStyles();
    const params: any = useParams();
    const dispatch = useDispatch();
    const [openDriverDocumentModal, setOpenDriverDocumentModal] = useState(false)
    const driver: IDriver = useSelector((state: RootState) => {
        const drivers = state.resources.drivers.data
        return drivers[params.id]
    })
    const documents: IDocument[] = useSelector((state: RootState) => state.documents.drivers.data)
    const userData = useSelector((state: RootState) => state.user.userData)

    useEffect(() => { 
        dispatch(getDriverDocuments(driver.id))
    }, [])

    const addDocument = (expirationDate: moment.Moment, type: number, entityType: number, entityId: number, images: string[]) => {
        dispatch(createDocument(expirationDate, type, entityType, entityId, images))
        setOpenDriverDocumentModal(false)
    }

    return (
        <>
            <Modal open={openDriverDocumentModal} onClose={() => setOpenDriverDocumentModal(false)}>
                <CreateDriverDocumentModal
                    setOpenDocumentModal={setOpenDriverDocumentModal}
                    addDocument={addDocument}
                />
            </Modal>
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
                            <Grid container justifyContent='space-between'>
                                <Grid item xs={3} className={classes.headerText}>
                                    <text className={classes.headerText}>
                                        Nombre
                                    </text>
                                </Grid>
                                <Grid item xs={3} className={classes.headerText}>
                                    <text className={classes.headerText}>
                                        Fecha de vencimiento
                                    </text>
                                </Grid>
                                <Grid item xs={3} className={classes.headerText}>
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
                                {Object.keys(documents).map((key: string, i: any) =>
                                <Button
                                    className={classes.button}
                                    component={Link}
                                    to={ROUTES.root+ROUTES.documentacion+'/'+documents[parseInt(key)].id}
                                >  
                                    <DocumentRow 
                                        key={documents[parseInt(key)].id}
                                        type={documents[parseInt(key)].type}
                                        contractor={userData?.name}
                                        expiration={documents[parseInt(key)].expirationDate}
                                        state={documents[parseInt(key)].state}
                                        images={documents[parseInt(key)].photos}
                                    />
                                </Button>
                                )}
                            </Grid>
                        </Card>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}

export default DriverDetails;