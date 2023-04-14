import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Box, Grid, Paper, IconButton } from '@mui/material';
import axios from 'axios';
import like from './assets/like.png'
import dislike from './assets/dislike.png'


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
          <Box>
            <h1>
              Sixto Pascual
            </h1>
          </Box>
          <Box sx={{ justifyContent: 'space-around',display:"flex", margin:"80px" }}>
            <IconButton disableTouchRipple sx={{ '&:focus': { outline: 'none'} }}>
              <img src={dislike} alt="dislike" style={{ width: "45px", height: "40px",  }} />
            </IconButton>
            <IconButton disableTouchRipple sx={{ '&:focus': { outline: 'none' } }}>
              <img src={like} alt="like" style={{ width: "55px", height: "50px" }} />
            </IconButton>

          </Box>
        </Grid>
        <Grid
          item md={3}
          sx={{ background: "white ", width: "400px", height: "600px", border: "2px solid black" }}
          borderRadius={5}>
          <h1>3</h1>
        </Grid>
      </Grid>
    </Box>
  )
}

export default App
