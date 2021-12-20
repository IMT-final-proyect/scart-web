import { Button, Grid, Snackbar, TextField, } from '@material-ui/core';
import useStyles from './styles';
import { useCallback, useState } from 'react';
import { Alert } from '@mui/material';
import CustomSnackbar from '../../../../../components/customSnackbar';

interface Props{
    addVehicle: (brand: string, model: string, year: string, plate: string) => void
    setOpenVehicleModal: React.Dispatch<React.SetStateAction<boolean>>
}

const CreateVehicleModal = ({ addVehicle, setOpenVehicleModal }: Props) => {
    const classes = useStyles();
    const [emptyField, setEmptyField] = useState(false)
    const [plate, setPlate] = useState('')
    const [brand, setBrand] = useState('')
    const [model, setModel] = useState('')
    const [año, setAño] = useState('')
    
    const _onChangePlate = useCallback((event) => {
        setPlate((event.target.value).toUpperCase());
    }, [setPlate]);

    const _onChangeBrand = useCallback((event) => {
        setBrand(event.target.value);
    }, [setBrand]);
    
    const _onChangeModel = useCallback((event) => {
        setModel(event.target.value);
    }, [setModel]);
    
    const _onChangeAño = useCallback((event) => {
        setAño(event.target.value);
    }, [setAño]);

    const _handleOnClick = () => {
        if(!!brand && !!model && !!año && !!plate){
            addVehicle(brand, model, año, plate)
            setOpenVehicleModal(false)
        }
        else{
            setEmptyField(true)
        }
    }

    return (
        <Grid className={classes.modal} container direction='column' justify='center' alignItems='center'>
                <text className={classes.title}>Crear vehículo</text>
                <text className={classes.subtitle}>Registrar un nuevo vehículo</text>
                <TextField
                    id="vehicle-plate"
                    className= {classes.textInput}
                    size="medium"
                    label="Patente"
                    value={plate}
                    onChange={_onChangePlate}
                />
                <TextField
                    id="vehicle-year"
                    className= {classes.textInput}
                    size="medium"
                    label="Año"
                    value={año}
                    onChange={_onChangeAño}
                />
                <TextField
                    id="vehicle-brand"
                    className= {classes.textInput}
                    size="medium"
                    label="Marca"
                    value={brand}
                    onChange={_onChangeBrand}
                />
                <TextField
                    id="vehicle-model"
                    className= {classes.textInput}
                    size="medium"
                    label="Modelo"
                    value={model}
                    onChange={_onChangeModel}
                />
                <CustomSnackbar open={emptyField} message='Falta completar algún campo' type='error' onClose={() => setEmptyField(false)} />
                <Grid container direction='row' className={classes.buttonContainer} justifyContent='space-between'>
                    <Button variant="contained" className={classes.cancel} onClick={ () => setOpenVehicleModal(false)}>Cancelar</Button>
                    <Button variant="contained" color='primary' onClick={_handleOnClick}>Crear</Button>
                </Grid>
            </Grid>
    )
}

export default CreateVehicleModal