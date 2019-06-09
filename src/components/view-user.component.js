import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Popup extends Component {
    constructor(props){
        super(props);

        this.state={
            fromid:this.props.fromid,
            toid:"",
            fromName:"",
            toName:"",
            credit:0
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleCreditChange = this.handleCreditChange.bind(this);
    }

    onSubmit(e){
        e.preventDefault();
        if(this.state.toid===""){
            alert("Choose user")
        }
        else{
            console.log(`Form submitted:`);
            console.log(`From id: ${this.state.fromid}`);
            console.log(`Toid: ${this.state.toid}`);
            console.log(`Credit transferd: ${this.state.credit}`);

            axios.get('http://localhost:4000/users/'+this.state.fromid)
            .then(response =>{
                this.setState({
                    fromName:response.data.name
                });
                axios.get('http://localhost:4000/users/'+this.state.toid)
                .then(response =>{
                    this.setState({
                        toName:response.data.name
                    });
                    const transfer ={
                        fromid : this.state.fromid,
                        toid: this.state.toid,
                        fromName:this.state.fromName,
                        toName:this.state.toName,
                        credit: this.state.credit
                    }
        
                    axios.post('http://localhost:4000/transfers/add',transfer)
                        .then(res => console.log(res.data));
                })
                .catch(function(error){
                    console.log(function(error){
                        console.log(error);
                    })
                });
            })
            .catch(function(error){
                console.log(function(error){
                    console.log(error);
                })
            });

            

            

            axios.get('http://localhost:4000/users/'+this.state.fromid)
                .then(response =>{
                    const obj ={
                        name:response.data.name,
                        email:response.data.email,
                        credit:response.data.credit-this.state.credit
                    }
                    console.log(obj);
                    axios.post('http://localhost:4000/users/update/'+this.state.fromid,obj)
                        .then(res => console.log(res.data));
                })
                .catch(function(error){
                    console.log(function(error){
                        console.log(error);
                    })
                });

            axios.get('http://localhost:4000/users/'+this.state.toid)
            .then(response =>{
                const obj ={
                    name:response.data.name,
                    email:response.data.email,
                    credit:(Number(response.data.credit)+Number(this.state.credit))
                }
                console.log(obj);
                axios.post('http://localhost:4000/users/update/'+this.state.toid,obj)
                    .then(res =>{ 
                        console.log(res.data)
                        this.props.history.push('/');
                    });
                    
            })
            .catch(function(error){
                console.log(function(error){
                    console.log(error);
                })
            });

            

        }

    }

    handleChange(e){
        this.setState({
            toid: e.target.value
        });
    }

    handleCreditChange(e){
        this.setState({
            credit: e.target.value
        });
    }

    render() {
      return (
        <div className='popup'>
        <br/>
        <hr/>
        <br/>
            <div className='popup_inner'>
                <h1 className='text-center'>{this.props.text}</h1>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Enter credit to transfer: </label>
                        <input type="number" defaultValue="0" className="form-control" min="0" max={this.props.maxCredit} onChange={this.handleCreditChange}/>
                    </div>
                    <div className="form-group">
                        <label>Select user from list:</label>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <select className="required" value={this.state.toid} onChange={this.handleChange}>
                            <option value="">Choose User</option>   
                            {this.props.userList};
                        </select>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Transfer Credit" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        </div>
      );
    }
  }

  class ViewUser extends Component{
    constructor(props){
        super(props);
        this.state={
            id:"",
            name:"",
            email:"",
            credit:0,
            showPopup: false,
            users:[]
        }
    }
    togglePopup() {
        this.setState({
          showPopup: !this.state.showPopup
        });
      }

    componentDidMount(){
        axios.get('http://localhost:4000/users/')
        .then(response => {
            this.setState({users:response.data});
            
        })
        .catch(function(error){
            console.log(error);
        });

        axios.get('http://localhost:4000/users/'+this.props.match.params.id)
            .then(response =>{
                this.setState({
                    name:response.data.name,
                    email:response.data.email,
                    credit:response.data.credit,
                    id: response.data._id,
                    users: this.state.users
                });
            })
            .catch(function(error){
                console.log(function(error){
                    console.log(error);
                })
            });
    }

    userList() {
        let id=this.state.id;
        return this.state.users.filter(function(currentUser){
            return (currentUser._id!=id);
        })
        .map(function(currentUser, i){
            return (<option value={currentUser._id} key={i}>{currentUser.name}</option>);
        });
    }
    
    render(){
        return (
            <div>
                <h3>User</h3>
                <table className="table table-striped" style={{ marginTop: 20 }} >
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Credit</th>
                            <th>Transfer Credit</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{ this.state.name }</td>
                            <td>{ this.state.email }</td>
                            <td>{ this.state.credit }</td>
                            <td>
                                <button onClick={this.togglePopup.bind(this)}>Transfer</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                {this.state.showPopup ? 
                    <Popup
                        text='Transfer Credit'
                        userList = {this.userList()}
                        transfer={this.togglePopup.bind(this)}
                        history={this.props.history}
                        maxCredit = {this.state.credit}
                        fromid = {this.state.id}
                    />
                    : null
                }
            </div>
        );
    }
}

export default ViewUser;