 import React, {Component} from 'react';
import axios from 'axios/index';
import * as env from '../config'
import {Redirect} from 'react-router-dom'
import '../Admin/style4.css';


export default class Admin extends Component {

    constructor(props) {
        super(props);

        this.state = {
            message: '',
            token: ''
        }

    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = (target.type === 'checkbox') ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        })
    };


    handleClearForm = () => {
        this.setState({})
    };

    renderRedirect = (path) => {
        return <Redirect to={`/${path}`}/>
    };


    validateUser = (event) => {
        event.preventDefault();
        if (this.state.email.trim() && this.state.password.trim()) {
            axios.post(`${env.API_URL}/login`, {
                email: this.state.email,
                password: this.state.password,
            })
                .then(function (response) {
                    console.log(response);
                    switch (response.status) {
                        case 404: {
                            console.log(`Looks like there was a problem. Status Code: ${response.status}`);
                            console.log(`Error: ${response.message}`);
                            // display notification that user was not found
                            break;
                        }
                        case 400: {
                            console.log(`Looks like there was a problem. Status Code: ${response.status}`);
                            console.log(`Error: ${response.message}`);
                            break;
                        }
                        case 401: {
                            console.log(`Looks like there was a problem. Status Code: ${response.status}`);
                            console.log(`Error: ${response.message}`);

                            // password expired, display notification for some time and redirect to reset password
                            this.renderRedirect('reset-password');
                            break;
                        }
                        case 200: {
                            console.log("It worked");
                            this.props.addMessage(response.data.message);
                            this.props.addToken(response.data.token);
                            this.handleClearForm(event);
                            // login successful, display notification for some time and redirect to home page
                            this.renderRedirect('/');

                            break;
                        }
                        default: {
                            //statements;
                            break;
                        }
                    }
                })
                .catch(function (error) {
                    if (error.response) {
                        // The request was made and the server responded with a status code
                        // that falls out of the range of 2xx
                        console.log(error.response.data);
                        console.log(error.response.status);
                        console.log(error.response.headers);
                    } else if (error.request) {
                        // The request was made but no response was received
                        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                        // http.ClientRequest in node.js
                        console.log(error.request);
                    } else {
                        // Something happened in setting up the request that triggered an Error
                        console.log('Error: ', error.message);
                    }
                    console.log(error.config);
                })

        } else {
            console.log('No input accepted');
        }
        this.handleClearForm()
    };


    render() {
        return (
            <>
                <div className="wrapper">

                    <nav id="sidebar">
                        <div className="sidebar-header">
                            <h3>Adwenan</h3>
                            <strong>BS</strong>
                        </div>

                        <ul className="list-unstyled components">
                            <li className="active">
                                <a href="#homeSubmenu" data-toggle="collapse" aria-expanded="false"
                                   className="dropdown-toggle">
                                    <i className="fas fa-home"></i>
                                    Home
                                </a>
                                <ul className="collapse list-unstyled" id="homeSubmenu">
                                    <li>
                                        <a href="#">Home 1</a>
                                    </li>
                                    <li>
                                        <a href="#">Home 2</a>
                                    </li>
                                    <li>
                                        <a href="#">Home 3</a>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <a href="#">
                                    <i className="fas fa-briefcase"></i>
                                    About
                                </a>
                                <a href="#pageSubmenu" data-toggle="collapse" aria-expanded="false"
                                   className="dropdown-toggle">
                                    <i className="fas fa-copy"></i>
                                    Pages
                                </a>
                                <ul className="collapse list-unstyled" id="pageSubmenu">
                                    <li>
                                        <a href="#">Page 1</a>
                                    </li>
                                    <li>
                                        <a href="#">Page 2</a>
                                    </li>
                                    <li>
                                        <a href="#">Page 3</a>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <a href="#">
                                    <i className="fas fa-image"></i>
                                    Portfolio
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <i className="fas fa-question"></i>
                                    FAQ
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <i className="fas fa-paper-plane"></i>
                                    Contact
                                </a>
                            </li>
                        </ul>
                    </nav>


                    <div id="content">

                        <nav className="navbar navbar-expand-lg navbar-light bg-light">
                            <div className="container-fluid">

                                <button className="btn btn-dark d-inline-block d-lg-none ml-auto" type="button"
                                        data-toggle="collapse" data-target="#navbarSupportedContent"
                                        aria-controls="navbarSupportedContent" aria-expanded="false"
                                        aria-label="Toggle navigation">
                                    <i className="fas fa-align-justify"></i>
                                </button>

                                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                    <ul className="nav navbar-nav ml-auto">
                                        <li className="nav-item active">
                                            <a className="nav-link" href="#">Page</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="#">Page</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="#">Page</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="#">Page</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </nav>

                        <h2>Collapsible Sidebar Using Bootstrap 4</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                            laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                            voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                            cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                            laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                            voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                            cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

                        <div className="line"></div>

                        <h2>Lorem Ipsum Dolor</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                            laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                            voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                            cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

                        <div className="line"></div>

                        <h2>Lorem Ipsum Dolor</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                            laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                            voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                            cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

                        <div className="line"></div>

                        <h3>Lorem Ipsum Dolor</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                            laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                            voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                            cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    </div>
                </div>
            </>
        )
    }
}






