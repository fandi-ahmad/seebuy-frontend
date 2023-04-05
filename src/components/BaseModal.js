import React from 'react'

// open loading modal
export const openModal = (id) => {
    const modalToggle = document.getElementById(id)
    modalToggle.checked = true
}

// close loading modal
export const closeModal = (id) => {
    const modalToggle = document.getElementById(id)
    modalToggle.checked = false
}

export const BaseModal = (props) => {
    return (
        <>
            <input type="checkbox" id={props.id} className="modal-toggle" />
            <div className="modal">
                <div className="modal-box w-11/12 max-w-5xl bg-white text-gray-700">
                    {props.children}
                </div>
            </div>
        </>
    )
}

export const ModalLoading = (props) => {
    return (
        <>
            <input type="checkbox" id={props.id} className="modal-toggle" />
            <label htmlFor={props.id} className="modal">
                <label className="modal-box relative bg-white text-gray-700 flex justify-center">
                    <div className='text-center'>
                        {props.children}
                        <div className='w-full flex justify-center'>
                            <div className='loader'></div>
                        </div>
                    </div>
                </label>
            </label>
        </>
    )
}

