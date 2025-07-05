  import React ,{useState,useEffect}from 'react'
  import {useNavigate} from 'react-router-dom';
  import collectionStore from '../store/collectionStore';
  import uiStore from '../store/uiStore';
  import {Card} from '../components/specific/Card'
  import { CreateCard } from '../components/forms/CreateCard';
  import { Placeholder } from '../components/shared/Placeholder';

  export const Dashboard = () => {
    const [cardOpen,setCardOpen]=useState(false);
    const [mode,setMode]=useState("create");
    const [selectedCollection, setSelectedCollection] = useState(null);
    const {collections , fetchCollections,deleteCollection,toggleFavorite}=collectionStore();
    const {searchQuery , setSearchQuery,filterMode,setFilterMode}=uiStore();
    const navigate=useNavigate();

    const filteredCollections = collections.filter(col =>
       col.cname.toLowerCase().trim().includes(searchQuery.toLowerCase().trim())
    ).filter((col)=>(filterMode==='favorites' ? col.isFavorite : true));

    useEffect(()=>{
      setSearchQuery('');
      fetchCollections();
    },[]);

    return (
    <section className="p-5" aria-labelledby="collections-heading">
      <h1
  id="collections-heading"
  className="text-2xl font-bold mt-5 mb-6 text-light-text dark:text-white flex items-center gap-2"
>
  Collections
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-8 h-8"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z"
    />
  </svg>
</h1>

        
          {Array.isArray(collections) && collections.length===0 ? (
            <Placeholder
            message="No collections yet"
            buttonLabel="Create Collection"
            onClick={()=>{
              setCardOpen(true);
              setMode("create")
            }}/>
          ) : (
          <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4"
          role="list"
          >
            
            {filteredCollections.map((collection) => (
            <Card
              key={collection._id}
              id={collection._id}
              name={collection.cname}
              description={collection.description}
              isFavorite={collection.isFavorite}
              onDelete={() => deleteCollection(collection._id)}
              onUpdate={() => {
                setSelectedCollection({
                _id: collection._id,
               cname: collection.cname,
              description: collection.description
                });
                setMode("update");
                setCardOpen(true);
              }}
              onClick={() => navigate(`/collection/${collection._id}`)}
              onToggleFavorite={()=>toggleFavorite(collection._id)}
            />
          ))}
        </div>
          )}
        <CreateCard
          isOpen={cardOpen}
          onClose={() => {
          setCardOpen(false);
          setMode("create");
          setSelectedCollection(null);
          }}
           mode={mode}
           initialData={selectedCollection}
         />

      </section>
    );
  };
