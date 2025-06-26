            import {create} from "zustand";
            import api from "../utils/axios";

            const itemStore=create((set)=>(
                {
                    items:[],
                    loading:false,
                    error:null,

                fetchItems: async(collectionId)=>{
                        try{
                            set({loading:true});
                            const res = await api.get(`/item?collectionId=${collectionId}`);
                            set({items:res.data.data || [],loading:false});
                        }catch(err){
                        const errorMessage = err?.response?.data?.message || 'Failed to fetch items';
                            set({ error: errorMessage, loading: false });
                            throw new Error(errorMessage);
                        }
                },

        createItem: async (item) => {
        try {
            const formData = new FormData();

            formData.append('title', item.title || '');
            formData.append('description', item.description || '');
            formData.append('type', item.type);
            formData.append('collectionId', item.collectionId);

            if (item.type === 'url') {
            formData.append('url', item.url);
            }

            if (item.type === 'file') {
            if (!item.file) throw new Error('File is required for file type');
            formData.append('file', item.file); // file should be a File object from input
            }

            const res = await api.post('/item', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            });

            set((state) => ({
            items: [res.data.data, ...state.items],
            }));
        } catch (err) {
            const errorMessage = err?.response?.data?.message || 'Failed to create item';
            set({ error: errorMessage });
            throw new Error(errorMessage);
        }
        },


    updateItem: async (updatedData) => {
    set({ loading: true });
    try {
        const formData = new FormData();
        formData.append('title', updatedData.title);
        formData.append('description', updatedData.description);

        if (updatedData.type === 'url') {
        formData.append('url', updatedData.url);
        }

        if (updatedData.type === 'file' && updatedData.file instanceof File) {
        formData.append('file', updatedData.file);
        }

        const res = await api.put(`/item/${updatedData._id}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        });

        set((state) => ({
        items: state.items.map((item) =>
            item._id === updatedData._id ? res.data.item : item
        ),
        loading: false,
        }));
    } catch (err) {
        const errorMessage = err?.response?.data?.message || 'Failed to update item';
        set({ error: errorMessage, loading: false });
        throw new Error(errorMessage);
    }
    },


                deleteItem: async(itemId)=>{
                    set({loading:true});
                    try{
                        await api.delete(`/item/${itemId}`);
                        set((state)=>({
                        items:state.items.filter((i)=> i._id!=itemId),
                        loading:false,
                        }));
                    }catch(err) {
                            const errorMessage = err?.response?.data?.message || 'Failed to delete collection';
                            set({ error: errorMessage, loading: false });
                            throw new Error(errorMessage);
                    }
                }

                }
            ))

    export default itemStore;