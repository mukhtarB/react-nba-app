import React from "react";
import style from './formFields.module.css';

const FormFields = ({id, formFieldData, change}) => {

    const showError = () => {
        let errorMessage;

        if (formFieldData.validation && !formFieldData.valid) {
            errorMessage = (
                <div className = {style.labelError}>
                    {formFieldData.validationMessage}
                </div>
            )
        }


        return errorMessage;
    }

    const renderTemplate = () => {
        let formTemplate;

        switch (formFieldData.element) {
            case 'input':
                formTemplate = (
                    <>
                        <input
                            {...formFieldData.config}
                            value={formFieldData.value}
                            onBlur={(event) => change({event, id, blur:true})}
                            onChange={(event) => change({event, id, blur:false})}
                        />
                        { showError() }
                    </>
                )
                break;
            
            case 'select':
                formTemplate = (
                    <>
                        <select
                            value={formFieldData.value}
                            name={formFieldData.config.name}
                            onBlur={(event) => change({event, id, blur:true})}
                            onChange={(event) => change({event, id, blur:false})}
                        >

                        { formFieldData.config.options.map( (item, i) => {
                            return <option key={i} value={item.id}> {item.name} </option>
                        })}

                        </select>
                    </>
                )
                break;
        
            default:
                formTemplate = null;
                break;
        }

        return formTemplate;
    }



    return (
        <div>
            {renderTemplate()}
        </div>
    )
}

export default FormFields;