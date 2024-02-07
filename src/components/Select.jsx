import React, {useId, forwardRef} from "react";

function Select({
    label,
    options=[],
    className,
    ...props
}, ref){
    const id = useId()
    return (
        <div>
           {label &&  <label className="mb-1 pl-1 inline-blok">{label}</label>}
           <select
            {...props}
            id={id}
            ref={ref}
            className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
        >
            {
                options?.map(option => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))
            }
            

           </select>
           
        </div>
    )
}

export default forwardRef(Select)