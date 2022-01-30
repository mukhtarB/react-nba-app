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

    return (
        <div>
            Dashboard
        </div>
    )
}

export default Dashboard;

// class Dashboard extends Component {

//     state = {
//         editorState: EditorState.createEmpty(),
//         postError: '',
//         loading: false,
//         formData: {
//             author: {
//                 element: 'input',
//                 value: '',
//                 config: {
//                     type: 'text',
//                     name: 'author_input',
//                     placeholder: 'Enter your name?'
//                 },
//                 validation: {
//                     required: true,
//                 },
//                 valid: false,
//                 touched: false,
//                 validationMessage: '',
//             },
//             title: {
//                 element: 'input',
//                 value: '',
//                 config: {
//                     type: 'text',
//                     name: 'title_input',
//                     placeholder: 'Enter your title?'
//                 },
//                 validation: {
//                     required: true,
//                 },
//                 valid: false,
//                 touched: false,
//                 validationMessage: '',
//             },
//             body: {
//                 element: 'testeditor',
//                 value: '',
//                 valid: true
//             },
//             image: {
//                 element: 'image',
//                 value: '',
//                 valid: true
//             },
//             team: {
//                 element: 'select',
//                 value: '',
//                 config: {
//                     name: 'teams_input',
//                     options: []
//                 },
//                 validation: {
//                     required: true,
//                 },
//                 valid: false,
//                 touched: false,
//                 validationMessage: '',
//             }
//         }
//     }

//     componentDidMount () {
//         this.loadTeams()
//     }
    
//     loadTeams = () => {
//         dbTeams.once('value')
//         .then((snapshot) => {
//             let team = [];

//             snapshot.forEach( childSnapshot => {
//                 team.push({
//                     id: childSnapshot.val().teamId,
//                     name: childSnapshot.val().city
//                 })
//             });
//             // console.log(teams)

//             // make a copy of current state
//             // update the copy with new info
//             // update state with identical but updated copy
            
//             const newFormData = {...this.state.formData};
//             const newTeamsElement = {...newFormData['team']}

//             newTeamsElement.config.options = team;
//             newFormData['team'] = newTeamsElement;

//             // console.log('newFormData', newFormData)

//             this.setState({
//                 formData: newFormData
//             })
//         })
//     }

//     updateFormWith = (element, content=null) => {
        
//         const newFormData = {
//             ...this.state.formData
//         }

//         const newElement = {
//             ...newFormData[element.id]
//         }

//         if (content){
//             newElement.value = content;
//         } else {
//             newElement.value = element.event.target.value;
//         }

//         if (element.blur) {
//             let validData = this.validate(newElement)

//             // updating the formdata input field with it's validation info
//             newElement.valid = validData[0];
//             newElement.validationMessage = validData[1];
//         }

//         newElement.touched = element.blur;
//         newFormData[element.id] = newElement;

//         this.setState({
//             formData: newFormData
//         })
//     }

//     validate = (element) => {
//         let error = [true, ''];

//         // required validation
//         if (element.validation.required) {
//             const valid = element.value.trim() !== '';
//             const message = `${!valid ? 'This field is required!' : ''}`;

//             error = !valid ? [valid, message] : error
//         }

//         return error;
//     }

//     submitForm = (event) => {
//         event.preventDefault();

//         let dataToSubmit = {};
//         let formIsValid = true;

//         for (let key in this.state.formData) {
//             dataToSubmit[key] = this.state.formData[key].value;
//         }

//         for (let key in this.state.formData) {
//             formIsValid = this.state.formData[key].valid && formIsValid;
//         }

//         //
//         console.log(dataToSubmit, formIsValid);

//         if (formIsValid) {
//             // console.log("submitted post")
//             this.setState({
//                 loading: true,
//                 postError: ''
//             })

//             dbArticles.orderByChild('id')
//             .limitToLast(1).once('value')
//             .then( snapshot => {
//                 let articleId;
//                 snapshot.forEach(childSnapshot => {
//                     articleId = childSnapshot.val().id;
//                 })

//                 // necessary formarts on dataToSubmit
//                 dataToSubmit['date'] = firebase.database.ServerValue.TIMESTAMP;
//                 dataToSubmit['id'] = articleId + 1;
//                 dataToSubmit['team'] = parseInt(dataToSubmit['team'], 10);

//                 dbArticles.push(dataToSubmit)
//                 .then( article => {
//                     this.props.navigate(`/articles/${article.key}`, {replace: true})
//                 })
//                 .catch( err => {
//                     this.setState({
//                         postError: err.message
//                     })
//                 })
//             })
//         } else {
//             this.setState({
//                 postError: 'Something went wrong!'
//             })
//         }

//     }

//     submitButton = () => (
//         this.state.loading ?
//             'loading...'
//         :
//             <div>
//                 <button type="submit">Add Post</button>
//             </div>
//     )

//     showError = () => (
//         this.state.postError !== '' ? 
//             <div className={style.error}>
//                 {this.state.postError}
//             </div>
//         :
//             ''
//     )

//     // functionality of editor using state as a controlled form
//     onEditorStateChange = (editorState) => {

//         let contentState = editorState.getCurrentContent();
//         // let rawState = convertToRaw(contentState);

//         let html = stateToHTML(contentState)
        
//         this.updateFormWith({id: 'body'}, html)

//         this.setState({
//             editorState
//         })
//     }

//     storeFilename = (filename) => {
//         this.updateFormWith({id: 'image'}, filename)
//     }

//     render () {
//         return(
//             <div className={style.postContainer}>
//                 <form onSubmit={this.submitForm}>
//                     <h2>Add Post</h2>

//                     <Uploader
//                         filename = {(filename) => this.storeFilename(filename)}
//                     />

//                     <FormField
//                         id={'author'}
//                         formFieldData = {this.state.formData.author}
//                         change = {(newState) => this.updateFormWith(newState)}
//                     />
                    
//                     <FormField
//                         id={'title'}
//                         formFieldData = {this.state.formData.title}
//                         change = {(newState) => this.updateFormWith(newState)}
//                     />

//                     <Editor
//                         editorState={this.state.editorState}
//                         wrapperClassName="myEditor-wrapper"
//                         editorClassName="myEditor-editor"
//                         onEditorStateChange={this.onEditorStateChange}
//                     />

//                     <FormField
//                         id={'team'}
//                         formFieldData = {this.state.formData.team}
//                         change = {(newState) => this.updateFormWith(newState)}
//                     />

//                     {this.submitButton()}
//                     {this.showError()}

//                 </form>
//             </div>
//         )
//     }
// }

// export default withRouterHOC(Dashboard);