import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios/index';
import {BrowserRouter as Router, Redirect, Route, Switch, withRouter} from 'react-router-dom'
import './css/index.css';

import Home from './Home/Home';

import Admin from './Admin/Admin'
import Login from './Users/Login'
import NotFound from './NotFound';
import Register from './Users/Register'
import Activated from './Users/Activated'
import EnterEmail from './Users/forgotpassword/EnterEmail';
import resetPasswordMap from './mappings/resetPasswordMappings';
import ForgotPassword from './Users/forgotpassword/ForgotPassword';

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
                    case 404: {
                        console.log(`Looks like there was a problem. Status Code: ${response.status}`);
                        console.log(`Error: ${response.message}`);
                        // display notification that user was not found
                        alert("User Not Found!");
                        break;
                    }
                    case 400: {
                        console.log(`Looks like there was a problem. Status Code: ${response.status}`);
                        console.log(`Error: ${response.message}`);
                        alert("Error!");
                        break;
                    }
                    case 401: {
                        console.log(`Looks like there was a problem. Status Code: ${response.status}`);
                        console.log(`Error: ${response.message}`);
                        // password expired, display notification for some time and redirect to reset password
                        alert("Password Expired, Reset Password!");
                        setTimeout(this._renderRedirect('reset-password'), 15000);
                        break;
                    }
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
                        this.setState(appState);
                        // login successful, display notification for some time and redirect to home page
                        this._renderRedirect('/admin');
                        alert("Login Successful!");
                        break;
                    }
                    default: {
                        console.log("Nothing was posted");
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
                    case 404: {
                        console.log(`Looks like there was a problem. Status Code: ${response.status}`);
                        console.log(`Error: ${response.message}`);
                        // display notification that user was not found
                        alert("User Not Found!");
                        break;
                    }
                    case 400: {
                        console.log(`Looks like there was a problem. Status Code: ${response.status}`);
                        console.log(`Error: ${response.message}`);
                        alert("Error!");
                        break;
                    }
                    case 401: {
                        console.log(`Looks like there was a problem. Status Code: ${response.status}`);
                        console.log(`Error: ${response.message}`);
                        // password expired, display notification for some time and redirect to reset password
                        alert("Password Expired, Reset Password!");
                        setTimeout(this._renderRedirect('reset-password'), 15000);
                        break;
                    }
                    case 200: {
                        alert("Logout Successful!");
                        // save app state with user date in local storage
                        localStorage["appState"] = JSON.stringify(appState);
                        this.setState(appState);
                        this._renderRedirect('/login');
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
            });
    };


    _registerUser = (userData) => {

        axios.post(`${env.API_URL}/register`, {
            username: userData.username,
            password: userData.password,
            password_confirmation: userData.passwordconfirmed,
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
                    case 400: {
                        console.log(`Looks like there was a problem. Status Code: ${response.status}`);
                        console.log(`Error: ${response.message}`);
                        break;
                    }
                    case 200: {
                        alert(`Confirm your registration in your email!`);


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
                        this.setState({
                            isLoggedIn: appState.isLoggedIn,
                            user: appState.user
                        });
                        // redirect user to somewhere
                        this.setRedirect("login");
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
                    console.log('Error', error.message);
                }
                console.log(error.config);
            })
    };


    _preForgotPassword = (userEmail) => {
        axios.post(`${env.API_URL}/preForgot`, {email: userEmail})
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


    _postForgotPassword = (userPassword, userId, userToken) => {
        axios.post(`${env.API_URL}/postForgot`, {
                password: userPassword,
                password_confirmation: userPassword,
                _uid: userId,
                _tk_n: userToken
            }
        )
            .then(function (response) {
                console.log(response);
                switch (response.status) {
                    case 400: {
                        console.log(`Looks like there was a problem. Status Code: ${response.status}`);
                        console.log(`Error: ${response.message}`);
                        break;
                    }
                    case 200: {
                        this.handleReset();
                        // display to user a notification showing that the password reset was sucessfull and redirect to login
                        console.log("Password Reset!");
                        this.renderRedirect("login");
                        break;
                    }
                    default: {
                        console.log(`Looks like there was a problem of other status code. Status Code: ${response.status}`);
                        console.log(`Error: ${response.message}`);
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
            console.log(AppState);
            this.setState({isLoggedIn: AppState.isLoggedIn, user: AppState.user});
        }
    }

    render() {
        console.log(this.state.isLoggedIn);
        // console.log(this.state.user);
        console.log("path name: " + this.props.location.pathname);

        // if(!this.state.isLoggedIn && this.props.location.pathname === "/admin"){
        //     alert("login first")
        //     this.props.history.push("/login");
        // }
        if (
            !this.state.isLoggedIn &&
            this.props.location.pathname !== "/" &&
            this.props.location.pathname !== "/login" &&
            this.props.location.pathname !== "/register" &&
            this.props.location.pathname !== "/forgot-password-email" &&
            this.props.location.pathname !== "/activated" &&
            this.props.location.pathname !== "/forgot-password"
        ) {

            // alert("login first")
            console.log("you are not logged in and are visiting a page not login or register, go back to login page");
            this.props.history.push("/login");
        }
        if (this.state.isLoggedIn && (this.props.location.pathname === "/login" || this.props.location.pathname === "/register")) {
            console.log("you are either going to login or register but you're logged in");
            this.props.history.push("/admin");
        }
        return (
            <Switch>
                <Route exact
                       path="/"
                       render={props => (
                           <Home {...props} logoutUser={this._logoutUser} user={this.state.user}/>
                       )}
                />

                <Route path="/login"
                       render={props => (<Login {...props} loginUser={this._loginUser}/>)}
                />


                <Route path="/register"
                       render={props => (<Register {...props} registerUser={this._registerUser}/>)}
                />

                <Route path="/activated"
                       render={props => (<Activated {...props} activated={this._preForgotPassword}/>)}
                />

                <Route path="/forgot-password"
                       render={props => (<ForgotPassword {...props} forgotPassword={this._postForgotPassword}/>)}
                />

                <Route path="/forgot-password-email"
                       render={props => (<EnterEmail {...props} forgotPassword={this._preForgotPassword}/>)}
                />


                <Route path="/admin"
                       render={props => (
                           <Admin {...props}
                                  currentUser={this.state.user}
                                  isLoggedIn={this.state.isLoggedIn}
                                  logoutUser={this._logoutUser}
                               // getUsers={this._getUsers}
                               // getUserByEmail={this._getUserByEmail}
                               // getModule={this._getModule()}
                               // getAllModules={this._getAllModules}
                               // addModule={this._addModule}
                               // updateModule={this._updateModule}
                               // deleteModule={this._deleteModule}
                           />)}
                />

                <Route path="/reset-password" component={resetPasswordMap}/>
                <Route component={NotFound}/>
            </Switch>
        )
    }

}


const AppContainer = withRouter(props => <App {...props} />);

const routingProvider = (


    <Router>
        <div>
            {/*<ul>*/}
            {/*    <li>*/}
            {/*        <NavLink exact activeClassName="active" to="/login">*/}
            {/*            Login*/}
            {/*        </NavLink>*/}
            {/*    </li>*/}
            {/*    <li>*/}
            {/*        <NavLink exact activeClassName="active" to="/register">*/}
            {/*            Register*/}
            {/*        </NavLink>*/}
            {/*    </li>*/}
            {/*</ul>*/}
            <AppContainer/>
        </div>
    </Router>

);

ReactDOM.render(routingProvider, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
