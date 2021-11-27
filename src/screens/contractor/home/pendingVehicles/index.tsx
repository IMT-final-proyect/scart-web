import { Button, Card, CircularProgress, Grid, Typography } from "@material-ui/core"
import useStyles from './styles';
import CustomInput from '../../../../components/customInput'
import { IVehicle } from "../../../../utils/interfaces";
import { ROUTES } from "../../navigation/routes";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/rootReducer";
import { getPendingVehicles } from "../../../../redux/slices/contractorsSlice";
import Driver from "../components/driverRow";
import globalColors from "../../../../utils/styles/globalColors";
import Vehicle from "../components/vehicleRow";

const PendingVehicles = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const [searchPlate, setSearchPlate] = useState('')
    const [vehiclesFiltered, setVehiclesFiltered] = useState<IVehicle[]>([])
    const contractorId = useSelector((state: RootState) => state.user.accountData?.entityId)
    const [loadingVehiclesFilter, setLoadingVehiclesFilter] = useState(false)
    const vehicles = useSelector((state: RootState) => state.contractors.pending.vehicles)
    const loadingVehicles = useSelector((state: RootState) => state.contractors.pending.loading)
    
    useEffect(() => {
        if (!!contractorId) dispatch(getPendingVehicles(contractorId))
    }, [contractorId, dispatch])

    useEffect(() => {
        setVehiclesFiltered(() => {
            let vehiclesAux: IVehicle[] = []
            Object.keys(vehicles).map((key: string, i: any) => {
                vehiclesAux.push(vehicles[parseInt(key)])
            })
            return vehiclesAux
        })
    }, [vehicles])

    useEffect(() => {
        setLoadingVehiclesFilter(true)
        let vehiclesAux: IVehicle[] = []
        if(searchPlate !== ''){
            Object.keys(vehicles).map((key: string, i: any) => {
                const vehiclePlate = vehicles[parseInt(key)].plate.toUpperCase()
                if (vehiclePlate.includes(searchPlate.toUpperCase()))
                    vehiclesAux.push(vehicles[parseInt(key)])
            })
        }
        else{
            Object.keys(vehicles).map((key: string, i: any) => {
                vehiclesAux.push(vehicles[parseInt(key)])
            })
        }
        setVehiclesFiltered(vehiclesAux)
        setLoadingVehiclesFilter(false)
    }, [searchPlate, vehicles])

    return (
        <Grid container className={classes.container} direction='row' justifyContent='space-between'>
            <Card className={classes.card}>
                <Grid container justifyContent='space-between'>
                    <text className={classes.textTitle}>
                        Vehiculos con documentación pendiente de revisión
                    </text>
                </Grid>
                <Typography className={classes.searchTitle}> Filtar por </Typography>
                <Grid className={classes.inputContainer} container  direction='row' justifyContent='space-between' >
                        <Grid item xs={10} md={5}>
                            <CustomInput variant='outlined' className={classes.input} value={searchPlate} setValue={setSearchPlate} placeholder={'Patente'} size='small' />
                        </Grid>
                </Grid>
            </Card> 
            {loadingVehiclesFilter || loadingVehicles ?
                <Grid container alignContent='center' justifyContent='center' >
                    <CircularProgress className={classes.spinner} />
                </Grid>
                :
                <Card className={classes.vehicleCard}>
                    {Object.keys(vehicles).length === 0 ?
                        <text className={classes.textCenter}> No existen vehiculos asociados</text>
                        :
                        <>
                            <Grid container justifyContent='space-between'>
                                <Grid item xs={3} className={classes.headerText}>
                                    <text className={classes.headerText}>
                                        Marca
                                    </text>
                                </Grid>
                                <Grid item xs={3} className={classes.headerText}>
                                    <text className={classes.headerText}>
                                        Modelo
                                    </text>
                                </Grid>
                                <Grid item xs={3} className={classes.headerText}>
                                    <text className={classes.headerText}>
                                        Patente
                                    </text>
                                </Grid>
                                <Grid item xs={3} className={classes.headerText}>
                                    <text className={classes.headerText}>
                                        Estado
                                    </text>
                                </Grid>
                            </Grid>
                            <Grid container direction='column' justifyContent='space-between' >
                                {Object.keys(vehiclesFiltered).map((key: string, i: any) =>
                                    <Button
                                        key={i}
                                        className={classes.button}
                                        component={Link}
                                        to={ROUTES.root+ROUTES.vehicle+'/'+vehiclesFiltered[parseInt(key)].id}
                                    >  
                                        <Vehicle 
                                            brand={vehiclesFiltered[parseInt(key)].brand}
                                            model={vehiclesFiltered[parseInt(key)].model}
                                            plate={vehiclesFiltered[parseInt(key)].plate}
                                            id={vehiclesFiltered[parseInt(key)].id}
                                            state='Pendiente de evaluacion'
                                            color={globalColors.yellow}
                                        />
                                    </Button>
                                )}
                            </Grid>
                        </>
                    }
                </Card>
            }
        </Grid>
    )
}

export default PendingVehicles