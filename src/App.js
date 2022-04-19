import {useEffect } from 'react';
import { BrowserRouter,Routes,Route } from "react-router-dom";
import { Container } from '@mui/material';
import Header from './components/Header';
import {getCurrUser} from './api';
import { useDispatch } from "react-redux";
import { userActions } from "./store/userSlice";

const App=()=>{
    const dispatch=useDispatch();
    const currUser=async()=>{
        try{
           const {data}=await getCurrUser();
            dispatch(userActions.setUser(data));
        }catch(error){
            console.log(error);
        }
    }
    useEffect(()=>{
        currUser();
    },[]);
    return (
        <Container maxWidth="xl" style={{
            height:'100vh',
        }}>
            <Header/>
        </Container>
    )
}

export default App;