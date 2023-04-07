import React from 'react'
import { AuthLayout } from '../layouts/AuthLayout'
import { Link, useNavigate } from 'react-router-dom'
import { RegisterUser } from '../api/Auth'
import { useState, useEffect } from 'react'
import { AlertSuccess, AlertError } from '../components/SweetAlert'
import { ModalLoading, openModal, closeModal } from '../components/BaseModal'
import { ButtonMd } from '../components/BaseButton'

const Register = () => {
    const createAccountImg = require('../assets/img/create-account-office.jpeg')

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target;
    
        switch (name) {
            case 'name':
                setName(value);
                break;
            case 'email':
                setEmail(value);
                break;
            case 'password':
                setPassword(value);
                break;
            default:
                break;
        }
    }

    const cek = () => {
        console.log('name:', name)
        console.log('email:', email)
        console.log('password:', password)
    }

    const resetData = () => {
        setName('')
        setEmail('')
        setPassword('')
    }

    const createAccount = async () => {
        try {
            openModal('modal-loading')
            if (name === '' || email === '' || password === '') {
                AlertError('Input cannot be empty')
            } else if (password.length <= 8) {
                AlertError('Password must be at least 8 characters')
            } else {
                const response = await RegisterUser({
                    name: name,
                    email: email,
                    password: password
                })
                resetData()
                if (response.message === 'check your validation') {
                    AlertError('Your email already registered')
                } else {
                    AlertSuccess('Check your email for verification')
                }
            }
            closeModal('modal-loading')
        } catch (error) {
            AlertError('Ups, something wrong!')
        }
    }


    return (
        <AuthLayout>
            <div className="h-32 md:h-auto md:w-1/2">
                <img src={createAccountImg} className="object-cover w-full h-full" alt="Office" />
            </div>
            <div className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
                <div className="w-full">
                <h1 className="mb-4 text-xl font-semibold text-gray-700">Create account</h1>
                <label className="block text-sm">
                    <span className="text-gray-700">Name</span>
                    <input name='name' value={name} onChange={handleChange} autoComplete='off' type='text' placeholder="Your name" className="block w-full mt-1 text-sm text-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input" />
                </label>
                <label className="block mt-4 text-sm">
                    <span className="text-gray-700">Email</span>
                    <input name='email' value={email} onChange={handleChange} autoComplete='off' type='email'  placeholder="Your email" className="block w-full mt-1 text-sm text-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input" />
                </label>
                <label className="block mt-4 text-sm">
                    <span className="text-gray-700">Password</span>
                    <input name='password' value={password} onChange={handleChange} autoComplete='off' type="password" placeholder="***************" className="block w-full mt-1 text-sm text-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input" />
                </label>

                <ButtonMd onClick={createAccount}>createAccount</ButtonMd>

                <hr className="my-8" />

                <p className="mt-4">
                    <Link to={'/login'} className="text-sm font-medium text-purple-600 hover:underline" >
                        Already have an account? Login
                    </Link>
                </p>
                </div>
            </div>

            <ModalLoading id='modal-loading'/>
        </AuthLayout>
    )
}

export default Register