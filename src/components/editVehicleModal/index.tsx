import MomentUtils from "@date-io/moment";
import { Grid, Button } from "@material-ui/core";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { Alert, Snackbar, TextField } from "@mui/material"
import moment from "moment";
import { useCallback, useEffect, useState } from "react";
import { IVehicle } from "../../utils/interfaces";
import useStyles from './styles';

interface Props{
    vehicle: IVehicle
    editVehicle: (vehicle: IVehicle, plate: string, brand: string, model: string, year: number) => void
    setOpenEditVehicleModal: React.Dispatch<React.SetStateAction<boolean>>
}

const EditDriverModal = ( { vehicle, editVehicle, setOpenEditVehicleModal }: Props ) => {
    const classes = useStyles();
    const [emptyField, setEmptyField] = useState(false)
    const [plate, setPlate] = useState(vehicle.plate)
    const [brand, setBrand] = useState(vehicle.brand)
    const [model, setModel] = useState(vehicle.model)
    const [year, setYear] = useState(vehicle.year);

    const _onChangePlate = useCallback((event) => {
        if (!event.target.value.includes("-") && !event.target.value.includes(" "))
            setPlate(event.target.value)
    }, [setPlate]);

    const _onChangeBrand = useCallback((event) => {
        setBrand(event.target.value);
    }, [setBrand]);
    
    const _onChangeModel = useCallback((event) => {
        setModel(event.target.value);
    }, [setModel]);
    
    const _onChangeYear = useCallback((event) => {
        setYear(event.target.value);
    }, [setYear]);

      const _handleOnClick = () => {
        if(!!plate && !!brand && !!model && !!year){
            editVehicle(vehicle, plate, brand, model, year);
            setOpenEditVehicleModal(false);
        }
        else{
            setEmptyField(true);
        }
    }

    return (
            <Grid container className={classes.modal} direction='column' justify='center' alignItems='center'>
                <text className={classes.title}>Editar vehiculo</text>
                <Grid container className= {classes.inputContainer}>
                    <TextField
                        id="vehicle-plate"
                        variant="standard"
                        className= {classes.textInput}
                        size="medium"
                        label="Patente"
                        value={plate}
                        onChange={_onChangePlate}
                    />
                </Grid>
                <Grid container className= {classes.inputContainer}>
                    <TextField
                        id="vehicle-brand"
                        variant="standard"
                        className= {classes.textInput}
                        size="medium"
                        label="Marca"
                        value={brand}
                        onChange={_onChangeBrand}
                    />
                </Grid>
                <Grid container className= {classes.inputContainer}>
                    <TextField
                        id="vehicle-model"
                        variant="standard"
                        className= {classes.textInput}
                        size="medium"
                        label="modelo"
                        value={model}
                        onChange={_onChangeModel}
                    />
                </Grid>
                <Grid container className= {classes.inputContainer}>
                    <TextField
                        id="vehicle-year"
                        variant="standard"
                        className= {classes.textInput}
                        size="medium"
                        label="Año"
                        type="number"
                        value={year}
                        onChange={_onChangeYear}
                    />
                </Grid>
                <Snackbar className={classes.snackbar} open={emptyField} autoHideDuration={6000} onClose={() => setEmptyField(false)} >
                    <Alert onClose={() => setEmptyField(false)} severity="error" sx={{ width: '100%' }}>
                        Falta completar algún campo
                    </Alert>
                </Snackbar>
                <Grid container className={classes.buttons} direction='row' justifyContent='space-between'>
                    <Button variant="contained" className={classes.cancel} onClick={ () => setOpenEditVehicleModal(false)}>Cancelar</Button>
                    <Button variant="contained" color='primary' onClick={_handleOnClick}>Editar</Button>
                </Grid>
            </Grid>
    )
}

export default EditDriverModal