import { faBan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'

const PageNotFound = () => {
    return (
        <main className="h-screen flex justify-center items-center pb-16 overflow-y-auto bg-gray-50">
            <div className="container flex flex-col items-center px-6 mx-auto">
                <div className='text-7xl'>
                    <FontAwesomeIcon icon={faBan} />
                </div>
                <h1 className="text-7xl my-2 font-semibold text-gray-700">404</h1>
                <p className="text-gray-700 dark:text-gray-300">
                    Page not found. Check the address or
                    <Link to={'/'} className='text-blue-600 hover:underline ml-1'>go back</Link>.
                </p>
            </div>
        </main>
    )
}

export default PageNotFound