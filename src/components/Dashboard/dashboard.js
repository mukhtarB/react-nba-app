import React, { Component } from "react";

import style from './dashboard.module.css'
import FormField from "../../widgets/FormFields/formFields";

class Dashboard extends Component {

    state = {
        postError: '',
        loading: false,
        formData: {
            author: {
                element: 'input',
                value: '',
                config: {
                    type: 'text',
                    name: 'author_input',
                    placeholder: 'Enter your name?'
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: '',
            },
            title: {
                element: 'input',
                value: '',
                config: {
                    type: 'text',
                    name: 'title_input',
                    placeholder: 'Enter your title?'
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: '',
            },
        }
    }

    updateFormWith = (newState) => {
        
    }

    render () {
        return(
            <div className={style.postContainer}>
                <form onSubmit={this.submitForm}>
                    <h2>Add Post</h2>

                    <FormField
                        id={'author'}
                        formFieldData = {this.state.formData.author}
                        change = {(newState) => this.updateFormWith(newState)}
                    />

                </form>
            </div>
        )
    }
}

export default Dashboard;