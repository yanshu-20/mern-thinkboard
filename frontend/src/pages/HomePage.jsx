import React from 'react'
import Navbar from '../components/Navbar'
import RateLimitedUI from '../components/RateLimitedUI';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import NoteCard from '../components/NoteCard';
import NotesNotFound from '../components/NotesNotFound';

const HomePage = () => {
      const [isRateLimited,setIsRateLimited]=useState(false);
      const [notes,setNotes]=useState([]);
      const [loading,setLoading]=useState(true);

      useEffect(()=>{
        const fetchNotes=async()=>{
            try {
                const res= await axios.get('http://localhost:5001/api/notes')
                console.log(res.data);
                setNotes(res.data);
                setIsRateLimited(false);
                
            } catch (error) {
                console.log("Error in feting the notes");
                if(error.response?.status===429)
                {
                    setIsRateLimited(true);
                }
                else
                {
                    toast.error("Failed to load notes")
                }
                
            } finally{
                setLoading(false);
            }
        }
        fetchNotes();
      },[])

  return (
    <div className='min-h-screen'>
      <Navbar/>
     {/*  we are here using the conditonal rendering example as you understand it .. */}
     {isRateLimited && <RateLimitedUI/>}
     <div className='max-w-7xl mx-auto p-4 m-6'>
        {loading && <div className='text-center text-primary py-10'>Loading notes...</div>}
        {notes.length===0 && !isRateLimited && <NotesNotFound/>}
        {notes.length>0 && !isRateLimited && (
            <div className='grid gird-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {notes.map(note=>(
                   <NoteCard key={note._id} note={note} setNotes={setNotes}/>
                ))}

            </div>
        )}

     </div>
    </div>
  )
}

export default HomePage