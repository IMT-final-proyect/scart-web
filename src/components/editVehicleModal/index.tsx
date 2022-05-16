/* eslint-disable array-callback-return */
import { Grid, Button } from "@material-ui/core";
import { TextField } from "@mui/material"
import { useCallback, useEffect, useState } from "react";
import { IVehicle, IVehicleType } from "../../utils/interfaces";
import CustomSnackbar from "../customSnackbar";
import CustomSelect from '../customSelect'
import useStyles from './styles';
import { getVehicleTypes } from "../../redux/slices/resourcesSlice";

interface Props{
    vehicle: IVehicle
    editVehicle: (vehicle: IVehicle, plate: string, type: number, brand: string, model: string, year: number) => void
    setOpenEditVehicleModal: React.Dispatch<React.SetStateAction<boolean>>
}

const EditDriverModal = ( { vehicle, editVehicle, setOpenEditVehicleModal }: Props ) => {
    const classes = useStyles();
    const [emptyField, setEmptyField] = useState(false)
    const [plate, setPlate] = useState(vehicle.plate)
    const [type, setType] = useState(vehicle?.type?.name)
    const [brand, setBrand] = useState(vehicle.brand)
    const [model, setModel] = useState(vehicle.model)
    const [year, setYear] = useState(vehicle.year);
    const [typeNames, setTypeNames] = useState<{name: string} []>([])
    const [typeError, setTypeError] = useState(false)
    const [types, setTypes] = useState<IVehicleType[]>([])

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        try{
            const response = await getVehicleTypes()
            setTypes(response.data)
            let typeNamesAux: {name: string} [] = [] 
            Object.keys(response.data).map(index => {
                typeNamesAux.push({name: response.data[index].name})
            }) 
            setTypeNames(typeNamesAux)
        }
        catch (e) {
            setTypeError(true)
        }
    }
    
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
        if(!!plate && !!brand && !!type && !!model && !!year){
            const selectedType = types.filter((item) => item.name === type)
            editVehicle(vehicle, plate, selectedType[0].id, brand, model, year);
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
                    <CustomSelect value={type} placeholder='Tipo de vehiculo' setValue={setType} data={typeNames} />
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
                <CustomSnackbar open={emptyField} message='Falta completar algún campo' type='error' onClose={() => setEmptyField(false)} />
                <CustomSnackbar open={typeError} message='No se pudo obtener los tipos de vehiculo' type='error' onClose={() => setTypeError(false)} />
                <Grid container className={classes.buttons} direction='row' justifyContent='space-between'>
                    <Button variant="contained" className={classes.cancel} onClick={ () => setOpenEditVehicleModal(false)}>Cancelar</Button>
                    <Button variant="contained" color='primary' onClick={_handleOnClick}>Editar</Button>
                </Grid>
            </Grid>
    )
}

export default EditDriverModal