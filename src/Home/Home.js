import React, {Component} from 'react';
import '../css/App.css';
import Sidebar from "../components/Sidebar";
import {Link} from "react-router-dom";
import $ from "jquery";

var AppState = "";

export default class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            token: localStorage["appState"] ? JSON.parse(localStorage["appState"]).user.token : "",
            email: localStorage["appState"] ? JSON.parse(localStorage["appState"]).user.email : "",
            isLoggedin: localStorage["appState"] ? JSON.parse(localStorage["appState"]).isLoggedin : "",
            user: {}
        };

    }

    componentDidMount() {

        let state = localStorage["appState"];
        if (state) {
            AppState = JSON.parse(state);
        }


        $('#sidebarCollapse').on('click', function () {
            $('#sidebar').toggleClass('active');
            $('#my-arrow').toggleClass('fa-arrow-right fa-arrow-left');
        });


        // axios.defaults.headers.common = {'Authorization': `Bearer ${this.state.token}`};
        // axios.post(`${env.API_URL}/users/email`, {
        //     email: this.state.email
        // })
        //     .then(response => {
        //         console.log(response);
        //         return response;
        //     })
        //     .then(json => {
        //         if (json.status === 200) {
        //             this.setState({user: json.data.data});
        //             console.log("You're logged in!");
        //         } else {
        //             console.log("Login Failed!");
        //         }
        //     })
        //     .catch(error => {
        //         console.log(`An Error Occurred! ${error}`);
        //     });
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

                                <h3>Home</h3>

                                <ul className="nav navbar-nav ml-auto">

                                    <li className="nav-item">
                                        <Link to={'/'} className="nav-link dropdown-item "> Home </Link>

                                    </li>
                                    <li className="nav-item">
                                        {/*<a className="nav-link" style={styles.hand} onClick={this.renderRedirect('')}>Home</a>*/}
                                        <div className="dropdown show">
                                            <button className="btn" role="button"
                                                    id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true"
                                                    aria-expanded="false"><i className="fas fa-user"></i>
                                            </button>

                                            <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                                <a className="dropdown-item" href="#"
                                                   onClick={this.props.logoutUser}>Logout</a>
                                                <a className="dropdown-item" href="#">Profile</a>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>

                    <div className="container">


                    </div>
                </div>

            </div>

        )
    }
}


