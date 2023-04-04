import { React, useState, useEffect } from 'react'
import { Pagination } from '../components/Pagination'
import { Adminpanel } from '../layouts/Adminpanel'
import { GetBazar, CreateBazar, UpdateBazar, DeleteBazar, ApiBazar } from '../api/MenuBazar'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPenToSquare, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import { AlertSuccess, AlertConfirm, AlertError } from '../components/SweetAlert'

const MenuBazar = () => {
    const [bazarList, setBazarList] = useState([])
    const [actionText, setActionText] = useState('')

    const [id, setId] = useState('')
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [desc, setDesc] = useState('')
    const [image, setImage] = useState('')
    const [imageUrl, setImageUrl] = useState('');

    const [editOpen, setEditOpen] = useState(false)

    const [post, setPost] = useState({
        name: '',
        price: NaN,
        image: null,
        desc: ''
    })

    // get all data bazar from API
    const getAllData = async () => {
        try {
            const result = await GetBazar();
            setBazarList(result.data);
        } catch (err) {
            AlertError('Ups! something wrong')
        }
    };

    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     const setters = {
    //         name: setName,
    //         price: setPrice,
    //         image: setImage,
    //         desc: setDesc,
    //     };
    //     const setter = setters[name];
    //     setter(value);
    //     setPost({...post, [e.target.name]: e.target.value})
    // };

    const handleChange = (event) => {
        const { name, value } = event.target;
    
        switch (name) {
            case 'name':
                setName(value);
                break;
            case 'price':
                setPrice(value);
                break;
            case 'desc':
                setDesc(value);
                break;
            default:
                break;
        }
    };
    
    const handleChangeImage = (e) => {
        const imageSelect = e.target.files[0]
        setImage(imageSelect);
        setImageUrl(URL.createObjectURL(imageSelect));
        console.log('image select:', imageSelect)
        console.log('image:',image)
    };
    

    const cek = (e) => {
        console.log('id:', id)
        console.log('name:', name)
        console.log('price:', price)
        console.log('desc:', desc)
        console.log('image:', image)
        console.log('imageUrl:', imageUrl)
        console.log(document.getElementById('imageForm').value)
    }

    const resetData = () => {
        setId('')
        setName('')
        setPrice('')
        setImage('')
        setImageUrl('')
        setDesc('')
        setEditOpen(false)
    }



    const upsertBazar = async () => {
        try {
            closeUpsert()
            openLoading()
            const parsePrice = parseInt(price)

            // create
            if (id === '') {
                const result = await CreateBazar({
                    nama_menu: name,
                    harga: parsePrice,
                    gambar: image,
                    description: desc
                })
                console.log('result data: ',result);
            } else {
                // update
                // setImage(null)
                const result = await UpdateBazar(id, {
                    nama_menu: name,
                    harga: parsePrice,
                    // gambar: image,
                    description: desc
                })
                console.log('result data: ',result);
            }

            closeLoading()
            getAllData()
            AlertSuccess(`Bazar has been ${actionText}`)
            resetData()
        } catch (error) {
            closeLoading()
            AlertError('Ups! something wrong')
            console.log(error)
        }
        closeUpsert()
    };


    const createNew = () => {
        resetData()
        setActionText('created')
        openUpsert()
    }

    const editBazar = (bazar) => {
        setId(bazar.id)
        setName(bazar.nama_menu)
        setPrice(bazar.harga)
        setImage(bazar.gambar)
        setDesc(bazar.description)
        setActionText('updated')
        
        setEditOpen(true)

        openUpsert()
    }

    useEffect(() => {
        console.log(editOpen)
        if (editOpen) {
            if (id === '') {
                console.log('id masih kosong')
            } else {
                console.log('id tidak kosong')
                const takeImage = `http://localhost:8000/api/cms/gambar/${image}`

                setImageUrl(takeImage)
            }
        }
    }, [editOpen])

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

     // open create/update modal
     const openUpsert = () => {
        const modalToggle = document.querySelector('#upsert')
        modalToggle.checked = true
    }
    
    // close create/update modal
    const closeUpsert = () => {
        const modalToggle = document.querySelector('#upsert')
        modalToggle.checked = false
        resetData()
    }

    // click delete button from table
    const deleteBazar = (bazarId) => {
        AlertConfirm({
            title: 'Delete?',
            confirmText: 'Yes, Delete It',
            preConfirm: () => {
                confirmDeleteBazar(bazarId)
            }
        })
    }

    // delete bazar if confirm in modal
    const confirmDeleteBazar = async (id) => {
        try {
            setActionText('Deleted')
            openLoading()
            await DeleteBazar(id)

            closeLoading()
            getAllData()
            AlertSuccess('Bazar has been deleted')
        } catch (error) {
            closeLoading()
            AlertError('Ups! something wrong')
        }
    }

    function formatPrice(harga) {
        return `Rp. ${harga.toLocaleString("id-ID")}`;
    }

    const limitDesc = (params) => {
        if (params.length > 30) {
            return params.slice(0, 30) + " ...";
        } else {
            return params;
        }
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
                <label onClick={createNew} className='btn btn-sm bg-blue-600 hover:bg-blue-700 text-white border-none focus:outline-none capitalize'>
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
                                        <td className="px-4 py-3 text-sm">{formatPrice(bazar.harga)}</td>
                                        <td className="px-4 py-3 text-sm">
                                            <img alt={bazar.gambar} src={`${ApiBazar}/gambar/${bazar.gambar}`} className='h-20' />
                                        </td>
                                        <td className="px-4 py-3 text-sm">{limitDesc(bazar.description)}</td>
                                        <td className="px-4 py-3">
                                            <button onClick={() => editBazar(bazar)} htmlFor="upsert" className='btn btn-sm p-0 text-2xl border-0 bg-transparent hover:bg-transparent text-blue-700 hover:text-blue-800 focus:outline-none mr-4'>
                                                <FontAwesomeIcon icon={faPenToSquare} />
                                            </button>
                                            <button onClick={() => deleteBazar(bazar.id)} className='btn btn-sm p-0 text-2xl border-0 bg-transparent hover:bg-transparent text-red-700 hover:text-red-800 focus:outline-none'>
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
                    {/* <span className="flex items-center col-span-3">
                        Showing 21-30 of 100
                    </span>
                    <span className="col-span-2"></span> */}
                    {/* <Pagination/> */}
                </div>
            </main>

            {/* ===== upsert modal ===== */}
            <input type="checkbox" id="upsert" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box w-11/12 max-w-5xl bg-white text-gray-700">
                    <h3 className="font-bold text-2xl capitalize mb-4">{actionText} bazar menu</h3>
                    <div className='grid gap-4 md:grid-cols-2'>
                        <div>
                            <p>name</p>
                            <input type="text" value={name} onChange={handleChange} name='name' placeholder="Type here" className="input input-info focus:outline-none min-w-full max-w-xs bg-gray-50" />
                        </div>
                        <div>
                            <p>price</p>
                            <input type="number" value={price} onChange={handleChange} name='price' placeholder="Type here" className="input input-info focus:outline-none min-w-full max-w-xs bg-gray-50" />
                        </div>
                        <div>
                            <p>image</p>
                            <input type="file" onChange={handleChangeImage} name='image' id='imageForm' accept='image/*' placeholder="Type here" className="input input-info focus:outline-none min-w-full max-w-xs bg-gray-50" />
                            {imageUrl && <img src={imageUrl} alt="preview" className='h-40 rounded-md mt-4' />}
                        </div>
                        <div>
                            <p>description</p>
                            <textarea value={desc} onChange={handleChange} name='desc' placeholder="Type here" className='textarea textarea-info focus:outline-none min-w-full min-h-full max-w-xs bg-gray-50'></textarea>
                        </div>
                    </div>
                    {/* <button onClick={cek} className='btn btn-sm'>cek</button> */}
                    <div className="modal-action pt-4">
                        <label onClick={closeUpsert} className="btn btn-error capitalize mr-2">close</label>
                        <label onClick={upsertBazar} className="btn btn-info capitalize">{actionText}</label>
                    </div>
                </div>
            </div>

            {/* ===== loading ===== */}
            <input type="checkbox" id="modal-loading" className="modal-toggle" />
            <label htmlFor="modal-loading" className="modal">
                <label className="modal-box relative bg-white text-gray-700 flex justify-center">
                    <div className='text-center'>
                        <h1 className='text-3xl capitalize font-semibold w-full text-center mb-2'>please wait</h1>
                        <p className='w-full text-center mb-8 capitalize'>{actionText} bazar</p>
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