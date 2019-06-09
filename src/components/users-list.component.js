import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const User = props => (
    <tr>
        <td>{props.user.name}</td>
        <td>{props.user.credit}</td>
        <td>
            <Link to={"/view/"+props.user._id}>View</Link>
        </td>
    </tr>
)

class UsersList extends Component{

    constructor(props){
        super(props);
        this.state = {users:[]};

    }

    componentWillMount(){
        console.log("Mounted");
        axios.get('http://localhost:4000/users/')
            .then(response => {
                this.setState({users:response.data});
            })
            .catch(function(error){
                console.log(error);
            });
    }

    


    userList() {
        return this.state.users.map(function(currentUser, i){
            return <User user={currentUser} key={i} />;
        })
    }

    render(){
        return (
            <div>
                <h3 >Users List</h3>
                <table className="table table-striped" style={{ marginTop: 20 }} >
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Credits</th>
                            <th>View User</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.userList() }
                    </tbody>
                </table>
            </div>
        );
    }
}

export default UsersList;