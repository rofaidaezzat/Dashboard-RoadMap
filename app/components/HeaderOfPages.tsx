import React, { ReactNode } from 'react'
import { IconType } from 'react-icons';
import Spinner from './Ui/LoadingSpinner';
import { FaSearch } from 'react-icons/fa';

interface Iprops{
    TitleOfHeader:string,
    TitleOfFetch:string
    description:string;
    IconOfTitle: ReactNode;
    IconOfFetch: IconType;
    children:ReactNode;
    isLoadingFetchNumberOfFetchData:boolean
    numberIsFetched:number|undefined
    searchTerm:string
    setSearchTerm:(targetInSearch:string)=>void
    placeholder:string


}

const HeaderOfPages = ({IconOfFetch,IconOfTitle,
                        TitleOfHeader: Title,children,description,
                        isLoadingFetchNumberOfFetchData,numberIsFetched
                        ,searchTerm,setSearchTerm,TitleOfFetch,placeholder
                        }:Iprops) => {
    
    return (
        <div className="relative bg-white/70 backdrop-blur-md rounded-2xl shadow-xl p-6 mb-2 overflow-hidden">
        {/* Decorative blurred circle */}
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-purple-300 opacity-20 rounded-full blur-2xl z-0"></div>
        <div className="flex items-center gap-4 mb-2 relative z-10">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-indigo-500 flex items-center justify-center shadow">
            {/* Modern stages icon */}
            {IconOfTitle}
            </div>
            <div>
            <h1 className="text-4xl font-bold text-gray-900">{Title}</h1>
            <p className="text-gray-500 text-lg">{description}</p>
            </div>
        </div>
        {children}
        <hr className="my-2 border-purple-100 relative z-10" />
        {/* Total Stages Card */}
        <div className="flex items-center gap-4 p-4 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl shadow border border-gray-100 mb-2 relative z-10">
            <IconOfFetch className="text-3xl text-[#523a77]" />
            <div>
            <h3 className="text-gray-700 text-base font-semibold">{TitleOfFetch}</h3>
            <p className="text-2xl font-bold text-gray-800">
                {isLoadingFetchNumberOfFetchData ? <Spinner/> : <>{numberIsFetched}</>}
            </p>
            </div>
        </div>
        {/* Search Bar */}
        <div className="w-full h-[50px] my-5 relative z-10">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400">
            <FaSearch />
            </div>
            <input
            className="bg-gray-100 w-full h-full rounded-xl pl-12 border border-purple-200 shadow focus:ring-2 focus:ring-purple-300 focus:outline-none transition"
            placeholder={placeholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
        </div>
    )
}

export default HeaderOfPages