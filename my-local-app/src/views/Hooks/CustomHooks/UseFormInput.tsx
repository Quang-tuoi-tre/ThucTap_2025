// src/RegisterPage/Hooks/CustomHooks/UseFormInput.ts (hoặc .js)
import { useState } from "react";
// import React from "react"; 



// Thay đổi tham số của useFormInput
export function useFormInput( initialState:string,fieldName: string, name: string) {
        const[value, setValue]= useState(initialState)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement >) => {
        setValue(e.target.value);
    };

    const inputProps ={
        value:value,
        name: name,
        onChange:handleChange,
        placeholder: `Enter your ${fieldName}:`, // Tự động thêm tiền tố
        className: "mt-2 w-full p-3 border cursor-text border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        // name: fieldName, // Bạn có thể thêm name nếu cần
        
    };

    return inputProps;
}