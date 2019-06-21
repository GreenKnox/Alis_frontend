import React, {Component} from 'react';
import axios from 'axios/index';
import {Redirect} from 'react-router-dom'
import * as env from '../config'


const styles = {
    style1: {
        fontFamily: 'Lucida Sans Unicode',
        color: '#636e72'
    },
    style2: {
        marginTop: '10px',
    }
};

// const API_URL = 'http://127.0.0.1:8000/api/register';
const errorTexts = {};

export default class Register extends Component {

    constructor(props) {
        super(props);

        //todo store registration requirements into a object and call it wherever needed
        this.state = {
            firstname: '',
            lastname: '',
            username: '',
            password: '',
            passwordconfirmed: '',
            email: '',
            status: '',
            staffnumber: '',
            title: '',
            designation: '',
            companyid: '',
            division: '',
            address: '',
            phone: '',
            fax: '',
            mobile: '',
            websiteaddress: '',
            department: '',
            location: '',
            district: '',
            region: ''
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

    handleClearForm = () => {  
        this.setState({
            firstname: '',
            lastname: '',
            username: '',
            password: '',
            passwordconfirmed: '',
            email: '',
            status: '',
            staffnumber: '',
            title: '',
            designation: '',
            companyid: '',
            division: '',
            address: '',
            phone: '',
            fax: '',
            mobile: '',
            websiteaddress: '',
            department: '',
            location: '',
            district: '',
            region: ''
        })
    };

    renderRedirect = (path) => {
        return <Redirect to={`/${path}`}/>
    };

    // regex to validate urls
    validateUrl = (value) => {
        return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(value);
    };

    componentDidMount() {
        this.validateUser();
      }

    validateUser = () => {
        // initially set errorText.status to false
        errorTexts.status = false;
        // loop through state vars to check if specific fields meet requirements
        // set errorText.status to true if at least one does not meet its requirement 
        // set error message for specific field
        for (var temp in this.state) {
            switch (temp.name) {
                case "password":
                    if (temp.value.length < 8) {
                        errorTexts.password = "password length must be more than 8";
                        errorTexts.status = true
                    }
                    break;
                case "phone":
                    if (temp.value.length < 10) {
                        errorTexts.phone = "phone number must be more than 10";
                        errorTexts.status = true
                    }
                    break;
                case "fax":
                    if (temp.value.length < 10) {
                        errorTexts.fax = "fax number must be more than 10";
                        errorTexts.status = true
                    }
                    break;
                case "mobile":
                    if (temp.value.length < 10) {
                        errorTexts.mobile = "mobile number must be more than 10";
                        errorTexts.status = true
                    }
                    break;
                case "websiteaddress":
                    if (!this.validateUrl(temp.value)) {
                        errorTexts.websiteaddress = "incorrect website address\n"
                            + "url should be in the format 'https://www.example.com'";
                        errorTexts.status = true
                    }
                    break;
                default:
                    return temp;
            }
        }
    };

    sendRequest = (event) => {
        event.preventDefault();
        // check if user passwords match
        if (this.state.password.trim() === this.state.passwordconfirmed) {
            // validate user inputs to check if accepted values has been entered
            this.validateUser();
            // if errorTexts.status = false,  make post request to api and submit user details
            if (errorTexts.status === false) {
                // make api request
                axios.post(`${env.API_URL}/register`, {
                    username: this.state.username,
                    password: this.state.password,
                    password_confirmation: this.state.passwordconfirmed,
                    first_name: this.state.firstname,
                    last_name: this.state.lastname,
                    status: this.state.status,
                    company_id: this.state.companyid,
                    staff_number: this.state.staffnumber,
                    title: this.state.title,
                    designation: this.state.designation,
                    division: this.state.division,
                    address: this.state.address,
                    phone: this.state.phone,
                    fax: this.state.fax,
                    mobile: this.state.mobile,
                    website_address: this.state.websiteaddress,
                    email: this.state.email,
                    department: this.state.department,
                    location: this.state.location,
                    district: this.state.district,
                    region: this.state.region,
                })
                    .then(function (response) {
                        // log response
                        console.log(response);
                        switch (response.status) {
                            // if status is 400, print message
                            case 400: {
                                console.log(`Looks like there was a problem. Status Code: ${response.status}`);
                                console.log(`Error: ${response.message}`);
                                break;
                            }
                            // if status is 200 accept token and massage
                            case 200: {
                                // add message and token to redux store
                                // this.props.addMessage(response.data.message);
                                // this.props.addToken(response.data.token);1
                                // reset user inputs
                                this.handleReset();
                                // redirect user to somewhere
                                this.setRedirect("login");
                                break;
                            }
                            default: {
                                //statements;
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
                            console.log('Error', error.message);
                        }
                        console.log(error.config);
                    })

            } 
            else{

            }
        }
        else {
                console.log('Password Mismatch');
            }
            this.handleClearForm()
    };


    render() {
        return (
            <div>
                <div className="login_wrapper col-md-6 ml-auto mr-auto">
                    <br />
                    <div className="shadow-lg p-3 mb-5 bg-white rounded">
                        <header>
                            <h4 style={styles.style1}>User registration Form</h4>
                        </header>
                        <br />

                        <form onSubmit={this.sendRequest} method="post">

                            <ul className="nav nav-tabs" role="tablist" id="myTab">
                                <li className="nav-item">
                                    <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home"
                                        role="tab" aria-controls="home" aria-selected="true">Home</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile"
                                        role="tab" aria-controls="profile" aria-selected="false">Profile</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" id="contact-tab" data-toggle="tab" href="#contact"
                                        role="tab" aria-controls="contact" aria-selected="false">Contact</a>
                                </li>
                            </ul>

                            <div className="tab-content" id="myTabContent" style={styles.style2}>
                                <div className="tab-pane fade show active" id="home" role="tabpanel"
                                    aria-labelledby="home-tab">
                                    <div>
                                        <input type="text" className="form-control" placeholder="First Name"
                                            name="firstname" value={this.state.firstname}
                                            onChange={this.handleInputChange} required autoFocus/>
                                    </div>

                                    <br />

                                    <div>
                                        <input type="text" className="form-control" placeholder="Last Name"
                                            name="lastname" value={this.state.lastname}
                                            onChange={this.handleInputChange} required />
                                    </div>

                                    <br />

                                    <div>
                                        <input type="text" className="form-control" placeholder="Username"
                                            name="username" value={this.state.username}
                                            onChange={this.handleInputChange} required />
                                    </div>

                                    <br />
                                </div>

                                <div className="tab-pane fade" id="profile" role="tabpanel"
                                    aria-labelledby="profile-tab">
                                    <div>
                                        <input type="password" className="form-control" placeholder="Password "
                                            name="password" value={this.state.password}
                                            onChange={this.handleInputChange} required />
                                    </div>

                                    <br />

                                    <div>
                                        <input type="password" className="form-control" placeholder="Confirm Password "
                                            name="passwordconfirmed" value={this.state.passwordconfirmed}
                                            onChange={this.handleInputChange} required />
                                    </div>

                                    <br />

                                    <div>
                                        <input type="text" className="form-control" placeholder="Email" name="email"
                                            value={this.state.email} onChange={this.handleInputChange} required />
                                    </div>

                                    <br />

                                    <div>
                                        <input type="text" className="form-control" placeholder="Staff number"
                                            name="staffnumber" value={this.state.staffnumber}
                                            onChange={this.handleInputChange} required />
                                    </div>

                                    <br />

                                    <div>
                                        <input type="text" className="form-control" placeholder="Title" name="title"
                                            value={this.state.title} onChange={this.handleInputChange} required />
                                    </div>

                                    <br />

                                    <div>
                                        <input type="text" className="form-control" placeholder="Designation"
                                            name="designation" value={this.state.designation}
                                            onChange={this.handleInputChange} required />
                                    </div>
                                </div>

                                <div className="tab-pane fade" id="contact" role="tabpanel"
                                    aria-labelledby="contact-tab">
                                    <div>
                                        <input type="text" className="form-control" placeholder="Company ID"
                                            name="companyid" value={this.state.companyid}
                                            onChange={this.handleInputChange} required />
                                    </div>

                                    <br />
                                    <div>
                                        <input type="text" className="form-control" placeholder="Division"
                                            name="division" value={this.state.division}
                                            onChange={this.handleInputChange} required />
                                    </div>

                                    <br />
                                    <div>
                                        <input type="text" className="form-control" placeholder="Address" name="address"
                                            value={this.state.address} onChange={this.handleInputChange} required />
                                    </div>

                                    <br />
                                    <div>
                                        <input type="text" className="form-control" placeholder="Phone" name="phone"
                                            value={this.state.phone} onChange={this.handleInputChange} required />
                                    </div>

                                    <br />
                                    <div>
                                        <input type="text" className="form-control" placeholder="Fax" name="fax"
                                            value={this.state.fax} onChange={this.handleInputChange} required />
                                    </div>

                                    <br />
                                    <div>
                                        <input type="text" className="form-control" placeholder="Mobile" name="mobile"
                                            value={this.state.mobile} onChange={this.handleInputChange} required />
                                    </div>

                                    <br />
                                    <div>
                                        <input type="text" className="form-control" placeholder="Website Address"
                                            name="websiteaddress" value={this.state.websiteaddress}
                                            onChange={this.handleInputChange} required />
                                    </div>

                                    <br />
                                    <div>
                                        <input type="text" className="form-control" placeholder="Department"
                                            name="department" value={this.state.department}
                                            onChange={this.handleInputChange} required />
                                    </div>

                                    <br />
                                    <div>
                                        <input type="text" className="form-control" placeholder="Location"
                                            name="location" value={this.state.location}
                                            onChange={this.handleInputChange} required />
                                    </div>

                                    <br />
                                    <div>
                                        <input type="text" className="form-control" placeholder="District"
                                            name="district" value={this.state.district}
                                            onChange={this.handleInputChange} required />
                                    </div>

                                    <br />
                                    <div>
                                        <input type="text" className="form-control" placeholder="Region" name="region"
                                            value={this.state.region} onChange={this.handleInputChange} required />
                                    </div>

                                    <div>
                                    <br />  
                                        <div>
                                            <button className="btn btn-outline-success" type="submit" value="Submit">Register
                                            </button>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}




