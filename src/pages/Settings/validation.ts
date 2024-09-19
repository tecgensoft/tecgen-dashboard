
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck 
interface IValidateData {
    [key: string]: string | number | null | undefined | File;
}
export const validate = (data: IValidateData) => {
    let errors: Partial<IValidateData> = {};

    const errMessage = (field: any, customMessage?: string) => {
        const str = field &&  field?.charAt(0).toUpperCase() + field.slice(1);
        return customMessage || `${str} is required.`;
    }

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password: string) => {
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password);
    };
    const validateImage = (file: File) => {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
        const maxSize = 5 * 1024 * 1024; 

        if (!allowedTypes.includes(file.type)) {
            return 'Only .jpg, .png, or .gif files are allowed.';
        }

        if (file.size > maxSize) {
            return 'Image size must be less than 5MB.';
        }

        return null; 
    };

    for (const field in data) {
        const value = data[field as keyof IValidateData];

        if (value === null || value === undefined || 
            (typeof value === 'string' && !value.trim())
        ) {
            errors[field as keyof IValidateData] = errMessage(field as keyof IValidateData);
        }

        if (value instanceof File) {
            const imageError = validateImage(value);
            if (imageError) {
                errors[field] = imageError;
            }
        }
    }

    if (data.email && !validateEmail(data.email)) {
        errors.email = errMessage('email', 'Invalid email format.');
    }

    if (data.password && !validatePassword(data.password)) {
        errors.password = errMessage('password', 'Password must be at least 8 characters long, contain one uppercase letter, one number, and one special character.');
    }
    const hasErrors = Object.values(errors).some(
        (error) => error !== undefined
    );    
    return { isValid: hasErrors, errors };
};
