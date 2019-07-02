import React, {Component} from 'react';
import $ from 'jquery';
import axios from 'axios/index';
import Table from '../components/Table'
import Sidebar from '../components/Sidebar'
import {Redirect} from 'react-router-dom'
import '../css/admin.css';
import * as env from "../config";


const styles = {
    hand: {
        cursor: 'pointer',
        color: '#636e72'
    },
};

var allUsers = [];
var tempUser = [];
var tempUsers = [];

export default class Admin extends Component {

    constructor(props) {
        super(props);

        this.state = {
            token: "",
            isLoggedIn: "",
            user: "",
            columnNames: ["First Name", "Last Name", "Email", "Phone"],
            users: [
                [],
                [],
                [],
                []
            ]
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
        this.setState({})
    };


    renderRedirect = (path) => {
        return <Redirect to={`/${path}`}/>
    };


    componentDidMount() {

        $('#sidebarCollapse').on('click', function () {
            $('#sidebar').toggleClass('active');
            $('#my-arrow').toggleClass('fa-arrow-right fa-arrow-left');
        });

        let state = localStorage["appState"];
        if (state) {
            let AppState = JSON.parse(state);
            console.log(AppState);
            this.setState({isLoggedIn: AppState.isLoggedIn, user: AppState.user});
        }

        axios.get(`${env.API_URL}/users`)
            .then(function (response) {
                switch (response.status) {
                    case 404: {
                        console.log(`User not found Status Code: ${response.status}`);
                        console.log(`Error: ${response.message}`);
                        // then display notification to user that the email does not exist in the database
                        break;
                    }
                    case 200: {
                        // then display notification to user that email verification has been sent to the mail for password reset
                        allUsers = response.data.data;
                        for (let i = 0; i < allUsers.length; i++) {
                            tempUser.push(allUsers[i]["first_name"]);
                            tempUser.push(allUsers[i]["last_name"]);
                            tempUser.push(allUsers[i]["email"]);
                            tempUser.push(allUsers[i]["phone"]);
                            tempUsers.push(tempUser);
                            tempUser = []
                        }
                        console.log(tempUsers);

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
                    console.log('Error: ', error.message);
                }
                console.log(error.config);
            })
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

                            {/*<button type="button" id="sidebarCollapse" className="btn">*/}
                            {/*    <i className="fas fa-arrow-left" id="my-arrow"></i>*/}
                            {/*    <span></span>*/}
                            {/*</button>*/}

                            <button type="button" id="sidebarCollapse" className="btn">
                                <i className="fas fa-align-left"></i>
                                <span></span>
                            </button>

                            <button className="btn btn-dark d-inline-block d-lg-none ml-auto" type="button"
                                    data-toggle="collapse" data-target="#navbarSupportedContent"
                                    aria-controls="navbarSupportedContent" aria-expanded="false"
                                    aria-label="Toggle navigation">
                                <i className="fas fa-align-justify"></i>
                            </button>

                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <h3>Admin</h3>
                                <ul className="nav navbar-nav ml-auto">

                                    <li className="nav-item">
                                        <a className="nav-link" href="#">Home</a>

                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="#">Help</a>
                                    </li>
                                    <li className="nav-item">
                                        {/*<a className="nav-link" style={styles.hand} onClick={this.renderRedirect('')}>Home</a>*/}
                                        <div className="dropdown show">
                                            <button class="btn" role="button"
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


                        <div className="row">

                            <div className="col-lg-5 col-md-12">
                                <h2>Modules</h2>
                                <form action="">
                                    <div className="input-group mb-3">
                                        <input type="text" className="form-control" placeholder="Add New Module"
                                               aria-label="Recipient's username" aria-describedby="basic-addon2"/>
                                        <div className="input-group-append">
                                            <button className="btn btn-outline-success" type="button">Add
                                            </button>
                                        </div>
                                    </div>
                                </form>
                                <hr/>

                                <div className="list-group" id="list-tab" role="tablist">
                                    <a className="list-group-item list-group-item-action
                                d-flex justify-content-between align-items-center" id="list-home-list"
                                       data-toggle="list" href="#list-home" role="tab" aria-controls="home">
                                        <div className='mr-auto'>Home</div>
                                        <button className='btn btn-info btn-xs btn-edit'>Edit</button>
                                        <button className='btn btn-danger btn-xs btn-delete'>Delete</button>
                                    </a>
                                    <a className="list-group-item list-group-item-action
                                d-flex justify-content-between align-items-center" id="list-profile-list"
                                       data-toggle="list" href="#list-profile" role="tab" aria-controls="profile">
                                        <div className='mr-auto'>Profile</div>
                                        <button className='btn btn-info btn-xs btn-edit'>Edit</button>
                                        <button className='btn btn-danger btn-xs btn-delete'>Delete</button>
                                    </a>
                                    <a className="list-group-item list-group-item-action
                                d-flex justify-content-between align-items-center" id="list-messages-list"
                                       data-toggle="list" href="#list-messages" role="tab" aria-controls="messages">
                                        <div className='mr-auto'>Messages</div>
                                        <button className='btn btn-info btn-xs btn-edit'>Edit</button>
                                        <button className='btn btn-danger btn-xs btn-delete'>Delete</button>
                                    </a>
                                    <a className="list-group-item list-group-item-action
                                d-flex justify-content-between align-items-center" id="list-settings-list"
                                       data-toggle="list" href="#list-settings" role="tab" aria-controls="settings">
                                        <div className='mr-auto'>Settings</div>
                                        <button className='btn btn-info btn-xs btn-edit'>Edit</button>
                                        <button className='btn btn-danger btn-xs btn-delete'>Delete</button>
                                    </a>
                                </div>
                            </div>

                            <div className="col-lg-7 col-md-12">
                                <h2>Module Persmissions</h2>
                                <form action="">
                                    <div className="input-group mb-3">
                                        <input type="text" className="form-control" placeholder="Add New Permission"
                                               aria-label="Recipient's username" aria-describedby="basic-addon2"/>
                                        <div className="input-group-append">
                                            <button className="btn btn-outline-success" type="button">Add
                                            </button>
                                        </div>
                                    </div>
                                </form>

                                <hr/>
                                <div className="tab-content" id="nav-tabContent">
                                    <div className="tab-pane fade show active" id="list-home" role="tabpanel"
                                         aria-labelledby="list-home-list">

                                        <div className="list-group">
                                            <button type="button"
                                                    className="list-group-item list-group-item-action d-flex justify-content-end align-items-center">
                                                <div className='mr-auto'>Cras justo odio</div>
                                                <button className='btn btn-info btn-xs btn-edit'>Edit</button>
                                                <button className='btn btn-danger btn-xs btn-delete'>Delete</button>
                                            </button>
                                            <button type="button"
                                                    className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">Dapibus
                                                <div className='mr-auto'>Cras justo odio</div>
                                                <button className='btn btn-info btn-xs btn-edit'>Edit</button>
                                                <button className='btn btn-danger btn-xs btn-delete'>Delete</button>
                                            </button>
                                        </div>

                                    </div>
                                    <div className="tab-pane fade" id="list-profile" role="tabpanel"
                                         aria-labelledby="list-profile-list">

                                        <div className="list-group">
                                            <button type="button"
                                                    className="list-group-item list-group-item-action d-flex justify-content-end align-items-center">
                                                <div className='mr-auto'>Cras justo odio</div>
                                                <button className='btn btn-info btn-xs btn-edit'>Edit</button>
                                                <button className='btn btn-danger btn-xs btn-delete'>Delete</button>
                                            </button>
                                            <button type="button"
                                                    className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">Dapibus
                                                <div className='mr-auto'>Cras justo odio</div>
                                                <button className='btn btn-info btn-xs btn-edit'>Edit</button>
                                                <button className='btn btn-danger btn-xs btn-delete'>Delete</button>
                                            </button>
                                            <button type="button"
                                                    className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">Morbi
                                                <div className='mr-auto'>Cras justo odio</div>
                                                <button className='btn btn-info btn-xs btn-edit'>Edit</button>
                                                <button className='btn btn-danger btn-xs btn-delete'>Delete</button>
                                            </button>
                                        </div>

                                    </div>
                                    <div className="tab-pane fade" id="list-messages" role="tabpanel"
                                         aria-labelledby="list-messages-list">

                                        <div className="list-group">
                                            <button type="button"
                                                    className="list-group-item list-group-item-action d-flex justify-content-end align-items-center">
                                                <div className='mr-auto'>Cras justo odio</div>
                                                <button className='btn btn-info btn-xs btn-edit'>Edit</button>
                                                <button className='btn btn-danger btn-xs btn-delete'>Delete</button>
                                            </button>
                                            <button type="button"
                                                    className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">Morbi
                                                <div className='mr-auto'>Cras justo odio</div>
                                                <button className='btn btn-info btn-xs btn-edit'>Edit</button>
                                                <button className='btn btn-danger btn-xs btn-delete'>Delete</button>
                                            </button>
                                            <button type="button"
                                                    className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">Dapibus
                                                <div className='mr-auto'>Cras justo odio</div>
                                                <button className='btn btn-info btn-xs btn-edit'>Edit</button>
                                                <button className='btn btn-danger btn-xs btn-delete'>Delete</button>
                                            </button>
                                            <button type="button"
                                                    className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">Morbi
                                                <div className='mr-auto'>Cras justo odio</div>
                                                <button className='btn btn-info btn-xs btn-edit'>Edit</button>
                                                <button className='btn btn-danger btn-xs btn-delete'>Delete</button>
                                            </button>
                                        </div>

                                    </div>
                                    <div className="tab-pane fade" id="list-settings" role="tabpanel"
                                         aria-labelledby="list-settings-list">

                                        <div className="list-group">
                                            <button type="button"
                                                    className="list-group-item list-group-item-action d-flex justify-content-end align-items-center">
                                                <div className='mr-auto'>Cras justo odio</div>
                                                <button className='btn btn-info btn-xs btn-edit'>Edit</button>
                                                <button className='btn btn-danger btn-xs btn-delete'>Delete</button>
                                            </button>
                                            <button type="button"
                                                    className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">Dapibus
                                                <div className='mr-auto'>Cras justo odio</div>
                                                <button className='btn btn-info btn-xs btn-edit'>Edit</button>
                                                <button className='btn btn-danger btn-xs btn-delete'>Delete</button>
                                            </button>
                                            <button type="button"
                                                    className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">Morbi
                                                <div className='mr-auto'>Cras justo odio</div>
                                                <button className='btn btn-info btn-xs btn-edit'>Edit</button>
                                                <button className='btn btn-danger btn-xs btn-delete'>Delete</button>
                                            </button>
                                            <button type="button"
                                                    className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">Morbi
                                                <div className='mr-auto'>Cras justo odio</div>
                                                <button className='btn btn-info btn-xs btn-edit'>Edit</button>
                                                <button className='btn btn-danger btn-xs btn-delete'>Delete</button>
                                            </button>
                                            <button type="button"
                                                    className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">Morbi
                                                <div className='mr-auto'>Cras justo odio</div>
                                                <button className='btn btn-info btn-xs btn-edit'>Edit</button>
                                                <button className='btn btn-danger btn-xs btn-delete'>Delete</button>
                                            </button>
                                        </div>

                                    </div>
                                </div>
                            </div>

                        </div>


                        <div className="line"></div>


                        <h2>Users</h2>
                        <Table columnNames={this.state.columnNames} users={tempUsers}/>

                        <div className="line"></div>


                        <h3>Lorem Ipsum Dolor</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                            laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                            voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                            cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>


                    </div>
                </div>

            </div>
        )
    }
}






