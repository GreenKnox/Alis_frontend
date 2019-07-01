import React, {Component} from 'react';
import $ from 'jquery';
// import * as env from '../config'
import Table from '../components/Table'
import {Link, Redirect} from 'react-router-dom'
import '../css/admin.css';


const styles = {
    hand: {
        cursor: 'pointer',
        color: '#636e72'
    },
};

export default class Admin extends Component {

    constructor(props) {
        super(props);

        this.state = {
            token: "",
            isLoggedIn: "",
            user: "",


            columnNames: ["First Name", "Last Name", "Email", "Rank", "Age"],
            users: [
                ["Kwame", "Asare", "asarebernard98@gmail.com", "Manager", "20"],
                ["Kwame", "Asare", "asarebernard98@gmail.com", "Manager", "20"],
                ["Kwame", "Asare", "asarebernard98@gmail.com", "Manager", "20"]
            ],


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
        });

        let state = localStorage["appState"];
        if (state) {
            let AppState = JSON.parse(state);
            console.log(AppState);
            this.setState({isLoggedIn: AppState.isLoggedIn, user: AppState.user});
        }

        console.log(this.state.user)
    }

    render() {

        let button;

        if (!this.state.isLoggedIn) {
            button = <>
                <li className="nav-item">
                    <Link to={'/login'}
                          className="nav-link"> Login</Link>
                </li>
                <li className="nav-item">
                    <Link to={'/register'}
                          className="nav-link"> Register</Link>
                </li>
            </>

        } else {
            button = <li className="nav-item">
                <a className="" style={styles.hand} onClick={this.props.logoutUser} href='#'>Logout
                </a>
                {/*<Link to={'/logout'}*/}
                {/*          className="nav-link"> Logout</Link>*/}
            </li>
        }

        return (

            <div className="wrapper">

                <nav id="sidebar">
                    <div className="sidebar-header">
                        <h3>Adwenan</h3>
                        <strong>A</strong>
                    </div>

                    <ul className="list-unstyled components">
                        <li className="active">
                            <a href="#homeSubmenu" data-toggle="collapse" aria-expanded="false"
                               className="dropdown-toggle">
                                <i className="fas fa-home"></i>
                                Home
                            </a>
                            <ul className="collapse list-unstyled" id="homeSubmenu">
                                <li>
                                    <a href="#">Home 1</a>
                                </li>
                                <li>
                                    <a href="#">Home 2</a>
                                </li>
                                <li>
                                    <a href="#">Home 3</a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a href="#">
                                <i className="fas fa-briefcase"></i>
                                Modules & Permissions
                            </a>
                            <a href="#pageSubmenu" data-toggle="collapse" aria-expanded="false"
                               className="dropdown-toggle">
                                <i className="fas fa-copy"></i>
                                Pages
                            </a>
                            <ul className="collapse list-unstyled" id="pageSubmenu">
                                <li>
                                    <a href="#">Page 1</a>
                                </li>
                                <li>
                                    <a href="#">Page 2</a>
                                </li>
                                <li>
                                    <a href="#">Page 3</a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a href="#">
                                <i className="fas fa-image"></i>
                                User Management
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <i className="fas fa-question"></i>
                                FAQ
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <i className="fas fa-paper-plane"></i>
                                Contact
                            </a>
                        </li>
                    </ul>

                    <ul className="list-unstyled CTAs">
                        <li>
                            <a href="https://bootstrapious.com/tutorial/files/sidebar.zip" className="download">Download
                                source</a>
                        </li>
                        <li>
                            <a href="https://bootstrapious.com/p/bootstrap-sidebar" className="article">Back to
                                article</a>
                        </li>
                    </ul>
                </nav>


                <div id="content">

                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <div className="container-fluid">

                            <button type="button" id="sidebarCollapse" className="btn btn-info">
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
                                <ul className="nav navbar-nav ml-auto">


                                    <li className="nav-item">
                                        <Link to={'/'}
                                              className="nav-link">Home </Link>
                                    </li>
                                    {button}
                                    <li className="nav-item">
                                        <Link to={'/info'}
                                              className="nav-link">Info </Link>
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

                    </div>

                    <div className="line"></div>


                    <h2>Users</h2>
                    <Table columnNames={this.state.columnNames} users={this.state.users}/>

                    <div className="line"></div>


                    <h3>Lorem Ipsum Dolor</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                </div>

            </div>
        )
    }
}






