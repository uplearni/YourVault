import React from 'react'
import { useParams } from 'react-router-dom';
import {ItemCard} from "../components/specific/ItemCard"

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
      <div className='mb-6'>
        <h1 id='collection-heading'
            className='text-2xl font-bold mt-5 mb-6"'>
            {mockCollection.name}
        </h1>
        <p className='mt-2'>{mockCollection.description}</p>
      </div>
     <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4'
      role='list'>
        {mockItems.map((item)=>(
          <ItemCard key={item.id} 
          name={item.name}
          description={item.description}
          link={item.link}
          file={item.file}
        />
        ))}
      </div>
    </section>
   )
}

