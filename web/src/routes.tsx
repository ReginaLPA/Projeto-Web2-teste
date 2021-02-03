import {BrowserRouter, Switch, Route} from 'react-router-dom'
//import { stateProps } from './redux/store'
//import { useSelector } from 'react-redux'
import AuthRoute from './utils/AuthRoute'
import NotAuthRoute from './utils/NotAuthRoute'

import Landing from './pages/Home'
import PontosHistoricosMap from './pages/PontosHistoricosMap'
import PontosHistorico from './pages/PontosHistoricos'
import CreatepontosHistorico from './pages/CreatePontosHistoricos'
import Login from './pages/Login'
import ForgetPassword from './pages/ForgetPassword'
import ResetPassword from './pages/ResetPassword'
import PontosHistoricosRegistered from './pages/Dashboard/PontoHistoricoRegistered'
import PontosHistoricosPending from './pages/Dashboard/PontosHistoricoPending'
import PontosHistoricoEdit from './pages/Dashboard/PontoHistoricoEdit'
import PontosHistoricoPending from './pages/Dashboard/PontoHistoricosPending'
import PontosHistoricoDelete from './pages/Dashboard/PontoHistoricoDelete'

function Routes() {

    return (
    <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Landing} />
            <Route path="/app" component={PontosHistoricosMap} />
            <Route path="/pontosHistoricos/create" component={CreatepontosHistorico} />
            <Route path="/pontosHistoricos/:id" component={PontosHistorico} />
            
            <NotAuthRoute path="/login" component={Login} />
            <NotAuthRoute path="/forget-password" component={ForgetPassword} />
            <NotAuthRoute path="/reset-password/:id" component={ResetPassword} />
            
            <AuthRoute path="/dashboard/pontosHistoricos-registered" exact component={PontosHistoricosRegistered} />
            <AuthRoute path="/dashboard/pontosHistoricos-pending" exact component={PontosHistoricosPending} />
            <AuthRoute path="/dashboard/pontosHistoricos-registered/edit/:id" component={PontosHistoricoEdit} />
            <AuthRoute path="/dashboard/pontosHistorico-pending/:id" component={PontosHistoricoPending} />
            <AuthRoute path="/dashboard/pontosHistoricos-registered/delete/:id" component={PontosHistoricoDelete} />
        </Switch>
    </BrowserRouter>         
    )
}

export default Routes 
