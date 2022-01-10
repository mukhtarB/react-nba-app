import React, { Component } from "react";

import style from './dashboard.module.css'
import FormField from "../../widgets/FormFields/formFields";

import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';

class Dashboard extends Component {

    state = {
        editorState: EditorState.createEmpty(),
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
            body: {
                element: 'testeditor',
                value: '',
                valid: true
            }
        }
    }

    updateFormWith = (element, content=null) => {
        
        const newFormData = {
            ...this.state.formData
        }

        const newElement = {
            ...newFormData[element.id]
        }

        if (content){
            newElement.value = content;
        } else {
            newElement.value = element.event.target.value;
        }

        if (element.blur) {
            let validData = this.validate(newElement)

            // updating the formdata input field with it's validation info
            newElement.valid = validData[0];
            newElement.validationMessage = validData[1];
        }

        newElement.touched = element.blur;
        newFormData[element.id] = newElement;

        this.setState({
            formData: newFormData
        })
    }

    validate = (element) => {
        let error = [true, ''];

        // required validation
        if (element.validation.required) {
            const valid = element.value.trim() !== '';
            const message = `${!valid ? 'This field is required!' : ''}`;

            error = !valid ? [valid, message] : error
        }

        return error;
    }

    submitForm = (event) => {
        event.preventDefault();

        let dataToSubmit = {};
        let formIsValid = true;

        for (let key in this.state.formData) {
            dataToSubmit[key] = this.state.formData[key].value;
        }

        for (let key in this.state.formData) {
            formIsValid = this.state.formData[key].valid && formIsValid;
        }

        console.log(dataToSubmit, formIsValid);

        if (formIsValid) {
            console.log("submitted post")
        } else {
            this.setState({
                postError: 'Something went wrong!'
            })
        }

    }

    submitButton = () => (
        this.state.loading ?
            'loading...'
        :
            <div>
                <button type="submit">Add Post</button>
            </div>
    )

    showError = () => (
        this.state.postError !== '' ? 
            <div className={style.error}>
                {this.state.postError}
            </div>
        :
            ''
    )

    // functionality of editor using state as a controlled form
    onEditorStateChange = (editorState) => {

        let contentState = editorState.getCurrentContent();
        // let rawState = convertToRaw(contentState);

        let html = stateToHTML(contentState)
        
        this.updateFormWith({id: 'body'}, html)

        this.setState({
            editorState
        })
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
                    
                    <FormField
                        id={'title'}
                        formFieldData = {this.state.formData.title}
                        change = {(newState) => this.updateFormWith(newState)}
                    />

                    <Editor
                        editorState={this.state.editorState}
                        wrapperClassName="myEditor-wrapper"
                        editorClassName="myEditor-editor"
                        onEditorStateChange={this.onEditorStateChange}
                    />

                    {this.submitButton()}
                    {this.showError()}

                </form>
            </div>
        )
    }
}

export default Dashboard;