import { Box, Button, Grid, TextField, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { URL } from './URL';

export const Update = () => {
  const [empid,setempid] =useState('')
  const [id,setid] =useState('')
  const [name,setname] =useState('')
  const [job,setjob] =useState('')
  const [location,setlocation] =useState('')

  const getuser = ()=>{
    return(
    setempid(localStorage.getItem("empid")),
    setid(localStorage.getItem("id")),
    setname(localStorage.getItem("name")),
    setjob(localStorage.getItem("job")),
    setlocation(localStorage.getItem("location"))
    )
  }
  useEffect(()=>{
    document.title ="Employee | Update"
    document.body.style = 'background:#fcf8fb;';
    getuser()
  },[])
  const navigate = useNavigate()
  const updatedata = async(e)=>{
   e.preventDefault()
   await axios.put(URL + id ,{
     empid,
     name,
     job,
     location
   })
 
   navigate("/home")
 
  }
  const buttonstyle ={
    marginTop:"50px",
    padding:"7px",
    fontSize:"16px"
}
const hstyle ={
  fontSize : "30px",
}
  return (
    <Grid >
    <Button sx={{margin:"20px"}} color='inherit' onClick={()=>navigate("/home")} variant='contained' disableRipple><ArrowBackIcon sx={{marginRight:"10px"}}/> Back to home</Button>
   <Box >
     <form className='form' onSubmit={updatedata}>

     <Typography  variant='p' style={hstyle} mb={2} >Update Employee</Typography>

       <TextField variant="standard" type='number' placeholder='Employee Id' name ="id" value={empid} onChange={(e)=>setempid(e.target.value)} required />
       
       <TextField variant="standard" type='text' placeholder='Name' name ="name" value={name} onChange={(e)=>setname(e.target.value)} required />
      
       <TextField variant="standard" type='text' placeholder='Job Details'name ="job"value={job}  onChange={(e)=>setjob(e.target.value)} required/>
   
       <TextField variant="standard" type='text' placeholder='Location' name ="location" value={location} onChange={(e)=>setlocation(e.target.value)} required />

       <Button  variant="contained" type='submit' style={buttonstyle} >Update</Button>


     </form>
   </Box>
   </Grid>
  )
}
