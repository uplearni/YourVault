import React ,{ useState , useEffect} from 'react'
import { CrossButton } from '../shared/CrossButton';
import { CancelButton } from '../shared/CancelButton';
import { CreateButton } from '../shared/CreateButton';
import collectionStore from '../../store/collectionStore';

const SpinnerIcon = () => (
    <svg
        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
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
            d="M4 12a8 8 0 018-8V8H4z"
        ></path>
    </svg>
);

export const CreateCard = ({isOpen , onClose , mode,initialData={cname:'',description:'',_id:null}}) => {
  
  const [error,setError]=useState(null);
   const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState(initialData || { cname: '', description: '', _id: null });

 useEffect(() => {
  if (isOpen) {
    setFormData(initialData || { cname: '', description: '', _id: null });
    setError(null);
    setIsSubmitting(false);
  }
}, [isOpen, initialData]);


  const handleChange=(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value});
  }

  const handleSubmit= async (e)=>{
      e.preventDefault();
      setIsSubmitting(true);
      setError(null);

      try{
        if(mode=='create'){
           await collectionStore.getState().createCollection(formData);
        }else{
           await collectionStore.getState().updateCollection(formData);
        }
      onClose();
      }catch(err){
        setError(err?.response?.data?.message || 'Something went wrong');
      }finally {
            
        setIsSubmitting(false);
      }
      
  }

 if(!isOpen) return null;

  return (
     <div className='fixed inset-0 z-50 flex items-center justify-center'>
      <div 
      className='absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm'
      onClick={isSubmitting ? undefined : onClose}
      aria-hidden="true"/>

      <div
        className="relative w-full max-w-md bg-light-background dark:bg-dark-background rounded-lg shadow-lg p-6"
        role="dialog"
         aria-label={`${mode === 'create' ? 'Create' : 'Update'} Collection form`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-light-text dark:text-dark-text">
            {mode === 'create' ? 'Create Collection' : 'Update Collection'}
          </h2>
          <CrossButton onClose={onClose} disabled={isSubmitting} />
        </div>

      <fieldset disabled={isSubmitting}>
        <form onSubmit={handleSubmit} className="space-y-4 border-t p-5 border-light-accent dark:border-dark-accent">
          <div>
            <label
              htmlFor="cname"
              className="block text-sm font-medium text-light-text dark:text-dark-text"
            >
              Collection Name
            </label>
            <input
              id="cname"
              name="cname"
              type="text"
              value={formData.cname}
              onChange={handleChange}
              required
              className="w-full bg-light-secondary dark:bg-dark-secondary text-light-text dark:text-white rounded-md px-3 py-1.5 placeholder-light-text/70 dark:placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent transition-colors duration-200"
              placeholder="Enter your collection name"
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-light-text dark:text-dark-text"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full bg-light-secondary dark:bg-dark-secondary text-light-text dark:text-white rounded-md px-3 py-1.5 placeholder-light-text/70 dark:placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent transition-colors duration-200"
              placeholder="Enter its description"
              rows="3"
            />
          </div>

          <div className="flex justify-end gap-2">
            <CancelButton onClose={onClose}/>
            <CreateButton
                                type="submit"
                                disabled={isSubmitting}
                                label={
                                    isSubmitting ? (
                                        <div className="flex items-center">
                                            <SpinnerIcon />
                                            {mode === 'create' ? 'Creating...' : 'Updating...'}
                                        </div>
                                    ) : (
                                        mode === 'create' ? 'Create' : 'Update'
                                    )
                                }
                            /></div>
          {error && <p className="text-light-text dark:text-white text-sm text-center mt-5">{error}</p>}
        </form>
         </fieldset>
      </div>
    </div>
  );
};
