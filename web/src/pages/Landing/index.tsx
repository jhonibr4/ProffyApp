import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import './style.css';

import logoImg from '../../assets/images/logo.svg';
import landingImg from '../../assets/images/landing.svg';

import studyIcon from '../../assets/images/icons/study.svg';
import giveClassesIcon from '../../assets/images/icons/give-classes.svg';
import purpleHeartIcon from '../../assets/images/icons/purple-heart.svg';
import api from '../../Server/api';

function Landing() {
    const [ totalConnections , setTotalConnections ] = useState(0);
    useEffect(() => {
        api.get('connections').then(response => {
            setTotalConnections(response.data.total)
        })
    }, [])

    return (
        <div id="page-landing">
            <div id="page-landind-content">
                <div className="logo-container">
                    <img src={logoImg} alt="Logo"/>
                    <h2>Sua plataforma de estudo online.</h2>
                </div>
                <img 
                    src={landingImg} 
                    alt="Plataforma de estudos" 
                    className="hero-image"
                />
                <div className="buttons-container">
                    <Link to="/study" className="study">
                    <img src={studyIcon} alt="Estudar"/>
                    Estudar
                    </Link>
                    <Link to="/give-classes" className="give-classes">
                    <img src={giveClassesIcon} alt="Dar Aula"/>
                    Dar Aulas
                    </Link>
                </div>
                <span className="total-connections">
                    Total de {totalConnections} conexões já realizada. <img src={purpleHeartIcon} alt="Coração"/>
                </span>
            </div>
        </div>
    )
}
export default Landing;