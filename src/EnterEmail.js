import React, {Component} from 'react';
import axios from 'axios';
import SingleInput from './SingleInput'
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

const API_URL = 'http://127.0.0.1:8000/api/passwordreset';


export default class EnterEmail extends Component {

    constructor(props) {
        super(props);

        this.state = {
            message: '',
            token: '',
            email: '',
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

    handleReset = () => {
        this.setState({
            email: ''
        });
    };

    setRedirect = () => {
        this.setState({
            redirect: true
        })
    };
    renderRedirect = (data = 100) => {
        if (this.state.redirect) {
            return <Redirect to={{
                pathname: '/forgot-password',
                code: data
            }}/>
        }
    };

    sendRequest = (event) => {
        event.preventDefault();
        if (this.state.email.trim()) {
            axios.post(API_URL, {email: this.state.email})
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
                            this.setState({
                                message: response.data.message,
                                token: response.data.token
                            });
                            this.handleReset();
                            // then display notification to user that email verification has been sent to the mail for password reset
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

        } else {
            console.log('No input accepted');
        }
    };



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
                            <form onSubmit={this.sendRequest}>
                                <header>
                                    <h4 style={this.style2}>Enter Your Email</h4>
                                </header>
                                <div>
                                    <label htmlFor="Password">Email</label>
                                    <SingleInput
                                        inputType={'email'}
                                        name={'email'}
                                        controlFunc={this.handleInputChange}
                                        content={this.state.email}
                                        placeholder={'Type email'} />
                                </div>
                                <div>
                                    <button type="submit" className="btn btn-outline-success" value="Submit">Submit</button>
                                </div>
                            </form>
                        </div>
                    </section>
                </div>
            </div>
        )
    }
}





















