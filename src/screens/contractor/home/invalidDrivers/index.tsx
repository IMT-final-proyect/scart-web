import { Button, Card, CircularProgress, Grid, Typography } from "@material-ui/core"
import useStyles from './styles';
import CustomInput from '../../../../components/customInput'
import { IDriver } from "../../../../utils/interfaces";
import { ROUTES } from "../../navigation/routes";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Driver from "../components/driverRow";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/rootReducer";
import { getInvalidDrivers } from "../../../../redux/slices/contractorsSlice";
import globalColors from "../../../../utils/styles/globalColors";

const InvalidDrivers = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const [searchName, setSearchName] = useState('')
    const [searchDocument, setSearchDocument] = useState('')
    const [driversFiltered, setDriversFiltered] = useState<IDriver[]>([])
    const contractorId = useSelector((state: RootState) => state.user.accountData?.entityId)
    const [loadingDriversFilter, setLoadingDriversFilter] = useState(false)
    const drivers = useSelector((state: RootState) => state.contractors.invalid.drivers)
    const loadingDrivers = useSelector((state: RootState) => state.contractors.invalid.loading)
    
    useEffect(() => {
        if (!!contractorId) dispatch(getInvalidDrivers(contractorId))
    }, [contractorId, dispatch])

    useEffect(() => {
        setDriversFiltered(() => {
            let driversAux: IDriver[] = []
            Object.keys(drivers).map((key: string, i: any) => {
                driversAux.push(drivers[parseInt(key)])
            })
            return driversAux
        })
    }, [drivers])

    useEffect(() => {
        setLoadingDriversFilter(true)
        let driversAux: IDriver[] = []
        if(searchName !== '' || searchDocument !== ''){
            if(searchDocument === ''){
                Object.keys(drivers).map((key: string, i: any) => {
                    const driverName = drivers[parseInt(key)].name.toUpperCase() + ' ' + drivers[parseInt(key)].surname.toUpperCase()
                    if (driverName.includes(searchName.toUpperCase()))
                    driversAux.push(drivers[parseInt(key)])
                })
            }
            else{
                if(searchName === ''){
                    Object.keys(drivers).map((key: string, i: any) => {
                        if (drivers[parseInt(key)].cuit.includes(searchDocument))
                        driversAux.push(drivers[parseInt(key)])
                    })
                }
                else{
                    Object.keys(drivers).map((key: string, i: any) => {
                        const driverName = drivers[parseInt(key)].name.toUpperCase() + ' ' + drivers[parseInt(key)].surname.toUpperCase()
                        if (driverName.includes(searchName.toUpperCase()) && drivers[parseInt(key)].cuit.includes(searchDocument))
                        driversAux.push(drivers[parseInt(key)])
                    })
                }
            }
        }
        else{
            Object.keys(drivers).map((key: string, i: any) => {
                driversAux.push(drivers[parseInt(key)])
            })
        }
        setDriversFiltered(driversAux)
        setLoadingDriversFilter(false)
    }, [searchName, searchDocument, drivers])

    return (
        <Grid container className={classes.container} direction='row' justifyContent='space-between'>
            <Card className={classes.card}>
                <Grid container justifyContent='space-between'>
                    <text className={classes.textTitle}>
                        Conductores con documentación fuera de regla
                    </text>
                </Grid>
                <Typography className={classes.searchTitle}> Filtar por </Typography>
                <Grid className={classes.inputContainer} container  direction='row' justifyContent='space-between' >
                        <Grid item xs={10} md={5}>
                            <CustomInput variant='outlined' className={classes.input} value={searchName} setValue={setSearchName} placeholder={'Nombre + Apellido'} size='small' />
                        </Grid>
                        <Grid item xs={10} md={5}>
                            <CustomInput variant='outlined' className={classes.input} value={searchDocument} setValue={setSearchDocument}  placeholder={'Documento'} size='small'/>
                        </Grid>
                </Grid>
            </Card> 
            {loadingDriversFilter || loadingDrivers ?
                <Grid container alignContent='center' justifyContent='center' >
                    <CircularProgress className={classes.spinner} />
                </Grid>
                :
                <Card className={classes.vehicleCard}>
                    {Object.keys(drivers).length === 0 ?
                        <text className={classes.textCenter}> No existen conductores asociados</text>
                        :
                        <>
                            <Grid container justifyContent='space-between'>
                                <Grid item xs={3} className={classes.headerText}>
                                    <text className={classes.headerText}>
                                        Conductor
                                    </text>
                                </Grid>
                                <Grid item xs={3} className={classes.headerText}>
                                    <text className={classes.headerText}>
                                        Documento
                                    </text>
                                </Grid>
                                <Grid item xs={3} className={classes.headerText}>
                                    <text className={classes.headerText}>
                                        Fecha Nac.
                                    </text>
                                </Grid>
                                <Grid item xs={3} className={classes.headerText}>
                                    <text className={classes.headerText}>
                                        Estado
                                    </text>
                                </Grid>
                            </Grid>
                            <Grid container direction='column' justifyContent='space-between' >
                                {Object.keys(driversFiltered).map((key: string, i: any) =>
                                    <Button
                                        key={i}
                                        className={classes.button}
                                        component={Link}
                                        to={ROUTES.root+ROUTES.driver+'/'+driversFiltered[parseInt(key)].id}
                                    >  
                                        <Driver 
                                            name={driversFiltered[parseInt(key)].name}
                                            surname={driversFiltered[parseInt(key)].surname}
                                            document={driversFiltered[parseInt(key)].cuit}
                                            state='Fuera de regla'
                                            color={globalColors.red}
                                            birthday={driversFiltered[parseInt(key)].birth_date}
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

export default InvalidDrivers