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
                    email_rule: true
                },
                valid: false,
                touched: false,
                validationMessage: '',
            }
        }
    }

    updateFormWith = (object) => {

    }

    render () {
        return (
            <div className={style.logContainer}>
                <form>
                    <FormField
                        id={'email'}
                        formFieldData = {this.state.formData.email}
                        change = {(newState) => this.updateFormWith (newState)}
                    />
                </form>
            </div>
        )
    }
}

export default SignIn;