import React, { Component, useReducer, useState } from "react";

import style from './signIn.module.css';
import { firebase } from "../../firebase";
import withRouterHOC from "../../hoc/withRouter/withRouter";

// components
import FormField from "../../widgets/FormFields/formFields";
import { useLocation, useNavigate } from "react-router-dom";


const SignIn = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const formData = {
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
    };

    const validate = (elementField) => {
        let error = [true, ''];

        // email validation
        if (elementField.validation.email_rule) {
            const valid = /\S+@\S+\.\S+/.test(elementField.value);
            const message = `${!valid ? 'This is not a valid email!' : ''}`;

            error = !valid ? [valid, message] : error
        }

        // password validation
        if (elementField.validation.password_rule) {
            const valid = elementField.value.length >= 5;
            const message = `${!valid ? 'Password cannot be less than 5!' : ''}`;

            error = !valid ? [valid, message] : error
        }

        // required validation
        if (elementField.validation.required) {
            const valid = elementField.value.trim() !== '';
            const message = `${!valid ? 'This field is required!' : ''}`;

            error = !valid ? [valid, message] : error
        }

        return error;
    };

    const reducer = (state, action) => {
        const newFormData = {...state}

        const newElementField = {
            ...newFormData[element.id]
        }
        newElementField.value = element.event.target.value;

        if (element.blur) {
            let validData = validate(newElementField)

            // updating the formdata input field with it's validation info
            newElementField.valid = validData[0];
            newElementField.validationMessage = validData[1];
        };

        newElementField.touched = element.blur;
        newFormData[element.id] = newElementField;

        return newFormData;
    };

    // state variables
    const [formMetaData, setFormMetaData] = useState({
        registerError: '',
        loading: false
    });

    const [formData, dispatch] = useReducer(reducer, formData);

    const updateFormWith = (element) => {
        let action = {element};
        dispatch(action);
    };

    const submitForm = (event, type) => {
        event.preventDefault();

        if (type !== null) {
            let dataToSubmit = {};
            let formIsValid = true;

            for (let key in this.state.formData) {
                dataToSubmit[key] = this.state.formData[key].value;
            };

            for (let key in this.state.formData) {
                formIsValid = this.state.formData[key].valid && formIsValid;
            };

            if (formIsValid) {
                // console.log(dataToSubmit);
                setFormMetaData({
                    loading: true,
                    registerError: ''
                });

                if (type) {
                    // LOG IN
                    firebase.auth()
                    .signInWithEmailAndPassword(
                        dataToSubmit.email,
                        dataToSubmit.password
                    )
                    .then( () => {
                        location.state?.from ? 
                            navigate(location.state.from.pathname)
                            :
                            navigate('/');
                    })
                    .catch( (error) => {
                        setFormMetaData({
                            loading: true,
                            registerError: error.message
                        })
                    })
                } else {
                    // REGISTER
                    firebase.auth()
                    .createUserWithEmailAndPassword(
                        dataToSubmit.email,
                        dataToSubmit.password
                    )
                    .then( () => {
                        navigate('/');
                    })
                    .catch( (error) => {
                        setFormMetaData({
                            loading: true,
                            registerError: error.message
                        });
                    });
                    
                };
            };
        };
    };

    const submitButton = () => (
        formMetaData.loading ? 
            'loading...'
        :
            <div>
                <button onClick={(event) => submitForm(event, false)}>Register Now</button>
                <button onClick={(event) => submitForm(event, true)}>Log In</button>
            </div>
    );

    const showError = () => (
        formMetaData.registerError !== '' ? 
            <div className={style.error}>
                {formMetaData.registerError}
            </div>
        :
            ''
    );

    return (
        <div>
            SignIn functional component
        </div>
    );
};

export default SignIn;



// class SignIn extends Component {

//     state = {
//         registerError: '',
//         loading: false,
//         formData: {
//             email: {
//                 element: 'input',
//                 value: '',
//                 config: {
//                     type: 'input',
//                     name: 'email_input',
//                     placeholder: 'Enter your email'
//                 },
//                 validation: {
//                     required: true,
//                     email_rule: true
//                 },
//                 valid: false,
//                 touched: false,
//                 validationMessage: '',
//             },
//             password: {
//                 element: 'input',
//                 value: '',
//                 config: {
//                     type: 'password',
//                     name: 'password_input',
//                     placeholder: 'Enter your password'
//                 },
//                 validation: {
//                     required: true,
//                     password_rule: true
//                 },
//                 valid: false,
//                 touched: false,
//                 validationMessage: '',
//             }
//         }
//     }

//     updateFormWith = (element) => {
        
//         const newFormData = {
//             ...this.state.formData
//         }

//         const newElement = {
//             ...newFormData[element.id]
//         }
//         newElement.value = element.event.target.value;

//         if (element.blur) {
//             let validData = this.validate(newElement)

//             // updating the formdata input field with it's validation info
//             newElement.valid = validData[0];
//             newElement.validationMessage = validData[1];
//         }

//         newElement.touched = element.blur;
//         newFormData[element.id] = newElement;

//         // console.log(newFormData);
//         this.setState({
//             formData: newFormData
//         })
//     }

//     validate = (element) => {
//         let error = [true, ''];

//         // email validation
//         if (element.validation.email_rule) {
//             const valid = /\S+@\S+\.\S+/.test(element.value);
//             const message = `${!valid ? 'This is not a valid email!' : ''}`;

//             error = !valid ? [valid, message] : error
//         }

//         // password validation
//         if (element.validation.password_rule) {
//             const valid = element.value.length >= 5;
//             const message = `${!valid ? 'Password cannot be less than 5!' : ''}`;

//             error = !valid ? [valid, message] : error
//         }

//         // required validation
//         if (element.validation.required) {
//             const valid = element.value.trim() !== '';
//             const message = `${!valid ? 'This field is required!' : ''}`;

//             error = !valid ? [valid, message] : error
//         }

//         return error;
//     }

//     submitForm = (event, type) => {
//         event.preventDefault();

//         if (type !== null) {
//             let dataToSubmit = {};
//             let formIsValid = true;

//             for (let key in this.state.formData) {
//                 dataToSubmit[key] = this.state.formData[key].value;
//             }

//             for (let key in this.state.formData) {
//                 formIsValid = this.state.formData[key].valid && formIsValid;
//             }

//             if (formIsValid) {
//                 // console.log(dataToSubmit);
//                 this.setState({
//                     loading: true,
//                     registerError: ''
//                 })

//                 if (type) {
//                     // LOG IN
//                     firebase.auth()
//                     .signInWithEmailAndPassword(
//                         dataToSubmit.email,
//                         dataToSubmit.password
//                     )
//                     .then( () => {
//                         this.props.location.state?.from ? 
//                             this.props.navigate(this.props.location.state.from.pathname)
//                             :
//                             this.props.navigate('/');
//                     })
//                     .catch( (error) => {
//                         this.setState({
//                             loading: true,
//                             registerError: error.message
//                         })
//                         // console.log("Error ->", this.state.registerError)
//                     })
//                 } else {
//                     // REGISTER
//                     firebase.auth()
//                     .createUserWithEmailAndPassword(
//                         dataToSubmit.email,
//                         dataToSubmit.password
//                     )
//                     .then( () => {
//                         this.props.navigate('/')
//                     })
//                     .catch( (error) => {
//                         this.setState({
//                             loading: true,
//                             registerError: error.message
//                         })
//                         // console.log("Error ->", this.state.registerError)
//                     })
                    
//                 }
//             }
//         }
//     }

//     submitButton = () => (
//         this.state.loading ? 
//             'loading...'
//         :
//             <div>
//                 <button onClick={(event) => this.submitForm(event, false)}>Register Now</button>
//                 <button onClick={(event) => this.submitForm(event, true)}>Log In</button>
//             </div>
//     )

//     showError = () => (
//         this.state.registerError !== '' ? 
//             <div className={style.error}>
//                 {this.state.registerError}
//             </div>
//         :
//             ''
//     )

//     render () {
//         return (
//             <div className={style.logContainer}>
//                 <form onSubmit={(event) => this.submitForm(event, null)}>
//                     <h2>Register / Log In</h2>
//                     <FormField
//                         id={'email'}
//                         formFieldData = {this.state.formData.email}
//                         change = {(newState) => this.updateFormWith (newState)}
//                     />
                  
//                     <FormField
//                         id={'password'}
//                         formFieldData = {this.state.formData.password}
//                         change = {(newState) => this.updateFormWith (newState)}
//                     />

//                     {this.showError()}
//                     {this.submitButton()}
                    
//                 </form>
//             </div>
//         )
//     }
// }

// export default withRouterHOC(SignIn);