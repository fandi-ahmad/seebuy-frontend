import { React, useState, useEffect } from 'react'
import { Pagination } from '../components/Pagination'
import { Adminpanel } from '../layouts/Adminpanel'
import { GetBazar, CreateBazar, UpdateBazar, DeleteBazar, ApiBazar } from '../api/MenuBazar'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPenToSquare, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import { AlertSuccess, AlertConfirm, AlertError } from '../components/SweetAlert'
import { BaseModal, ModalLoading, openModal, closeModal } from '../components/BaseModal'
import { InputText, InputNumber, InputFile, InputTextArea, BaseInput, InputIcon } from '../components/BaseInput'
import { ButtonSm } from '../components/BaseButton'

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

    const formatNumber = (number) => {
        return Number(number).toLocaleString();
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
    
        switch (name) {
            case 'name':
                setName(value);
                break;
            case 'price':
                const newValue = value.replace(/[^0-9]/g, '');
                setPrice(formatNumber(newValue));
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
            if (name === '' || price === '' || image === '' || desc === '') {
                AlertError('Input cannot be empty')
            } else {
                closeUpsert()
                openModal('modal-loading')
                const parsePrice = parseInt(price.replaceAll(',', '')); 
                
                // create
                if (id === '') {
                    const result = await CreateBazar({
                        nama_menu: name,
                        harga: parsePrice,
                        gambar: image,
                        description: desc
                    })
                } else {
                    // update
                    // setImage(null)
                    const result = await UpdateBazar(id, {
                        nama_menu: name,
                        harga: parsePrice,
                        // gambar: image,
                        description: desc
                    })
                }
    
                closeModal('modal-loading')
                getAllData()
                AlertSuccess(`Bazar has been ${actionText}`)
                resetData()
            }
        } catch (error) {
            closeModal('modal-loading')
            AlertError('Ups! something wrong')
        }
    };


    const createNew = () => {
        resetData()
        setActionText('created')
        openModal('upsert')
    }

    const editBazar = (bazar) => {
        setId(bazar.id)
        setName(bazar.nama_menu)
        setPrice(formatNumber(bazar.harga));
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
        fetchData()
    }, []);

    return (
        <Adminpanel>
            <div className='mb-4 flex justify-between items-center'>
                <h2 className="text-2xl font-semibold text-gray-700">Menu Bazar</h2>
                <ButtonSm onClick={createNew} >
                    <span className='mr-2'>create</span>
                    <FontAwesomeIcon icon={faPlus} />
                </ButtonSm>
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
                                        <td className="px-4 py-3 text-sm">Rp. {formatNumber(bazar.harga)}</td>
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
            <BaseModal id='upsert' title={actionText + ' bazar menu'}>
                <div className='grid gap-4 md:grid-cols-2'>
                    <BaseInput name='name' value={name} onChange={handleChange} />
                    <InputIcon icon='Rp.' name='price' value={price} onChange={handleChange} />
                    <div>
                        <InputFile name='image' onChange={handleChangeImage} id='imageForm' accept='image/*' />
                        {imageUrl && <img src={imageUrl} alt="preview" className='h-40 rounded-md mt-4' />}
                    </div>
                    <InputTextArea title='decription' name='desc' value={desc} onChange={handleChange} />
                </div>
                {/* <button onClick={cek} className='btn btn-sm'>cek</button> */}
                <div className="modal-action pt-4">
                    <label onClick={closeUpsert} className="btn btn-error capitalize mr-2">close</label>
                    <label onClick={upsertBazar} className="btn btn-info capitalize">{actionText}</label>
                </div>
            </BaseModal>

            {/* ===== loading ===== */}
            <ModalLoading id='modal-loading' title={actionText+' bazar'} />

        </Adminpanel>
    )
}

export default MenuBazar;