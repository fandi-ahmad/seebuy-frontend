import { React, useState, useEffect } from 'react'
import { Pagination } from '../components/Pagination'
import { Adminpanel } from '../layouts/Adminpanel'
import { GetBazar, CreateBazar, UpdateBazar, DeleteBazar } from '../api/MenuBazar'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPenToSquare, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'

const MenuBazar = () => {
    const [bazarList, setBazarList] = useState([])

    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [image, setImage] = useState('')
    const [desc, setDesc] = useState('')

    // get all data bazar from API
    const getAllData = async () => {
        try {
            const result = await GetBazar();
            setBazarList(result.data);
        } catch (err) {
            console.log(err);
        }
    };

    const handleChange = (params) => {
        const { name, value } = params.target;
        const setters = {
            name: setName,
            price: setPrice,
            image: setImage,
            desc: setDesc,
        };
        const setter = setters[name];
        setter(value);
    };
      
    const resetData = () => {
        setName('')
        setPrice('')
        setImage('')
        setDesc('')
    }

    const createBazar = async () => {
        try {
            openLoading()
            const parsePrice = parseInt(price)
            await CreateBazar({
                nama_menu: name,
                harga: parsePrice,
                gambar: image,
                description: desc
            })

            closeLoading()
            resetData()
            getAllData()
        } catch (error) {
            console.log(error)
        }
    }

    // open loading modal
    const openLoading = () => {
        const modalToggle = document.querySelector('#modal-loading')
        modalToggle.checked = true
    }
    
    // close loading modal
    const closeLoading = () => {
        const modalToggle = document.querySelector('#modal-loading')
        modalToggle.checked = false
    }
    
    // run in first load
    useEffect(() => {
        const fetchData = async () => {
            await getAllData();
        };
        if (bazarList.length === 0) {
            setTimeout(() => {
                fetchData();
            }, 100);
        }
    });

    return (
        <Adminpanel>
            <div className='mb-4 flex justify-between items-center'>
                <h2 className="text-2xl font-semibold text-gray-700">Menu Bazar</h2>
                <label htmlFor="my-modal-5" className='btn btn-sm bg-blue-600 hover:bg-blue-700 text-white border-none focus:outline-none capitalize'>
                    <span className='mr-2'>create</span>
                    <FontAwesomeIcon icon={faPlus} />
                </label>
            </div>

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
                            {bazarList.map((bazar, index) => {
                                return (
                                    <tr key={bazar.id} className='text-gray-700'>
                                         <td className='pl-4 py-3'>{index + 1}</td>
                                        <td className="px-4 py-3">
                                            <p className="font-semibold">{bazar.nama_menu}</p>
                                        </td>
                                        <td className="px-4 py-3 text-sm">{bazar.harga}</td>
                                        <td className="px-4 py-3 text-sm">{bazar.gambar}</td>
                                        <td className="px-4 py-3 text-sm">{bazar.description}</td>
                                        <td className="px-4 py-3 text-xl">
                                            <button className='text-blue-700 hover:text-blue-800 focus:outline-none mr-4'>
                                                <FontAwesomeIcon icon={faPenToSquare} />
                                            </button>
                                            <button className='text-red-700 hover:text-red-800 focus:outline-none'>
                                                <FontAwesomeIcon icon={faTrash} />
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                <div className="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t bg-gray-50 sm:grid-cols-9">
                    <span className="flex items-center col-span-3">
                        Showing 21-30 of 100
                    </span>
                    <span className="col-span-2"></span>
                    <Pagination/>
                </div>
            </main>

            {/* ===== create modal ===== */}
            <input type="checkbox" id="my-modal-5" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box w-11/12 max-w-5xl bg-white text-gray-700">
                    <h3 className="font-bold text-lg capitalize mb-4">create new bazar menu</h3>
                    <div className='grid gap-4 md:grid-cols-2 xl:grid-cols-4'>
                        <div>
                            <p>name</p>
                            <input type="text" value={name} onChange={handleChange} name='name' placeholder="Type here" className="input input-info focus:outline-none min-w-full max-w-xs bg-gray-50" />
                        </div>
                        <div>
                            <p>price</p>
                            <input type="text" value={price} onChange={handleChange} name='price' placeholder="Type here" className="input input-info focus:outline-none min-w-full max-w-xs bg-gray-50" />
                        </div>
                        <div>
                            <p>image</p>
                            <input type="text" value={image} onChange={handleChange} name='image' placeholder="Type here" className="input input-info focus:outline-none min-w-full max-w-xs bg-gray-50" />
                        </div>
                    </div>
                    <div className='mt-4'>
                        <p>description</p>
                        <textarea value={desc} onChange={handleChange} name='desc' placeholder="Type here" className='textarea textarea-info focus:outline-none min-w-full max-w-xs bg-gray-50'></textarea>
                    </div>
                    <button className='btn' onClick={cek}>test</button>
                    <div className="modal-action">
                        <label htmlFor="my-modal-5" className="btn btn-error capitalize mr-2">close</label>
                        <label onClick={createBazar} htmlFor="my-modal-5" className="btn btn-info capitalize">create</label>
                    </div>
                </div>
            </div>

            {/* ===== loading ===== */}
            <input type="checkbox" id="modal-loading" className="modal-toggle" />
            <label htmlFor="modal-loading" className="modal">
                <label className="modal-box relative bg-white text-gray-700 flex justify-center">
                    <div className='text-center'>
                        <h1 className='text-3xl capitalize font-semibold w-full text-center'>please wait</h1>
                        <p className='w-full text-center mb-8'>Created bazar</p>
                        <div className='w-full flex justify-center'>
                            <div className='loader'></div>
                        </div>
                    </div>
                </label>
            </label>
        </Adminpanel>
    )
}

export default MenuBazar;