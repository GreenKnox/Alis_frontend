import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom'


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


export default class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
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


    handleClearForm = () => {
        this.setState({
            email: '',
            password: ''
        })
    };

    renderRedirect = (path) => {
        return <Redirect to={`/${path}`}/>
    };


    validateUser = (event) => {
        event.preventDefault();
        if (this.state.email.trim() && this.state.password.trim()) {
            this.props.loginUser(this.state.email, this.state.password);
        } else {
            console.log('No input accepted');
        }
        this.handleClearForm()
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
                            <form onSubmit={this.validateUser}>
                                <header>
                                    <h4 style={this.style2}>User Login Form</h4>
                                </header>

                                <div>
                                    <label htmlFor="Username">Username</label>
                                    <input type="text" name="email" className="form-control"
                                           placeholder="example@gh.gov"
                                           value={this.state.email}
                                           onChange={this.handleInputChange} required autoFocus/>
                                </div>
                                <br />
                                <div>
                                    <label htmlFor="Passsword">Password</label>
                                    <input type="password" name="password" className="form-control"
                                           placeholder="*************"
                                           value={this.state.password}
                                           onChange={this.handleInputChange} required/>
                                </div>
                                <br />
                                <div>
                                    <div>
                                        <button className="btn btn-outline-success" type="submit" value="Submit" >Login</button>
                                    </div>
                                </div>

                                <div className="clearfix"></div>

                                <div className="separator">
                                    <div className="change_link">New to this site? <Link to={'/register'}
                                                                                         className="nav-link"> Create
                                        Account </Link></div>
                                    <div className="change_link">Forgot password? <Link to={'/forgot-password-email'}
                                                                                        className="nav-link"> Reset
                                        Password </Link></div>
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






