import React from 'react'
import { AuthLayout } from '../layouts/AuthLayout'
import { Link } from 'react-router-dom'

const Login = () => {
    const loginOffice = require('../assets/img/login-office.jpeg')

    return (
        <AuthLayout>
            <div className="h-32 md:h-auto md:w-1/2">
                <img className="object-cover w-full h-full" src={loginOffice} alt="Office" />
            </div>
            <div className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
                <div className="w-full">
                <h1 className="mb-4 text-xl font-semibold text-gray-700">
                    Login
                </h1>
                <label className="block text-sm">
                    <span className="text-gray-700">Email</span>
                    <input type='email' placeholder="Your email" className="block w-full mt-1 text-sm text-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input" />
                </label>
                <label className="block mt-4 text-sm">
                    <span className="text-gray-700">Password</span>
                    <input type="password" placeholder="***************" className="block w-full mt-1 text-sm text-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input" />
                </label>

                {/* <!-- You should use a button here, as the anchor is only used for the example  --> */}
                <a href="../index.html" className="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple" >
                    Log in
                </a>

                <hr className="my-8" />

                <p className="mt-4">
                    <a href="./forgot-password.html" className="text-sm font-medium text-purple-600 hover:underline" >
                        Forgot your password?
                    </a>
                </p>
                <p className="mt-1">
                    <Link to={'/register'} className="text-sm font-medium text-purple-600 hover:underline" >
                        Create account
                    </Link>
                </p>
                </div>
            </div>
        </AuthLayout>
    )
}

export default Login