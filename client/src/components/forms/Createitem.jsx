  import React ,{ useState , useEffect} from 'react'
  import { CrossButton } from '../shared/CrossButton';
  import { CancelButton } from '../shared/CancelButton';
  import { CreateButton } from '../shared/CreateButton';
  import api from '../../utils/axios';


  export const CreateItem = ({isOpen , onClose,collectionId}) => {
    if(!isOpen) return null;
    const [error,setError]=useState(null);
    const [formData, setFormData] = useState({ 
      name: '', 
      description: '', 
      link: '', 
      file: null 
    });

      useEffect(() => {
        if (!isOpen) {
          setFormData({ cname: '', description: '' });
          setError(null);
        }
      }, [isOpen]);
      
    const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'file' ? files[0] : value,
    }));
  };

  const handleSubmit =async  (e) => {
    e.preventDefault();
    if (!formData.link && !formData.file) {
      setError('Please provide either a link or upload a file.');
      return;
    }
    try{
      const data=new FormData();
      data.append('name',formData.name);
      data.append('description',formData.description);
      data.append('link',formData.link);
      data.append('collection',formData.collectionId);
      if(formData.file){
        data.append('file',formData.file);
      }

      await api.post('/item/',data);
      console.log("item created");
      onClose();
    }catch(err){
       setError(err?.response?.data?.message || 'Something went wrong');
    }
    
  };



    return (
      <div className='fixed inset-0 z-50 flex items-center justify-center'>
        <div 
        className='absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm'
        onClick={onClose}
        aria-hidden="true"/>

        <div className="relative w-full max-w-md bg-light-background dark:bg-dark-background rounded-lg shadow-lg p-6"
        role="dialog"
        aria-label='Create Item Form'>
          <div className='flex justify-between items-center mb-4'>
            <h2 className="text-xl font-semibold text-light-text dark:text-dark-text">
              Create Item
            </h2>
            <CrossButton onClose={onClose}/> 
          </div>

  <form onSubmit={handleSubmit} className="space-y-4 border-t border-light-accent dark:border-dark-accent p-5">
    <div>
      <label htmlFor="name" className="block text-sm font-medium text-light-text dark:text-dark-text">
        Item Name
      </label>
      <input
        id="name"
        name="name"
        type="text"
        value={formData.name}
        onChange={handleChange}
        className="w-full bg-light-secondary dark:bg-dark-secondary text-light-text dark:text-white rounded-md px-3 py-1.5 placeholder-light-text/70 dark:placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent transition-colors duration-200"
        placeholder="Enter item name"
      />
    </div>

    <div>
      <label htmlFor="description" className="block text-sm font-medium text-light-text dark:text-dark-text">
        Description
      </label>
      <textarea
        id="description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        className="w-full bg-light-secondary dark:bg-dark-secondary text-light-text dark:text-white rounded-md px-3 py-1.5 placeholder-light-text/70 dark:placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent transition-colors duration-200"
        placeholder="Enter description"
        rows="3"
      />
    </div>

    <div>
      <label htmlFor="link" className="block text-sm font-medium text-light-text dark:text-dark-text">
        Link
      </label>
      <input
        id="link"
        name="link"
        type="url"
        value={formData.link}
        onChange={handleChange}
        className="w-full bg-light-secondary dark:bg-dark-secondary text-light-text dark:text-white rounded-md px-3 py-1.5 placeholder-light-text/70 dark:placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent transition-colors duration-200"
        placeholder="https://example.com"
      />
    </div>

    <div>
      <label htmlFor="file" className="block text-sm font-medium text-light-text dark:text-dark-text">
        Upload File
      </label>
      <input
        id="file"
        name="file"
        type="file"
        onChange={handleChange}
        className="w-full mt-1 text-light-text dark:text-dark-text file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-light-primary dark:file:bg-dark-primary file:text-white dark:file:text-white hover:file:text-light-primary hover:file:bg-light-secondary dark:hover:file:bg-dark-secondary dark:hover:file:text-dark-primary"
      />
    </div>

    <div className="flex justify-end gap-2">
      <CancelButton onClose={onClose} />
      <CreateButton type='submit' onClose={onClose} />
    </div>
    {error && <p className="text-light-text dark:text-white text-sm text-center mt-5">{error}</p>}
          </form>
        </div>
      </div>
    )
  }

