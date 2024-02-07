import React from "react";

export default function InputError({message}){
    return (
        <p className="text-red-500 text-sm ml-1">
            {message}
        </p>
    )
}