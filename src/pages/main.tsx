import React, { useEffect, useState } from 'react';
import './main.css';
import { Outlet, Link } from 'react-router-dom';

export interface IMainPageProps {
    userEmail: string;
    Sender: Function;
}

const MainPage: React.FunctionComponent<IMainPageProps> = (props) => {
    const logo = require('../assets/logo.png');

    return (
        <div className="main-container">
            <link rel="stylesheet" href="./main.css" />
            <div className="logo-container">
                <a href="http://haeger-consulting.de" target="_blank">
                    <img id="logo" src={logo} alt="Haeger Logo" />
                </a>
            </div>
            <div className="main-box">
                <div className="menu-box">
                    {/* menu */}
                    <div className="menu">
                        <h1>Haegertime</h1>
                        <hr />
                        <li className="category" id="cat-general">
                            <a className="cat-button" href="#cat-general">
                                Allgemein
                            </a>
                            <div className="function-list">
                                <ul>
                                    <li>
                                        <Link to="users">Benutzerübersicht</Link>
                                    </li>
                                    <li>
                                        <Link to="current-user">Mein Account</Link>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li className="category" id="cat-hours">
                            <a className="cat-button" href="#cat-hours">
                                Arbeitszeit
                            </a>
                            <div className="function-list">
                                <ul>
                                    <li>
                                        <Link to="/users">Stunden Anzeigen</Link>
                                    </li>
                                    <li>
                                        <a href="#">Stunden Eintragen</a>
                                    </li>
                                    <li>
                                        <a href="#">Stunden bearbeiten</a>
                                    </li>
                                    <li>
                                        <a href="#">Monat Finalisieren</a>
                                    </li>
                                    <li>
                                        <a href="#">Mein Stundenkonto</a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li className="category" id="cat-projects">
                            <a className="cat-button" href="#cat-projects">
                                Projekte
                            </a>
                            <div className="function-list">
                                <ul>
                                    <li>
                                        <a href="#">Meine Projekte</a>
                                    </li>
                                    <li>
                                        <a href="#">Projekt anlegen</a>
                                    </li>
                                    <li>
                                        <a href="#">Projekt bearbeiten</a>
                                    </li>
                                    <li>
                                        <a href="#">Projektbesetzung</a>
                                    </li>
                                    <li>
                                        <a href="#">Rechnung erstellen</a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li className="category" id="cat-vacation">
                            <a className="cat-button" href="#cat-vacation">
                                Urlaubstage
                            </a>
                            <div className="function-list">
                                <ul>
                                    <li>
                                        <Link to="ownHolidays">Meine Urlaubstage</Link>
                                    </li>
                                    <li>
                                        <Link to="holidayApplication">Urlaubsantrag</Link>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li className="category" id="cat-sickdays">
                            <a className="cat-button" href="#cat-sickdays">
                                Krankheitstage
                            </a>
                            <div className="function-list">
                                <ul>
                                    <li>
                                        <a href="#">Kranke Mitarbeiter</a>
                                    </li>
                                    <li>
                                        <a href="#">Krankheitstage</a>
                                    </li>
                                    <li>
                                        <Link to="sickDayRegistry">Krankmeldung</Link>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li className="category" id="cat-usermgmt">
                            <a className="cat-button" href="#cat-usermgmt">
                                Verwaltung
                            </a>
                            <div className="function-list">
                                <ul>
                                    <li>
                                        <a href="#">Neuer Account</a>
                                    </li>
                                    <li>
                                        <a href="#">Username ändern</a>
                                    </li>
                                    <li>
                                        <a href="#">Account einfrieren</a>
                                    </li>
                                    <li>
                                        <a href="#">Account löschen</a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                    </div>
                    {/* /menu */}
                    <div id="copyright">&copy; 2022 Team React</div>
                    <button id="logoutButton">Abmelden</button>
                </div>
                {<hr />}
                <div id="content-box">
                    <div id="display">
                        <Outlet />
                        <img id="burns" src={require('../assets/burns.png')} alt="" style={{ position: 'absolute', borderRadius: '1.7vh', right: 0, bottom: 0 }} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainPage;
