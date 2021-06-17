import React, { useCallback, useState } from 'react';
import { Grid, Card, Typography, makeStyles, Container, Theme, Button, TextField, InputAdornment, IconButton } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import ClearIcon from '@material-ui/icons/Clear';
import globalColors from '../../utils/styles/globalColors';
import { Visibility, VisibilityOff } from '@material-ui/icons';

const useStyles = makeStyles((theme: Theme) => ({
    container:{
        backgroundColor: globalColors.grey,
        height: '100vh',
        margin: 0,
        padding: 0,
    },
    card:{
        padding: '5%',
    },
    row: {
        marginTop: '3%',
        marginBottom: '5%',
    },
    title: {
        textAlign: 'center',
        fontSize: 17,
        fontWeight: 'bold',
    },
    textInput: {
        color: globalColors.lightBlue,
    },
    buttonContainer:{
        marginTop: '20%',
    },
    button: {
        backgroundColor: globalColors.lightBlue,
        color: globalColors.white,
        fontSize: 15,
        margin: 'auto',
    },
}));

const Login = () => {
    const classes = useStyles();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false)

    const _onChangeUsername = useCallback((event) => {
        setUsername(event.target.value);
        
    }, [setUsername]);

    const _onClearUsername= useCallback(() => {
        setUsername('');
    }, [setUsername]);

    const _onChangePassword = useCallback((event) => {
        setPassword(event.target.value);
    }, [setPassword]);

    const _onShowPassword = () => {
        setShowPassword(!showPassword);
        console.log(showPassword);
    }

    const _onLogIn = () => {
        console.log('Log In with ',username, password);
        
    }

    return(
            <Grid
                className={classes.container}
                container
                justify="center"
                alignItems="center"
            >
                <Card className={classes.card}>
                    <CardContent>
                        <div className={classes.row}>
                            <Typography className={classes.title}>
                                BIENVENIDOS
                            </Typography>
                        </div>
                        <div className={classes.row}>
                            <TextField
                                id="standard-basic"
                                className= {classes.textInput}
                                size="small"
                                label="CUIT"
                                value={username}
                                onChange={_onChangeUsername}
                                InputProps={{
                                    endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="Clear username"
                                            onClick={_onClearUsername}
                                        >
                                            <ClearIcon/>
                                        </IconButton>
                                    </InputAdornment>
                                    ),
                                }}
                            />
                        </div>
                        <div className={classes.row}>
                        <TextField
                                id="standard-basic"
                                size="small"
                                type={showPassword ? 'text' : 'password'}
                                label="Contraseña"
                                value={password}
                                onChange={_onChangePassword}
                                InputProps={{
                                    endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="Show password"
                                            onClick={_onShowPassword}
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                    ),
                                }}
                            />
                        </div>
                        <Grid
                            container
                            justify="center"
                            alignItems="center"
                            className = {classes.buttonContainer}
                        >
                            <Button variant="contained" className={classes.button} onClick={_onLogIn} >
                                <Typography className={classes.button}>
                                    Iniciar Sesion
                                </Typography>
                            </Button>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
    )
}

export default Login;
