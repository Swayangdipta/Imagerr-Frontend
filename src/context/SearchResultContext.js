import React, {createContext, useState} from 'react'

export const SearchResultContext = createContext()

export const SearchResultProvider = (props) => {
    const [images,setImages] = useState([])

    return (
        <SearchResultContext.Provider value={[images,setImages]}>
            {props.children}
        </SearchResultContext.Provider>
    )
}