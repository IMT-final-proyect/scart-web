import React from 'react';

import { Button, makeStyles, Theme } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import StarIcon from '@material-ui/icons/Star';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import TemplateBar from '../../../components/TemplateBar';
import Home from '../home/Home';
import Resources from '../resources/Resources';
import { ROUTES } from './routes';

const useStyles = makeStyles((theme: Theme) => ({
    container:{
        paddingTop: '5%',
    },
    button: {
        textTransform: 'none',
        fontSize: 17,
        justifyContent: "flex-start",
        paddingLeft: '10%',
        paddingTop: '1%',
    },
    icon: {
        paddingTop: '3%',
        paddingRight: '5%',
    },
    content: {

    },
    toolbar: {

    },
}));

const ContractorHome = () => {
    const classes = useStyles();

    const _onClickButtonList = (url: string) => {
        console.log(url);
    }

    const ButtonList = (
        <>
            <Button 
                className = {classes.button}
                onClick = {() => {_onClickButtonList(ROUTES.home)}}
            >
                <div className={classes.icon}>
                    <HomeIcon/>
                </div>
                Home
            </Button>
            <Button 
                className = {classes.button}
                onClick = {() => {_onClickButtonList(ROUTES.resources)}}
            >
                <div className={classes.icon}>
                    <StarIcon/>
                </div>
                Recursos
            </Button>
            <Button 
                className = {classes.button}
                onClick = {() => {_onClickButtonList('documentacion')}}
            >
                <div className={classes.icon}>
                    <InsertDriveFileIcon/>
                </div>
                Documentacion
            </Button>
        </>
    )

    return(
    <BrowserRouter>
        <TemplateBar
            title='Home'
            ButtonList = {ButtonList}
        />
        <main className={classes.content}>
          <div className={classes.toolbar} />
        <Switch>
            <Route path={ROUTES.home} component={Home} />
            <Route path={ROUTES.resources} component={Resources} />
            <Route path='/' component={Home} />
        </Switch>
        </main>
    </BrowserRouter>
    )
}

export default ContractorHome;