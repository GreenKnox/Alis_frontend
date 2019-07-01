import React, {Component} from 'react';
import axios from 'axios/index';
import queryString from 'query-string'
import * as env from '../config'
import {Link, Redirect} from 'react-router-dom'


export default class Activated extends Component {

    constructor(props) {
        super(props);
        const values = queryString.parse(this.props.location.search);
        this.state = {
            id: values._uid,
            token: values._tk_n,
            cond: false
        }

    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = (target.type === 'checkbox') ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    };

    handleReset = () => {
        this.setState({
            newPassword: '',
            confirmNewPassword: ''
        });
    };


    renderRedirect = (path) => {
        return <Redirect to={`/${path}`}/>
    };

    verifyToken = async () => {
        try {
            const response = await axios.get(`${env.API_URL}/activated`, {
                params: {
                    _uid: this.state.id,
                    _tk_n: this.state.token,
                }
            });
            console.log(response.status);
            switch (response.status) {
                case 200:
                    this.setState({
                        cond: true
                    });
                    break;
                default:
                    //statements;
                    console.log(`Error: ${response}`);
                    break;
            }
        } catch (error) {
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
            this.setState({
                cond: "false",
            });
        }
        return this.state.cond
    };

    sendRequest = (event) => {
        event.preventDefault();
        if (this.state.newPassword.trim() === this.state.confirmNewPassword.trim()) {
            axios.post(`${env.API_URL}/forgotpassword`, {newpassword: this.state.newPassword})
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

        } else {
            console.log('Passwords do not match');
        }
    };

    async componentDidMount() {
        await this.verifyToken();
    }

    render() {
        const {cond} = this.state;
        if (cond === true) {
            return (
                <div>
                    <div className="login_wrapper col-md-4 ml-auto mr-auto">
                        <section className="login_content ">
                            <div className="shadow-lg p-3 mb-5 bg-white rounded" id="login-form">
                                Activation Successful
                                <Link to={'/login'} className="nav-link"> Login </Link>
                            </div>
                        </section>
                    </div>
                </div>
            )
        } else {
            return (
                <div>
                    <div className="login_wrapper col-md-4 ml-auto mr-auto">
                        <section className="login_content ">
                            <div className="shadow-lg p-3 mb-5 bg-white rounded" id="login-form">
                                Activation Failed
                            </div>
                        </section>
                    </div>
                </div>
            )

        }

    }
}