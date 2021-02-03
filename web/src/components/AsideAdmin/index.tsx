import { useEffect, useState } from 'react'
import {FiPower, FiMapPin, FiAlertCircle} from 'react-icons/fi'
import { useDispatch } from 'react-redux'
import {logoutUser} from '../../redux/actions/usersActions'
import { Link, useHistory, useRouteMatch } from 'react-router-dom'
import mapMarkerImg from "../../assets/images/iconw.png"

import './styles.css'

function Aside() {
    const {push} = useHistory();
    const {path} = useRouteMatch();
    const dispatch = useDispatch();

    const [registeredPontosHistoricosPage, setRegisteredPontosHistoricosPage] = useState(false)
    const [pendingPontosHistoricosPage, setPendingPontosHistoricosPage] = useState(false)

    useEffect( () => {
        if(path.split('/')[2] === "pontosHistoricos-registered") {
            setRegisteredPontosHistoricosPage(true)
            setPendingPontosHistoricosPage(false)
        }
        
        if(path.split('/')[2] === "pontosHistoricos-pending") {
            setPendingPontosHistoricosPage(true)
            setRegisteredPontosHistoricosPage(false)
        }
    }, [path])

    function handleGoToAppPage() {
        push('/app')
    }

    function handleLogoutUser() {
        dispatch(logoutUser())
    }

    return(
    <aside className="aside-container">
        <img src={mapMarkerImg} alt="icon" onClick={handleGoToAppPage} style={{cursor: 'pointer'}}/>

        <div className="aside-admin-main-content">
            <Link to="/dashboard/pontosHistoricos-registered" className={ registeredPontosHistoricosPage ? "active-icon" : ""}>
                <FiMapPin size={24} color={ registeredPontosHistoricosPage? "#0089A5" : "#fff"} />
            </Link>

            <Link to="/dashboard/pontosHistoricos-pending" className={ pendingPontosHistoricosPage ? "active-icon" : ""}>
                <FiAlertCircle size={24} color={  pendingPontosHistoricosPage ? "#0089A5" : "#fff"} />
            </Link>
        </div>

        <footer>
            <button type="button" onClick={handleLogoutUser}>
                <FiPower size={24} color="#fff" />
            </button>
        </footer>
    </aside>
    )
}

export default Aside