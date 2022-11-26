
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl ='http://localhost:8080'
export const  apiSlice = createApi({
    baseQuery:fetchBaseQuery({baseUrl:baseUrl}),
    endpoints:(builder)=>({
        getCategories:builder.query({query:()=>'/api/categories',providesTags:['categories']}),
        getLabels:builder.query({query:()=>'/api/labels',providesTags:['transaction']}),
        addTransaction:builder.mutation({query:(initialTransaction)=>({
            url:'/api/transaction',
            method:'POST',
            body:initialTransaction
        }),
        invalidatesTags:['transaction']
    }),
        deleteTransaction:builder.mutation({query:(recordId)=>({
            url:'/api/transaction',
            method:'DELETE',
            body:recordId
        }),
        invalidatesTags:['transaction']   
    }),
    //     addUser:builder.mutation({query:(newUser)=>({
    //         url:'/api/register',
    //         method:'POST',
    //         body:newUser
    //     }),
    //     invalidatesTags:['register']   
    // })

    })

})

export default  apiSlice 