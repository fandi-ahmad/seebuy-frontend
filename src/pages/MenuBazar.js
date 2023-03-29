import { React, useState, useEffect } from 'react'
import { Pagination } from '../components/Pagination'
import { Adminpanel } from '../layouts/Adminpanel'
import { GetBazar, CreateBazar, UpdateBazar, DeleteBazar } from '../api/MenuBazar'
import axios from 'axios'

export const MenuBazar = () => {

    const [bazarLists, setBazarList] = useState([])

    const getAllData = () => {
        axios.get('http://localhost:8000/cms/bazar')
        .then((result) => {
            console.log(result)
        }).catch((err) => {
            console.log(err)
        });
    }

    
    // run in first load
    useEffect(() => {
        getAllData()
    });

    return (
        <Adminpanel>
            <h2 className="mb-6 text-2xl font-semibold text-gray-700">Menu Bazar</h2>

            {/* <!-- New Table --> */}
            <main className="w-full overflow-hidden rounded-lg shadow-xs">
                <div className="w-full overflow-x-auto">
                    <table className="w-full whitespace-no-wrap">
                        <thead>
                            <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b bg-gray-50">
                                <th className="pl-4 py-3">no</th>
                                <th className="px-4 py-3">name</th>
                                <th className="px-4 py-3">price</th>
                                <th className="px-4 py-3">images</th>
                                <th className="px-4 py-3">description</th>
                                <th className="px-4 py-3">action</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y" >
                            <tr className="text-gray-700 ">
                                <td className='pl-4 py-3'>1.</td>
                                <td className="px-4 py-3">
                                    <p className="font-semibold">Jolina Angelie</p>
                                </td>
                                <td className="px-4 py-3 text-sm">-</td>
                                <td className="px-4 py-3 text-sm">-</td>
                                <td className="px-4 py-3 text-sm">-</td>
                                <td className="px-4 py-3 text-sm">-</td>
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
        </Adminpanel>
    )
}
