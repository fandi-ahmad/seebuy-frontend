import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHouse, faUser, faBurger, faList } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom'

export const Sidebar = () => {
    return (
        <>
            <aside className="z-20 hidden w-64 overflow-y-auto bg-white md:block flex-shrink-0" >
                <div className="py-4 text-gray-500 ">
                    <a className="ml-6 text-lg font-bold text-gray-800" href="#" >
                        SEEBUY
                    </a>
                    <ul className="mt-6">
                        <li className="relative px-6 py-3">
                            <span className="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg" aria-hidden="true" ></span>
                            <Link to={'/'} className="inline-flex items-center w-full text-sm font-semibold text-gray-800 transition-colors duration-150 hover:text-gray-800">
                                <FontAwesomeIcon icon={faHouse} />
                                <span className="ml-4">Dashboard</span>
                            </Link>
                        </li>
                    </ul>
                    <ul>
                        <li className="relative px-6 py-3">
                            <Link to={'/data-admin'} className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800">
                                <FontAwesomeIcon icon={faUser} />
                                <span className="ml-4">Data Admin</span>
                            </Link>
                        </li>

                        <li className="relative px-6 py-3">
                            <Link to={'/menu-bazar'} className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800">
                                <FontAwesomeIcon icon={faBurger} />
                                <span className="ml-4">Menu Bazar</span>
                            </Link>
                        </li>

                        <li className="relative px-6 py-3">
                            <Link to={'/data-pesanan'} className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800">
                                <FontAwesomeIcon icon={faList} />
                                <span className="ml-4">Data Pesanan</span>
                            </Link>
                        </li>
                        
                    </ul>
                    <div className="px-6 my-6">
                        <button className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple">
                            Create account
                            <span className="ml-2">+</span>
                        </button>
                    </div>
                </div>
            </aside>
        </>
    )
}