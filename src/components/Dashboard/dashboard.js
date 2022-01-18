import React, { Component } from "react";

import style from './dashboard.module.css'
import FormField from "../../widgets/FormFields/formFields";

import { Editor } from 'react-draft-wysiwyg';
import { EditorState } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import { dbTeams, dbArticles } from "../../firebase";

import Uploader from "../../widgets/FileUploader/fileUploader";

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
            },
            image: {
                element: 'image',
                value: '',
                valid: true
            },
            team: {
                element: 'select',
                value: '',
                config: {
                    name: 'teams_input',
                    options: []
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: '',
            }
        }
    }

    componentDidMount () {
        this.loadTeams()
    }
    
    loadTeams = () => {
        dbTeams.once('value')
        .then((snapshot) => {
            let teams = [];

            snapshot.forEach( childSnapshot => {
                teams.push({
                    id: childSnapshot.val().teamId,
                    name: childSnapshot.val().city
                })
            });
            // console.log(teams)

            // make a copy of current state
            // update the copy with new info
            // update state with identical but updated copy
            
            const newFormData = {...this.state.formData};
            const newTeamsElement = {...newFormData['team']}

            newTeamsElement.config.options = teams;
            newFormData['team'] = newTeamsElement;

            // console.log('newFormData', newFormData)

            this.setState({
                formData: newFormData
            })
        })
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

        //
        console.log(dataToSubmit, formIsValid);

        if (formIsValid) {
            // console.log("submitted post")
            this.setState({
                loading: true,
                postError: ''
            })

            dbArticles.orderByChild('id')
            .limitToLast(1).once('value')
            .then( snapshot => {
                let articleId;
                snapshot.forEach(childSnapshot => {
                    articleId = childSnapshot.val().id;
                })

                //
                console.log(articleId)
            })
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

    storeFilename = (filename) => {
        this.updateFormWith({id: 'image'}, filename)
    }

    render () {
        return(
            <div className={style.postContainer}>
                <form onSubmit={this.submitForm}>
                    <h2>Add Post</h2>

                    <Uploader
                        filename = {(filename) => this.storeFilename(filename)}
                    />

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

                    <FormField
                        id={'team'}
                        formFieldData = {this.state.formData.team}
                        change = {(newState) => this.updateFormWith(newState)}
                    />

                    {this.submitButton()}
                    {this.showError()}

                </form>
            </div>
        )
    }
}

export default Dashboard;