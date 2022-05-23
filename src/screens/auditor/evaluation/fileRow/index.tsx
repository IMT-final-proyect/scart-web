import React from 'react';
import { Button, Grid, } from '@material-ui/core';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import OpenInBrowserIcon from '@material-ui/icons/OpenInBrowser';

import useStyles from './styles';

interface Props{
    name: string
}
const FileRow = ({ name }: Props) => {
    const classes = useStyles();
    return(
        <Grid container direction="row" justifyContent='space-between' alignItems='center'>
            <InsertDriveFileIcon />
            <Grid item xs={4} className={classes.text}>
                <text> {name} </text>
            </Grid>
            <CloudDownloadIcon />
            <OpenInBrowserIcon />
    </Grid>
    )
}

export default FileRow;