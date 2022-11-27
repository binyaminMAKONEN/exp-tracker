import React from 'react'
import {default as api} from '../store/apiSlice'
import { getLabels } from '../helper/helper'

const Labels = () => {
    const myStorage = window.localStorage;
    const { data, isFetching , isSuccess, isError } = api.useGetLabelsQuery()
    // console.log(data,isSuccess);
    
 let Transactions;
 if(isFetching){
     Transactions = <div>Fetching</div>;
    }else if(isSuccess){
        console.log(myStorage.getItem('user'));
        const userData = data?.filter(val=>val.username == myStorage.getItem('user'))
        console.log(userData);
        // console.log(data);
        Transactions = getLabels(userData,'type').map((value,i)=><LabelComponent key={i} data={value}/> )
        
    }else if(isError){
        Transactions = <div>Error</div>
    }


  return (
    <>
    {Transactions}
    </>
  )
}

export default Labels

function LabelComponent({data}){
    if(!data) return <></>;
    return (
        <div className="labels flex justify-between">
            <div className="flex gap-2">
                <div className='w-2 h-2 rounded py-3' style={{background: data?.color ?? '#f9c74f'}}></div>
                <h3 className='text-md'>{data?.type ?? ''}</h3>
            </div>
            <h3 className='font-bold'>{Math.round(data?.percent) ?? 0}%</h3>
        </div>
    )
}