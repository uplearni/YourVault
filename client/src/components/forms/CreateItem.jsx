  import React ,{ useState , useEffect} from 'react'
  import { CrossButton } from '../shared/CrossButton';
  import { CancelButton } from '../shared/CancelButton';
  import { CreateButton } from '../shared/CreateButton';
  import itemStore from "../../store/itemStore"

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

  export const CreateItem = ({isOpen , onClose,mode='create' ,collectionId,initialData={}}) => {
    if(!isOpen) return null;

    const [error,setError]=useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({ 
      title: '', 
      description: '', 
      type:'',//set by default
      url: '', 
      file: null,
      collectionId:'',
      ...initialData,
    });

   useEffect(() => {
    if (isOpen) {
      setFormData({
        title: '',
        description: '',
        type: 'url',
        url: '',
        file: null,
        collectionId: collectionId || '',
        ...initialData,
      });
      setError(null);
      setIsSubmitting(false);
    }
  }, [isOpen, initialData,collectionId]);

      
    const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'file' ? files[0] : value,
    }));
  };

  //console.log(formData)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
        setError(null);
    try {
      if (mode === 'create') {
        await itemStore.getState().createItem(formData);
      } else {
        await itemStore.getState().updateItem(formData);
      }
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
            // Set loading state to false once the process is complete
            setIsSubmitting(false);
        }
  };


    return (
      <div className='fixed inset-0 z-50 flex items-center justify-center'>
        <div 
        className='absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm'
        onClick={isSubmitting ? undefined : onClose}
        aria-hidden="true"/>

        <div className="relative w-full max-w-md bg-light-background dark:bg-dark-background rounded-lg shadow-lg p-6"
        role="dialog"
        aria-label={`${mode === 'create' ? 'Create' : 'Update'} Item form`}>
          <div className='flex justify-between items-center mb-4'>
            <h2 className="text-xl font-semibold text-light-text dark:text-dark-text">
              {mode === 'create' ? 'Create Item' : 'Update Item'}
            </h2>
            <CrossButton onClose={onClose} disabled={isSubmitting} /> 
          </div>

  <fieldset disabled={isSubmitting}>
  <form onSubmit={handleSubmit} className="space-y-4 border-t border-light-accent dark:border-dark-accent p-5">
    <div>
      <label htmlFor="title" className="block text-sm font-medium text-light-text dark:text-dark-text">
        Item Name
      </label>
      <input
        id="title"
        name="title"
        type="text"
        value={formData.title}
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
            <label htmlFor="type" className="block text-sm font-medium">
              Type
            </label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              disabled={mode === 'update'} // can't change type on update
              className="w-full bg-light-secondary dark:bg-dark-secondarytext-light-text dark:text-white rounded-md px-3 py-1.5 placeholder-light-text/70 dark:placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent transition-colors duration-200"
            >
              <option value="url" className='bg-light-secondary dark:bg-dark-secondary text-light-text dark:text-white'>URL</option>
              <option value="file" className='bg-light-secondary dark:bg-dark-secondary text-light-text dark:text-white'>File</option>
            </select>
          </div>

          {formData.type === 'url' && (
            <div>
              <label htmlFor="url" className="block text-sm font-medium">
                URL
              </label>
              <input
                id="url"
                name="url"
                value={formData.url}
                onChange={handleChange}
                className="w-full bg-light-secondary dark:bg-dark-secondary text-light-text dark:text-white rounded-md px-3 py-1.5 placeholder-light-text/70 dark:placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent transition-colors duration-200"
                placeholder="https://example.com"
              />
            </div>
          )}

{formData.type === 'file' && (
  <div>
    <label htmlFor="file" className="block text-sm font-medium">
      {mode === 'create' ? 'Upload File' : 'Replace File'}
    </label>
    <input
      type="file"
      id="file"
      name="file"
      onChange={handleChange}
      className="w-full mt-1 text-light-text dark:text-dark-text  file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-light-primary dark:file:bg-dark-primary file:text-white dark:file:text-white hover:file:text-light-primary hover:file:bg-light-secondary dark:hover:file:bg-dark-secondary dark:hover:file:text-dark-primary"
    />
    {mode === 'update' && formData.file && typeof formData.file === 'object' && (
      <p className="text-xs text-light-text dark:text-white  mt-2">Current file: {formData.file.name || 'Uploaded file'}</p>
    )}
  </div>
)}

          <div className="flex justify-end gap-2">
            <CancelButton onClose={onClose} />
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
                            /> 
          </div>

    {error && <p className="text-light-text dark:text-white text-sm text-center mt-5">{error}</p>}
          </form>
          </fieldset>
        </div>
      </div>
    )
  }

