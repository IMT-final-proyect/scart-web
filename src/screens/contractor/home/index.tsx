import React, { useEffect } from 'react';
import { Card, Typography } from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import TimerIcon from '@material-ui/icons/Timer';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import PersonIcon from '@material-ui/icons/Person';

import barras from '../../../assets/images/barras.PNG';
import useStyles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { getContractorData } from '../../../redux/slices/userSlice';
import { RootState } from '../../../redux/rootReducer';

const Home = () => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const id = useSelector((state: RootState) => state.user.accountData?.entityId)

    useEffect(() => {
        dispatch(getContractorData(id))
    }, [])
    
    return (
        <div className={classes.container}>
            <div className={classes.cardContainer}>
                <Card className={classes.card}>
                    <div className={classes.counterContainer}>
                        <div className={classes.imgContainer}>
                            <img src={barras} className={classes.img}/>
                        </div>
                        <div className={classes.counter}>
                            <Typography variant="h6" className={classes.counterText}>
                                Total
                            </Typography>
                            <Typography variant="h3" className={classes.counterText}>
                                45
                            </Typography>
                        </div>
                    </div>
                    <div className={classes.details}>
                        <div className={classes.row}>
                            <DoneIcon className={classes.done}/>
                            <text>
                                Validos: 40
                            </text>
                        </div>
                        <div className={classes.row}>
                            <TimerIcon className={classes.wait}/>
                            <text>
                                Pendientes: 2
                            </text>
                        </div>
                        <div className={classes.row}>
                            <CloseIcon className={classes.wrong}/>
                            <text>
                                Vencidos: 3
                            </text>
                        </div>
                    </div>
                </Card>
                <Card className={classes.card}>
                    <div className={classes.counterContainer}>
                        <div className={classes.imgContainer}>
                            <img src={barras} className={classes.img}/>
                        </div>
                        <div className={classes.counter}>
                            <Typography variant="h6" className={classes.counterText}>
                                Total
                            </Typography>
                            <Typography variant="h3" className={classes.counterText}>
                                57
                            </Typography>
                        </div>
                    </div>
                    <div className={classes.details}>
                        <div>
                            <PersonIcon />
                            <text>
                                Conductores: 45
                            </text>
                        </div>
                        <div>
                            <DriveEtaIcon />
                            <text>
                                Vehiculos: 12
                            </text>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default Home;