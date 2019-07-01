import React, {Component} from 'react';
import SingleInput from '../../components/SingleInput'
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

export default class EnterEmail extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
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


    renderRedirect = (path) => {
        return <Redirect to={`/${path}`}/>
    };


    handleReset = () => {
        this.setState({
            email: ''
        });
    };


    sendRequest = (event) => {
        event.preventDefault();
        if (this.state.email.trim()) {
            this.props.forgotPassword(this.state.email.trim());
            this.handleReset();
        } else {
            // todo: add error display
            alert('No input accepted');
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





















