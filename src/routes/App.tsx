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
import { RootState } from '../redux/rootReducer';
import { useSelector } from 'react-redux';
import { getRolNumber, getRolName } from '../utils/functions/getRolePath';

const App = () => {
    const accountData = useSelector((state: RootState) => state.user.accountData)

    const isLoggedIn = () => {
        if (!!(accountData?.access_token)) {
            return true
        }
        else {
            return false
        }
    }

    const isRolAuthored = (rolName: string) => {
        if (accountData?.rol === getRolNumber(rolName))
            return true
        else return false
    }
    
    // const PrivateRoute = ({ component: Component, ...rest }) => (
    //     <Route {...rest} render={(props) => (
    //         isLoggedIn(user)
    //             ? <Component {...props} />
    //             : <Redirect to='/login' />
    //     )} />
    // )

    // const LoginRoute = ({ component: Component, ...rest }) => (
    //     <Route {...rest} render={(props) => (
    //         isLoggedIn()
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
function getRoleName(rol: number | undefined) {
    throw new Error('Function not implemented.');
}

