import { useSelector } from 'react-redux'
import { stateProps } from '../../redux/store'
import logoImg from '../../assets/images/logow.png'
import {FiArrowRight} from 'react-icons/fi'
import {Link} from 'react-router-dom'

import './styles.css'

function Home() {

    const {authenticated} = useSelector((state: stateProps) => state.user)

    return (
        <div id="page-landing">
            <div className="content-wrapper">
                <header>
                    <img src={logoImg} alt="happy" />
                    
                </header>

                <main>
                    <h1>Viva a História da sua cidade</h1>
                    <p>Embarque numa viagem rumo a um rico passado através dos pontos históricos de Campinas.</p>
                </main>
                <div className="location">
                    <strong>Campinas</strong>
                    <span>São Paulo</span>
                </div>  

                {authenticated ? (
                    <Link to="/dashboard/pontosHistoricos-registered" className="button-restricted-access">
                    Dashboard
                    </Link>
                ) : (
                    <Link to="/login" className="button-restricted-access">
                    Acesso Restrito
                    </Link>
                )}
                
                
                <Link to="/app" className="enter-app">
                    <FiArrowRight size={26} color="rgba(0, 0, 0, 0.6)" />
                </Link>
            </div>
        </div>
    )
}

export default Home
