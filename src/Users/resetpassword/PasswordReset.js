import React, {Component} from 'react';
import axios from 'axios/index';
import * as env from '../../config'
import {Redirect} from 'react-router-dom'
import $ from "jquery";


export default class passwordReset extends Component {

    constructor(props) {
        super(props);

        this.state = {
            message: '',
            token: '',
            oldPassword: '',
            password: '',
            passwordConfirmed: '',
            redirect: ''
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

    handlePasswordInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        }, () => {
            this.validatePassword()
        });

    };

    handlePasswordConfirmInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        }, () => {
            this.validatePasswordMatch()
        });

    };

    validatePassword = () => {
        let strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");

        if (strongRegex.test(this.state.password)) {
            $('#passwordInput').removeClass("is-invalid");
            $('#passwordInput').addClass("is-valid")
            // $("#passwordConfirmedInput").css("border", "5px solid green");
        } else {
            $('#passwordInput').removeClass("is-valid");
            $('#passwordInput').addClass("is-invalid")
        }

        if (!this.state.password) {
            $('#passwordInput').removeClass("is-valid");
            $('#passwordInput').removeClass("is-invalid");
        }
    };

    validatePasswordMatch = () => {

        if (this.state.password === this.state.passwordConfirmed) {
            $('#passwordInputMatch').removeClass("is-invalid");
            $('#passwordInputMatch').addClass("is-valid")
        } else {
            $('#passwordInputMatch').removeClass("is-valid");
            $('#passwordInputMatch').addClass("is-invalid")
        }

        if (!this.state.passwordConfirmed) {
            $('#passwordInputMatch').removeClass("is-valid");
            $('#passwordInputMatch').removeClass("is-invalid");
        }
    };

    renderRedirect = (path) => {
        return <Redirect to={`${path}`}/>
    };

    sendRequest = (event) => {
        event.preventDefault();
        if (this.state.password.trim() === this.state.passwordConfirmed.trim()) {
            axios.post(`${env.API_URL}/passwordreset`, {
                oldpassword: this.state.oldPassword,
                newpassword: this.state.password
            })
                .then(function (response) {
                    console.log(response);
                    switch (response.status) {
                        case 200: {
                            // password setting successful, display notification for some time and redirect to login page
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
                                this.renderRedirect('/login')
                            }, 30000);
                            break;
                        }
                        default:
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
                        console.log('Error', error.message);
                    }
                    console.log(error.config);
                })

        } else {
            $('#errorBlock').removeClass("alert-success");
            $('#errorBlock').addClass("alert-danger");
            $("#errorBlockText")
                .html(
                    `<strong>Error! </strong> No Input Accepted.`
                );
            $("#errorBlock").show();
            $('html, body').animate({
                scrollTop: $("#errorBlock").offset().top
            }, 200);
        }
    };

    hideErrorNotification = () => {
        $('#errorBlock').hide()
    };

    componentDidMount() {
        $('#errorBlock').hide()
    }


    render() {
        return (

            <div className="wrapper">
                <div id="content">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <div className="container-fluid">
                            <div className="col-sm-12 text-center ">
                                <header style={{
                                    textAlign: "center",
                                    fontSize: "35px",
                                    fontColor: "black",
                                    fontFamily: "Lucida Console",
                                    color: "#636e72"
                                }}>
                                    <h1>Adwenan Land Commission System</h1>
                                </header>
                            </div>
                        </div>
                    </nav>

                    <div className="container">

                        <div className="alert alert-danger alert-dismissible fade show" role="alert" id="errorBlock">
                            <div id="errorBlockText"></div>
                            <button type="button" className="close" onClick={this.hideErrorNotification}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>

                        <div className="login_wrapper col-md-4 ml-auto mr-auto">
                            <section className="login_content ">
                                <div className="shadow-lg p-3 mb-5 bg-white rounded" id="login-form">
                                    <form onSubmit={this.sendRequest}>
                                        <header>
                                            <h4 style={this.style2}>Reset Password</h4>
                                        </header>

                                        <div>
                                            <label htmlFor="Password">Old Passsword</label>
                                            <input type="text" name="oldpassword" className="form-control"
                                                   placeholder="************ "
                                                   value={this.state.oldPassword}
                                                   onChange={this.handleInputChange} required autoFocus/>
                                        </div>

                                        <br/>

                                        <div>
                                            <label>New Passsword</label>
                                            <input type="password" id="passwordInput" className="form-control"
                                                   placeholder="Password "
                                                   name="password" value={this.state.password}
                                                   onChange={this.handlePasswordInputChange}
                                                   required/>
                                            <div className="invalid-feedback">
                                                Password must be 8 characters long and
                                                <br/>
                                                must contain at least 1 lowercase,
                                                <br/>
                                                1 uppercase 1 numeric 1 symbol character
                                            </div>
                                            <div className="valid-feedback">
                                                Valid password entered.
                                            </div>
                                        </div>

                                        <br/>

                                        <div>
                                            <label>Confirm Password</label>
                                            <input type="password" id="passwordInputMatch"
                                                   className="form-control"
                                                   placeholder="Confirm Password "
                                                   name="passwordConfirmed" value={this.state.passwordConfirmed}
                                                   onChange={this.handlePasswordConfirmInputChange}
                                                   required/>
                                            <div className="invalid-feedback">
                                                Passwords do not match !.
                                            </div>
                                            <div className="valid-feedback">
                                                Passwords match.
                                            </div>
                                        </div>


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
                </div>

            </div>

        )
    }
}






