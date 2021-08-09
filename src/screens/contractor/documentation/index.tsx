import React from 'react';

import { makeStyles, Theme } from '@material-ui/core';

import { headerSize } from '../../../utils/constants';

const useStyles = makeStyles((theme: Theme) => ({
    container:{
        marginTop: headerSize,
        backgroundColor: '#808080',
    },
}));


const Documentacion = () => {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <text>
                Documentacion
            </text>
        </div>
    )
}

export default Documentacion;