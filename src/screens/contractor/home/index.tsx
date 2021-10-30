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
import { Button, Card, Grid } from '@material-ui/core';
import { ROUTES } from '../navigation/routes';
import DocumentRow from '../documentation/components/documentRow/DocumentRow';
import { Link } from 'react-router-dom';

const Home = () => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const id = useSelector((state: RootState) => state.user.accountData?.entityId)
    const drivers = useSelector((state: RootState) => state.resources.drivers.data);
    const vehicles = useSelector((state: RootState) => state.resources.vehicles.data);
    const valid: IDocument[] = useSelector((state: RootState) => Object.values(state.documents.contractor.data).filter(doc => doc.state ===  States.VALID));
    const pending: IDocument[] = useSelector((state: RootState) => Object.values(state.documents.contractor.data).filter(doc => doc.state ===  States.PENDING));
    const expired: IDocument[] = useSelector((state: RootState) => Object.values(state.documents.contractor.data).filter(doc => doc.state ===  States.EXPIRED));
    const expiringDocuments: IDocument[] = useSelector((state: RootState) => state.documents.contractor.expiring);

    useEffect(() => {
      dispatch(getContractorData(id))
      dispatch(getAllDrivers(id))
      dispatch(getAllVehicles(id))
      dispatch(getContractorDocuments(id))
      dispatch(getContractorExpiringDocuments(id))
    }, [])
    return (
        <div className={classes.container}>
            <div className={classes.cardContainer}>
                <DocumentsCard valid={valid.length} pending={pending.length} expired={expired.length} />
                <ResourcesCard drivers={Object.keys(drivers).length} vehicles={Object.keys(vehicles).length}/>
            </div>
            <Grid container className={classes.container} direction='row' justifyContent='space-between'>
            <Card className={classes.leftCard}>
                <Grid container justifyContent='space-between'>
                    <text className={classes.textTitle}>
                        Documentación
                    </text>
                </Grid>
                {expiringDocuments.length === 0 ?
                    <text className={classes.textCenter}> No hay documentos asociados</text>
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
                            {Object.keys(expiringDocuments).map((key: string, i: any) =>
                            <Button
                                className={classes.button}
                                component={Link}
                                to={ROUTES.root+ROUTES.documentacion+'/'+expiringDocuments[parseInt(key)].id}
                            >  
                                <DocumentRow 
                                    key={expiringDocuments[parseInt(key)].id}
                                    type={expiringDocuments[parseInt(key)].type}
                                    expiration={expiringDocuments[parseInt(key)].expirationDate}
                                    state={expiringDocuments[parseInt(key)].state}
                                    images={expiringDocuments[parseInt(key)].photos}
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