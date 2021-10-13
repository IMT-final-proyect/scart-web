import { useCallback, useEffect, useState } from 'react';
import { Grid, Card, Button, TextField, InputAdornment, IconButton, Hidden } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import ClearIcon from '@material-ui/icons/Clear';
import CircularProgress from '@mui/material/CircularProgress';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { postLogin } from '../../redux/slices/userSlice';
import { AppThunkDispatch } from '../../redux/store';
import useStyles from './styles';
import { RootState } from '../../redux/rootReducer';
import { useHistory } from "react-router-dom";
import { getRolPath } from '../../utils/functions/roles';
import LogoNutreco from '../../assets/images/logoNutreco.png'


const Login = () => {
    const history = useHistory();
    const classes = useStyles();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false)
    const dispatch = useDispatch<AppThunkDispatch>();
    const accountData = useSelector((state: RootState) => state.user.accountData)
    const loading = useSelector((state: RootState) => state.user.loading)

    useEffect(() => {
        let route
        if(accountData?.rol !== undefined && accountData?.rol >= 0){
            route = getRolPath(accountData?.rol)
            history.push(route)
        }
    }, [history, accountData])

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
    }

    const handleKeyDown = (event: any) => {
        if (event.key === 'Enter') {
            dispatch(postLogin(username, password));
        }
      }

    const _onLogIn = () => {
        dispatch(postLogin(username, password));
    }

    return(
            <Grid
                className={classes.container}
                container
                direction= "column"
                justify="center"
                alignItems="center"
            >
                <Hidden only={["xs","sm"]}>
                    <img className={classes.logoNutreco} src={LogoNutreco}/>
                </Hidden>
                <Card className={classes.card}>
                    <CardContent>
                        <div className={classes.row}>
                            <TextField
                                id="standard-basic"
                                className= {classes.textInput}
                                label="Usuario/CUIT"
                                value={username}
                                onChange={_onChangeUsername}
                                onKeyDown={handleKeyDown}
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
                            className= {classes.textInput}
                            type={showPassword ? 'text' : 'password'}
                            label="Contraseña"
                            value={password}
                            onChange={_onChangePassword}
                            onKeyDown={handleKeyDown}
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
                        {loading ?
                            <CircularProgress />
                        :
                            <Button variant="contained" className={classes.button} onClick={_onLogIn} >
                                <text className={classes.button}>
                                    Iniciar Sesion
                                </text>
                            </Button>
                        }
                        </Grid>
                        <Grid 
                            container
                            justify="center"
                            alignItems="center"
                        >
                        <Button variant='contained' className={classes.forgotPassword}>
                            <text> Olvidé mi contraseña </text>
                        </Button>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
    )
}

export default Login;
