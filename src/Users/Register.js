import React, {Component} from 'react';
import {Link} from "react-router-dom";
import $ from "jquery";
import 'bootstrap';

const styles = {
    style1: {
        fontFamily: 'Lucida Sans Unicode',
        color: '#636e72'
    },
    style2: {
        marginTop: '10px',
    },
    showColor: {
        'color': '#007bff',
    }
};


export default class Register extends Component {

    constructor(props) {
        super(props);

        //todo store registration requirements into a object and call it wherever needed
        this.state = {
            allClear: true,
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


    // regex to validate url
    // testUrl = (url) => {
    //     return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(url);
    // };

    validateWebsiteAddress = (url) => {
        let urlRegex = /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/;
        if (!urlRegex.test(this.state.websiteaddress)) {
            $('#websiteAddress').removeClass("is-valid");
            $('#websiteAddress').addClass("is-invalid")
        } else {
            $('#websiteAddress').removeClass("is-invalid");
            $('#websiteAddress').addClass("is-valid")
        }
    };

    // regex to validate email
    validateEmail = (email) => {
        let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (!re.test(this.state.email)) {
            $('#email').removeClass("is-valid");
            $('#email').addClass("is-invalid")
        } else {
            $('#email').removeClass("is-invalid");
            $('#email').addClass("is-valid")
        }

    };

    validateDigit = (event) => {
        switch (event.target.name) {
            case "phone": {
                if (this.state.phone.length < 9) {
                    $('#phone').removeClass("is-valid");
                    $('#phone').addClass("is-invalid");
                    this.setState({
                        allClear: false
                    })
                } else {
                    $('#phone').removeClass("is-invalid");
                    $('#phone').addClass("is-valid");
                    this.setState({
                        allClear: true
                    })
                }
                break
            }
            case "fax": {
                if (this.state.fax.length < 9) {
                    $('#fax').removeClass("is-valid");
                    $('#fax').addClass("is-invalid");
                    this.setState({
                        allClear: false
                    })
                } else {
                    $('#fax').removeClass("is-invalid");
                    $('#fax').addClass("is-valid");
                    this.setState({
                        allClear: true
                    })
                }
                break
            }
            case "mobile": {
                if (this.state.mobile.length < 9) {
                    $('#mobile').removeClass("is-valid");
                    $('#mobile').addClass("is-invalid");
                    this.setState({
                        allClear: false
                    })
                } else {
                    $('#mobile').removeClass("is-invalid");
                    $('#mobile').addClass("is-valid");
                    this.setState({
                        allClear: true
                    })
                }
                break
            }
            default: {

            }
        }
    };

    validatePassword = () => {
        let strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");

        if (strongRegex.test(this.state.password)) {
            $('#passwordInput').removeClass("is-invalid");
            $('#passwordInput').addClass("is-valid")
            // $("#passwordConfirmedInput").css("border", "5px solid green");
        } else {
            $('#passwordInput').removeClass("is-valid");
            $('#passwordInput').addClass("is-invalid")
        }
    };

    validatePasswordMatch = () => {

        if (this.state.password === this.state.passwordconfirmed) {
            $('#passwordInputMatch').removeClass("is-invalid");
            $('#passwordInputMatch').addClass("is-valid")
        } else {
            $('#passwordInputMatch').removeClass("is-valid");
            $('#passwordInputMatch').addClass("is-invalid")
        }
    };


    sendRequest = (event) => {
        event.preventDefault();
        // check if user passwords match
        if ($("input").hasClass("is-invalid")) {
            $("#registrationErrorBlockText")
                .html(
                    `<strong>Error! </strong> Incorrect value provided for an input.`
                );
            $("#registrationErrorBlock").show()
        }
        else {
            this.props.registerUser(this.state);
        }
    };

    componentDidMount() {

        $('#sidebarCollapse').on('click', function () {
            $('#sidebar').toggleClass('active');
            $('#my-arrow').toggleClass('fa-arrow-right fa-arrow-left');
        });

        $('#registrationErrorBlock').hide();
        // $("#passwordConfirmedInput").css("box-shadow", "0 0 10px red" );


        $('#next_1').click(function (e) {
            // e.preventDefault();
            $('#myTab a[href="#profile"]').tab('show');
            $('html, body').animate({
                scrollTop: $("#myTab").offset().top
            }, 200);
        });

        $('#next_2').click(function (e) {
            // e.preventDefault();
            $('#myTab a[href="#contact"]').tab('show');
            $('html, body').animate({
                scrollTop: $("#myTab").offset().top
            }, 200);
        });

        $('#back_1').click(function (e) {
            // e.preventDefault();
            $('#myTab a[href="#home"]').tab('show');
            $('html, body').animate({
                scrollTop: $("#myTab").offset().top
            }, 200);
        });

        $('#back_2').click(function (e) {
            // e.preventDefault();
            $('#myTab a[href="#profile"]').tab('show');
            $('html, body').animate({
                scrollTop: $("#myTab").offset().top
            }, 200);
        })

    }

    render() {
        return (

            <div className="wrapper">

                {/*sidebar*/}
                {/*<Sidebar/>*/}

                {/*main content*/}
                <div id="content">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <div className="container-fluid">

                            {/*<button type="button" id="sidebarCollapse" className="btn">*/}
                            {/*    <i className="fas fa-arrow-left" id="my-arrow"></i>*/}
                            {/*    <span></span>*/}
                            {/*</button>*/}
                            <button className="btn btn-dark d-inline-block d-lg-none ml-auto" type="button"
                                    data-toggle="collapse" data-target="#navbarSupportedContent"
                                    aria-controls="navbarSupportedContent" aria-expanded="false"
                                    aria-label="Toggle navigation">
                                <i className="fas fa-align-justify"></i>
                            </button>

                            <div className="collapse navbar-collapse" id="navbarSupportedContent">

                                <div className="col-lg-12 text-center ">
                                    <header style={{
                                        textAlign: "center",
                                        fontSize: "35px",
                                        fontColor: "black",
                                        fontFamily: "Lucida Console",
                                        color: "#636e72"
                                    }}>
                                        <h1>Adwenan Land Commission System</h1>
                                    </header>
                                </div>


                            </div>
                        </div>
                    </nav>

                    <div className="container">

                        <div className="alert alert-danger alert-dismissible fade show" role="alert"
                             id="registrationErrorBlock">
                            <div id="registrationErrorBlockText"></div>
                            <button type="button" className="close" onclick={$('.alert').hide()}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>

                        <div>
                            <div className="login_wrapper col-md-6 ml-auto mr-auto">
                                <br/>
                                <div className="shadow-lg p-3 mb-5 bg-white rounded">
                                    <header>
                                        <h4 style={styles.style2}>User registration Form</h4>
                                    </header>
                                    <br/>

                                    <div className="change_link">Already Have An Account? <Link to={'/login'}
                                                                                                style={styles.showColor}> Login </Link>
                                    </div>
                                    <br/>
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
                                                           onChange={this.handleInputChange}
                                                           onInput={this.validatePassword} required/>
                                                    {/*<span id="#passwordHelpText">Password strength: Weak</span>*/}
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
                                                           name="passwordconfirmed" value={this.state.passwordconfirmed}
                                                           onChange={this.handleInputChange}
                                                           onInput={this.validatePasswordMatch} required/>
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
                                                           value={this.state.email} onChange={this.handleInputChange}
                                                           onInput={this.validateEmail}
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
                                                    <input type="text" className="form-control"
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
                                                    <input type="text" className="form-control" placeholder="Company ID"
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
                                                    <input type="text" id="phone" className="form-control"
                                                           placeholder="Phone"
                                                           name="phone"
                                                           value={this.state.phone} onChange={this.handleInputChange}
                                                           onInput={this.validateDigit}
                                                           required/>
                                                    <div className="invalid-feedback">
                                                        Please enter a valid phone number
                                                        <br/>
                                                        e.g. 0501111111
                                                    </div>
                                                    <div className="valid-feedback">
                                                        Valid phone number entered.
                                                    </div>
                                                </div>

                                                <br/>
                                                <div>
                                                    <label>Fax</label>
                                                    <input type="text" id="fax" className="form-control"
                                                           placeholder="Fax"
                                                           name="fax"
                                                           value={this.state.fax} onChange={this.handleInputChange}
                                                           onInput={this.validateDigit}
                                                           required/>
                                                    <div className="invalid-feedback">
                                                        Please enter a valid fax number
                                                        {/*<br/>*/}
                                                        {/*e.g. 0501111111*/}
                                                    </div>
                                                    <div className="valid-feedback">
                                                        Valid fax number entered entered.
                                                    </div>
                                                </div>

                                                <br/>
                                                <div>
                                                    <label>Mobile</label>
                                                    <input type="text" id="mobile" className="form-control"
                                                           placeholder="0501111111"
                                                           name="mobile"
                                                           value={this.state.mobile} onChange={this.handleInputChange}
                                                           onInput={this.validateDigit}
                                                           required/>
                                                    <div className="invalid-feedback">
                                                        Please enter a valid mobile number
                                                        <br/>
                                                        e.g. 0501111111
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
                                                           onChange={this.handleInputChange}
                                                           onInput={this.validateWebsiteAddress} required/>
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
                                                        <button className="btn btn-outline-success" type="submit"
                                                                value="Submit">Submit
                                                        </button>
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




