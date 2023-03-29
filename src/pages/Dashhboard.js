import { React, useState, useEffect } from 'react'
import { Sidebar } from '../components/Sidebar'
import SearchInput from '../components/inputs/SearchInput'
import { Card } from '../components/Card'
import { Pagination } from '../components/Pagination'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

export const Dashhboard = () => {
    return (
        <div className='flex h-screen bg-gray-100'>
            <Sidebar />
            {/* <MobileSidebar /> */}
            <div className="flex flex-col flex-1 w-full">
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
                                <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-white border-gray-100 text-gray-600 rounded-box w-52">
                                    <li className='font-semibold'><a>Item 1.1</a></li>
                                    <li className='font-semibold'><a>Item 1.2</a></li>
                                </ul>
                            </li>

                            <li className="dropdown dropdown-end cursor-pointer">
                                <img className="object-cover w-8 h-8 rounded-full"
                                    src="https://images.unsplash.com/photo-1502378735452-bc7d86632805?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=aa3a807e1bbdfd4364d1f449eaa96d82"
                                    alt="" aria-hidden="true" tabIndex={1}
                                />
                                <ul tabIndex={1} className="dropdown-content menu p-2 shadow bg-white border-gray-100 text-gray-600 rounded-box w-52">
                                    <li className='font-semibold'><a>Item 2.1</a></li>
                                    <li className='font-semibold'><a>Item 2.2</a></li>
                                </ul>
                            </li>

                        </ul>
                    </div>
                </header>
                <div className="h-full overflow-y-auto pb-6">
                    <div className="container px-6 mx-auto grid">
                        <h2 className="my-6 text-2xl font-semibold text-gray-700 " >
                            Dashboard
                        </h2>

                        {/* <!-- Cards --> */}
                        <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
                            <Card color='orange' title='Total clients' value='4248' />
                            <Card color='green' title='Accounts balance' value='$ 46,760.89' />
                            <Card color='blue' title='New sales' value='376' />
                            <Card color='teal' title='Pending contact' value='28' />
                        </div>

                        {/* <!-- New Table --> */}
                        <main className="w-full overflow-hidden rounded-lg shadow-xs">
                            <div className="w-full overflow-x-auto">
                                <table className="w-full whitespace-no-wrap">
                                    <thead>
                                        <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b bg-gray-50">
                                            <th className="px-4 py-3">Client</th>
                                            <th className="px-4 py-3">Amount</th>
                                            <th className="px-4 py-3">Status</th>
                                            <th className="px-4 py-3">Date</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y" >
                                        <tr className="text-gray-700 ">
                                            <td className="px-4 py-3">
                                                <div className="flex items-center text-sm">
                                                    <div className="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                                                        <img
                                                            className="object-cover w-full h-full rounded-full"
                                                            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&facepad=3&fit=facearea&s=707b9c33066bf8808c934c8ab394dff6"
                                                            alt=""
                                                            loading="lazy"
                                                        />
                                                        <div className="absolute inset-0 rounded-full shadow-inner" aria-hidden="true"></div>
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold">Jolina Angelie</p>
                                                        <p className="text-xs text-gray-600">Unemployed</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 text-sm">$ 369.95</td>
                                            <td className="px-4 py-3 text-xs">
                                                <span className="px-2 py-1 font-semibold leading-tight text-orange-700 bg-orange-100 rounded-full">
                                                    Pending
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-sm">6/10/2020</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t bg-gray-50 sm:grid-cols-9">
                                <span className="flex items-center col-span-3">
                                    Showing 21-30 of 100
                                </span>
                                <span className="col-span-2"></span>
                                {/* <!-- Pagination --> */}
                                <Pagination/>
                            </div>
                        </main>

                    </div>
                </div>
            </div>
        </div>
    )
}
