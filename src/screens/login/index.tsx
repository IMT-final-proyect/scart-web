import React, { useCallback, useEffect, useState } from 'react';
import { Grid, Card, Typography, Button, TextField, InputAdornment, IconButton } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import ClearIcon from '@material-ui/icons/Clear';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { postLogin } from '../../redux/slices/userSlice';
import { AppThunkDispatch } from '../../redux/store';
import useStyles from './styles';
import { RootState } from '../../redux/rootReducer';
import { useHistory } from "react-router-dom";
import { ROUTES } from '../contractor/navigation/routes'
import getRolPath from '../../utils/functions/getRolePath';

const Login = () => {
    const history = useHistory();
    const classes = useStyles();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false)
    const dispatch = useDispatch<AppThunkDispatch>();
    const userData = useSelector((state: RootState) => state.user.userData)

    useEffect(() => {
        if(userData){
            switch(userData.rol){
                case (2): history.push(ROUTES.root+ROUTES.home)
            }
        }
    }, [userData])
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
        dispatch(postLogin(username, password));
        const route = getRolPath(userData?.rol)
        history.push(route)
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
