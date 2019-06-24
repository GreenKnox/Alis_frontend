import React, { Component } from 'react';
import axios from 'axios';
import { Redirect, Link } from 'react-router-dom'
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";


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

const API_URL = 'http://127.0.0.1:8000/api/login';


export default class Login extends Component {

    constructor(props) {
        super(props)

        this.state = {
            message: '',
            token: '',
            email: '',
            password: '',
            redirect: ''
        }

    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = (target.type === 'checkbox') ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        })
    }

    
    handleClearForm = () => {  
        this.setState({
            email: '',
            password: ''
        })
      }

    setRedirect = () => {
        // this.setState({
        //     redirect: true
        // })
        return true
    }
    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/' />
        }
    }

    validateUser = (event) => {
        event.preventDefault()
        if (this.state.email.trim() && this.state.password.trim()) {
            axios.post(API_URL, {
                email: this.state.email,
                password: this.state.password,
            })
                .then(function (response) {
                    console.log(response);
                    switch (response.status) {
                        case 400: {
                            console.log(`Looks like there was a problem. Status Code: ${response.status}`);
                            console.log(`Error: ${response.message}`);
                            this.handleClearForm(event)
                            break;
                        }
                        case 200: {
                            console.log("It worked");
                            this.props.addMessage(response.data.message);
                            this.props.addToken(response.data.token);
                            // this.handleReset()
                            this.redirect = this.handleReset
                            // this.setRedirect()
                            
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
    }
    addNotification() {
        this.notificationDOMRef.current.addNotification({
            title: "Awesomeness",
            message: "Awesome Notifications!",
            type: "success",
            insert: "top",
            container: "top-right",
            animationIn: ["animated", "fadeIn"],
            animationOut: ["animated", "fadeOut"],
            dismiss: { duration: 2000 },
            dismissable: { click: true }
        });
    }







    render() {
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
                            <form onSubmit={this.validateUser}>
                                <header>
                                    <h4 style={this.style2}>User Login Form</h4>
                                </header>

                                <div>
                                    <label htmlFor="Username">Username</label>
                                    <input type="text" name="email" className="form-control"
                                        placeholder="example@gh.gov"
                                        value={this.state.email} 
                                        onChange={this.handleInputChange} required autoFocus />
                                </div>
                                <br />
                                <div>
                                    <label htmlFor="Passsword">Password</label>
                                    <input type="password" name="password" className="form-control"
                                        placeholder="*************"
                                        value={this.state.password} 
                                        onChange={this.handleInputChange} required />
                                </div>
                                <br />
                                <div>
                                    <div>
                                        <button onClick={this.addNotification} className="btn btn-outline-success" type="submit" value="Submit" >Login</button>
                                    </div>
                                </div>

                                <div className="clearfix"></div>

                                <div className="separator">
                                <div className="change_link">New to this site? <Link to={'/register'} className="nav-link"> Create Account </Link></div>
                                <div className="change_link">Forgot password? <Link to={'/forgot-password-email'} className="nav-link"> Reset Password </Link></div>
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






