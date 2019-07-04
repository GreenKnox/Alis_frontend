  import React, {Component} from 'react';
import {Redirect} from 'react-router-dom'
import queryString from "query-string/index";
import * as env from "../../config";
import axios from 'axios/index';
import '../../css/user.css';
import Sidebar from "../../components/Sidebar";


var tempDetails = {};
export default class User extends Component {

    constructor(props) {
        super(props);

        const values = queryString.parse(this.props.location.search);
        this.state = {
            isLoggedIn: "",
            user: "",
            userEmail: values.email,
            userDetail: {}
        }

    }


    renderRedirect = (path) => {
        return <Redirect to={`${path}`}/>
    };


    componentDidMount() {

        let state = localStorage["appState"];
        if (state) {
            let AppState = JSON.parse(state);
            console.log(AppState);
            this.setState({isLoggedIn: AppState.isLoggedIn, user: AppState.user});
        }


        axios.get(`${env.API_URL}/users/email`, {email: this.state.userEmail})
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
                        tempDetails = response.data.data;
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

                            <button type="button" id="sidebarCollapse" className="btn">
                                <i className="fas fa-align-left"></i>
                            </button>
                            <button className="btn btn-dark d-inline-block d-lg-none ml-auto" type="button"
                                    data-toggle="collapse" data-target="#navbarSupportedContent"
                                    aria-controls="navbarSupportedContent" aria-expanded="false"
                                    aria-label="Toggle navigation">
                                <i className="fas fa-align-justify"></i>
                            </button>

                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <h3>User</h3>
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


                        <div id="user-profile-2" className="user-profile">
                            <div className="tabbable">
                                <ul className="nav nav-tabs padding-18">
                                    <li className="active">
                                        <a data-toggle="tab" href="#home">
                                            <i className="green ace-icon fa fa-user bigger-120"></i>
                                            Profile
                                        </a>
                                    </li>

                                    <li>
                                        <a data-toggle="tab" href="#feed">
                                            <i className="orange ace-icon fa fa-rss bigger-120"></i>
                                            Activity Feed
                                        </a>
                                    </li>

                                    <li>
                                        <a data-toggle="tab" href="#friends">
                                            <i className="blue ace-icon fa fa-users bigger-120"></i>
                                            Friends
                                        </a>
                                    </li>

                                    <li>
                                        <a data-toggle="tab" href="#pictures">
                                            <i className="pink ace-icon fa fa-picture-o bigger-120"></i>
                                            Pictures
                                        </a>
                                    </li>
                                </ul>

                                <div className="tab-content no-border padding-24">
                                    <div id="home" className="tab-pane in active">
                                        <div className="row">
                                            <div className="col-xs-12 col-sm-3 center">
							<span className="profile-picture">
								<img className="editable img-responsive" alt=" Avatar" id="avatar2"
                                     src="http://bootdey.com/img/Content/avatar/avatar6.png"/>
							</span>

                                                <div className="space space-4"></div>

                                                <a href="#" className="btn btn-sm btn-block btn-success">
                                                    <i className="ace-icon fa fa-plus-circle bigger-120"></i>
                                                    <span className="bigger-110">Add as a friend</span>
                                                </a>

                                                <a href="#" className="btn btn-sm btn-block btn-primary">
                                                    <i className="ace-icon fa fa-envelope-o bigger-110"></i>
                                                    <span className="bigger-110">Send a message</span>
                                                </a>
                                            </div>


                                            <div className="col-xs-12 col-sm-9">
                                                <h4 className="blue">
                                                    <span className="middle">John Doe</span>

                                                    <span className="label label-purple arrowed-in-right">
									<i className="ace-icon fa fa-circle smaller-80 align-middle"></i>
									online
								</span>
                                                </h4>

                                                <div className="profile-user-info">
                                                    <div className="profile-info-row">
                                                        <div className="profile-info-name"> Username</div>

                                                        <div className="profile-info-value">
                                                            <span>alexdoe</span>
                                                        </div>
                                                    </div>

                                                    <div className="profile-info-row">
                                                        <div className="profile-info-name"> Location</div>

                                                        <div className="profile-info-value">
                                                            <i className="fa fa-map-marker light-orange bigger-110"></i>
                                                            <span>Netherlands</span>
                                                            <span>Amsterdam</span>
                                                        </div>
                                                    </div>

                                                    <div className="profile-info-row">
                                                        <div className="profile-info-name"> Age</div>

                                                        <div className="profile-info-value">
                                                            <span>38</span>
                                                        </div>
                                                    </div>

                                                    <div className="profile-info-row">
                                                        <div className="profile-info-name"> Joined</div>

                                                        <div className="profile-info-value">
                                                            <span>2010/06/20</span>
                                                        </div>
                                                    </div>

                                                    <div className="profile-info-row">
                                                        <div className="profile-info-name"> Last Online</div>

                                                        <div className="profile-info-value">
                                                            <span>3 hours ago</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="hr hr-8 dotted"></div>

                                                <div className="profile-user-info">
                                                    <div className="profile-info-row">
                                                        <div className="profile-info-name"> Website</div>

                                                        <div className="profile-info-value">
                                                            <a href="#" target="_blank">www.alexdoe.com</a>
                                                        </div>
                                                    </div>

                                                    <div className="profile-info-row">
                                                        <div className="profile-info-name">
                                                            <i className="middle ace-icon fa fa-facebook-square bigger-150 blue"></i>
                                                        </div>

                                                        <div className="profile-info-value">
                                                            <a href="#">Find me on Facebook</a>
                                                        </div>
                                                    </div>

                                                    <div className="profile-info-row">
                                                        <div className="profile-info-name">
                                                            <i className="middle ace-icon fa fa-twitter-square bigger-150 light-blue"></i>
                                                        </div>

                                                        <div className="profile-info-value">
                                                            <a href="#">Follow me on Twitter</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>


                                        <div className="space-20"></div>

                                        <div className="row">
                                            <div className="col-xs-12 col-sm-6">
                                                <div className="widget-box transparent">
                                                    <div className="widget-header widget-header-small">
                                                        <h4 className="widget-title smaller">
                                                            <i className="ace-icon fa fa-check-square-o bigger-110"></i>
                                                            Little About Me
                                                        </h4>
                                                    </div>

                                                    <div className="widget-body">
                                                        <div className="widget-main">
                                                            <p>
                                                                My job is mostly lorem ipsuming and dolor sit ameting as
                                                                long as consectetur adipiscing elit.
                                                            </p>
                                                            <p>
                                                                Sometimes quisque commodo massa gets in the way and sed
                                                                ipsum porttitor facilisis.
                                                            </p>
                                                            <p>
                                                                The best thing about my job is that vestibulum id ligula
                                                                porta felis euismod and nullam quis risus eget urna
                                                                mollis ornare.
                                                            </p>
                                                            <p>
                                                                Thanks for visiting my profile.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                    <div id="feed" className="tab-pane">
                                        <div className="profile-feed row">
                                            <div className="col-sm-6">
                                                <div className="profile-activity clearfix">
                                                    <div>
                                                        <img className="pull-left" alt="Alex Doe's avatar"
                                                             src="http://bootdey.com/img/Content/avatar/avatar1.png"/>
                                                        <a className="user" href="#"> Alex Doe </a>
                                                        changed his profile photo.
                                                        <a href="#">Take a look</a>

                                                        <div className="time">
                                                            <i className="ace-icon fa fa-clock-o bigger-110"></i>
                                                            an hour ago
                                                        </div>
                                                    </div>

                                                    <div className="tools action-buttons">
                                                        <a href="#" className="blue">
                                                            <i className="ace-icon fa fa-pencil bigger-125"></i>
                                                        </a>

                                                        <a href="#" className="red">
                                                            <i className="ace-icon fa fa-times bigger-125"></i>
                                                        </a>
                                                    </div>
                                                </div>

                                                <div className="profile-activity clearfix">
                                                    <div>
                                                        <img className="pull-left" alt="Susan Smith's avatar"
                                                             src="http://bootdey.com/img/Content/avatar/avatar2.png"/>
                                                        <a className="user" href="#"> Susan Smith </a>

                                                        is now friends with Alex Doe.
                                                        <div className="time">
                                                            <i className="ace-icon fa fa-clock-o bigger-110"></i>
                                                            2 hours ago
                                                        </div>
                                                    </div>

                                                    <div className="tools action-buttons">
                                                        <a href="#" className="blue">
                                                            <i className="ace-icon fa fa-pencil bigger-125"></i>
                                                        </a>

                                                        <a href="#" className="red">
                                                            <i className="ace-icon fa fa-times bigger-125"></i>
                                                        </a>
                                                    </div>
                                                </div>

                                                <div className="profile-activity clearfix">
                                                    <div>
                                                        <i className="pull-left thumbicon fa fa-check btn-success no-hover"></i>
                                                        <a className="user" href="#"> Alex Doe </a>
                                                        joined
                                                        <a href="#">Country Music</a>

                                                        group.
                                                        <div className="time">
                                                            <i className="ace-icon fa fa-clock-o bigger-110"></i>
                                                            5 hours ago
                                                        </div>
                                                    </div>

                                                    <div className="tools action-buttons">
                                                        <a href="#" className="blue">
                                                            <i className="ace-icon fa fa-pencil bigger-125"></i>
                                                        </a>

                                                        <a href="#" className="red">
                                                            <i className="ace-icon fa fa-times bigger-125"></i>
                                                        </a>
                                                    </div>
                                                </div>

                                                <div className="profile-activity clearfix">
                                                    <div>
                                                        <i className="pull-left thumbicon fa fa-picture-o btn-info no-hover"></i>
                                                        <a className="user" href="#"> Alex Doe </a>
                                                        uploaded a new photo.
                                                        <a href="#">Take a look</a>

                                                        <div className="time">
                                                            <i className="ace-icon fa fa-clock-o bigger-110"></i>
                                                            5 hours ago
                                                        </div>
                                                    </div>

                                                    <div className="tools action-buttons">
                                                        <a href="#" className="blue">
                                                            <i className="ace-icon fa fa-pencil bigger-125"></i>
                                                        </a>

                                                        <a href="#" className="red">
                                                            <i className="ace-icon fa fa-times bigger-125"></i>
                                                        </a>
                                                    </div>
                                                </div>

                                                <div className="profile-activity clearfix">
                                                    <div>
                                                        <img className="pull-left" alt="David Palms's avatar"
                                                             src="http://bootdey.com/img/Content/avatar/avatar3.png"/>
                                                        <a className="user" href="#"> David Palms </a>

                                                        left a comment on Alex's wall.
                                                        <div className="time">
                                                            <i className="ace-icon fa fa-clock-o bigger-110"></i>
                                                            8 hours ago
                                                        </div>
                                                    </div>

                                                    <div className="tools action-buttons">
                                                        <a href="#" className="blue">
                                                            <i className="ace-icon fa fa-pencil bigger-125"></i>
                                                        </a>

                                                        <a href="#" className="red">
                                                            <i className="ace-icon fa fa-times bigger-125"></i>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>


                                            <div className="col-sm-6">
                                                <div className="profile-activity clearfix">
                                                    <div>
                                                        <i className="pull-left thumbicon fa fa-pencil-square-o btn-pink no-hover"></i>
                                                        <a className="user" href="#"> Alex Doe </a>
                                                        published a new blog post.
                                                        <a href="#">Read now</a>

                                                        <div className="time">
                                                            <i className="ace-icon fa fa-clock-o bigger-110"></i>
                                                            11 hours ago
                                                        </div>
                                                    </div>

                                                    <div className="tools action-buttons">
                                                        <a href="#" className="blue">
                                                            <i className="ace-icon fa fa-pencil bigger-125"></i>
                                                        </a>

                                                        <a href="#" className="red">
                                                            <i className="ace-icon fa fa-times bigger-125"></i>
                                                        </a>
                                                    </div>
                                                </div>

                                                <div className="profile-activity clearfix">
                                                    <div>
                                                        <img className="pull-left" alt="Alex Doe's avatar"
                                                             src="http://bootdey.com/img/Content/avatar/avatar4.png"/>
                                                        <a className="user" href="#"> Alex Doe </a>

                                                        upgraded his skills.
                                                        <div className="time">
                                                            <i className="ace-icon fa fa-clock-o bigger-110"></i>
                                                            12 hours ago
                                                        </div>
                                                    </div>

                                                    <div className="tools action-buttons">
                                                        <a href="#" className="blue">
                                                            <i className="ace-icon fa fa-pencil bigger-125"></i>
                                                        </a>

                                                        <a href="#" className="red">
                                                            <i className="ace-icon fa fa-times bigger-125"></i>
                                                        </a>
                                                    </div>
                                                </div>

                                                <div className="profile-activity clearfix">
                                                    <div>
                                                        <i className="pull-left thumbicon fa fa-key btn-info no-hover"></i>
                                                        <a className="user" href="#"> Alex Doe </a>

                                                        logged in.
                                                        <div className="time">
                                                            <i className="ace-icon fa fa-clock-o bigger-110"></i>
                                                            12 hours ago
                                                        </div>
                                                    </div>

                                                    <div className="tools action-buttons">
                                                        <a href="#" className="blue">
                                                            <i className="ace-icon fa fa-pencil bigger-125"></i>
                                                        </a>

                                                        <a href="#" className="red">
                                                            <i className="ace-icon fa fa-times bigger-125"></i>
                                                        </a>
                                                    </div>
                                                </div>

                                                <div className="profile-activity clearfix">
                                                    <div>
                                                        <i className="pull-left thumbicon fa fa-power-off btn-inverse no-hover"></i>
                                                        <a className="user" href="#"> Alex Doe </a>

                                                        logged out.
                                                        <div className="time">
                                                            <i className="ace-icon fa fa-clock-o bigger-110"></i>
                                                            16 hours ago
                                                        </div>
                                                    </div>

                                                    <div className="tools action-buttons">
                                                        <a href="#" className="blue">
                                                            <i className="ace-icon fa fa-pencil bigger-125"></i>
                                                        </a>

                                                        <a href="#" className="red">
                                                            <i className="ace-icon fa fa-times bigger-125"></i>
                                                        </a>
                                                    </div>
                                                </div>

                                                <div className="profile-activity clearfix">
                                                    <div>
                                                        <i className="pull-left thumbicon fa fa-key btn-info no-hover"></i>
                                                        <a className="user" href="#"> Alex Doe </a>

                                                        logged in.
                                                        <div className="time">
                                                            <i className="ace-icon fa fa-clock-o bigger-110"></i>
                                                            16 hours ago
                                                        </div>
                                                    </div>

                                                    <div className="tools action-buttons">
                                                        <a href="#" className="blue">
                                                            <i className="ace-icon fa fa-pencil bigger-125"></i>
                                                        </a>

                                                        <a href="#" className="red">
                                                            <i className="ace-icon fa fa-times bigger-125"></i>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>


                                        <div className="space-12"></div>

                                        <div className="center">
                                            <button type="button"
                                                    className="btn btn-sm btn-primary btn-white btn-round">
                                                <i className="ace-icon fa fa-rss bigger-150 middle orange2"></i>
                                                <span className="bigger-110">View more activities</span>

                                                <i className="icon-on-right ace-icon fa fa-arrow-right"></i>
                                            </button>
                                        </div>
                                    </div>


                                    <div id="friends" className="tab-pane">
                                        <div className="profile-users clearfix">
                                            <div className="itemdiv memberdiv">
                                                <div className="inline pos-rel">
                                                    <div className="user">
                                                        <a href="#">
                                                            <img src="http://bootdey.com/img/Content/avatar/avatar6.png"
                                                                 alt="Bob Doe's avatar"/>
                                                        </a>
                                                    </div>

                                                    <div className="body">
                                                        <div className="name">
                                                            <a href="#">
                                                                <span className="user-status status-online"></span>
                                                                Bob Doe
                                                            </a>
                                                        </div>
                                                    </div>

                                                    <div className="popover">
                                                        <div className="arrow"></div>

                                                        <div className="popover-content">
                                                            <div className="bolder">Content Editor</div>

                                                            <div className="time">
                                                                <i className="ace-icon fa fa-clock-o middle bigger-120 orange"></i>
                                                                <span className="green"> 20 mins ago </span>
                                                            </div>

                                                            <div className="hr dotted hr-8"></div>

                                                            <div className="tools action-buttons">
                                                                <a href="#">
                                                                    <i className="ace-icon fa fa-facebook-square blue bigger-150"></i>
                                                                </a>

                                                                <a href="#">
                                                                    <i className="ace-icon fa fa-twitter-square light-blue bigger-150"></i>
                                                                </a>

                                                                <a href="#">
                                                                    <i className="ace-icon fa fa-google-plus-square red bigger-150"></i>
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="itemdiv memberdiv">
                                                <div className="inline pos-rel">
                                                    <div className="user">
                                                        <a href="#">
                                                            <img src="http://bootdey.com/img/Content/avatar/avatar1.png"
                                                                 alt="Rose Doe's avatar"/>
                                                        </a>
                                                    </div>

                                                    <div className="body">
                                                        <div className="name">
                                                            <a href="#">
                                                                <span className="user-status status-offline"></span>
                                                                Rose Doe
                                                            </a>
                                                        </div>
                                                    </div>

                                                    <div className="popover">
                                                        <div className="arrow"></div>

                                                        <div className="popover-content">
                                                            <div className="bolder">Graphic Designer</div>

                                                            <div className="time">
                                                                <i className="ace-icon fa fa-clock-o middle bigger-120 grey"></i>
                                                                <span className="grey"> 30 min ago </span>
                                                            </div>

                                                            <div className="hr dotted hr-8"></div>

                                                            <div className="tools action-buttons">
                                                                <a href="#">
                                                                    <i className="ace-icon fa fa-facebook-square blue bigger-150"></i>
                                                                </a>

                                                                <a href="#">
                                                                    <i className="ace-icon fa fa-twitter-square light-blue bigger-150"></i>
                                                                </a>

                                                                <a href="#">
                                                                    <i className="ace-icon fa fa-google-plus-square red bigger-150"></i>
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="itemdiv memberdiv">
                                                <div className="inline pos-rel">
                                                    <div className="user">
                                                        <a href="#">
                                                            <img src="http://bootdey.com/img/Content/avatar/avatar2.png"
                                                                 alt="Jim Doe's avatar"/>
                                                        </a>
                                                    </div>

                                                    <div className="body">
                                                        <div className="name">
                                                            <a href="#">
                                                                <span className="user-status status-busy"></span>
                                                                Jim Doe
                                                            </a>
                                                        </div>
                                                    </div>

                                                    <div className="popover">
                                                        <div className="arrow"></div>

                                                        <div className="popover-content">
                                                            <div className="bolder">SEO &amp; Advertising</div>

                                                            <div className="time">
                                                                <i className="ace-icon fa fa-clock-o middle bigger-120 red"></i>
                                                                <span className="grey"> 1 hour ago </span>
                                                            </div>

                                                            <div className="hr dotted hr-8"></div>

                                                            <div className="tools action-buttons">
                                                                <a href="#">
                                                                    <i className="ace-icon fa fa-facebook-square blue bigger-150"></i>
                                                                </a>

                                                                <a href="#">
                                                                    <i className="ace-icon fa fa-twitter-square light-blue bigger-150"></i>
                                                                </a>

                                                                <a href="#">
                                                                    <i className="ace-icon fa fa-google-plus-square red bigger-150"></i>
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="itemdiv memberdiv">
                                                <div className="inline pos-rel">
                                                    <div className="user">
                                                        <a href="#">
                                                            <img src="http://bootdey.com/img/Content/avatar/avatar3.png"
                                                                 alt="Alex Doe's avatar"/>
                                                        </a>
                                                    </div>

                                                    <div className="body">
                                                        <div className="name">
                                                            <a href="#">
                                                                <span className="user-status status-idle"></span>
                                                                Alex Doe
                                                            </a>
                                                        </div>
                                                    </div>

                                                    <div className="popover">
                                                        <div className="arrow"></div>

                                                        <div className="popover-content">
                                                            <div className="bolder">Marketing</div>

                                                            <div className="time">
                                                                <i className="ace-icon fa fa-clock-o middle bigger-120 orange"></i>
                                                                <span className=""> 40 minutes idle </span>
                                                            </div>

                                                            <div className="hr dotted hr-8"></div>

                                                            <div className="tools action-buttons">
                                                                <a href="#">
                                                                    <i className="ace-icon fa fa-facebook-square blue bigger-150"></i>
                                                                </a>

                                                                <a href="#">
                                                                    <i className="ace-icon fa fa-twitter-square light-blue bigger-150"></i>
                                                                </a>

                                                                <a href="#">
                                                                    <i className="ace-icon fa fa-google-plus-square red bigger-150"></i>
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="itemdiv memberdiv">
                                                <div className="inline pos-rel">
                                                    <div className="user">
                                                        <a href="#">
                                                            <img src="http://bootdey.com/img/Content/avatar/avatar4.png"
                                                                 alt="Phil Doe's avatar"/>
                                                        </a>
                                                    </div>

                                                    <div className="body">
                                                        <div className="name">
                                                            <a href="#">
                                                                <span className="user-status status-online"></span>
                                                                Phil Doe
                                                            </a>
                                                        </div>
                                                    </div>

                                                    <div className="popover">
                                                        <div className="arrow"></div>

                                                        <div className="popover-content">
                                                            <div className="bolder">Public Relations</div>

                                                            <div className="time">
                                                                <i className="ace-icon fa fa-clock-o middle bigger-120 orange"></i>
                                                                <span className="green"> 2 hours ago </span>
                                                            </div>

                                                            <div className="hr dotted hr-8"></div>

                                                            <div className="tools action-buttons">
                                                                <a href="#">
                                                                    <i className="ace-icon fa fa-facebook-square blue bigger-150"></i>
                                                                </a>

                                                                <a href="#">
                                                                    <i className="ace-icon fa fa-twitter-square light-blue bigger-150"></i>
                                                                </a>

                                                                <a href="#">
                                                                    <i className="ace-icon fa fa-google-plus-square red bigger-150"></i>
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="itemdiv memberdiv">
                                                <div className="inline pos-rel">
                                                    <div className="user">
                                                        <a href="#">
                                                            <img src="http://bootdey.com/img/Content/avatar/avatar6.png"
                                                                 alt="Susan Doe's avatar"/>
                                                        </a>
                                                    </div>

                                                    <div className="body">
                                                        <div className="name">
                                                            <a href="#">
                                                                <span className="user-status status-online"></span>
                                                                Susan Doe
                                                            </a>
                                                        </div>
                                                    </div>

                                                    <div className="popover">
                                                        <div className="arrow"></div>

                                                        <div className="popover-content">
                                                            <div className="bolder">HR Management</div>

                                                            <div className="time">
                                                                <i className="ace-icon fa fa-clock-o middle bigger-120 orange"></i>
                                                                <span className="green"> 20 mins ago </span>
                                                            </div>

                                                            <div className="hr dotted hr-8"></div>

                                                            <div className="tools action-buttons">
                                                                <a href="#">
                                                                    <i className="ace-icon fa fa-facebook-square blue bigger-150"></i>
                                                                </a>

                                                                <a href="#">
                                                                    <i className="ace-icon fa fa-twitter-square light-blue bigger-150"></i>
                                                                </a>

                                                                <a href="#">
                                                                    <i className="ace-icon fa fa-google-plus-square red bigger-150"></i>
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="itemdiv memberdiv">
                                                <div className="inline pos-rel">
                                                    <div className="user">
                                                        <a href="#">
                                                            <img src="http://bootdey.com/img/Content/avatar/avatar1.png"
                                                                 alt="Jennifer Doe's avatar"/>
                                                        </a>
                                                    </div>

                                                    <div className="body">
                                                        <div className="name">
                                                            <a href="#">
                                                                <span className="user-status status-offline"></span>
                                                                Jennifer Doe
                                                            </a>
                                                        </div>
                                                    </div>

                                                    <div className="popover">
                                                        <div className="arrow"></div>

                                                        <div className="popover-content">
                                                            <div className="bolder">Graphic Designer</div>

                                                            <div className="time">
                                                                <i className="ace-icon fa fa-clock-o middle bigger-120 grey"></i>
                                                                <span className="grey"> 2 hours ago </span>
                                                            </div>

                                                            <div className="hr dotted hr-8"></div>

                                                            <div className="tools action-buttons">
                                                                <a href="#">
                                                                    <i className="ace-icon fa fa-facebook-square blue bigger-150"></i>
                                                                </a>

                                                                <a href="#">
                                                                    <i className="ace-icon fa fa-twitter-square light-blue bigger-150"></i>
                                                                </a>

                                                                <a href="#">
                                                                    <i className="ace-icon fa fa-google-plus-square red bigger-150"></i>
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="itemdiv memberdiv">
                                                <div className="inline pos-rel">
                                                    <div className="user">
                                                        <a href="#">
                                                            <img src="http://bootdey.com/img/Content/avatar/avatar2.png"
                                                                 alt="Alexa Doe's avatar"/>
                                                        </a>
                                                    </div>

                                                    <div className="body">
                                                        <div className="name">
                                                            <a href="#">
                                                                <span className="user-status status-offline"></span>
                                                                Alexa Doe
                                                            </a>
                                                        </div>
                                                    </div>

                                                    <div className="popover">
                                                        <div className="arrow"></div>

                                                        <div className="popover-content">
                                                            <div className="bolder">Accounting</div>

                                                            <div className="time">
                                                                <i className="ace-icon fa fa-clock-o middle bigger-120 grey"></i>
                                                                <span className="grey"> 4 hours ago </span>
                                                            </div>

                                                            <div className="hr dotted hr-8"></div>

                                                            <div className="tools action-buttons">
                                                                <a href="#">
                                                                    <i className="ace-icon fa fa-facebook-square blue bigger-150"></i>
                                                                </a>

                                                                <a href="#">
                                                                    <i className="ace-icon fa fa-twitter-square light-blue bigger-150"></i>
                                                                </a>

                                                                <a href="#">
                                                                    <i className="ace-icon fa fa-google-plus-square red bigger-150"></i>
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="hr hr10 hr-double"></div>

                                        <ul className="pager pull-right">
                                            <li className="previous disabled">
                                                <a href="#">← Prev</a>
                                            </li>

                                            <li className="next">
                                                <a href="#">Next →</a>
                                            </li>
                                        </ul>
                                    </div>


                                    <div id="pictures" className="tab-pane">
                                        <ul className="ace-thumbnails">
                                            <li>
                                                <a href="#" data-rel="colorbox">
                                                    <img alt="150x150" src="http://lorempixel.com/200/200/nature/1/"/>
                                                    <div className="text">
                                                        <div className="inner">Sample Caption on Hover</div>
                                                    </div>
                                                </a>

                                                <div className="tools tools-bottom">
                                                    <a href="#">
                                                        <i className="ace-icon fa fa-link"></i>
                                                    </a>

                                                    <a href="#">
                                                        <i className="ace-icon fa fa-paperclip"></i>
                                                    </a>

                                                    <a href="#">
                                                        <i className="ace-icon fa fa-pencil"></i>
                                                    </a>

                                                    <a href="#">
                                                        <i className="ace-icon fa fa-times red"></i>
                                                    </a>
                                                </div>
                                            </li>

                                            <li>
                                                <a href="#" data-rel="colorbox">
                                                    <img alt="150x150" src="http://lorempixel.com/200/200/nature/2/"/>
                                                    <div className="text">
                                                        <div className="inner">Sample Caption on Hover</div>
                                                    </div>
                                                </a>

                                                <div className="tools tools-bottom">
                                                    <a href="#">
                                                        <i className="ace-icon fa fa-link"></i>
                                                    </a>

                                                    <a href="#">
                                                        <i className="ace-icon fa fa-paperclip"></i>
                                                    </a>

                                                    <a href="#">
                                                        <i className="ace-icon fa fa-pencil"></i>
                                                    </a>

                                                    <a href="#">
                                                        <i className="ace-icon fa fa-times red"></i>
                                                    </a>
                                                </div>
                                            </li>

                                            <li>
                                                <a href="#" data-rel="colorbox">
                                                    <img alt="150x150" src="http://lorempixel.com/200/200/nature/3/"/>
                                                    <div className="text">
                                                        <div className="inner">Sample Caption on Hover</div>
                                                    </div>
                                                </a>

                                                <div className="tools tools-bottom">
                                                    <a href="#">
                                                        <i className="ace-icon fa fa-link"></i>
                                                    </a>

                                                    <a href="#">
                                                        <i className="ace-icon fa fa-paperclip"></i>
                                                    </a>

                                                    <a href="#">
                                                        <i className="ace-icon fa fa-pencil"></i>
                                                    </a>

                                                    <a href="#">
                                                        <i className="ace-icon fa fa-times red"></i>
                                                    </a>
                                                </div>
                                            </li>

                                            <li>
                                                <a href="#" data-rel="colorbox">
                                                    <img alt="150x150" src="http://lorempixel.com/200/200/nature/4/"/>
                                                    <div className="text">
                                                        <div className="inner">Sample Caption on Hover</div>
                                                    </div>
                                                </a>

                                                <div className="tools tools-bottom">
                                                    <a href="#">
                                                        <i className="ace-icon fa fa-link"></i>
                                                    </a>

                                                    <a href="#">
                                                        <i className="ace-icon fa fa-paperclip"></i>
                                                    </a>

                                                    <a href="#">
                                                        <i className="ace-icon fa fa-pencil"></i>
                                                    </a>

                                                    <a href="#">
                                                        <i className="ace-icon fa fa-times red"></i>
                                                    </a>
                                                </div>
                                            </li>

                                            <li>
                                                <a href="#" data-rel="colorbox">
                                                    <img alt="150x150" src="http://lorempixel.com/200/200/nature/5/"/>
                                                    <div className="text">
                                                        <div className="inner">Sample Caption on Hover</div>
                                                    </div>
                                                </a>

                                                <div className="tools tools-bottom">
                                                    <a href="#">
                                                        <i className="ace-icon fa fa-link"></i>
                                                    </a>

                                                    <a href="#">
                                                        <i className="ace-icon fa fa-paperclip"></i>
                                                    </a>

                                                    <a href="#">
                                                        <i className="ace-icon fa fa-pencil"></i>
                                                    </a>

                                                    <a href="#">
                                                        <i className="ace-icon fa fa-times red"></i>
                                                    </a>
                                                </div>
                                            </li>

                                            <li>
                                                <a href="#" data-rel="colorbox">
                                                    <img alt="150x150" src="http://lorempixel.com/200/200/nature/6/"/>
                                                    <div className="text">
                                                        <div className="inner">Sample Caption on Hover</div>
                                                    </div>
                                                </a>

                                                <div className="tools tools-bottom">
                                                    <a href="#">
                                                        <i className="ace-icon fa fa-link"></i>
                                                    </a>

                                                    <a href="#">
                                                        <i className="ace-icon fa fa-paperclip"></i>
                                                    </a>

                                                    <a href="#">
                                                        <i className="ace-icon fa fa-pencil"></i>
                                                    </a>

                                                    <a href="#">
                                                        <i className="ace-icon fa fa-times red"></i>
                                                    </a>
                                                </div>
                                            </li>

                                            <li>
                                                <a href="#" data-rel="colorbox">
                                                    <img alt="150x150" src="http://lorempixel.com/200/200/nature/7/"/>
                                                    <div className="text">
                                                        <div className="inner">Sample Caption on Hover</div>
                                                    </div>
                                                </a>

                                                <div className="tools tools-bottom">
                                                    <a href="#">
                                                        <i className="ace-icon fa fa-link"></i>
                                                    </a>

                                                    <a href="#">
                                                        <i className="ace-icon fa fa-paperclip"></i>
                                                    </a>

                                                    <a href="#">
                                                        <i className="ace-icon fa fa-pencil"></i>
                                                    </a>

                                                    <a href="#">
                                                        <i className="ace-icon fa fa-times red"></i>
                                                    </a>
                                                </div>
                                            </li>

                                            <li>
                                                <a href="#" data-rel="colorbox">
                                                    <img alt="150x150" src="http://lorempixel.com/200/200/nature/1/"/>
                                                    <div className="text">
                                                        <div className="inner">Sample Caption on Hover</div>
                                                    </div>
                                                </a>

                                                <div className="tools tools-bottom">
                                                    <a href="#">
                                                        <i className="ace-icon fa fa-link"></i>
                                                    </a>

                                                    <a href="#">
                                                        <i className="ace-icon fa fa-paperclip"></i>
                                                    </a>

                                                    <a href="#">
                                                        <i className="ace-icon fa fa-pencil"></i>
                                                    </a>

                                                    <a href="#">
                                                        <i className="ace-icon fa fa-times red"></i>
                                                    </a>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>

                                </div>
                            </div>
                        </div>


                    </div>
                </div>

            </div>
        )
    }
}






