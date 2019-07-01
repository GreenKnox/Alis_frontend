import React, {Component} from 'react';

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
                                {/*<Link to={"/login"}>*/}
                                <th scope="row">{index + 1}</th>
                                {user.map((detail) => {
                                    return (
                                        <>
                                            <td scope="col">{detail}</td>
                                        </>
                                    )
                                })}
                                {/*</Link>*/}
                            </tr>
                        </>
                    )
                })}
                </tbody>
            </table>
        )

    }
}
