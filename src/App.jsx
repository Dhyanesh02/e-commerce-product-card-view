import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

//importing axios for connecting with API
import axios from 'axios';

//importing Star rating 
import ReactStars from "react-rating-stars-component";

//importing Material UI components
import {Box,Grid} from '@mui/material'

//https://fakestoreapi.com/products

function App() {
  
  //data fetching from api

  const [count,setCount]=useState(0)

  const [title,setTitle]=useState(0)

  const [value,setValue]=useState([])

  function getProduct(){
    axios.get("https://fakestoreapi.com/products").then((data)=>{
      // console.log("data",data.data)
      setValue(data.data)
    }).catch((error)=>{

    })
  }
  useEffect(()=>{
    getProduct()
  },[])

  //PreventDefault -  prevent refreshing the entire page
  function submitProduct(event){
    event.preventDefault();
    
    var data={
      "titel":title,
      "price":14.5,
      "desccription":"lkkcdcds",
      "image":"https://i.pravdedn.com",
    }


    axios.post("https://fakestoreapi.com/products",data).then((data)=>{
      console.log(data)
    }).catch((error)=>{
    })
  }
  return (
    <>
    <form onSubmit={(event)=>submitProduct(event)}>
    <input type="text" placeholder='title'onChange={(event)=>setTitle(event.target.value)} value={title}></input>
    <button type='submit'>Submit</button>
    </form>

      <Box>
        <Grid container columnGap={2} rowGap={2}>
          {value.map((data,index)=>( 
                     <Grid xs={11} sm={6} md={4} lg={3}>
                     <div className='product-container'>
                     <img className='product-image' src={data.image}/>
                       <div className='p-10'>
                         <h2>{data.title}</h2>
                         <div className='price-rate'>
                           <span>{data.price}</span>
                           <ReactStars edit={false}  value={data.rating.rate} isHalf={true}></ReactStars>
                         </div>
                       </div>
                     </div>
                   </Grid>
          ))}
        </Grid>
      </Box>
    </>
  )
}

export default App
