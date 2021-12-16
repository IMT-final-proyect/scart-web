import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import NotFound from '../screens/not found';
import { ROUTES } from './routes';

import Login from '../screens/login';
import ContractorNavigator from '../screens/contractor/navigation/ContractorNavigator'
import ManagerNavigator from '../screens/manager/navigation/ManagerNavigator'
import AuditorNavigator from '../screens/auditor/navigation/AuditorNavigator'
import AdminNavigator from '../screens/admin/navigation/AdminNavigator'
import { RootState } from '../redux/rootReducer';
import { useSelector } from 'react-redux';
import { admin, auditor, contractor, manager } from '../utils/constants';
import { isRolAuthored, isTokenValid } from '../utils/functions/validations';

const App = () => {
    const accountData = useSelector((state: RootState) => state.user.accountData)

    const PrivateRoute = ({ rol, component: Component, ...rest }: any) => (
        <Route {...rest} render={(props) => (
            (isRolAuthored(rol, accountData?.rol) && isTokenValid(localStorage.getItem(('access_token'))))
                ? <Component {...props} />
                : <Redirect to={ROUTES.login} />
        )} />
    )

    return (
        <BrowserRouter>
            <Switch>
                <Route exact path={ROUTES.login} component={Login} />
                <Route exact path='/' component={Login} />
                <PrivateRoute path={ROUTES.contractor} rol={contractor} component={ContractorNavigator} />
                <PrivateRoute path={ROUTES.manager} rol={manager} component={ManagerNavigator} />
                <PrivateRoute path={ROUTES.auditor} rol={auditor} component={AuditorNavigator} />
                <PrivateRoute path={ROUTES.admin} rol={admin} component={AdminNavigator} />
                <Route component={NotFound} />
            </Switch>
        </BrowserRouter>
    )
}

export default App;
