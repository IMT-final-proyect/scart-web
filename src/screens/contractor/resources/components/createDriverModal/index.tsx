import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { Button, Grid, TextField, } from '@material-ui/core';
import useStyles from './styles';
import { useCallback, useState } from 'react';
import moment from 'moment';
import CustomSnackbar from '../../../../../components/customSnackbar';

interface Props{
    addDriver: (
        username: string,
        password: string,
        name: string,
        surname: string,
        email: string,
        cuit: string,
        phone: string,
        birthdate: moment.Moment,
        street: string,
        number: number,
        city: string,
        province: string,
        zipCode: string ) => void
    setOpenDriverModal: React.Dispatch<React.SetStateAction<boolean>>
}

const CreateDriverModal = ({ addDriver, setOpenDriverModal }: Props) => {
    const classes = useStyles();
    const [emptyField, setEmptyField] = useState(false)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [email, setEmail] = useState('')
    const [cuit, setCuit] = useState('')
    const [phone, setPhone] = useState('')
    const [street, setStreet] = useState('')
    const [number, setNumber] = useState(0)
    const [city, setCity] = useState('')
    const [province, setProvince] = useState('')
    const [zipCode, setZipCode] = useState('')
    const [birthdate, setBirthdate] = useState<moment.Moment | null>(null);
    const [passwordNotRepeated, setPasswordNotRepeated] = useState(false);
    
    const _onChangeUsername = useCallback((event) => {
        setUsername(event.target.value);
    }, [setUsername]);
    
    const _onChangePassword = useCallback((event) => {
        setPassword(event.target.value);
    }, [setPassword]);

    const _onChangeRepeatPassword = useCallback((event) => {
        setRepeatPassword(event.target.value);
    }, [setRepeatPassword]);

    const _onChangeEmail = useCallback((event) => {
        setEmail(event.target.value);
    }, [setEmail]);

    const _onChangePhone = useCallback((event) => {
        if (!event.target.value.includes("-") && !event.target.value.includes(" "))
            setPhone(event.target.value);
    }, [setPhone]);

    const _onChangeName = useCallback((event) => {
        setName(event.target.value);
    }, [setName]);
    
    const _onChangeSurname = useCallback((event) => {
        setSurname(event.target.value);
    }, [setSurname]);
    
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
        if(!!username && !!password && !!repeatPassword && !!name && !!surname && !!cuit && !!birthdate && !!email){
            if (password === repeatPassword){
                addDriver(username, password, name, surname, email, cuit, phone, moment(birthdate), street, number, city, province, zipCode);
                setOpenDriverModal(false);
            } else {
                setPasswordNotRepeated(true);
            }
        }
        else{
            setEmptyField(true);
        }
    }

    return (
        <Grid className={classes.modal} container direction='column' justify='center' alignItems='center'>
                <text className={classes.title}>Crear conductor</text>
                <text className={classes.subtitle}>Registrar un nuevo conductor</text>
                <Grid item>
                    <TextField
                        id="driver-username"
                        className= {classes.textInput}
                        size="medium"
                        label="Nombre de usuario"
                        value={username}
                        onChange={_onChangeUsername}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        id="driver-password"
                        type='password'
                        className= {classes.textInput}
                        size="medium"
                        label="Contrase??a"
                        value={password}
                        onChange={_onChangePassword}
                    />
                    <TextField
                        id="driver-repeatpassword"
                        type='password'
                        className= {classes.textInput}
                        size="medium"
                        label="Repetir contrase??a"
                        value={repeatPassword}
                        onChange={_onChangeRepeatPassword}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        id="driver-name"
                        className= {classes.textInput}
                        size="medium"
                        label="Nombre"
                        value={name}
                        onChange={_onChangeName}
                    />
                    <TextField
                        id="driver-surname"
                        className= {classes.textInput}
                        size="medium"
                        label="Apellido"
                        value={surname}
                        onChange={_onChangeSurname}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        id="driver-cuit"
                        className= {classes.textInput}
                        size="medium"
                        label="CUIT"
                        value={cuit}
                        onChange={_onChangeCuit}
                    />
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
                <Grid>
                    <TextField
                        id="driver-email"
                        className= {classes.textInput}
                        size="medium"
                        label="Email"
                        value={email}
                        onChange={_onChangeEmail}
                    />
                    <TextField
                        id="driver-phone"
                        className= {classes.textInput}
                        size="medium"
                        label="Telefono"
                        value={phone}
                        onChange={_onChangePhone}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        id="driver-street"
                        className= {classes.textInput}
                        size="medium"
                        label="Calle"
                        value={street}
                        onChange={_onChangeStreet}
                    />
                     <TextField
                        id="driver-number"
                        className= {classes.textInput}
                        size="medium"
                        type='number'
                        label="Numero"
                        value={number}
                        onChange={_onChangeNumber}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        id="driver-city"
                        className= {classes.lastTextInput}
                        size="medium"
                        label="Ciudad"
                        value={city}
                        onChange={_onChangeCity}
                    />
                     <TextField
                        id="driver-province"
                        className= {classes.lastTextInput}
                        size="medium"
                        label="Provincia"
                        value={province}
                        onChange={_onChangeProvince}
                    />
                     <TextField
                        id="driver-zipCode"
                        className= {classes.lastTextInput}
                        size="medium"
                        label="Codigo Postal"
                        value={zipCode}
                        onChange={_onChangeZipCode}
                    />
                </Grid>
                <CustomSnackbar open={emptyField} message='Falta completar alg??n campo' type='error' onClose={() => setEmptyField(false)} />
                <CustomSnackbar open={passwordNotRepeated} message={'Las contrase??as no coinciden'} type='error' onClose={() => setPasswordNotRepeated(false)} />
                <Grid container direction='row' justifyContent='space-between'>
                    <Button variant="contained" className={classes.cancel} onClick={ () => setOpenDriverModal(false)}>Cancelar</Button>
                    <Button variant="contained" color='primary' onClick={_handleOnClick}>Crear</Button>
                </Grid>
            </Grid>
    )
}

export default CreateDriverModal