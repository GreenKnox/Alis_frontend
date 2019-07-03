 import React, {Component} from 'react';
import {Link} from 'react-router-dom'


export default class Table extends Component {

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <table className="table table-hover">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    {this.props.columnNames.map((value, index) => {
                        return <th scope="col" key={index}>{value}</th>
                    })}
                </tr>
                </thead>


                <tbody>
                {this.props.users.map((user, index) => {
                    return (
                        <>
                            <tr>
                                <th scope="row">{index + 1}</th>
                                {user.map((detail) => {

                                    // console.log(detail.email)
                                    // {let path = detail.email ? JSON.parse(localStorage["appState"]).user.email : ""}

                                    return (
                                        <>
                                            <td scope="col"><Link to={`user?email=${detail[2]}`}>{detail}</Link></td>
                                        </>
                                    )
                                })}
                            </tr>
                        </>
                    )
                })}
                </tbody>
            </table>
        )

    }
}
