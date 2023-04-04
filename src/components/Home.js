import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { URL } from './URL';
import { Avatar, Box, Button, IconButton, Menu, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import DownloadIcon from '@mui/icons-material/Download';
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import * as XLSX from 'xlsx/xlsx.mjs';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export const Home = () => {
  const [search,setsearch] = useState('')

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [anchorEl1, setAnchorEl1] = useState(null);
  const open1 = Boolean(anchorEl1);
  const handleClick1 = (event) => {
    setAnchorEl1(event.currentTarget);
  };
  const handleClose1 = () => {
    setAnchorEl1(null);
  };

  const [getdata,setgetdata] = useState([]);

const navigate = useNavigate();

//get
  const getdatas = async()=>{
   const res = await axios.get(URL);
   setgetdata(res.data)
  }
    useEffect(()=>{
        document.title = "Employee | Home"
        document.body.style = 'background:#fcf8fb;';
           getdatas();

    },[])

    //update
       const updatefn = ({id,empid,name,job,location}) =>{
        localStorage.setItem("id",id)
        localStorage.setItem("empid",empid)
        localStorage.setItem("name",name)
        localStorage.setItem("job",job)
        localStorage.setItem("location",location)
        navigate("/update")
       }
    //delete
    const deletefn = async(id)=>{
     await axios.delete(URL + id)
     getdatas();
    }
   //download pdf
   const columns = [
    { title: "Id", field:"id"},
    { title: "EMP Id", field:"empid" },
    { title: "Name",field:"name" },
    { title: "Job Details",field:"job" },
    { title: "Location",field:"location" }
  ]
   const downloadpdf =()=>{
    const doc = new jsPDF()
    doc.autoTable({ 
      columns : columns.map(item => ({...item,dataKey:item.field})),
      body : getdata
     })
    doc.save('Employee.pdf')
   }

   //download excel
   const downloadexcel =()=>{
     const worksheet = XLSX.utils.json_to_sheet(getdata);
     const workbook = XLSX.utils.book_new()
     XLSX.utils.book_append_sheet(workbook,worksheet,"Employee Details")

     XLSX.write(workbook,{bookType:"xlsx",type:"buffer"})
     XLSX.write(workbook,{bookType:"xlsx",type:"binary"})

     XLSX.writeFile(workbook,"Employee Details.xlsx")
   }
  return (
    <div>
    <nav className='navbar'>
      <p>Employee Details</p>
      <div className='buttons'>
      <TextField sx={{marginRight:"50px",padding:"5px"}} variant="standard" type='text' placeholder='Search Name'  value={search} onChange={(e)=>setsearch(e.target.value)} required />

      <Button  variant='contained' onClick={()=>navigate("/create")}><AddCircleOutlinedIcon sx={{marginRight:"6px"}}/>Create</Button>

      <Button
      
        id="fade-button"
        onClick={handleClick} 
        disableRipple
      >
        <Avatar sx={{backgroundColor:"orange"}}><DownloadIcon/></Avatar>
      </Button>
      <Menu
        id="fade-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={downloadexcel}>Excel</MenuItem>
        <MenuItem onClick={downloadpdf}>PDF</MenuItem>
      </Menu>
      
      <div>
      <IconButton
        id="long-button"
        onClick={handleClick1}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl1}
        open={open1}
        onClose={handleClose1}
      >

          <MenuItem onClick={handleClose1}>
            <p onClick={()=>navigate("/")}>LOGOUT</p>
          </MenuItem>
       
      </Menu>
    </div>

    </div>
    </nav>
   <main>
         <TableContainer component={Paper}>
          <Table  >
            <TableHead>
              <TableRow className='header' >
                <TableCell>Id</TableCell>
                <TableCell>EMP Id</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Job Details</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Update</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>
           <TableBody>
                {getdata.filter(val=> {
                  if(search === ""){
                     return val;
                  }else if(
                    val.name.toLowerCase().includes(search.toLowerCase())
                  ){
                    return val;
                  }
                  }).map((item)=>(
                <TableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.empid}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.job}</TableCell>
                  <TableCell>{item.location}</TableCell>
                  <TableCell onClick={()=>updatefn(item)}>< EditIcon style={{color:"blue",cursor:"pointer"}}/></TableCell>
                  <TableCell onClick={()=>deletefn(item.id)} ><DeleteIcon style={{color:"red",cursor:"pointer"}}/></TableCell>
                </TableRow>
              ))}
            
            </TableBody>
          </Table>
         {getdata.length == 0 ? <p style={{padding:"15px"}}>No datas to show...</p> : null} 
         </TableContainer>
         </main>
    </div>
  );
}



