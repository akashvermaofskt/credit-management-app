import React, { Component } from 'react';
import axios from 'axios';

class Transfers extends Component{

    constructor(props){
        super(props);
        this.state = {transfers:[]};

    }

    componentWillMount(){
        console.log("Mounted");
        axios.get('http://localhost:4000/transfers/')
            .then(response => {
                this.setState({transfers:response.data});
             })
            .catch(function(error){
                console.log(error);
            });
    }

    


    transferList() {
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
                            <th>Credit</th>
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