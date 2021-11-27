import React, { useEffect, useState } from 'react';

import useStyles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { getContractorData } from '../../../redux/slices/userSlice';
import { RootState } from '../../../redux/rootReducer';
import { getContractorExpiringDocuments } from '../../../redux/slices/documentsSlice';
import DriversCard from './components/driversCard';
import VehiclesCard from './components/vehicleCard';
import { IDocument, IDriver, IVehicle } from '../../../utils/interfaces';
import { Button, Card, Grid, Typography } from '@material-ui/core';
import { ROUTES } from '../navigation/routes';
import DocumentRow from '../documentation/components/documentRow/DocumentRow';
import { Link } from 'react-router-dom';
import { getInvalidDrivers, getInvalidVehicles, getPendingDrivers, getPendingVehicles } from '../../../redux/slices/contractorsSlice';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import moment from 'moment';

const Home = () => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const [date, setDate] = useState<moment.Moment | null>()
    const id = useSelector((state: RootState) => state.user.accountData?.entityId)
    const invalidDrivers: IDriver[] = useSelector((state: RootState) => state.contractors.invalid.drivers);
    const pendingDrivers: IDriver[] = useSelector((state: RootState) => state.contractors.pending.drivers);
    const invalidVehicles: IVehicle[] = useSelector((state: RootState) => state.contractors.invalid.vehicles);
    const pendingVehicles: IVehicle[] = useSelector((state: RootState) => state.contractors.pending.vehicles);
    const contractorExpiringDocuments: IDocument[] = useSelector((state: RootState) => state.documents.contractor.expiring);

    useEffect(() => {
      if(!!id){
          dispatch(getContractorData(id))
          dispatch(getInvalidDrivers(id))
          dispatch(getInvalidVehicles(id))
          dispatch(getPendingDrivers(id))
          dispatch(getPendingVehicles(id))
          dispatch(getContractorExpiringDocuments(id, date))
      }
    }, [date, dispatch, id])

    useEffect(() => {
        dispatch(getContractorExpiringDocuments(id, date))
    }, [date, dispatch, id])

    const handleDateChange = (d: moment.Moment | null) => {
        setDate(d);
      };


    return (
        <Grid className={classes.container}>
            <Grid className={classes.cardContainer}>
                <DriversCard 
                    invalid={Object.keys(invalidDrivers).length} 
                    pending={Object.keys(pendingDrivers).length} 
                />
                <VehiclesCard 
                    invalid={Object.keys(invalidVehicles).length}
                    pending={Object.keys(pendingVehicles).length}
                />
            </Grid>
            <Grid container className={classes.container} direction='row' justifyContent='space-between' >
            <Card className={classes.leftCard}>
                <Grid className={classes.documentHeaderContainer} container justifyContent='space-between' alignItems='center'>
                    <text className={classes.textTitle}>
                        Documentación por vencer
                    </text>
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                        <KeyboardDatePicker
                            autoOk
                            disablePast
                            variant="inline"
                            format="DD/MM/yyyy"
                            id="days"
                            label="Fecha"
                            value={date}
                            onChange={handleDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </MuiPickersUtilsProvider>
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
                                />
                            </Button>
                            )}
                        </Grid>
                    </>
                }
                </Card>
            </Grid>
        </Grid>
    )
}

export default Home;