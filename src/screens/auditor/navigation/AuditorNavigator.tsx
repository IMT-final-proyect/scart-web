import React, { useState, useEffect } from 'react';

import { Button } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import StarIcon from '@material-ui/icons/Star';
import { BrowserRouter, Route, Switch, Link, useLocation } from 'react-router-dom';

import TemplateBar from '../../../components/templateBar';
import { ROUTES } from './routes';
import Documentation from '../documentation';
import useStyles from './styles'
import DocumentDetails from '../documentDetails';

const AuditorNavigation = () => {
    const classes = useStyles();
    const [title, setTitle] = useState('Auditor');

    const ButtonList = (
        <>
            <Button 
                className = {classes.button}
                component={Link}
                to={ROUTES.root}
            >
                <div className={classes.icon}>
                    <InsertDriveFileIcon/>
                </div>
                Documentación
            </Button>
        </>
    )

    return(
    <BrowserRouter>
        <TemplateBar
            title={title}
            ButtonList = {ButtonList}
        />
        <Switch>
            <Route exact path={ROUTES.root+'/:id'} component={DocumentDetails} />
            <Route path={ROUTES.root} component={Documentation} />
        </Switch>
    </BrowserRouter>
    )
}

export default AuditorNavigation;