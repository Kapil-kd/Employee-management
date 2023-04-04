import { Avatar, Box, Button, Grid, Link, Paper, TextField, Typography } from "@mui/material"
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import {useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup"
import YupPassword from 'yup-password';
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
YupPassword(yup);



const Schema = yup.object().shape({
    username : yup.string().required(),
    email : yup.string().email().required(),
    password : yup.string().password().required().min(8,"Minimum 8 chars").max(16, "maximum 16 chars"),
    confirmpassword: yup.string().oneOf([yup.ref("password"),null],"password must match")
});


export const Register = ()=>{

    useEffect(()=>{
        document.title = "Employee | Register"
    },[])
    const navigate = useNavigate()

    const gridstyle ={
       
        width:"400px",
        margin:"60px auto",
    }
    const paperstyle = {
        padding:"30px"
    }
    const avatorstyle ={
        backgroundColor:"rgb(25 126 17)",
    }
    const inputstyle = {
        marginTop:"15px",
       
    }
    const buttonstyle ={
        marginTop:"35px",
        padding:"10px",
        fontSize:"17px",
        backgroundColor:"rgb(25 126 17)"
    }
    const signstyle ={
        marginTop:"30px",
    }
    const errstyle ={
        color:"#e72121",
        fontSize:"15px",
        marginTop:"5px"
    }
   
        const {register,handleSubmit,formState : {errors}} =useForm({
            resolver : yupResolver(Schema),
       
        });
     const onsubmit = (datavalue)=>{
        console.log(datavalue);
        navigate("/home")
     }

    return(
        <Grid style={gridstyle}>
            <Paper elevation={3} style={paperstyle} >
                <Box align="center" >
                   <Avatar style={avatorstyle}> <LockOpenOutlinedIcon/></Avatar>
                    <Typography variant="h4" mt={2}>Register</Typography>
                </Box>
                <form onSubmit={handleSubmit(onsubmit)}>
                <TextField id="username" {...register("username")} name ="username" label="Username" placeholder='Enter user name' variant="standard" fullWidth type="text" style={inputstyle}/>
                <p style={errstyle}>{errors.username?.message}</p>
                <TextField id="email" {...register("email")}  name="email" label="Email" variant="standard" placeholder='Enter youremail@gmail.com' type="email" fullWidth style={inputstyle}/>
                <p style={errstyle}>{errors.email?.message}</p>
                <TextField id="password" {...register("password")}  name="password" label="Password" variant="standard" placeholder='Enter password' type="password" fullWidth  style={inputstyle}/>
                <p style={errstyle}>{errors.password?.message}</p>
                <TextField id="conformpassword" {...register("confirmpassword")} name="confirmpassword" label="Confirm Password" variant="standard" placeholder='Enter Confirm password' type="password" fullWidth style={inputstyle}/>
                <p style={errstyle}>{errors.confirmpassword?.message}</p>
                <Button variant="contained" type='submit' fullWidth  style={buttonstyle}>Register</Button>
                </form>
                <Typography style={signstyle}>
                   Do you have an account? 
                <Link  underline="hover" sx={{marginLeft:"10px",cursor:"pointer"}} onClick={()=>navigate("/")}>
                Login here
                </Link>
                </Typography>
            </Paper>
        </Grid>
    )
};
