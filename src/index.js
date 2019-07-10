//Libraries
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios/index';
import {BrowserRouter as Router, Redirect, Route, Switch, withRouter} from 'react-router-dom'
import $ from "jquery";
import './css/index.css';
// Auth-free components
import Login from './Users/Login'
import Update from './Users/Profile/update'
import Register from './Users/Register'
import Activated from './Users/Activated'
import ForgotPassword from './Users/forgotpassword/ForgotPassword';
import EnterEmail from './Users/forgotpassword/EnterEmail';
import PasswordReset from './Users/resetpassword/PasswordReset';
// Auth required components
import Home from './Home/Home';
import Admin from './Admin/Admin'
import User from './Users/Profile/User'
//Others
import NotFound from './NotFound';


import * as serviceWorker from './serviceWorker';
import * as env from "./config";


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
            user: {}
        };
    }


    _renderRedirect = (path) => {
        return <Redirect to={`${path}`}/>
    };


    _loginUser = (userEmail, userPassword) => {
        axios.post(`${env.API_URL}/login`, {
            email: userEmail,
            password: userPassword,
        })
            .then(response => {
                switch (response.status) {
                    case 200: {
                        let userData = {
                            name: response.data.data.username,
                            id: response.data.data.id,
                            email: response.data.data.email,
                            token: response.data.token,
                            timestamp: new Date().toString()
                        };
                        let appState = {
                            isLoggedIn: true,
                            user: userData
                        };
                        // save app state with user date in local storage
                        localStorage["appState"] = JSON.stringify(appState);
                        // login successful, display notification for some time and redirect to home page
                        $('#errorBlock').removeClass("alert-danger");
                        $('#errorBlock').addClass("alert-success");
                        $("#errorBlockText")
                            .html(
                                `<strong>Success! </strong> Login Successful.`
                            );
                        $("#errorBlock").show();

                        $('html, body').animate({
                            scrollTop: $("#errorBlock").offset().top
                        }, 200);


                        setTimeout(() => {
                            this.setState(appState, () => {
                                this._renderRedirect('/')
                            })
                        }, 10000);
                        break;
                    }
                    default: {
                    }
                }
            })
            .catch(function (error) {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    $('#errorBlock').removeClass("alert-success");
                    $('#errorBlock').addClass("alert-danger");
                    $("#errorBlockText")
                        .html(
                            `<strong>Error! </strong> ${error.response.data.message}.`
                        );
                    $("#errorBlock").show();
                    $('html, body').animate({
                        scrollTop: $("#errorBlock").offset().top
                    }, 200);

                    console.log(error.response.data.message);
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
            })
    };


    _logoutUser = () => {
        let appState = {
            isLoggedIn: false,
            user: {}
        };


        axios.defaults.headers.common = {'Authorization': `Bearer ${this.state.user.token}`};
        axios.post(`${env.API_URL}/logout`)
            .then(response => {
                switch (response.status) {
                    case 200: {
                        // save app state with user date in local storage
                        localStorage["appState"] = JSON.stringify(appState);
                        // login successful, display notification for some time and redirect to home page
                        $('#errorBlock').removeClass("alert-danger");
                        $('#errorBlock').addClass("alert-success");
                        $("#errorBlockText")
                            .html(
                                `<strong>Success! </strong> Logout Successful.`
                            );
                        $("#errorBlock").show();

                        $('html, body').animate({
                            scrollTop: $("#errorBlock").offset().top
                        }, 200);


                        setTimeout(() => {
                            this.setState(appState, () => {
                                this._renderRedirect('/')
                            })
                        }, 10000);
                        break;
                    }
                    default: {
                    }
                }
            })
            .catch(function (error) {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    $('#errorBlock').removeClass("alert-success");
                    $('#errorBlock').addClass("alert-danger");
                    $("#errorBlockText")
                        .html(
                            `<strong>Error! </strong> ${error.response.data.message}.`
                        );
                    $("#errorBlock").show();
                    $('html, body').animate({
                        scrollTop: $("#errorBlock").offset().top
                    }, 200);

                    console.log(error.response.data.message);
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
            });
    };


    _registerUser = (userData) => {

        axios.post(`${env.API_URL}/register`, {
            username: userData.username,
            password: userData.password,
            password_confirmation: userData.passwordConfirmed,
            first_name: userData.firstname,
            last_name: userData.lastname,
            status: userData.status,
            company_id: userData.companyid,
            staff_number: userData.staffnumber,
            title: userData.title,
            designation: userData.designation,
            division: userData.division,
            address: userData.address,
            phone: userData.phone,
            fax: userData.fax,
            mobile: userData.mobile,
            website_address: userData.websiteaddress,
            email: userData.email,
            department: userData.department,
            location: userData.location,
            district: userData.district,
            region: userData.region,

        })
            .then(response => {
                switch (response.status) {
                    case 200: {
                        let userData = {
                            name: response.data.data.username,
                            id: response.data.data.id,
                            email: response.data.data.email,
                            token: response.data.token,
                            timestamp: new Date().toString()
                        };

                        let appState = {
                            isLoggedIn: false,
                            user: userData
                        };
                        // save app state with user date in local storage
                        localStorage["appState"] = JSON.stringify(appState);
                        $('#errorBlock').removeClass("alert-danger");
                        $('#errorBlock').addClass("alert-success");
                        $("#errorBlockText")
                            .html(
                                `<strong>Success! </strong> Registration Successful <br/> Check Your Email And Verify`
                            );
                        $("#errorBlock").show();

                        $('html, body').animate({
                            scrollTop: $("#errorBlock").offset().top
                        }, 200);

                        setTimeout(() => {
                            this.setState(appState, () => {
                                this._renderRedirect('/login')
                            })
                        }, 10000);
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
                    $('#errorBlock').removeClass("alert-success");
                    $('#errorBlock').addClass("alert-danger");
                    $("#errorBlockText")
                        .html(
                            `<strong>Error! </strong> ${error.response.data.message}.`
                        );
                    $("#errorBlock").show();
                    $('html, body').animate({
                        scrollTop: $("#errorBlock").offset().top
                    }, 200);

                    console.log(error.response.data.message);
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
            })
    };


    _preForgotPassword = (userEmail) => {
        axios.post(`${env.API_URL}/preForgot`, {email: userEmail})
            .then(function (response) {
                console.log(response);
                switch (response.status) {
                    case 200: {
                        // then display notification to user that email verification has been sent to the mail for password reset
                        $('#errorBlock').removeClass("alert-danger");
                        $('#errorBlock').addClass("alert-success");
                        $("#errorBlockText")
                            .html(
                                `<strong>Success! </strong> Check your email for a password reset link`
                            );
                        $("#errorBlock").show();
                        $('html, body').animate({
                            scrollTop: $("#errorBlock").offset().top
                        }, 200);
                        break;
                    }
                    default: {
                    }
                }
            })
            .catch(function (error) {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    $('#errorBlock').removeClass("alert-success");
                    $('#errorBlock').addClass("alert-danger");
                    $("#errorBlockText")
                        .html(
                            `<strong>Error! </strong> ${error.response.data.message}`
                        );
                    $("#errorBlock").show();
                    $('html, body').animate({
                        scrollTop: $("#errorBlock").offset().top
                    }, 200);
                    console.log(error.response.data.message);
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
                    console.log('Error', error.message);
                }
                console.log(error.config);
            })
    };


    _postForgotPassword = (userPassword, userId, userToken) => {
        axios.post(`${env.API_URL}/postForgot`, {
            password: userPassword,
            password_confirmation: userPassword,
            _uid: userId,
            _tk_n: userToken
        })
            .then(function (response) {
                console.log(response);
                switch (response.status) {
                    case 200: {
                        // display to user a notification showing that the password reset was sucessfull and redirect to login
                        $('#errorBlock').removeClass("alert-danger");
                        $('#errorBlock').addClass("alert-success");
                        $("#errorBlockText")
                            .html(
                                `<strong>Success! </strong> Password Reset Successful.`
                            );
                        $("#errorBlock").show();

                        $('html, body').animate({
                            scrollTop: $("#errorBlock").offset().top
                        }, 200);


                        setTimeout(() => {
                            this._renderRedirect('/')
                        }, 10000);
                        break;
                    }
                    default: {
                    }
                }
            })
            .catch(function (error) {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    $('#errorBlock').removeClass("alert-success");
                    $('#errorBlock').addClass("alert-danger");
                    $("#errorBlockText")
                        .html(
                            `<strong>Error! </strong> ${error.response.data.message}`
                        );
                    $("#errorBlock").show();
                    $('html, body').animate({
                        scrollTop: $("#errorBlock").offset().top
                    }, 200);
                    console.log(error.response.data.message);
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
                    console.log('Error', error.message);
                }
                console.log(error.config);
            })
    };


    _getUsers = () => {
        axios.get(`${env.API_URL}/users`)
            .then(function (response) {
                console.log(response);
                switch (response.status) {
                    case 404: {
                        console.log(`User not found Status Code: ${response.status}`);
                        console.log(`Error: ${response.message}`);
                        // then display notification to user that the email does not exist in the database
                        break;
                    }
                    case 200: {
                        // then display notification to user that email verification has been sent to the mail for password reset
                        let allUserData = response.data.data;
                        var firstNames = [], lastNames = [], emails = [], phoneNumbers = [];

                        for (let i = 0; i < allUserData.length; i++) {
                            firstNames.push(response.data.data[i].first_name);
                            lastNames.push(response.data.data[i].last_name);
                            emails.push(response.data.data[i].email);
                            phoneNumbers.push(response.data.data[i].phone)
                        }


                        break;
                    }
                    default: {
                        //statements;
                        //todo: other error codes
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
                    console.log('Error', error.message);
                }
                console.log(error.config);
            })
    };


    _getUserByEmail = (userEmail) => {
        axios.get(`${env.API_URL}/users/email`, {email: userEmail})
            .then(function (response) {
                console.log(response);
                switch (response.status) {
                    case 404: {
                        console.log(`User not found Status Code: ${response.status}`);
                        console.log(`Error: ${response.message}`);
                        // then display notification to user that the email does not exist in the database
                        break;
                    }
                    case 200: {
                        // then display notification to user that email verification has been sent to the mail for password reset
                        alert();
                        break;
                    }
                    default: {
                        //statements;
                        //todo: other error codes
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
                    console.log('Error', error.message);
                }
                console.log(error.config);
            })
    };


    _getModule = (moduleName) => {
        axios.get(`${env.API_URL}/getmodule`, {name: moduleName})
            .then(function (response) {
                console.log(response);
                switch (response.status) {
                    case 404: {
                        console.log(`User not found Status Code: ${response.status}`);
                        console.log(`Error: ${response.message}`);
                        // then display notification to user that the email does not exist in the database
                        break;
                    }
                    case 200: {
                        // then display notification to user that email verification has been sent to the mail for password reset
                        alert();
                        break;
                    }
                    default: {
                        //statements;
                        //todo: other error codes
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
                    console.log('Error', error.message);
                }
                console.log(error.config);
            })

    };


    _getAllModules = () => {
        axios.post(`${env.API_URL}/getallmodule`)
            .then(function (response) {
                console.log(response);
                switch (response.status) {
                    case 404: {
                        console.log(`User not found Status Code: ${response.status}`);
                        console.log(`Error: ${response.message}`);
                        // then display notification to user that the email does not exist in the database
                        break;
                    }
                    case 200: {
                        // then display notification to user that email verification has been sent to the mail for password reset
                        alert();
                        break;
                    }
                    default: {
                        //statements;
                        //todo: other error codes
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
                    console.log('Error', error.message);
                }
                console.log(error.config);
            })

    };


    _addModule = (moduleName, moduleDescription) => {
        axios.post(`${env.API_URL}/createmodule`, {name: moduleName, description: moduleDescription})
            .then(function (response) {
                console.log(response);
                switch (response.status) {
                    case 404: {
                        console.log(`User not found Status Code: ${response.status}`);
                        console.log(`Error: ${response.message}`);
                        // then display notification to user that the email does not exist in the database
                        break;
                    }
                    case 200: {
                        // then display notification to user that email verification has been sent to the mail for password reset
                        alert();
                        break;
                    }
                    default: {
                        //statements;
                        //todo: other error codes
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
                    console.log('Error', error.message);
                }
                console.log(error.config);
            })

    };


    _updateModule = (moduleName, moduleDescription) => {
        axios.post(`${env.API_URL}/updatemodule`, {name: moduleName, description: moduleDescription})
            .then(function (response) {
                console.log(response);
                switch (response.status) {
                    case 404: {
                        console.log(`User not found Status Code: ${response.status}`);
                        console.log(`Error: ${response.message}`);
                        // then display notification to user that the email does not exist in the database
                        break;
                    }
                    case 200: {
                        // then display notification to user that email verification has been sent to the mail for password reset
                        alert();
                        break;
                    }
                    default: {
                        //statements;
                        //todo: other error codes
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
                    console.log('Error', error.message);
                }
                console.log(error.config);
            })

    };


    _deleteModule = (moduleName) => {
        axios.post(`${env.API_URL}/deletemodule`, {name: moduleName})
            .then(function (response) {
                console.log(response);
                switch (response.status) {
                    case 404: {
                        console.log(`User not found Status Code: ${response.status}`);
                        console.log(`Error: ${response.message}`);
                        // then display notification to user that the email does not exist in the database
                        break;
                    }
                    case 200: {
                        // then display notification to user that email verification has been sent to the mail for password reset
                        alert();
                        break;
                    }
                    default: {
                        //statements;
                        //todo: other error codes
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
                    console.log('Error', error.message);
                }
                console.log(error.config);
            })

    };



    componentDidMount() {
        let state = localStorage["appState"];
        if (state) {
            let AppState = JSON.parse(state);
            this.setState({isLoggedIn: AppState.isLoggedIn, user: AppState.user});
        }
    }

    render() {
        console.log("User Logged In: " + this.state.isLoggedIn);
        console.log("path name: " + this.props.location.pathname);

        return (
            <Switch>
                <Route exact path="/"
                       render={props =>
                           this.state.isLoggedIn ?
                               (<Home {...props} logoutUser={this._logoutUser} user={this.state.user}/>) :
                               (<Redirect to={{pathname: "/login"}}/>)}
                />

                <Route exact path="/admin"
                       render={props =>
                           this.state.isLoggedIn ?
                               (<Admin {...props} logoutUser={this._logoutUser}/>) :
                               (<Redirect to={{pathname: "/login"}}/>)}
                />

                <Route path="/user"
                       render={props =>
                           this.state.isLoggedIn ?
                               (<User {...props} logoutUser={this._logoutUser}/>) :
                               (<Redirect to={{pathname: "/login"}}/>)}
                />

                <Route exact path="/login"
                       render={props =>
                           !this.state.isLoggedIn ?
                               (<Login {...props} loginUser={this._loginUser}/>) :
                               (<Redirect to={{pathname: "/"}}/>)}
                />


                <Route exact path="/test"
                       render={props => (<Update {...props}/>)}
                />

                <Route exact path="/register"
                       render={props =>
                           !this.state.isLoggedIn ?
                               (<Register {...props} registerUser={this._registerUser}/>) :
                               (<Redirect to={{pathname: "/"}}/>)}
                />


                <Route exact path="/forgot-password-email"
                       render={props =>
                           !this.state.isLoggedIn ?
                               (<EnterEmail {...props} forgotPassword={this._preForgotPassword}/>) :
                               (<Redirect to={{pathname: "/"}}/>)}
                />

                <Route exact path="/forgot-password"
                       render={props =>
                           !this.state.isLoggedIn ?
                               (<ForgotPassword {...props} forgotPassword={this._postForgotPassword}/>) :
                               (<Redirect to={{pathname: "/"}}/>)}
                />

                <Route exact path="/activated"
                       render={props =>
                           !this.state.isLoggedIn ?
                               (<Activated {...props} activated={this._preForgotPassword}/>) :
                               (<Redirect to={{pathname: "/"}}/>)}
                />

                <Route exact path="/activated"
                       render={props =>
                           !this.state.isLoggedIn ?
                               (<Activated {...props} activated={this._preForgotPassword}/>) :
                               (<Redirect to={{pathname: "/"}}/>)}
                />


                <Route exact path="/activated"
                       render={props =>
                           !this.state.isLoggedIn ?
                               (<PasswordReset {...props} activated={this._preForgotPassword}/>) :
                               (<Redirect to={{pathname: "/"}}/>)}
                />

                <Route component={NotFound}/>
            </Switch>
        )
    }

}


const AppContainer = withRouter(props => <App {...props} />);

const routingProvider = (

    <Router>
        <div>
            <AppContainer/>
        </div>
    </Router>

);

ReactDOM.render(routingProvider, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
