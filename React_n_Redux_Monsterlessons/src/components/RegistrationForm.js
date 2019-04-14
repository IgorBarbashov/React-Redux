// work with 'forms' example (как и на уроках - через state)
import React, { Component } from 'react';
import './RegistrationForm.css';

class RegistrationForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: ''
        };
    };

    handleSubmit = (event) => {
        event.preventDefault();
        console.log('Form is submitted. Email:', this.state.email);
    };

    handleEmailChange = (event) => {
        console.log('email was chanched', event.target.value);
        this.setState({ email: event.target.value});
    };

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input
                        type="text"
                        placeholder="E-mail"
                        value={this.state.email}
                        onChange={this.handleEmailChange}
                        className="emailField"
                    />
                    <button className="submitButton">Save</button>
                </form>
            </div>
        );
    };
}

export default RegistrationForm;