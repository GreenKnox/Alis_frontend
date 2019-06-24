import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import axios from 'axios/index';
import {BrowserRouter as Router, NavLink, Route, Switch,} from 'react-router-dom'
import store from "./modules/store/index";
import './css/index.css';

import App from './Home/App';
import Admin from './Admin/Admin'
import Activated from './Users/Activated'
import loginMap from './mappings/loginMappings';
import registerMap from './mappings/registerMappings';
import resetPasswordMap from './mappings/resetPasswordMappings';
import NotFound from './NotFound';
import ForgotPassword from './Users/forgotpassword/ForgotPassword';
import EnterEmail from './Users/forgotpassword/EnterEmail';
import * as serviceWorker from './serviceWorker';
import * as env from "./config";


_renderRedirect = (path) => {
    return <Redirect to={`/${path}`}/>
};


_loginUser = (email, password) => {

    var formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);


    axios.post(`${env.API_URL}/login`, formData)
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
                    setTimeout(this.renderRedirect('reset-password'), 15000);
                    break;
                }
                case 200: {
                    alert("Login Successful!");

                    let userData = {
                        name: response.data.username,
                        id: response.data.id,
                        email: response.data.email,
                        auth_token: response.data.token,
                        timestamp: new Date().toString()
                    };
                    let appState = {
                        isLoggedIn: true,
                        user: userData
                    };
                    // save app state with user date in local storage
                    localStorage["appState"] = JSON.stringify(appState);
                    this.setState({
                        isLoggedIn: appState.isLoggedIn,
                        user: appState.user
                    });
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
};


_registerUser = (userData) => {

    var formData = new FormData();

    formData.append("username", userData.username);
    formData.append("password", userData.password);
    formData.append("password_confirmation", userData.passwordconfirmed);
    formData.append("first_name", userData.firstname);
    formData.append("last_name", userData.lastname);
    formData.append("status", userData.status);
    formData.append("company_id", userData.companyid);
    formData.append("staff_number", userData.staffnumber);
    formData.append("title", userData.title);
    formData.append("designation", userData.designation);
    formData.append("division", userData.division);
    formData.append("address", userData.address);
    formData.append("phone", userData.phone);
    formData.append("fax", userData.fax);
    formData.append("mobile", userData.mobile);
    formData.append("website_address", userData.websiteaddress);
    formData.append("email", userData.email);
    formData.append("department", userData.department);
    formData.append("location", userData.location);
    formData.append("district", userData.district);
    formData.append("region", userData.region);

    formData.append("password", userData.password);
    formData.append("email", email);
    formData.append("name", name);
};



const routingProvider = (

    <Provider store={store}>
        <Router>
            <div>
                <ul>
                    {/*<li>*/}
                    {/*    <NavLink exact activeClassName="active" to="/">*/}
                    {/*        Home*/}
                    {/*</NavLink>*/}
                    {/*</li>*/}
                    <li>
                        <NavLink exact activeClassName="active" to="/login">
                            Login
                        </NavLink>
                    </li>
                    <li>
                        <NavLink exact activeClassName="active" to="/register">
                            Register
                        </NavLink>
                    </li>
                    {/*<li>*/}
                    {/*    <NavLink exact activeClassName="active" to="/reset-password">*/}
                    {/*        Reset Password*/}
                    {/*</NavLink>*/}
                    {/*</li>*/}
                    <li>
                        <NavLink exact activeClassName="active" to="/admin">
                            Admin
                        </NavLink>
                    </li>
                </ul>
                <Switch>
                    <Route exact path="/" component={App} />
                    <Route path="/admin" component={Admin}/>
                    <Route path="/login" component={loginMap} />
                    <Route path="/register" component={registerMap} />
                    <Route path="/reset-password" component={resetPasswordMap} />
                    <Route path="/forgot-password" component={ForgotPassword}/>
                    <Route path="/forgot-password-email" component={EnterEmail} />
                    <Route path="/activated" component={Activated}/>
                    <Route component={NotFound} />
                </Switch>
            </div>
        </Router>

    </Provider>

);

ReactDOM.render(routingProvider, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
