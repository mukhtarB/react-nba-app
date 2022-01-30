import React, { useReducer, useState } from "react";

import style from './dashboard.module.css';
// import withRouterHOC from "../../hoc/withRouter/withRouter";

import FormField from "../../widgets/FormFields/formFields";
import Uploader from "../../widgets/FileUploader/fileUploader";

import { Editor } from 'react-draft-wysiwyg';
import { EditorState } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import { dbTeams, dbArticles, firebase } from "../../firebase";


const Dashboard = () => {
    const formData = {
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
    };

    const validate = (elementField) => {
        let error = [true, ''];

        // required validation
        if (elementField.validation.required) {
            const valid = elementField.value.trim() !== '';
            const message = `${!valid ? 'This field is required!' : ''}`;

            error = !valid ? [valid, message] : error
        }

        return error;
    };

    // -- all logic for updating (formData) state
    const reducer = (state, action) => {
        let newFormData;

        switch (action.type) {
            case 'loadTeams':
                // make a copy of current state
                // update the copy with new info
                // update state with identical but updated copy
                newFormData = {...state};
                const newTeamsElement = {...newFormData['team']}
    
                newTeamsElement.config.options = action.payload;
                newFormData['team'] = newTeamsElement;
                break;
            
            case 'updateFormWith':
                newFormData = {...state}
        
                const elementField = {
                    ...newFormData[action.payload.element.id]
                }
        
                if (action.payload.content){
                    elementField.value = action.payload.content;
                } else {
                    elementField.value = action.payload.element.event.target.value;
                }
        
                if (action.payload.element.blur) {
                    let validData = validate(elementField);
        
                    // updating the formData input field with it's validation info
                    elementField.valid = validData[0];
                    elementField.validationMessage = validData[1];
                }
        
                elementField.touched = action.payload.element.blur;
                newFormData[action.payload.element.id] = elementField;
                break;
        
            default:
                newFormData = state;
                break;
        }

        return newFormData;
    };

    // all state declarations
    const [formMetaData, setFormMetaData] = useState({
        editorState: EditorState.createEmpty(),
        postError: '',
        loading: false,
    });

    const [formDataState, dispatch] = useReducer(reducer, formData);
    // console.table(formDataState);

    useEffect(() => {
        let mounted = true
        
        dbTeams.once('value')
        .then((snapshot) => {
            let team = [];

            snapshot.forEach( childSnapshot => {
                team.push({
                    id: childSnapshot.val().teamId,
                    name: childSnapshot.val().city
                })
            });

            // call the dispatch
            // console.table(team);
            let action = {
                type: 'loadTeams',
                payload: team
            };

            if (mounted) dispatch(action);
        })

        return () => {
            mounted = false;
        }
    }, []);


    // -- all component functions

    const updateFormWith = (element, content=null) => {
        let action = {
            type: 'updateFormWith',
            payload : {
                element,
                content
            }
        }
        dispatch(action);
    };

    const submitForm = (event) => {
        event.preventDefault();

        let dataToSubmit = {};
        let formIsValid = true;

        for (let key in formDataState) {
            dataToSubmit[key] = formDataState[key].value;
        }

        for (let key in formDataState) {
            formIsValid = formDataState[key].valid && formIsValid;
        }

        // console.log(dataToSubmit, formIsValid);

        if (formIsValid) {
            // console.log("submitted post")
            setFormMetaData({
                loading: true,
                postError: ''
            });

            dbArticles.orderByChild('id')
            .limitToLast(1).once('value')
            .then( snapshot => {
                let articleId;
                snapshot.forEach(childSnapshot => {
                    articleId = childSnapshot.val().id;
                })

                // necessary formarts on dataToSubmit
                dataToSubmit['date'] = firebase.database.ServerValue.TIMESTAMP;
                dataToSubmit['id'] = articleId + 1;
                dataToSubmit['team'] = parseInt(dataToSubmit['team'], 10);

                dbArticles.push(dataToSubmit)
                .then( article => {
                    navigate(`/articles/${article.key}`, {replace: true})
                })
                .catch( err => {
                    setFormMetaData({
                        postError: err.message
                    })
                })
            })
        } else {
            setFormMetaData({
                postError: 'Something went wrong!'
            })
        }

    };

    const submitButton = () => (
        formMetaData.loading ?
            'loading...'
        :
            <div>
                <button type="submit">Add Post</button>
            </div>
    );

    const showError = () => (
        formMetaData.postError !== '' ? 
            <div className={style.error}>
                {formMetaData.postError}
            </div>
        :
            ''
    );

    // functionality of editor using state as a controlled form
    const onEditorStateChange = (editorState) => {

        let contentState = editorState.getCurrentContent();
        // let rawState = convertToRaw(contentState);

        let html = stateToHTML(contentState)
        
        updateFormWith({id: 'body'}, html);

        setFormMetaData({
            editorState
        });
    };

    const storeFileImage = (filename) => {
        updateFormWith({id: 'image'}, filename);
    };

    return (
        <div className={style.postContainer}>
            <form onSubmit={submitForm}>
                <h2>Add Post</h2>

                <Uploader
                    filename = {(filename) => storeFileImage(filename)}
                />

                <FormField
                    id={'author'}
                    formFieldData = {formDataState.author}
                    change = {(newState) => updateFormWith(newState)}
                />

                <FormField
                    id={'title'}
                    formFieldData = {formDataState.title}
                    change = {(newState) => updateFormWith(newState)}
                />

                <Editor
                    editorState={formMetaData.editorState}
                    wrapperClassName="myEditor-wrapper"
                    editorClassName="myEditor-editor"
                    onEditorStateChange={onEditorStateChange}
                />

                <FormField
                    id={'team'}
                    formFieldData = {formDataState.team}
                    change = {(newState) => updateFormWith(newState)}
                />

                {submitButton()}
                {showError()}

            </form>
        </div>
    )
}

export default Dashboard;