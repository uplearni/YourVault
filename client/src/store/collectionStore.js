    import {create} from 'zustand';
    import api from "../utils/axios";

    const collectionStore=create((set)=>(
        {
            collections:[],
            loading:false,
            error:null,

            fetchCollections:async()=>{
                set({loading:true,error:null});
                try{
                    const res=await api.get('/collection');
                    set({collections:res.data.collection || [] , loading:false});
                }catch(err){
                    const errorMessage = err?.response?.data?.message || 'Failed to fetch collections';
                    set({ error: errorMessage, loading: false });
                    throw new Error(errorMessage);
                }
            },

                deleteCollection:async(id)=>{
                    set({ loading: true, error: null });
                    try {
                    await api.delete(`/collection/${id}`);
                    set((state) => ({
                    collections: state.collections.filter((c) => c._id !== id),
                    loading: false,
                    }));
                    return { success: true };
                    } catch (err) {
                    const errorMessage = err?.response?.data?.message || 'Failed to delete collection';
                    set({ error: errorMessage, loading: false });
                    throw new Error(errorMessage);
                    }
            },
            
    createCollection: async ({ cname, description }) => {
        set({ loading: true, error: null });
        try {
        const res = await api.post('/collection/', { cname, description });
        const created = {
            _id: res.data.data.id,
            cname: res.data.data.collection,
            description: res.data.data.description,
        };
        set((state) => ({
            collections: [created, ...state.collections],
            loading: false,
        }));
        return created;
        } catch (err) {
        const errorMessage = err?.response?.data?.message || 'Failed to add collection';
        set({ error: errorMessage, loading: false });
        throw new Error(errorMessage);
        }
    },


    updateCollection: async (updated) => {
        set({ loading: true, error: null });
        try {
        const res = await api.put(`/collection/${updated._id}`, { cname: updated.cname, description: updated.description });
        set((state) => ({
            collections: state.collections.map((c) =>
            c._id === updated._id ? res.data.data : c
            ),
            loading: false,
        }));
        return res.data.data;
        } catch (err) {
        const errorMessage = err?.response?.data?.message || 'Failed to update collection';
        set({ error: errorMessage, loading: false });
        throw new Error(errorMessage);
        }
    },
    }));

    export default collectionStore;