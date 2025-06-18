import React from 'react'
import { useParams } from 'react-router-dom';
import {ItemCard} from "../components/specific/ItemCard"
import { DeleteButton } from '../components/shared/DeleteButton';
import { UpdateButton } from '../components/shared/UpdateButton';

export const Collection = () => {
  const {id}= useParams();//get collection id from url
  
 const mockCollection = {
    id,
    name: `Collection ${id}`,
    description: "This is a sample description for the collection.",
  };

  // Mock items data (replace with API call)
  const mockItems = [
    {
      id: 1,
      name: "Item 1",
      description: "Description for Item 1",
      link: "https://example.com/item1",
      file: null,
    },
    {
      id: 2,
      name: "Item 2",
      description: "Description for Item 2",
      file: "sample-file.pdf",
      link: null,
    },
    {
      id: 3,
      name: "Item 3",
      description: "Description for Item 3",
      link: "https://example.com/item3",
      file: null,
    },
    {
      id: 4,
      name: "Item 4",
      description: "Description for Item 4",
      file: "another-file.jpg",
      link: null,
    },
  ];
   return (
    <section aria-labelledby='collection-heading' className="p-5">
      {/* collection description */}
      <div className='mb-6 flex flex-col'>
        <div className='flex justify-between items-center '>
        <h1 id='collection-heading'
            className='text-2xl font-bold text-light-text dark:text-dark-text'>
            {mockCollection.name}
        </h1>
        <div className="flex space-x-2">
              <DeleteButton
               id={id}
               onClick={() => console.log(`Delete collection ${id}`)}
              />
              <UpdateButton
               id={id}
               onClick={() => console.log(`Update collection ${id}`)}
        />
        </div>
        </div>
        {mockCollection.description && (
        <p className="text-sm sm:text-base text-light-text/90 dark:text-white/90 line-clamp-3 mb-4">
          {mockCollection.description}
        </p>
      )}
      </div>
     <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4'
      role='list'>
        {mockItems.map((item)=>(
          <ItemCard id={item.id} 
          name={item.name}
          description={item.description}
          link={item.link}
          file={item.file}
          onUpdate={() => console.log(`Update item ${item.id}`)}
          onDelete={() => console.log(`Delete item ${item.id}`)}
        />
        ))}
      </div>
    </section>
   )
}

