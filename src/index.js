import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
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

// window.store = store;
// window.addArticle = addMessage;

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
