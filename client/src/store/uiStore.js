import {create} from 'zustand'

const uiStore=create((set)=>({
    searchQuery:'',
    setSearchQuery:(query)=>set({searchQuery:query})
}))

export default uiStore;