import React ,{ useState , useEffect} from 'react'
import { CrossButton } from '../shared/CrossButton';
import { CancelButton } from '../shared/CancelButton';
import { CreateButton } from '../shared/CreateButton';
import collectionStore from '../../store/collectionStore';
import api from '../../utils/axios';

export const CreateCard = ({isOpen , onClose}) => {
  const [error,setError]=useState(null);
  const [formData,setFormData]=useState({cname:'',description:''});

  useEffect(() => {
    if (!isOpen) {
      setFormData({ cname: '', description: '' });
      setError(null);
    }
  }, [isOpen]);

  const handleChange=(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value});
  }

  const handleSubmit= async (e)=>{
      e.preventDefault();

      try{
          collectionStore.getState().createCollection({
          cname: formData.cname,
          description: formData.description,
      });

      onClose();
      }catch(err){
        setError(err?.response?.data?.message || 'Something went wrong');
      }
      
  }

 if(!isOpen) return null;

  return (
     <div className='fixed inset-0 z-50 flex items-center justify-center'>
      <div 
      className='absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm'
      onClick={onClose}
      aria-hidden="true"/>

      <div
        className="relative w-full max-w-md bg-light-background dark:bg-dark-background rounded-lg shadow-lg p-6"
        role="dialog"
        aria-label="Create Collection form"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-light-text dark:text-dark-text">
            Create Collection
          </h2>
          <CrossButton onClose={onClose}/>
        </div>

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
            <CreateButton type='submit'/>
          </div>
          {error && <p className="text-light-text dark:text-white text-sm text-center mt-5">{error}</p>}
        </form>
      </div>
    </div>
  );
};
