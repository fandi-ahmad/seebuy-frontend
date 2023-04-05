import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

export const SearchInput = () => {
    return (
        <div className="flex justify-center flex-1 lg:mr-32">
            <div className="relative w-full max-w-xl mr-6 focus-within:text-purple-500" >
                <div className="absolute inset-y-0 flex items-center pl-2">
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </div>
                <input className="w-full pl-8 pr-2 text-sm text-gray-700 placeholder-gray-600 bg-gray-100 border-0 rounded-md  focus:placeholder-gray-500 focus:bg-white focus:border-purple-300 focus:outline-none focus:shadow-outline-purple form-input"
                type="text" placeholder="Search for projects" aria-label="Search" />
            </div>
        </div>
    )
}

export const InputText = () => {
    return (
        <div>BaseInput</div>
    )
}

export const InputNumber = () => {
    return (
        <div>BaseInput</div>
    )
}
