import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Box, Grid, Paper } from '@mui/material';
import axios from 'axios';

function App() {

  const [perro, setPerro] = useState()


  const obtenerPerro = () => {
    axios
      .get("https://dog.ceo/api/breeds/image/random")
      .then((response) => {
        setPerro(response.data.message)
      })
  }

  useEffect(() => {
    obtenerPerro()
  }, [])



  return (
    <Box>
      <Grid container
        direction={'row'}
        justifyContent='center'
        alignItems='center' >
        <Grid
          item md={3}
          sx={{ background: "white", width: "400px", height: "600px", border: "2px solid black" }}
          borderRadius={5}>
          <h1>1</h1>
        </Grid>
        <Grid
          item md={5}
          sx={{ background: "white", width: "600px", height: "600px", margin: "0 40px", justifyContent: 'center', padding: "15px", border: "2px solid black" }}
          borderRadius={5} >
          <img src={perro} alt="Perro aleatorio" style={{ width: "450px", height: "50%", borderRadius: "3%" }} />

        </Grid>
        <Grid
          item md={3}
          sx={{ background: "white ", width: "400px", height: "600px", border: "2px outset black" }}
          borderRadius={5}>
          <h1>3</h1>
        </Grid>
      </Grid>
    </Box>
  )
}

export default App
