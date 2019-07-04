import React, {Component} from 'react';
import axios from 'axios/index';
import queryString from 'query-string'
import * as env from '../config'
import {Link} from 'react-router-dom'
import $ from "jquery";


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

                    $('#errorBlock').removeClass("alert-danger");
                    $('#errorBlock').addClass("alert-success");
                    $("#errorBlockText")
                        .html(
                            `<strong>Success! </strong> Activation Successful.`
                        );
                    $("#errorBlock").show();

                    $('html, body').animate({
                        scrollTop: $("#errorBlock").offset().top
                    }, 200);

                    break;
                default: {

                }
            }
        } catch (error) {
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

            this.setState({
                cond: "false",
            });
        }
        return this.state.cond
    };

    hideErrorNotification = () => {
        $('#errorBlock').hide()
    };

    async componentDidMount() {
        $('#ErrorBlock').hide();
        await this.verifyToken();
    }

    render() {
        const {cond} = this.state;
        if (cond) {
            return (
                <div>

                    <div className="alert alert-danger alert-dismissible fade show" role="alert" id="errorBlock">
                        <div id="errorBlockText"></div>
                        <button type="button" className="close" onClick={this.hideErrorNotification}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>

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

                    <div className="alert alert-danger alert-dismissible fade show" role="alert" id="errorBlock">
                        <div id="errorBlockText"></div>
                        <button type="button" className="close" onClick={this.hideErrorNotification}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>

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