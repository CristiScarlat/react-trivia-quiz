import React from 'react'
import './textInput.css'

function TextInput({value="", placeholder="", onChange, className}){
    return  <input className={`text-input-default-style ${className}`} type="text" value={value} placeholder={placeholder} onChange={onChange}/>
}

export default TextInput