import React from 'react'
import {Card} from '../components/shared/Card'

export const Collection = () => {
 let items=[{cname:'abc'},{cname:'abc'},{cname:'abc'},{cname:'abc'},{cname:'abc'},{cname:'abc'},{cname:'abc'},{cname:'abc'},{cname:'abc'},{cname:'abc'}];
   return (
     <div className='p-5'>
       <div >
         <h1 className='h-1/4 font-bold mb-10'>My Items</h1>
         <div className='h-3/4  border-red-500 grid grid-cols-4 gap-2'>
             {
               items.map((item)=>{
                 return (
                   <Card name={item.cname} />
                 )
               })
             }
         </div>
       </div>
     </div>
   )
}
