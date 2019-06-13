import React, { Component } from 'react';
import axios from 'axios';
import { Route, Link, BrowserRouter, Redirect } from 'react-router-dom'

export default class Login extends Component {

    constructor(props) {
        super(props)

        this.handleEmailChange = this.handleEmailChange.bind(this)
        this.handlePasswordChange = this.handlePasswordChange.bind(this)

        this.state = {
            email: '',
            password: '',
            redirect: false,
            message: '',
            errorCode: '',
            token: ''
        }

        this.style1 = {
            fontFamily: 'Lucida Sans Unicode',
            color: '#636e72'
        }
        this.style2 = {
            fontFamily: 'Lucida Console',
            color: '#636e72'
        }
    }

    handleEmailChange(event) {
        const inputEmail = event.target.value
        this.setState({
            email: inputEmail
        })
    }

    handlePasswordChange(event) {
        const inputPassword = event.target.value
        this.setState({
            password: inputPassword
        })
    }

    validateUser() {

        if (this.state.email && this.state.password) {
            axios.get(`https://${this.state.password}/${this.state.password}`).then(
                res => {

                    if (res.code !== 200) {
                        console.log(`Looks like there was a problem. Status Code: ${res.status}`);
                        return;
                    }
                    else if (res.code === 400) {
                        this.setRedirect()
                        this.setState({
                            message: res.message,
                            errorCode: res.errorCode,
                            token: res.token

                        })
                    }
                }
            )

            console.log('verified');
        }
        else {
            console.log('some fields empty');
        }
    }

    setRedirect = () => {
        this.setState({
            redirect: true
        })
    }
    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/' />
        }
    }





    render() {
        return (
            <div>

                <div className="col-lg-12 text-center ">
                    <header>
                        <h1 style={this.style1}>Adwenan Land Information System</h1>
                    </header>
                </div>


                <div className="login_wrapper col-md-4 ml-auto mr-auto">
                    <section className="login_content ">
                        <div className="shadow-lg p-3 mb-5 bg-white rounded" id="login-form">
                            <form onSubmit={this.validateUser}>
                                <header>
                                    <h4 style={this.style2}>User Login Form</h4>
                                </header>

                                <div>
                                    <label htmlFor="Username">Username</label>
                                    <input type="text" name="Username" className="form-control" placeholder="e.g.,berry@gh.gov" value={this.state.email} onChange={this.handleEmailChange} required autoFocus />
                                </div>
                                <br />
                                <div>
                                    <label htmlFor="Passsword">Password</label>
                                    <input type="password" name="password" className="form-control" placeholder="e.g.,*************" value={this.state.password} onChange={this.handlePasswordChange} required />
                                </div>
                                <br />
                                <div>
                                    <div>
                                        <button type="button" className="btn btn-success" type="submit" value="Submit">Login</button>
                                    </div>
                                </div>

                                <div className="clearfix"></div>

                                <div className="separator">
                                    <p className="change_link">New to this site?<a href="registerUsers.html"> Create Account </a></p>
                                    <div className="clearfix"></div>
                                    <br />
                                </div>                          
                            </form>
                        </div>
                    </section>
                </div>
            </div>
        )
    }
}




