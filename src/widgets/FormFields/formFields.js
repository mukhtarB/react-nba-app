import React from "react";
import style from './formFields.module.css';

const FormFields = ({id, formFieldData, change}) => {

    const renderTemplate = () => {
        let formTemplate;

        switch (formFieldData.element) {
            case 'input':
                formTemplate = (
                    <div>INPUT JSX</div>
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