import React from 'react';

import { makeStyles, Theme } from '@material-ui/core';

import { drawerWidth, headerSize } from '../../../utils/constants';

const useStyles = makeStyles((theme: Theme) => ({
    container:{
        marginTop: headerSize,
        marginLeft: drawerWidth,
        backgroundColor: '#808080',
    },
}));


const Home = () => {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <text>
                Home
            </text>
        </div>
    )
}

export default Home;