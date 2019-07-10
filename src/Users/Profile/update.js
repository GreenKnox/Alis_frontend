import React, {Component} from 'react';
import '../../css/App.css';
import 'react-notifications-component'
import {Link} from "react-router-dom";
import $ from "jquery";

var AppState = "";

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

export default class Update extends Component {

    constructor(props) {
        super(props);

        this.state = {
            token: localStorage["appState"] ? JSON.parse(localStorage["appState"]).user.token : "",
            email: localStorage["appState"] ? JSON.parse(localStorage["appState"]).user.email : "",
            isLoggedIn: localStorage["appState"] ? JSON.parse(localStorage["appState"]).isLoggedIn : "",
            user: {}
        };

    }

    hideErrorNotification = () => {
        $('#errorBlock').hide()
    };


    componentDidMount() {

        let state = localStorage["appState"];
        if (state) {
            AppState = JSON.parse(state);
        }

        $('#sidebarCollapse').on('click', function () {
            $('#sidebar').toggleClass('active');
        });

        $('#errorBlock').hide()

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

            <div className="container">
                <div id="content">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <div className="container-fluid">
                            <div className="col-sm-12 text-left ">
                                Your Profile
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

                        <div>
                            <div className="login_wrapper col-md-6 ml-auto mr-auto">
                                <br/>
                                <div className="shadow-lg p-3 mb-5 bg-white rounded">
                                    <header>
                                        <h4 style={styles.style2}>Your Profile</h4>
                                    </header>
                                    <br/>

                                    {/*<div className="change_link">Already Have An Account? <Link to={'/login'}*/}
                                    {/*                                                            style={styles.showColor}> Login </Link>*/}
                                    {/*</div>*/}
                                    <br/>
                                    <div>
                                        <ul className="nav navbar-nav navbar-right">

                                        </ul>
                                    </div>
                                    <form onSubmit={this.sendRequest} method="post">

                                        <ul className="nav nav-tabs" role="tablist" id="myTab">
                                            <li className="nav-item">
                                                <a className="nav-link active" id="home-tab" data-toggle="tab"
                                                   href="#home"
                                                   role="tab" aria-controls="home" aria-selected="true">Personal</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" id="profile-tab" data-toggle="tab"
                                                   href="#profile"
                                                   role="tab" aria-controls="profile" aria-selected="false">Profile</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" id="contact-tab" data-toggle="tab"
                                                   href="#contact"
                                                   role="tab" aria-controls="contact" aria-selected="false">Address</a>
                                            </li>
                                        </ul>

                                        <div className="tab-content" id="myTabContent" style={styles.style2}>
                                            <div className="tab-pane fade show active" id="home" role="tabpanel"
                                                 aria-labelledby="home-tab">
                                                <div>
                                                    <label>Firstname</label>
                                                    <input type="text" className="form-control" placeholder="First Name"
                                                           name="firstname" value={this.state.firstname}
                                                           onChange={this.handleInputChange} required autoFocus/>
                                                </div>

                                                <br/>

                                                <div>
                                                    <label>Lastname</label>
                                                    <input type="text" className="form-control" placeholder="Last Name"
                                                           name="lastname" value={this.state.lastname}
                                                           onChange={this.handleInputChange} required/>
                                                </div>

                                                <br/>

                                                <div>
                                                    <label>Username</label>
                                                    <input type="text" className="form-control" placeholder="Username"
                                                           name="username" value={this.state.username}
                                                           onChange={this.handleInputChange} required/>
                                                </div>

                                                <br/>

                                                <div>
                                                    <label>Password</label>
                                                    <input type="password" id="passwordInput" className="form-control"
                                                           placeholder="Password "
                                                           name="password" value={this.state.password}
                                                           onChange={this.handlePasswordInputChange}
                                                           required/>
                                                    <div className="invalid-feedback">
                                                        Password must be 8 characters long and
                                                        <br/>
                                                        must contain at least 1 lowercase,
                                                        <br/>
                                                        1 uppercase 1 numeric 1 symbol character
                                                    </div>
                                                    <div className="valid-feedback">
                                                        Valid password entered.
                                                    </div>
                                                </div>

                                                <br/>

                                                <div>
                                                    <label>Confirm Password</label>
                                                    <input type="password" id="passwordInputMatch"
                                                           className="form-control"
                                                           placeholder="Confirm Password "
                                                           name="passwordConfirmed" value={this.state.passwordConfirmed}
                                                           onChange={this.handlePasswordConfirmInputChange}
                                                           required/>
                                                    <div className="invalid-feedback">
                                                        Passwords do not match !.
                                                    </div>
                                                    <div className="valid-feedback">
                                                        Passwords match.
                                                    </div>
                                                </div>

                                                <br/>

                                                <div>
                                                    <label>Email</label>
                                                    <input type="text" id="email" className="form-control"
                                                           placeholder="Email"
                                                           name="email"
                                                           value={this.state.email}
                                                           onChange={this.handleEmailInputChange}
                                                           required/>
                                                    <div className="invalid-feedback">
                                                        Please enter a valid email.
                                                    </div>
                                                    <div className="valid-feedback">
                                                        Valid email entered.
                                                    </div>

                                                    <div>
                                                        <br/>
                                                        <button id='next_1'
                                                                className="btn btn-outline-success pull-right">Next
                                                        </button>
                                                    </div>
                                                </div>



                                                <br/>
                                            </div>

                                            <div className="tab-pane fade" id="profile" role="tabpanel"
                                                 aria-labelledby="profile-tab">

                                                <div>
                                                    <label>Staff Number</label>
                                                    <input type="number" className="form-control"
                                                           placeholder="Staff number"
                                                           name="staffnumber" value={this.state.staffnumber}
                                                           onChange={this.handleInputChange} required/>
                                                </div>

                                                <br/>

                                                <div>
                                                    <label>Title</label>
                                                    <input type="text" className="form-control" placeholder="Title"
                                                           name="title"
                                                           value={this.state.title} onChange={this.handleInputChange}
                                                           required/>
                                                </div>

                                                <br/>
                                                <div>
                                                    <label>Company ID</label>
                                                    <input type="number" className="form-control"
                                                           placeholder="Company ID"
                                                           name="companyid" value={this.state.companyid}
                                                           onChange={this.handleInputChange} required/>
                                                </div>
                                                <br/>
                                                <div>
                                                    <label>Department</label>
                                                    <input type="text" className="form-control" placeholder="Department"
                                                           name="department" value={this.state.department}
                                                           onChange={this.handleInputChange} required/>
                                                </div>

                                                <br/>
                                                <div>
                                                    <label>Division</label>
                                                    <input type="text" className="form-control" placeholder="Division"
                                                           name="division" value={this.state.division}
                                                           onChange={this.handleInputChange} required/>
                                                </div>


                                                <br/>
                                                <div>
                                                    <label>Location</label>
                                                    <input type="text" className="form-control" placeholder="Location"
                                                           name="location" value={this.state.location}
                                                           onChange={this.handleInputChange} required/>
                                                </div>

                                                <br/>

                                                <div>
                                                    <label>Designation</label>
                                                    <input type="text" className="form-control"
                                                           placeholder="Designation"
                                                           name="designation" value={this.state.designation}
                                                           onChange={this.handleInputChange} required/>
                                                    <div>
                                                        <br/>
                                                        <button id='back_1'
                                                                className="btn btn-outline-success pull-right"
                                                                style={{marginRight: '10px'}}>Previous
                                                        </button>
                                                        <button id='next_2'
                                                                className="btn btn-outline-success pull-right">Next
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="tab-pane fade" id="contact" role="tabpanel"
                                                 aria-labelledby="contact-tab">
                                                <br/>
                                                <div>
                                                    <label>Address</label>
                                                    <input type="text" className="form-control" placeholder="Address"
                                                           name="address"
                                                           value={this.state.address} onChange={this.handleInputChange}
                                                           required/>
                                                </div>

                                                <br/>
                                                <div>
                                                    <label>Phone</label>
                                                    <input type="number" size="10" id="phoneNumber"
                                                           className="form-control"
                                                           placeholder="Phone"
                                                           name="phone"
                                                           value={this.state.phone}
                                                           onChange={this.handleDigitInputChange}
                                                           required/>
                                                    <div className="invalid-feedback">
                                                        Phone number must be 10 digits
                                                        <br/>
                                                        e.g. 0506392618
                                                    </div>
                                                    <div className="valid-feedback">
                                                        Valid phone number entered.
                                                    </div>
                                                </div>
                                                <br/>
                                                <div>
                                                    <label>Fax</label>
                                                    <input type="number" size="10" id="fax" className="form-control"
                                                           placeholder="Fax"
                                                           name="fax"
                                                           value={this.state.fax}
                                                           onChange={this.handleDigitInputChange}
                                                           required/>
                                                    <div className="invalid-feedback">
                                                        Fax number must be 10 digits
                                                    </div>
                                                    <div className="valid-feedback">
                                                        Valid fax number entered entered.
                                                    </div>
                                                </div>

                                                <br/>
                                                <div>
                                                    <label>Mobile</label>
                                                    <input type="number" size="10" id="mobile" className="form-control"
                                                           placeholder="mobile"
                                                           name="mobile"
                                                           value={this.state.mobile}
                                                           onChange={this.handleDigitInputChange}
                                                           required/>
                                                    <div className="invalid-feedback">
                                                        Mobile number must be 10 digits
                                                    </div>
                                                    <div className="valid-feedback">
                                                        Valid mobile number entered.
                                                    </div>
                                                </div>

                                                <br/>
                                                <div>
                                                    <label>Website Address</label>
                                                    <input type="text" id="websiteAddress" className="form-control"
                                                           placeholder="Website Address"
                                                           name="websiteaddress" value={this.state.websiteaddress}
                                                           onChange={this.handleWebsiteInputChange}
                                                           required/>
                                                    <div className="invalid-feedback">
                                                        Please enter a valid website Address
                                                        <br/>
                                                        e.g. https://www.example.com
                                                    </div>
                                                    <div className="valid-feedback">
                                                        Valid website address entered.
                                                    </div>
                                                </div>

                                                <br/>
                                                <div>
                                                    <label>District</label>
                                                    <input type="text" className="form-control" placeholder="District"
                                                           name="district" value={this.state.district}
                                                           onChange={this.handleInputChange} required/>
                                                </div>

                                                <br/>
                                                <div>
                                                    <label>Region</label>
                                                    <input type="text" className="form-control" placeholder="Region"
                                                           name="region"
                                                           value={this.state.region} onChange={this.handleInputChange}
                                                           required/>
                                                </div>

                                                <div>
                                                    <br/>
                                                    <div>
                                                        <button id='back_2'
                                                                className="btn btn-outline-success pull-right"
                                                                style={{marginRight: '10px'}}>Previous
                                                        </button>
                                                        {/*<button className="btn btn-outline-success" type="submit"*/}
                                                        {/*        value="Submit">Submit*/}
                                                        {/*</button>*/}
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>

            </div>
        )
    }
}




