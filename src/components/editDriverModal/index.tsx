import MomentUtils from "@date-io/moment";
import { Checkbox, FormControlLabel, Grid, Button } from "@material-ui/core";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { TextField } from "@mui/material"
import moment from "moment";
import { useCallback, useState } from "react";
import { IUser } from "../../redux/slices/userSlice";
import { IDriver } from "../../utils/interfaces";
import CustomSnackbar from "../customSnackbar";
import useStyles from './styles';

interface Props{
    driver: IDriver | IUser
    changePassword: boolean
    editDriver: (
        driver: IDriver | IUser, 
        name: string, 
        surname: string, 
        username: string,
        phone: string,
        cuit: string, 
        birthdate: moment.Moment, 
        street: string,
        number: number,
        city: string,
        province: string,
        zipCode: string,
        password?: string) => void
    setOpenEditDriverModal: React.Dispatch<React.SetStateAction<boolean>>
    setChangePassword: React.Dispatch<React.SetStateAction<boolean>>
}

const EditDriverModal = ( {driver, changePassword, editDriver, setOpenEditDriverModal, setChangePassword }: Props ) => {
    const classes = useStyles();
    const [error, setError] = useState(false)
    const [name, setName] = useState(driver?.name)
    const [surname, setSurname] = useState(driver?.surname)
    const [username, setUsername] = useState(driver?.username)
    const [phone, setPhone] = useState(driver?.phone)
    const [cuit, setCuit] = useState(driver?.cuit)
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    const [street, setStreet] = useState('')
    const [number, setNumber] = useState(0)
    const [city, setCity] = useState('')
    const [province, setProvince] = useState('')
    const [zipCode, setZipCode] = useState('')
    const [birthdate, setBirthdate] = useState<moment.Moment | null>(moment(driver?.birth_date));
    
    const _onChangePassword = useCallback((event) => {
        setPassword(event.target.value);
    }, [setPassword]);

    const _onChangeRepeatPassword = useCallback((event) => {
        setRepeatPassword(event.target.value);
    }, [setRepeatPassword]);

    const _onChangeName = useCallback((event) => {
        setName(event.target.value);
    }, [setName]);
    
    const _onChangeSurname = useCallback((event) => {
        setSurname(event.target.value);
    }, [setSurname]);

    const _onChangeUsername = useCallback((event) => {
        setUsername(event.target.value);
    }, [setUsername]);

    const _onChangePhone = useCallback((event) => {
        setPhone(event.target.value);
    }, [setPhone]);
    
    const _onChangeCuit = useCallback((event) => {
        if (!event.target.value.includes("-") && !event.target.value.includes(" "))
            setCuit(event.target.value);
    }, [setCuit]);
    
    const handleBirthdateChange = (date: moment.Moment | null) => {
        setBirthdate(date);
    };

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
        if(!!name && !!surname && !!cuit && !!birthdate && !!username){
            if(cuit.length === 11){
                if (changePassword){
                    if (password === repeatPassword){
                        editDriver(driver, name, surname, username, cuit, phone, moment(birthdate), street, number, city, province, zipCode, password);
                        setOpenEditDriverModal(false);
                    }
                    else {
                        setError(true)
                        setMessage('Las contraseñas no coiniciden')
                    }
                }
                else {
                    editDriver(driver, name, surname, username, cuit, phone, moment(birthdate), street, number, city, province, zipCode);
                    setOpenEditDriverModal(false);
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
            <Grid container className={classes.modal} justify='space-between' >
                <Grid container>
                    <text className={classes.title}>Editar conductor</text>
                </Grid>
                <Grid container>
                    <Grid item xs={4}>
                        <TextField
                            id="driver-name"
                            variant="standard"
                            className= {classes.textInput}
                            size="medium"
                            label="Nombre"
                            value={name}
                            onChange={_onChangeName}
                        />
                        </Grid>
                        <Grid item xs={4}>
                        <TextField
                            id="driver-surname"
                            variant="standard"
                            className= {classes.textInput}
                            size="medium"
                            label="Apellido"
                            value={surname}
                            onChange={_onChangeSurname}
                        />
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={4}>
                        <TextField
                            id="driver-username"
                            variant="standard"
                            className= {classes.textInput}
                            size="medium"
                            label="Usuario"
                            value={username}
                            onChange={_onChangeUsername}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            id="driver-cuit"
                            variant="standard"
                            className= {classes.textInput}
                            size="medium"
                            label="CUIT"
                            value={cuit}
                            onChange={_onChangeCuit}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <MuiPickersUtilsProvider utils={MomentUtils}>
                            <KeyboardDatePicker
                                className={classes.textInput}
                                autoOk
                                disableFuture
                                variant="inline"
                                format="DD/MM/yyyy"
                                id="birthdate"
                                label="Fecha de nacimiento"
                                value={birthdate}
                                onChange={handleBirthdateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </MuiPickersUtilsProvider>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={4}>
                        <TextField
                            id="driver-street"
                            variant="standard"
                            className= {classes.textInput}
                            size="medium"
                            label="Calle"
                            value={street}
                            onChange={_onChangeStreet}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            id="driver-number"
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
                <Grid container>
                    <Grid item xs={4}>
                        <TextField
                            id="driver-city"
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
                            id="driver-province"
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
                            id="driver-zipCode"
                            variant="standard"
                            className= {classes.lastTextInput}
                            size="medium"
                            label="Codigo Postal"
                            value={zipCode}
                            onChange={_onChangeZipCode}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            id="driver-phone"
                            variant="standard"
                            className= {classes.lastTextInput}
                            size="medium"
                            label="Telefono"
                            value={phone}
                            onChange={_onChangePhone}
                        />
                    </Grid>
                </Grid>
                <Grid container className={classes.checkbox}>
                    <FormControlLabel control={<Checkbox  defaultChecked checked={changePassword} onChange={() => {setChangePassword(!changePassword)}} />} label="Cambiar contraseña" />
                </Grid>
                    <Grid item xs={4} className={classes.passwords}>
                        <TextField
                            id="driver-password"
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
                    <Grid item xs={4} className={classes.passwords}>
                        <TextField
                            id="driver-repeatpassword"
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
                <CustomSnackbar open={error} message={message} type='error' onClose={() => setError(false)} />
                <Grid container direction='row' justifyContent='space-between'>
                    <Button variant="contained" className={classes.cancel} onClick={ () => setOpenEditDriverModal(false)}>Cancelar</Button>
                    <Button variant="contained" color='primary' onClick={_handleOnClick}>Editar</Button>
                </Grid>
            </Grid>
    )
}

export default EditDriverModal