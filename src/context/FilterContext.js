import {createContext, useState} from 'react'

export const FilterContext = createContext()

export const FilterProvider = (props) => {
    const [filters, setFilters] = useState({
        sort: '',
        category: 'all',
        view: 'cozy',
        theme: 'light'
    })

    return(
        <FilterContext.Provider value={[filters, setFilters]}>
            {props.children}
        </FilterContext.Provider>
    )
}