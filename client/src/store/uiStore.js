import {create} from 'zustand'

const uiStore=create((set)=>({
    searchQuery:'',//what is currently in the search bar 
    filterMode:'all', //what mode is active right now , all or favorites
    setFilterMode:(mode)=>set({filterMode:mode}),
    setSearchQuery:(query)=>set({searchQuery:query})
}))

export default uiStore;