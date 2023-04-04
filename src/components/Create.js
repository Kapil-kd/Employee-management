import React, { useEffect, useState } from 'react'
import { URL } from './URL'
import { Box, Button, Grid, TextField, Typography } from '@mui/material'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export const Create = () => {
 const [empid,setempid] =useState('')
 const [name,setname] =useState('')
 const [job,setjob] =useState('')
 const [location,setlocation] =useState('')

 useEffect(()=>{
  document.title = "Employee | Create"
  document.body.style = 'background:#fcf8fb;';
 },[])
   const navigate = useNavigate()
   const postdata = async(e)=>{
    e.preventDefault()
    await axios.post(URL ,{
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
        <form className='form' onSubmit={postdata}>
   
        <Typography  variant='p' style={hstyle} mb={2} >Create Employee</Typography>

          <TextField variant="standard" type='number' placeholder='Employee Id' name ="id" value={empid} onChange={(e)=>setempid(e.target.value)} required />
          
          <TextField variant="standard" type='text' placeholder='Name' name ="name" value={name} onChange={(e)=>setname(e.target.value)} required />
         
          <TextField variant="standard" type='text' placeholder='Job Details'name ="job"value={job}  onChange={(e)=>setjob(e.target.value)} required/>
      
          <TextField variant="standard" type='text' placeholder='Location' name ="location" value={location} onChange={(e)=>setlocation(e.target.value)} required />

          <Button  variant="contained" type='submit' style={buttonstyle} >Create</Button>


        </form>
      </Box>
      </Grid>
  )
}

