import React, { Component } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
// import BaseLayout from '../core/base-layout/base-layout';
import Login from '../screens/login/Login';
import NotFound from '../screens/not found/NotFound';
import { ROUTES } from './routes';
// import { setUserData, setSession, } from '../redux/actions/userActions';

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
                <Route component={NotFound} />
            </Switch>
        </BrowserRouter>
    )
}

export default App;
