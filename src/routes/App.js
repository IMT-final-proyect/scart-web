import React, { Component } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import NotFound from '../screens/not found/NotFound';
import { ROUTES } from './routes';
// import { setUserData, setSession, } from '../redux/actions/userActions';

import Login from '../screens/login/Login';
import ContractorHome from '../screens/contractor/ContractorHome'

const App = () => {
    // const isLoggedIn = (user) => {
    //     if (!!(user?.session?.accessToken)) {
    //         return true
    //     }
    //     else {
    //         return false
    //     }
    // }

    // const PrivateRoute = ({ component: Component, ...rest }) => (
    //     <Route {...rest} render={(props) => (
    //         isLoggedIn(user)
    //             ? <Component {...props} />
    //             : <Redirect to='/login' />
    //     )} />
    // )

    // const LoginRoute = ({ component: Component, ...rest }) => (
    //     <Route {...rest} render={(props) => (
    //         isLoggedIn(user)
    //             ? <Redirect to='/home' />
    //             : <Component {...props} />
    //     )} />
    // )

    return (
        <BrowserRouter>
            <Switch>
                <Route exact path={ROUTES.login} component={Login} />
                <Route exact path='/' component={Login} />
                <Route exact path={ROUTES.contractor} component={ContractorHome} />
                <Route component={NotFound} />
            </Switch>
        </BrowserRouter>
    )
}

export default App;
