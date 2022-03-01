import React, { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { User } from '../interfaces/interfaces';
import './main.css';
import {Outlet} from "react-router-dom";
import GetUsers from './getUsers';

export interface IMainPageProps {
    authToken: string;
    userEmail: string;
}

const MainPage: React.FunctionComponent<IMainPageProps> = (props) => {
    const navigate = useNavigate();
    const BASE_URL = `http://localhost:8080`;
    const logo = require('../assets/logo.png');
    const token = 'Basic ' + props.authToken;
    const users2: User[] = [];
    const [userContent, setUserContent]: [User[], (users: User[]) => void] = useState(users2);
    const [content, setContent] = useState('<div>OIDA2</div>');

    /*     useEffect(() => { //MAYBE ALTER THIS TO BE TRIGGERED BY ANY BUTTON PRESSED AND SUBSEQUENTLY CHANGE CONTENT OF CONTENTBOX ACCORDINGLY???
        //Eventhook
        if (token) {
            //Checks if name exists
            setContent(`Hello, ${token}`);
        } else {
            () => navigate('/login/err');
        }
    }, []); //In the brackets we can define when the eventhook should be triggered, if empty it gets triggered only once in the beginning, if missing it gets triggerd every time when any event happens (I think) */

    async function getUsers() {
        await axios.get(`${BASE_URL}/api/users`, { headers: { authorization: token } }).then((response) => {
            setUserContent(response.data);
            console.log(response.data);
            return (
                <div className="userList">
                    {userContent.map((user) => (
                        <li key={user.id}>
                            {user.id} {user.firstName} {user.lastName} {user.email}
                        </li>
                    ))}
                </div>
            );
        });
    }

    function testFunction() {
        setContent('<div>HELLOOOOOO2</div>');
    }

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
                                        <a href="#" onClick={testFunction}>
                                            Mitarbeiterliste
                                        </a>
                                    </li>
                                    <li>
                                        <a href="main/getUsers">Mein Account</a>
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
                                        <a href="#">Stunden Anzeigen</a>
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
                                        <a href="#">Meine Urlaubstage</a>
                                    </li>
                                    <li>
                                        <a href="#">Urlaubsantrag</a>
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
                                        <a href="#">Krankmeldung</a>
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
                    <h1>Content</h1>
                    <div id="display"><Outlet/></div>
                </div>
            </div>
        </div>
    );
};

export default MainPage;
