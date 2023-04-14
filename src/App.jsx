import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Box, Grid, Paper, IconButton } from '@mui/material';
import axios from 'axios';
import like from './assets/like.png'
import dislike from './assets/dislike.png'
import nombreFirst from "./assets/nombres.txt";
import apellidoFirst from "./assets/apellidos.txt";


function App() {

  const [perro, setPerro] = useState()
  const [aceptado, setAceptado] = useState([])
  const [rechazado, setRechazado] = useState([])
  const [nombres, setNombres] = useState([])
  const [apellidos, setApellidos] = useState([])
  const [loading, setLoading] = useState(true)

  const obtenerPerro = () => {

    setLoading(true)
    axios
      .get("https://dog.ceo/api/breeds/image/random")
      .then((response) => {
        console.log(response)
        setPerro(response.data.message)
        setLoading(false)
      })

    axios.get(nombreFirst)
      .then((response) => {
        setNombres(response.data.split("\n"))
      })

    axios.get(apellidoFirst)
      .then((response) => {
        setApellidos(response.data.split("\n"));
      })
  };

  const indiceAleatorio = Math.floor(Math.random() * nombres.length);
  const indiceAleatorio2 = Math.floor(Math.random() * apellidos.length);

  const perroConNombre = {
    imagen: perro,
    nombre: nombres[indiceAleatorio],
    apellido: apellidos[indiceAleatorio2]
  }

  const aceptarPerro = (index) => {

    setAceptado([...aceptado, perroConNombre]);
    obtenerPerro();
  }

  const rechazarPerro = (index) => {

    setRechazado([...rechazado, perroConNombre]);
    obtenerPerro();
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
          sx={{ background: "white", width: "400px", height: "600px", border: "2px solid black", overflow: "auto" }}
          borderRadius={5}>
          {rechazado.map((perroConNombre, index) => (
            <>
              <img key={perroConNombre.nombre} src={perroConNombre.imagen} alt="Perro rechazado" style={{ width: "250px", height: "25%", borderRadius: "3%", margin: "10px" }} />
              <h2>{perroConNombre.nombre} {perroConNombre.apellido}</h2>
            </>

          ))}

        </Grid>
        <Grid
          item md={5}
          sx={{ background: "white", width: "600px", height: "600px", margin: "0 40px", justifyContent: 'center', padding: "15px", border: "2px solid black" }}
          borderRadius={5} >
          <img src={perro} alt="Perro aleatorio" style={{ width: "450px", height: "50%", borderRadius: "3%" }} />
          <Box>
            <h1>{perroConNombre.nombre} {perroConNombre.apellido}</h1>
          </Box>
          <Box sx={{ justifyContent: 'space-around', display: "flex", margin: "80px" }}>
            <IconButton onClick={() => rechazarPerro()} disableTouchRipple sx={{ '&:focus': { outline: 'none' } }} disabled={loading}>
              <img src={dislike} alt="dislike" style={{ width: "45px", height: "40px", }} />
            </IconButton>
            <IconButton onClick={() => aceptarPerro()} disableTouchRipple sx={{ '&:focus': { outline: 'none' } }} disabled={loading}>
              <img src={like} alt="like" style={{ width: "55px", height: "50px" }} />
            </IconButton>

          </Box>
        </Grid>
        <Grid
          item md={3}
          sx={{ background: "white ", width: "400px", height: "600px", border: "2px solid black", overflow: "auto" }}
          borderRadius={5}>
          {aceptado.map((perroConNombre, index) => (
            <>
              <img key={perroConNombre.nombre} src={perroConNombre.imagen} alt="Perro aceptado" style={{ width: "250px", height: "25%", borderRadius: "3%", margin: "10px" }} />
              <h2>{perroConNombre.nombre} {perroConNombre.apellido}</h2>
            </>
          ))}

        </Grid>
      </Grid>
    </Box>
  )
}

export default App
