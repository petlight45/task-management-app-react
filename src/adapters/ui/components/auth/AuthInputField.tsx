import React from 'react';
import FormInputField from "../FormInputField";

type AuthInputFieldProps = {
    [key: string]: any,
};

const AuthInputField: React.FC<AuthInputFieldProps> = (props: AuthInputFieldProps) => {
    return (
        <FormInputField
            {...props} />
    );
};

export default AuthInputField;