import React, {createContext, useState} from 'react'

export const CategorizedImageContext = createContext()

export const CategorizedImageProvider = (props) => {
    const [images,setImages] = useState([])

    return (
        <CategorizedImageContext.Provider value={[images,setImages]}>
            {props.children}
        </CategorizedImageContext.Provider>
    )
}