import { useState } from "react";

interface EditableRowProps<T> {
    data: T;
    fields: {label:string, key:keyof T}[];
    onSave:(updatedData: T) => void;
    onCancel: () => void;
}

export function EditableRow< T extends object>({ data, fields, onSave, onCancel}): EditableRowProps<T> {
    const [formState, setFormState] = useState<T>(data);

    const handleChange = (key: keyof  T, value:string) => {
        setFormState({...formState, [key]:value});
    };

    return ();
}