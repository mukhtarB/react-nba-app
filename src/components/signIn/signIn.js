import React, { useReducer, useState } from "react";

import style from './signIn.module.css';
import { firebase } from "../../firebase";

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
            ...newFormData[action.element.id]
        }
        newElementField.value = action.element.event.target.value;

        if (action.element.blur) {
            let validData = validate(newElementField)

            // updating the formdata input field with it's validation info
            newElementField.valid = validData[0];
            newElementField.validationMessage = validData[1];
        };

        newElementField.touched = action.element.blur;
        newFormData[action.element.id] = newElementField;

        return newFormData;
    };

    // state variables
    const [formMetaData, setFormMetaData] = useState({
        registerError: '',
        loading: false
    });

    const [formDataState, dispatch] = useReducer(reducer, formData);

    const updateFormWith = (element) => {
        let action = {element};
        dispatch(action);
    };

    const submitForm = (event, type) => {
        event.preventDefault();

        if (type !== null) {
            let dataToSubmit = {};
            let formIsValid = true;

            for (let key in formDataState) {
                dataToSubmit[key] = formDataState[key].value;
            };

            for (let key in formDataState) {
                formIsValid = formDataState[key].valid && formIsValid;
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
                            navigate(location.state.from.pathname, {replace: true})
                            // console.log(location, location.state.from.pathname)
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
        <div className={style.logContainer}>
            <form onSubmit={(event) => submitForm(event, null)}>
                <h2>Register / Log In</h2>
                <FormField
                    id={'email'}
                    formFieldData = {formDataState.email}
                    change = {(newState) => updateFormWith (newState)}
                />
                
                <FormField
                    id={'password'}
                    formFieldData = {formDataState.password}
                    change = {(newState) => updateFormWith (newState)}
                />

                {showError()}
                {submitButton()}
                
            </form>
        </div>
    );
};

export default SignIn;