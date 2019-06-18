import React, {Component} from 'react';
import axios from 'axios';
import NotFound from './NotFound'
import {Redirect} from 'react-router-dom'

const styles = {
    style1: {
        fontFamily: 'Lucida Sans Unicode',
        color: '#636e72'
    },
    style2: {
        fontFamily: 'Lucida Console',
        color: '#636e72'
    }
};

const API_URL = 'http://127.0.0.1:8000/api/forgotpassword';


export default class ForgotPassword extends Component {

    constructor(props) {
        super(props);

        this.state = {
            message: '',
            token: '',
            newPassword: '',
            confirmNewPassword: '',
            redirect: '',
            code: 100
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

    setRedirect = () => {
        this.setState({
            redirect: true
        })
    };

    renderRedirect = (path) => {
        return <Redirect to={'/${path}'}/>
    };

    verifyToken = (data) => {
        axios.post(API_URL, {token: data})
            .then(function (response) {
                console.log(response);
                switch (response.status) {
                    case 400: {
                        console.log(`Looks like the token doesnt exist. Status Code: ${response.status}`);
                        console.log(`Error: ${response.message}`);
                        return false;
                        break;
                    }
                    case 200: {
                        return true;
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

    sendRequest = (event) => {
        event.preventDefault();
        if (this.state.newPassword.trim() === this.state.confirmNewPassword.trim()) {
            axios.post(API_URL, {newpassword: this.state.newPassword})
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
                            this.renderRedirect("/login");
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



    render() {
        const {match: {params}} = this.props;

        if (this.verifyToken(params.token)) {
            return (
                <div>

                    <div className="col-lg-12 text-center ">
                        <header>
                            <h1 style={styles.style1}>Adwenan Land Information System</h1>
                        </header>
                    </div>


                    <div className="login_wrapper col-md-4 ml-auto mr-auto">
                        <section className="login_content ">
                            <div className="shadow-lg p-3 mb-5 bg-white rounded" id="login-form">
                                <form onSubmit={this.sendRequest}>
                                    <header>
                                        <h4 style={this.style2}>Forgot Password</h4>
                                    </header>
                                    <div>
                                        <label htmlFor="Password">New Passsword</label>
                                        <input type="text" name="newpassword" className="form-control"
                                               placeholder="************ "
                                               value={this.state.newPassword}
                                               onChange={this.handleInputChange} required autoFocus/>
                                    </div>
                                    <br/>
                                    <div>
                                        <label htmlFor="Passsword">Confirm Password</label>
                                        <input type="password" name="confirmnewpassword" className="form-control"
                                               placeholder="*************"
                                               value={this.state.confirmNewPassword}
                                               onChange={this.handleInputChange} required/>
                                    </div>
                                    <br/>

                                    <div>
                                        <button type="submit" className="btn btn-outline-success"
                                                value="Submit">Submit
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </section>
                    </div>
                </div>
            )
        } else {
            return (
                <NotFound/>
            )

        }

    }
}