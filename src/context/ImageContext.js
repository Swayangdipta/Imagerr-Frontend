import React, {createContext, useState} from 'react'

export const ImageContext = createContext()

export const ImageProvider = (props) => {
    const [images,setImages] = useState([])

    return (
        <ImageContext.Provider value={[images,setImages]}>
            {props.children}
        </ImageContext.Provider>
    )
}