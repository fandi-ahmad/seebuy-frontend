import { React, useState, useEffect } from 'react'
import { Pagination } from '../components/Pagination'
import { Adminpanel } from '../layouts/Adminpanel'
import { GetBazar, CreateBazar, UpdateBazar, DeleteBazar, ApiBazar } from '../api/MenuBazar'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPenToSquare, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import { AlertSuccess, AlertConfirm, AlertError } from '../components/SweetAlert'
import { BaseModal, ModalLoading, openModal, closeModal } from '../components/BaseModal'

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


    // get all data bazar from API
    const getAllData = async () => {
        try {
            const result = await GetBazar();
            setBazarList(result.data);
        } catch (err) {
            AlertError('Ups! something wrong')
        }
    };


    const handleChange = (e) => {
        const { name, value } = e.target;
    
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
        document.getElementById('imageForm').value = ''
        setDesc('')
        setEditOpen(false)
    }


    const upsertBazar = async () => {
        try {
            closeUpsert()
            openModal('modal-loading')
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

            closeModal('modal-loading')
            getAllData()
            AlertSuccess(`Bazar has been ${actionText}`)
            resetData()
        } catch (error) {
            closeModal('modal-loading')
            AlertError('Ups! something wrong')
            console.log(error)
        }
        closeUpsert()
    };


    const createNew = () => {
        resetData()
        setActionText('created')
        openModal('upsert')
    }

    const editBazar = (bazar) => {
        setId(bazar.id)
        setName(bazar.nama_menu)
        setPrice(bazar.harga)
        setImage(bazar.gambar)
        setDesc(bazar.description)
        setActionText('updated')
        setEditOpen(true)
        openModal('upsert')
    }

    useEffect(() => {
        if (editOpen && id !== '') {
            const takeImage = `${ApiBazar}/gambar/${image}`
            setImageUrl(takeImage)
        }
    }, [editOpen])

    // close create/update modal
    const closeUpsert = () => {
        closeModal('upsert')
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
            openModal('modal-loading')
            await DeleteBazar(id)

            closeModal('modal-loading')
            getAllData()
            AlertSuccess('Bazar has been deleted')
        } catch (error) {
            closeModal('modal-loading')
            AlertError('Ups! something wrong')
        }
    }

    function formatPrice(harga) {
        return `Rp. ${harga.toLocaleString("id-ID")}`;
    }

    const limitChar = (params, value) => {
        if (params.length > value) {
            return params.slice(0, value) + " ...";
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
                                            <p className="font-semibold">{limitChar(bazar.nama_menu, 20)}</p>
                                        </td>
                                        <td className="px-4 py-3 text-sm">{formatPrice(bazar.harga)}</td>
                                        <td className="px-4 py-3 text-sm">
                                            <img alt={bazar.gambar} src={`${ApiBazar}/gambar/${bazar.gambar}`} className='h-20 rounded-md' />
                                        </td>
                                        <td className="px-4 py-3 text-sm">{limitChar(bazar.description, 40)}</td>
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
            <BaseModal id='upsert'>
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
            </BaseModal>

            {/* ===== loading ===== */}
            <ModalLoading id='modal-loading'>
                <h1 className='text-3xl capitalize font-semibold w-full text-center mb-2'>please wait</h1>
                <p className='w-full text-center mb-8 capitalize'>{actionText} bazar</p>
            </ModalLoading>

        </Adminpanel>
    )
}

export default MenuBazar;