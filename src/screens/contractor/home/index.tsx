import React, { useEffect } from 'react';

import useStyles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { getContractorData } from '../../../redux/slices/userSlice';
import { RootState } from '../../../redux/rootReducer';
import { getAllDrivers, getAllVehicles } from '../../../redux/slices/resourcesSlice';
import { getContractorDocuments, getContractorExpiringDocuments } from '../../../redux/slices/documentsSlice';
import ResourcesCard from './components/resourcesCard';
import DocumentsCard from './components/documentsCard';
import { States } from '../../../utils/constants';
import { IDocument } from '../../../utils/interfaces';
import { Button, Card, Grid, Typography } from '@material-ui/core';
import { ROUTES } from '../navigation/routes';
import DocumentRow from '../documentation/components/documentRow/DocumentRow';
import { Link } from 'react-router-dom';

const Home = () => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const id = useSelector((state: RootState) => state.user.accountData?.entityId)
    const drivers = useSelector((state: RootState) => state.resources.drivers.data);
    const vehicles = useSelector((state: RootState) => state.resources.vehicles.data);
    const contractorValid: IDocument[] = useSelector((state: RootState) => Object.values(state.documents.contractor.data).filter(doc => doc.state ===  States.VALID));
    const contractorPending: IDocument[] = useSelector((state: RootState) => Object.values(state.documents.contractor.data).filter(doc => doc.state ===  States.PENDING));
    const contractorExpired: IDocument[] = useSelector((state: RootState) => Object.values(state.documents.contractor.data).filter(doc => doc.state ===  States.EXPIRED));
    const driversValid: IDocument[] = useSelector((state: RootState) => Object.values(state.documents.drivers.data).filter(doc => doc.state ===  States.VALID));
    const driversPending: IDocument[] = useSelector((state: RootState) => Object.values(state.documents.drivers.data).filter(doc => doc.state ===  States.PENDING));
    const driversExpired: IDocument[] = useSelector((state: RootState) => Object.values(state.documents.drivers.data).filter(doc => doc.state ===  States.EXPIRED));
    const vehiclesValid: IDocument[] = useSelector((state: RootState) => Object.values(state.documents.vehicles.data).filter(doc => doc.state ===  States.VALID));
    const vehiclesPending: IDocument[] = useSelector((state: RootState) => Object.values(state.documents.vehicles.data).filter(doc => doc.state ===  States.PENDING));
    const vehiclesExpired: IDocument[] = useSelector((state: RootState) => Object.values(state.documents.vehicles.data).filter(doc => doc.state ===  States.EXPIRED));
    const contractorExpiringDocuments: IDocument[] = useSelector((state: RootState) => state.documents.contractor.expiring);
    const driversExpiringDocuments: IDocument[] = useSelector((state: RootState) => state.documents.drivers.expiring);
    const vehiclesExpiringDocuments: IDocument[] = useSelector((state: RootState) => state.documents.vehicles.expiring);

    useEffect(() => {
      dispatch(getContractorData(id))
      dispatch(getAllDrivers(id))
      dispatch(getAllVehicles(id))
      dispatch(getContractorDocuments(id))
      dispatch(getContractorExpiringDocuments(id))
    }, [dispatch])
    return (
        <div className={classes.container}>
            <div className={classes.cardContainer}>
                <DocumentsCard valid={contractorValid.length} pending={contractorPending.length} expired={contractorExpired.length} />
                <ResourcesCard drivers={Object.keys(drivers).length} vehicles={Object.keys(vehicles).length}/>
            </div>
            <Grid container className={classes.container} direction='row' justifyContent='space-between'>
            <Card className={classes.leftCard}>
                <Grid container justifyContent='space-between'>
                    <text className={classes.textTitle}>
                        Documentación
                    </text>
                </Grid>
                {Object.keys(contractorExpiringDocuments)?.length === 0 ?
                    <Typography className={classes.textCenter}> No hay documentos por vencer</Typography>
                    :
                    <>
                        <Grid container justifyContent='space-between'>
                            <Grid item xs={5} className={classes.headerText}>
                                <text className={classes.headerText}>
                                    Documento
                                </text>
                            </Grid>
                            <Grid item xs={3} className={classes.headerText}>
                                <text className={classes.headerText}>
                                    Fecha de venc.
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
                            {Object.keys(contractorExpiringDocuments).map((key: string, i: any) =>
                            <Button
                                className={classes.button}
                                component={Link}
                                to={ROUTES.root+ROUTES.documentacion+'/'+contractorExpiringDocuments[parseInt(key)].id}
                            >  
                                <DocumentRow 
                                    key={contractorExpiringDocuments[parseInt(key)].id}
                                    type={contractorExpiringDocuments[parseInt(key)].type}
                                    expiration={contractorExpiringDocuments[parseInt(key)].expirationDate}
                                    state={contractorExpiringDocuments[parseInt(key)].state}
                                    images={contractorExpiringDocuments[parseInt(key)].photos}
                                />
                            </Button>
                            )}
                        </Grid>
                    </>
                }
                </Card>
            </Grid>
        </div>
    )
}

export default Home;