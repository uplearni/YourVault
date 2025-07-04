import {create} from 'zustand'

const uiStore=create((set)=>({
    searchQuery:'',
    filterMode:'all',
    setFilterMode:(mode)=>set({filterMode:mode}),
    setSearchQuery:(query)=>set({searchQuery:query})
}))

export default uiStore;