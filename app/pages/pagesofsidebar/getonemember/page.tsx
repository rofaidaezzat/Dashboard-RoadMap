'use client'

import DetailsOfMemberComponent from '@/app/components/CardDetailsOfMember/CardDetailsOfMember'
import { RootState } from '@/app/redux/store';
import React from 'react'
import { useSelector } from 'react-redux';

const PageOneMember = () => {
    
    const { ClickedId} = useSelector((state: RootState) => state.clickedId);


    return (
    <div className='mt-20 flex items-center justify-center w-full'>
        <DetailsOfMemberComponent IdUser={ClickedId} />
    </div>
    )
}

export default PageOneMember