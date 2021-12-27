import React from "react";
import { Component } from "react/cjs/react.production.min";

import style from './signIn.module.css';

// components
import FormField from "../../widgets/FormFields/formFields";

class SignIn extends Component {

    state = {
        registerError: '',
        loading: false,
        formData: {
            email: {
                element: 'input',
                value: '',
                config: {
                    type: 'input',
                    name: 'email_input',
                    placeholder: 'Enter your email'
                },
                validation: {
                    required: true,
                    email_rule: true
                },
                valid: false,
                touched: false,
                validationMessage: '',
            },
            password: {
                element: 'input',
                value: '',
                config: {
                    type: 'password',
                    name: 'password_input',
                    placeholder: 'Enter your password'
                },
                validation: {
                    required: true,
                    password_rule: true
                },
                valid: false,
                touched: false,
                validationMessage: '',
            }
        }
    }

    updateFormWith = (element) => {
        
        const newFormData = {
            ...this.state.formData
        }

        const newElement = {
            ...newFormData[element.id]
        }
        newElement.value = element.event.target.value;

        if (element.blur) {
            let validData = this.validate(newElement)

            // updating the formdata input field with it's validation info
            newElement.valid = validData[0];
            newElement.validationMessage = validData[1];
        }

        newElement.touched = element.blur;
        newFormData[element.id] = newElement;

        // console.log(newFormData);
        this.setState({
            formData: newFormData
        })
    }

    validate = (element) => {
        let error = [true, ''];

        // email validation
        if (element.validation.email_rule) {
            const valid = /\S+@\S+\.\S+/.test(element.value);
            const message = `${!valid ? 'This is not a valid email!' : ''}`;

            error = !valid ? [valid, message] : error
        }

        // password validation
        if (element.validation.password_rule) {
            const valid = element.value.length >= 5;
            const message = `${!valid ? 'Password cannot be less than 5!' : ''}`;

            error = !valid ? [valid, message] : error
        }

        // required validation
        if (element.validation.required) {
            const valid = element.value.trim() !== '';
            const message = `${!valid ? 'This field is required!' : ''}`;

            error = !valid ? [valid, message] : error
        }

        return error;
    }

    render () {
        return (
            <div className={style.logContainer}>
                <form>
                    <h2>Register / Log In</h2>
                    <FormField
                        id={'email'}
                        formFieldData = {this.state.formData.email}
                        change = {(newState) => this.updateFormWith (newState)}
                    />
                  
                    <FormField
                        id={'password'}
                        formFieldData = {this.state.formData.password}
                        change = {(newState) => this.updateFormWith (newState)}
                    />
                </form>
            </div>
        )
    }
}

export default SignIn;