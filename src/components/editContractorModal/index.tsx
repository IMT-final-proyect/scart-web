import { Checkbox, FormControlLabel, Grid, Button } from "@material-ui/core";
import { TextField } from "@mui/material"
import moment from "moment";
import { useCallback, useState } from "react";
import { IUser } from "../../redux/slices/userSlice";
import { IContractor } from "../../utils/interfaces";
import CustomSnackbar from "../customSnackbar";
import useStyles from './styles';

interface Props{
    contractor: IContractor
    changePassword: boolean
    editContractor: (
        contractor: IContractor, 
        name: string, 
        username: string,
        email: string,
        cuit: string,
        street: string,
        number: number,
        city: string,
        province: string,
        zipCode: string,
        password?: string) => void
    setOpenEditContractorModal: React.Dispatch<React.SetStateAction<boolean>>
    setChangePassword: React.Dispatch<React.SetStateAction<boolean>>
}

const EditContractorModal = ( {contractor, changePassword, editContractor, setOpenEditContractorModal, setChangePassword }: Props ) => {
    const classes = useStyles();
    const [error, setError] = useState(false)
    const [name, setName] = useState(contractor?.name)
    const [email, setEmail] = useState(contractor?.email)
    const [username, setUsername] = useState(contractor?.username)
    const [cuit, setCuit] = useState(contractor?.cuit)
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    const [street, setStreet] = useState(contractor?.address?.street)
    const [number, setNumber] = useState(0)
    const [city, setCity] = useState(contractor?.address?.city)
    const [province, setProvince] = useState(contractor?.address?.province)
    const [zipCode, setZipCode] = useState(contractor?.address?.zip_code)
    
    const _onChangePassword = useCallback((event) => {
        setPassword(event.target.value);
    }, [setPassword]);

    const _onChangeRepeatPassword = useCallback((event) => {
        setRepeatPassword(event.target.value);
    }, [setRepeatPassword]);

    const _onChangeName = useCallback((event) => {
        setName(event.target.value);
    }, [setName]);

    const _onChangeEmail = useCallback((event) => {
        setEmail(event.target.value);
    }, [setEmail]);

    const _onChangeUsername = useCallback((event) => {
        setUsername(event.target.value);
    }, [setUsername]);
    
    const _onChangeCuit = useCallback((event) => {
        if (!event.target.value.includes("-") && !event.target.value.includes(" "))
            setCuit(event.target.value);
    }, [setCuit]);

      const _onChangeStreet = useCallback((event) => {
        setStreet(event.target.value);
    }, [setStreet]);

    const _onChangeNumber = useCallback((event) => {
        setNumber(event.target.value);
    }, [setNumber]);

    const _onChangeCity = useCallback((event) => {
        setCity(event.target.value);
    }, [setCity]);

    const _onChangeProvince = useCallback((event) => {
        setProvince(event.target.value);
    }, [setProvince]);

    const _onChangeZipCode = useCallback((event) => {
        setZipCode(event.target.value);
    }, [setZipCode]);


      const _handleOnClick = () => {
        if(!!name && !!cuit){
            if(cuit.length === 11){
                if (changePassword){
                    if (password === repeatPassword){
                        editContractor(contractor, name, username, email, cuit, street, number, city, province, zipCode, password);
                        setOpenEditContractorModal(false);
                    }
                    else {
                        setError(true)
                        setMessage('Las contraseñas no coiniciden')
                    }
                }
                else {
                    editContractor(contractor, name, username, email, cuit, street, number, city, province, zipCode);
                    setOpenEditContractorModal(false);
                };
            }
            else{
                setError(true)
                setMessage('El cuit debe tener 11 digitos')
            }
        }
        else{
            setError(true);
            setMessage('Falta completar algún campo')
        }
    }

    return (
            <Grid container className={classes.modal} direction='column' justify='space-between' alignItems='center'>
                <Grid container>
                    <text className={classes.title}>Editar Contratista</text>
                </Grid>
                <Grid container className={classes.inputsContainer}>
                    <Grid item xs={6}>
                        <TextField
                            id="contractor-name"
                            variant="standard"
                            className= {classes.textInput}
                            size="medium"
                            label="Nombre"
                            value={name}
                            onChange={_onChangeName}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            id="contractor-username"
                            variant="standard"
                            className= {classes.textInput}
                            size="medium"
                            label="Usuario"
                            value={username}
                            onChange={_onChangeUsername}
                        />
                    </Grid>
                </Grid>
                <Grid container className={classes.inputsContainer}>
                    <Grid item xs={6}>
                        <TextField
                            id="contractor-cuit"
                            variant="standard"
                            className= {classes.textInput}
                            size="medium"
                            label="CUIT"
                            value={cuit}
                            onChange={_onChangeCuit}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            id="contractor-email"
                            variant="standard"
                            className= {classes.textInput}
                            size="medium"
                            label="Email"
                            value={email}
                            onChange={_onChangeEmail}
                        />
                    </Grid>
                </Grid>
                <Grid container className={classes.inputsContainer}>
                    <Grid item xs={6}>
                        <TextField
                            id="contractor-street"
                            variant="standard"
                            className= {classes.textInput}
                            size="medium"
                            label="Calle"
                            value={street}
                            onChange={_onChangeStreet}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            id="contractor-number"
                            variant="standard"
                            className= {classes.textInput}
                            size="medium"
                            type='number'
                            label="Numero"
                            value={number}
                            onChange={_onChangeNumber}
                        />
                    </Grid>
                </Grid>
                <Grid container className={classes.inputsContainer}>
                    <Grid item xs={4}>
                        <TextField
                            id="contractor-city"
                            variant="standard"
                            className= {classes.lastTextInput}
                            size="medium"
                            label="Ciudad"
                            value={city}
                            onChange={_onChangeCity}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            id="contractor-province"
                            variant="standard"
                            className= {classes.lastTextInput}
                            size="medium"
                            label="Provincia"
                            value={province}
                            onChange={_onChangeProvince}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            id="contractor-zipCode"
                            variant="standard"
                            className= {classes.lastTextInput}
                            size="medium"
                            label="Codigo Postal"
                            value={zipCode}
                            onChange={_onChangeZipCode}
                        />
                    </Grid>
                </Grid>
                <Grid container className={classes.checkbox}>
                    <FormControlLabel control={<Checkbox defaultChecked color='primary' checked={changePassword} onChange={() => {setChangePassword(!changePassword)}} />} label="Cambiar contraseña" />
                </Grid>
                <Grid container className={classes.passwords}>
                    <Grid item xs={6}>
                        <TextField
                            id="contractor-password"
                            variant="standard"
                            type='password'
                            className= {classes.textInput}
                            size="medium"
                            label="Contraseña"
                            value={password}
                            onChange={_onChangePassword}
                            disabled={!changePassword}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            id="contractor-repeatpassword"
                            variant="standard"
                            type='password'
                            className= {classes.textInput}
                            size="medium"
                            label="Repetir contraseña"
                            value={repeatPassword}
                            onChange={_onChangeRepeatPassword}
                            disabled={!changePassword}
                        />
                    </Grid>
                </Grid>
                <CustomSnackbar open={error} message={message} type='error' onClose={() => setError(false)} />
                <Grid container direction='row' justifyContent='space-between'>
                    <Button variant="contained" className={classes.cancel} onClick={ () => setOpenEditContractorModal(false)}>Cancelar</Button>
                    <Button variant="contained" color='primary' onClick={_handleOnClick}>Editar</Button>
                </Grid>
            </Grid>
    )
}

export default EditContractorModal