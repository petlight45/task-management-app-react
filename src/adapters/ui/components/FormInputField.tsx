import * as React from 'react';

type FormInputFieldProps = {
    [key: string]: any,
    children: React.ReactNode
};

const FormInputField: React.FC<FormInputFieldProps> = (props: FormInputFieldProps) => {
    const {children, ...props_} = props;
    const className = "w-full px-2 py-1 text-textColor-2 bg-input border box-border border-solid border-border2 text-base outline-none" + (props?.className ? ` ${props.className}` : '')
    switch (props_?.type) {
        case "textarea":
            return <textarea {...props_} className={className}/>
        case "select":
            return (<select {...props}>
                {children}
            </select>)
        default:
            return <input {...props_} className={className}/>

    }
};

export default FormInputField;