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
    const {searchQuery , setSearchQuery}=uiStore();
    const navigate=useNavigate();

    const filteredCollections = collections.filter(col =>
       col.cname.toLowerCase().trim().includes(searchQuery.toLowerCase().trim())
    );

    useEffect(()=>{
      setSearchQuery('');
      fetchCollections();
    },[]);

    return (
    <section className="p-5" aria-labelledby="collections-heading">
        <h1
          id="collections-heading"
          className="text-2xl font-bold mt-5 mb-6 text-light-text dark:text-white"
        >
          My Collections
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
