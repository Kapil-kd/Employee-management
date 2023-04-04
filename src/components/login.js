import React,{useEffect, useState} from "react";
import { Avatar, Box, Button, Checkbox, FormControlLabel, IconButton, Link, Modal, Paper, TextField, Typography} from '@mui/material';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { encrypt, compare } from 'n-krypta';
import { useNavigate } from "react-router-dom";



export const Login =()=>{

    useEffect(()=>{
        document.title = "Employee | Login"
    },[])

    const [err,seterr] = useState('');

    const navigate = useNavigate()

  const [state,setState] = useState({
    Username:"",
    Password:""
  });
   
  const onchangefn = (e)=>{
    setState({
        ...state,
        [e.target.name] : [e.target.value]
    })
  }
 const handlefn =(e)=>{
    e.preventDefault();
  const cusername = state.Username.toString();
  const cpassword = state.Password.toString();
  const key = "mykey"
  const username = "kapil";
  const password = "12345";
  const encryptuser = encrypt(cusername,key);
  const encryptpass = encrypt(cpassword,key);
  const comuser = compare(username,encryptuser,key);
  const compass = compare(password,encryptpass,key);
 
  if(compass && comuser){
    navigate("home")
  }else if(!compass && !comuser){
    seterr("Invalid Username Password")
  }else if(!compass){
    seterr("Invalid Password")
  }else{
    seterr("Invalid Username")
  }

}
    const gridstyle ={
       
        width:"400px",
        margin:"70px auto",
    }
    const paperstyle = {
        padding:"30px"
    }
    const avatorstyle ={
        backgroundColor:"#2830d1",
    }
    const inputstyle = {
        marginTop:"30px",
       
    }
    const buttonstyle ={
        marginTop:"20px",
        padding:"10px",
        fontSize:"17px"
    }
    const Linkstyle ={
        marginTop:"30px"
    }
    const signstyle ={
        marginTop:"25px",
    }
    return(
        <Grid style={gridstyle} >
            <Paper elevation={3} style={paperstyle} >
                <Box align="center" >
                   <Avatar style={avatorstyle}> <LockOutlinedIcon /></Avatar>
                    <Typography variant="h4" mt={2}>Login</Typography>
                </Box>
                <form onSubmit={handlefn}>
                <TextField id="username" value={state.Username} name ="Username" label="Username" onChange={onchangefn} placeholder='Enter user name' variant="standard"  fullWidth style={inputstyle}/>
              
                <TextField id="password" value={state.Password} name="Password" label="Password" onChange={onchangefn} variant="standard" placeholder='Enter password' type="password" fullWidth  style={inputstyle}/>
                <p style={{color: "red",marginTop:"20px"}}>{err}</p>
                <FormControlLabel control={<Checkbox defaultChecked />} label="Remember me" style={inputstyle} />
                
                <Button  variant="contained" type='submit' fullWidth style={buttonstyle}>Login</Button>
                </form>
                <Typography style={Linkstyle}>
                <Link sx={{cursor:"pointer"}} underline="hover" onClick={()=>navigate("register")}>
                    Forgot Password ?
                </Link>
                </Typography>
                <Typography style={signstyle}>
                   Don't have an account? 
                <Link  underline="hover" sx={{marginLeft:"10px",cursor:"pointer"}} onClick={()=>navigate("register")}>
                Register here
                </Link>
                </Typography>
                    </Paper>
                 </Grid>

    );
}