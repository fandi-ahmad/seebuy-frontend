import React from 'react'
import SearchInput from './inputs/SearchInput'

export const Navbar = () => {
    return (
        <header className="z-10 py-4 bg-white shadow-md ">
            <div className="container flex items-center justify-between h-full px-6 mx-auto text-purple-600">
                <button className="p-1 mr-5 -ml-1 rounded-md md:hidden focus:outline-none focus:shadow-outline-purple" aria-label="Menu">
                    <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" >
                        <path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path>
                    </svg>
                </button>
                {/* <!-- Search input --> */}
                <SearchInput />
                <ul className="flex items-center flex-shrink-0 space-x-6">
                    
                    <li className="dropdown dropdown-end cursor-pointer">
                        <button className="relative align-middle rounded-md focus:outline-none focus:shadow-outline-purple" tabIndex={0}>
                            <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" >
                                <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"></path>
                            </svg>
                            <span aria-hidden="true" className="absolute top-0 right-0 inline-block w-3 h-3 transform translate-x-1 -translate-y-1 bg-red-600 border-2 border-white rounded-full" ></span>
                        </button>
                        <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-white border-gray-100 text-gray-600 rounded-lg w-52">
                            <li className='font-semibold'><a>Item 1.1</a></li>
                            <li className='font-semibold'><a>Item 1.2</a></li>
                        </ul>
                    </li>

                    <li className="dropdown dropdown-end cursor-pointer">
                        <img className="object-cover w-8 h-8 rounded-full"
                            src="https://images.unsplash.com/photo-1502378735452-bc7d86632805?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=aa3a807e1bbdfd4364d1f449eaa96d82"
                            alt="" aria-hidden="true" tabIndex={1}
                        />
                        <ul tabIndex={1} className="dropdown-content menu p-2 shadow bg-white border-gray-100 text-gray-600 rounded-lg w-52">
                            <li className='font-semibold'><a>Item 2.1</a></li>
                            <li className='font-semibold'><a>Item 2.2</a></li>
                        </ul>
                    </li>

                </ul>
            </div>
        </header>
    )
}
