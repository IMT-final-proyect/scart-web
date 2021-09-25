import React, { Component } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import NotFound from '../screens/not found';
import { ROUTES } from './routes';
// import { setUserData, setSession, } from '../redux/actions/userActions';

import Login from '../screens/login';
import ContractorNavigator from '../screens/contractor/navigation/ContractorNavigator'
import ManagerNavigator from '../screens/manager/navigation/ManagerNavigator'
import AuditorNavigator from '../screens/auditor/navigation/AuditorNavigator'
import AdminNavigator from '../screens/admin/navigation/AdminNavigator'

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
                <Route path={ROUTES.contractor} component={ContractorNavigator} />
                <Route path={ROUTES.manager} component={ManagerNavigator} />
                <Route path={ROUTES.auditor} component={AuditorNavigator} />
                <Route path={ROUTES.admin} component={AdminNavigator} />
                <Route component={NotFound} />
            </Switch>
        </BrowserRouter>
    )
}

export default App;
