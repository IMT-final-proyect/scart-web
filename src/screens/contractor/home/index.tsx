import React from 'react';

import { makeStyles, Theme, Typography } from '@material-ui/core';
import { Card } from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import TimerIcon from '@material-ui/icons/Timer';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import PersonIcon from '@material-ui/icons/Person';

import { headerSize } from '../../../utils/constants';
import colors from '../../../utils/styles/globalColors';
import barras from '../../../assets/images/barras.PNG';

const useStyles = makeStyles((theme: Theme) => ({
    container:{
    },
    cardContainer:{
        display: 'flex',
        flex: 1,
    },
    card:{
        flex: 1,
        marginTop: '10%',
        marginInline: '10%',
    },
    counterContainer:{
        display: 'flex',
        flex: 1,
        backgroundColor: colors.lightBlue,
        justifyContent: 'center',
        textAlign: 'center',
        
    },
    imgContainer:{
        flex: 1,
        justifyContent: 'center',
        textAlign: 'center',
        margin:'auto',
    },
    img:{
        width: 120,
    },
    counter:{
        flex: 1,
        justifyContent: 'center',
        textAlign: 'center',
        paddingTop: '15%',
        paddingBottom: '15%',
    },
    counterText:{
        color: colors.white,
    },
    details:{
        flex: 1,
        justifyContent: 'center',
        textAlign: 'center',
        paddingTop: '10%',
        paddingBottom: '10%',
    },
    row:{
    },
    done:{
        color: colors.green,
    },
    wrong:{
        color: colors.red,
    },
    wait: {
        color: colors.yellow,
    },
}));


const Home = () => {
    const classes = useStyles();

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