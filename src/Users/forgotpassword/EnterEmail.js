import React, {Component} from 'react';
import $ from "jquery";


export default class EnterEmail extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
        }

    }

    handleEmailInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        }, () => {
            this.validateEmail()
        });

    };

    validateEmail = () => {
        let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (!re.test(this.state.email)) {
            $('#email').removeClass("is-valid");
            $('#email').addClass("is-invalid")
        } else {
            $('#email').removeClass("is-invalid");
            $('#email').addClass("is-valid")
        }
        if (!this.state.email) {
            $('#email').removeClass("is-valid");
            $('#email').removeClass("is-invalid");
        }
    };

    sendRequest = (event) => {
        event.preventDefault();
        if (this.state.email.trim()) {
            this.props.forgotPassword(this.state.email.trim());
        } else {
            $("#errorBlockText")
                .html(
                    `<strong>Error! </strong> Empty Input Provided.`
                );
            $("#errorBlock").show()
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
                                            <h4 style={this.style2}>Enter Your Email</h4>
                                        </header>
                                        <br/>
                                        <div>
                                            <input type="text" name="email" id="email" className="form-control"
                                                   placeholder="example@gh.gov"
                                                   value={this.state.email}
                                                   onChange={this.handleEmailInputChange} required autoFocus/>
                                            <div className="invalid-feedback">
                                                Please enter a valid email.
                                            </div>
                                            <div className="valid-feedback">
                                                Valid email entered.
                                            </div>
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
                </div>

            </div>
        )
    }
}





















