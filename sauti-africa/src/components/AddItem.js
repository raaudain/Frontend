import React from 'react';

import { axiosWithAuth } from '../utils/axiosWithAuth';

class Login extends React.Component {
    state = {
        credentials: {
            name: '',
            market: '',
            price: '',
            description: ''
        }
    };

    handleChange = e => {
        this.setState({
            credentials: {
                ...this.state.credentials,
                [e.target.name]: e.target.value
            }
        });
    };

    add = e => {
        e.preventDefault();
        axiosWithAuth()
            .post('https://build-week-africanmarketplace.herokuapp.com/api/auth/login', this.state.credentials)
            .then(res => {
                localStorage.setItem('token', res.data.payload);
                this.props.history.push('/market-price');
            })
            .catch(err => console.log(err));
        localStorage.setItem('token', "1");
        this.props.history.push('/market-price');
    };

    render() {
        return (
            <div className="home-page">
                <h1>Add Item</h1>
                <div className="addFormStyles">
                    <form onSubmit={this.add} className="regFormStyles">
                        <div>
                            <label htmlFor="name">Name:</label>
                            <input className="titleStyles"
                                type="text"
                                name="name"
                                value={this.state.credentials.name}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="market">Market Location:</label>
                            <input className="titleStyles"
                                type="text"
                                name="market"
                                value={this.state.credentials.market}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="price">Price</label>
                            <input className="titleStyles"
                                type="text"
                                name="price"
                                value={this.state.credentials.price}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="description">Description:</label>
                            <input className="titleStyles"
                                type="text"
                                name="description"
                                value={this.state.credentials.description}
                                onChange={this.handleChange}
                            />
                        </div>
                        <button className="postButton">Add</button>
                    </form>
                </div>
            </div>
        );
    }
}
export default Login;