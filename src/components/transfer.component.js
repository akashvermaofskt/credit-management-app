import React, { Component } from 'react';
import axios from 'axios';

class Transfers extends Component{

    constructor(props){
        super(props);
        this.state = {transfers:[]};

    }

    componentWillMount(){
        axios.get('https://credit-management-app-backend.herokuapp.com/transfers/')
            .then(response => {
                this.setState({transfers:response.data});
             })
            .catch(function(error){
                console.log(error);
            });
    }

    


    transferList() {
        if(this.state.transfers.length==0){
            return(<tr>
                    <td>Loading all transfer records...</td>
                    <td></td>
                    <td></td>
                </tr>);
        }
        return  this.state.transfers.map(function(curr,i){
            return (
                <tr key={i}>
                    <td>{curr.fromName}</td>
                    <td>{curr.toName}</td>
                    <td>{curr.credit}</td>
                </tr>
            );
        });
    }

    render(){
        return (
            <div>
                <h3>Transfer List</h3>
                <table className="table table-striped" style={{ marginTop: 20 }} >
                    <thead>
                        <tr>
                            <th>From</th>
                            <th>To</th>
                            <th>Credits</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.transferList() }
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Transfers;