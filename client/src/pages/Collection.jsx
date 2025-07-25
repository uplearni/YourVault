import React, {  useState ,useEffect} from 'react'
import { useNavigate , useParams } from 'react-router-dom';
import itemStore from '../store/itemStore';
import uiStore from '../store/uiStore';
import collectionStore from '../store/collectionStore';
import {ItemCard} from "../components/specific/ItemCard"
import { DeleteButton } from '../components/shared/DeleteButton';
import { UpdateButton } from '../components/shared/UpdateButton';
import { Placeholder } from '../components/shared/Placeholder';
import { CreateItem } from '../components/forms/CreateItem';
import { CreateCard } from '../components/forms/CreateCard';

export const Collection = () => {
  const { id: collectionId}= useParams();//get collection id from url
  const navigate=useNavigate();
  const { items, fetchItems, deleteItem,updateItem } = itemStore();
  const {collections,fetchCollections , deleteCollection}=collectionStore();
  const {searchQuery , setSearchQuery}=uiStore();

  const [cardOpen, setCardOpen] = useState(false);
  const [itemOpen,setItemOpen]=useState(false);
  const [mode, setMode] = useState("update");
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [selectedItem,setSelectedItem]=useState(null);

  const collection = collections.find(col => col._id === collectionId);

  const filteredItems = items.filter((item) =>
  (item?.title || '').toLowerCase().includes(searchQuery.toLowerCase().trim())
);


  useEffect(() => {
    
    if (collectionId) {
      setSearchQuery('');
      fetchCollections();
      fetchItems(collectionId);
    }
  }, [collectionId]);

  if (!collection) {
    return (
      <div className="flex items-center justify-center h-60">
        <svg
          className="size-6 animate-spin text-light-text dark:text-white mr-2"
          viewBox="0 0 24 24"
          fill="none"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          ></path>
        </svg>
        <span className="text-light-text dark:text-white text-sm">Loading collection...</span>
      </div>
    );
  }
   return (
    <section aria-labelledby='collection-heading' className="p-5">
      {/* collection description */}
      <div className='mb-6 flex flex-col'>
        <div className='flex justify-between items-center '>
        <div className='flex'>
            <button
            onClick={() => navigate('/')}
            className="p-2 rounded-full hover:bg-light-primary/10 dark:hover:bg-white/10 transition mr-1"
            aria-label="Go back"
          >
          <svg
            xmlns="http://www.w3.org/2000/svg"
          fill="none" 
        viewBox="0 0 24 24" 
            strokeWidth={1.5} 
            stroke="currentColor" 
          className="w-5 h-5  dark:text-white"
            >
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
        </button>
        <h1 id='collection-heading'
            className='text-2xl font-bold text-light-text dark:text-dark-text'>
            {collection?.cname || 'Loading...'}
        </h1>
        </div>
        <div className="flex space-x-2">
              <DeleteButton
               id={collectionId}
               onClick={async () => {
                await deleteCollection(collectionId);
                navigate('/');
              }
              }
              />
              <UpdateButton
               id={collectionId}
               onClick={() => {
                setSelectedCollection(collection);
                setMode("update");
                setCardOpen(true);
              }}
        />
        </div>
        </div>
        {collection.description && (
        <p className="text-sm sm:text-base text-light-text/90 dark:text-white/90 line-clamp-3 mb-4">
          {collection.description}
        </p>
      )}
      </div>
     {filteredItems.length === 0 ? (
        <Placeholder
          message="No items in this collection yet."
          buttonLabel="Create Item"
          onClick={() =>{
           setMode('create');
           setItemOpen(true)}
          }
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4" role="list">
          {filteredItems.map((item) => (
            <ItemCard
              key={item._id}
              id={item._id}
              name={item.title}
              description={item.description}
              link={item.url}
              file={item.file}
              onUpdate={() => {
                setSelectedItem(item);
                setMode("update");
                setItemOpen(true);
              }}
              onDelete={() => deleteItem(item._id)}
            />
        ))}
      </div>
    )}

      <CreateCard
        isOpen={cardOpen}
        onClose={() => {
          setCardOpen(false);
          setMode("update");
          setSelectedCollection(null);
        }}
        mode={mode}
        initialData={selectedCollection}
      />
         <CreateItem isOpen={itemOpen} onClose={() =>{
             setItemOpen(false);
             setMode("update");
             setSelectedItem(null);
          }}
          mode={mode} 
          collectionId={collectionId} 
          initialData={selectedItem || {
    title: '',
    description: '',
    type: 'url',
    url: '',
    file: null,
  }}
   />
    </section>
  );
};