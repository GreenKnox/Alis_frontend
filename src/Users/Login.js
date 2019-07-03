import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import '../css/admin.css';
import $ from "jquery";


const styles = {
    style1: {
        fontFamily: 'Lucida Sans Unicode',
        color: '#636e72'
    },
    style2: {
        fontFamily: 'Lucida Console',
        color: '#636e72'
    },
    showColor: {
        'color': '#007bff',
    }
};


export default class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        };

    }
    validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 0;
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = (target.type === 'checkbox') ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        })
    };


    renderRedirect = (path) => {
        return <Redirect to={`${path}`}/>
    };


    validateUser = (event) => {
        event.preventDefault();
        if (this.state.email.trim() && this.state.password.trim()) {
            this.props.loginUser(this.state.email, this.state.password);
        } else {
            console.log('No input accepted');
        }
    };

    componentDidMount() {

        $('#sidebarCollapse').on('click', function () {
            $('#sidebar').toggleClass('active');
            $('#my-arrow').toggleClass('fa-arrow-right fa-arrow-left');
        });
    }





    render() {
        return (
            <div className="wrapper">

                {/*sidebar*/}
                <Sidebar/>

                {/*main content*/}
                <div id="content">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <div className="container-fluid">

                            <button type="button" id="sidebarCollapse" className="btn">
                                <i className="fas fa-arrow-left" id="my-arrow"></i>
                                <span></span>
                            </button>
                            <button className="btn btn-dark d-inline-block d-lg-none ml-auto" type="button"
                                    data-toggle="collapse" data-target="#navbarSupportedContent"
                                    aria-controls="navbarSupportedContent" aria-expanded="false"
                                    aria-label="Toggle navigation">
                                <i className="fas fa-align-justify"></i>
                            </button>

                            <div className="collapse navbar-collapse" id="navbarSupportedContent">

                                <h3>Login</h3>

                                <ul className="nav navbar-nav ml-auto">

                                    <li className="nav-item">
                                        <Link to={'/'}
                                              className="nav-link dropdown-item "> Home </Link>

                                    </li>
                                    <li className="nav-item">
                                        {/*<a className="nav-link" style={styles.hand} onClick={this.renderRedirect('')}>Home</a>*/}
                                        <div className="dropdown show">
                                            <button className="btn" role="button"
                                                    id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true"
                                                    aria-expanded="false"><i className="fas fa-user"></i>
                                            </button>

                                            <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                                <Link to={'/register'}
                                                      className="nav-link dropdown-item "> Register </Link>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>

                    <div className="container">


                        <div className="login_wrapper col-md-4 ml-auto mr-auto">
                            <section className="login_content ">
                                <div className="shadow-lg p-3 mb-5 bg-white rounded" id="login-form">
                                    <form onSubmit={this.validateUser}>
                                        <header>
                                            <h4 style={this.style2}>Login</h4>
                                        </header>
                                        <br/>

                                        <div>
                                            <label htmlFor="Email">Email</label>
                                            <input type="text" name="email" className="form-control"
                                                   placeholder="example@gh.gov"
                                                   value={this.state.email}
                                                   onChange={this.handleInputChange} required autoFocus/>
                                        </div>
                                        <br/>
                                        <div>
                                            <label htmlFor="Passsword">Password</label>
                                            <input type="password" name="password" className="form-control"
                                                   placeholder="*************"
                                                   value={this.state.password}
                                                   onChange={this.handleInputChange} required/>
                                        </div>
                                        <br/>
                                        <div>
                                            <div>
                                                <button className="btn btn-outline-success" type="submit" disabled={!this.validateForm()}
                                                        typeof="Submit">Login
                                                </button>
                                            </div>
                                        </div>

                                        <div className="clearfix"></div>
                                        <br/>

                                        <div className="separator">
                                            <div className="change_link">New to this site? <Link to={'/register'}
                                                                                                 style={styles.showColor}> Create
                                                Account </Link></div>
                                            <div className="change_link">Forgot password? <Link
                                                to={'/forgot-password-email'}
                                                style={styles.showColor}> Reset
                                                Password </Link></div>
                                            <div className="clearfix"></div>
                                            <br/>
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






