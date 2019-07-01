import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom'
import '../css/admin.css';


export default class Sidebar extends Component {


    // componentDidMount() {
    //
    // }

    renderRedirect = (path) => {
        return <Redirect to={`/${path}`}/>
    };

    render() {
        return (
            <nav id="sidebar">
                <div className="sidebar-header">
                    <h3>Adwenan</h3>
                    <strong>A</strong>
                </div>

                <ul className="list-unstyled components">
                    <li className="active sidebar-list">
                        <Link to={""}>
                            <i className="fas fa-home"></i>
                            <span>Home</span>
                            <strong></strong>
                        </Link>
                    </li>
                    <li className="sidebar-list">
                        <a href="#adminSubmenu" data-toggle="collapse" aria-expanded="false"
                           className="dropdown-toggle">
                            <i className="fas fa-briefcase"></i>
                            <span>Admin</span>
                            <strong></strong>
                        </a>
                        <ul className="collapse list-unstyled" id="adminSubmenu">
                            <li>
                                <Link to={"/admin"}>Home</Link>
                            </li>
                            <li>
                                <a href="#">Admin 2</a>
                            </li>
                            <li>
                                <a href="#">Admin 3</a>
                            </li>
                        </ul>
                    </li>

                    <li className="sidebar-list">
                        <a href="#pageSubmenu" data-toggle="collapse" aria-expanded="false"
                           className="dropdown-toggle">
                            <i className="fas fa-copy"></i>
                            <span>Pages</span>
                            <strong></strong>
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
                    <li className="sidebar-list">
                        <a href="#">
                            <i className="fas fa-image"></i>
                            <span>User Management</span>
                            <strong></strong>
                        </a>
                    </li>
                    <li className="sidebar-list">
                        <a href="#">
                            <i className="fas fa-question"></i>
                            <span>FAQ</span>
                            <strong></strong>
                        </a>
                    </li>
                    <li className="sidebar-list">
                        <a href="#">
                            <i className="fas fa-user"></i>
                            <span>User</span>
                            <strong></strong>
                        </a>
                    </li>
                </ul>

                <ul className="list-unstyled CTAs">
                    <li>
                        <a href="https://bootstrapious.com/tutorial/files/sidebar.zip" className="download">Lorem
                            Ipsum</a>
                    </li>
                    <li>
                        <a href="https://bootstrapious.com/p/bootstrap-sidebar" className="article">Lorem Ipsum</a>
                    </li>
                </ul>
            </nav>
        )
    }
}




