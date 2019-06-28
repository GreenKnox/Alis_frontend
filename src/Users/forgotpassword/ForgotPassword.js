import React, {Component} from 'react';
import axios from 'axios/index';
import NotFound from '../../NotFound'
import * as env from '../../config'
import SingleInput from '../../components/SingleInput'
import {Redirect} from 'react-router-dom'
import queryString from "query-string";

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


export default class ForgotPassword extends Component {

    constructor(props) {
        super(props);
        const values = queryString.parse(this.props.location.search);

        this.state = {
            id: values._uid,
            token: values._tk_n,
            input_1: '',
            input_2: '',
            cond: false
        }

    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = (target.type === 'checkbox') ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        })
    };


    handleReset = () => {
        this.setState({
            input_1: '',
            input_2: ''
        });
    };


    renderRedirect = (path) => {
        return <Redirect to={`/${path}`}/>
    };


    verifyToken = async () => {
        try {
            const response = await axios.get(`${env.API_URL}/checktoken`, {
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
        if (this.state.input_1.trim() === this.state.input_2.trim()) {
            this.props.forgotPassword(this.state.input_1, this.state.id, this.state.token);
            this.handleReset()
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
                                        <label htmlFor="Input_1">New Passsword</label>
                                        <SingleInput
                                            inputType={'password'}
                                            name={'input_1'}
                                            controlFunc={this.handleInputChange}
                                            content={this.state.input_1}
                                            placeholder={'********'}/>

                                    </div>
                                    <br/>
                                    <div>
                                        <label htmlFor="Input_2">Confirm Password</label>
                                        <SingleInput
                                            inputType={'password'}
                                            name={'input_2'}
                                            controlFunc={this.handleInputChange}
                                            content={this.state.input_2}
                                            placeholder={'********'}/>
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