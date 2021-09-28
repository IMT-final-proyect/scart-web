import React from 'react'
import { Card, Grid } from '@material-ui/core'
import PersonIcon from '@mui/icons-material/Person';

import useStyles from './styles'

const Home = () => {
    const classes = useStyles()
    return(
        <Grid container className={classes.container} direction='row' justifyContent='space-between'>
            <Grid item xs={12} sm={12} md={6} lg={3} xl={3}>
                <Card className={classes.card}>
                    <PersonIcon/>
                    <text>Contratistas</text>
                </Card>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={3} xl={3}>
                <Card className={classes.card}>
                    <text>Contratistas</text>
                </Card>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={3} xl={3}>
                <Card className={classes.card}>
                    <text>Contratistas</text>
                </Card>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={3} xl={3}>
                <Card className={classes.card}>
                    <text>Contratistas</text>
                </Card>
            </Grid>
        </Grid>
    )
}

export default Home