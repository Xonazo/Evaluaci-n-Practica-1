import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Box, Grid, Paper, IconButton, Button, Grow } from '@mui/material';
import axios from 'axios';
import like from './assets/like.png'
import dislike from './assets/dislike.png'
import Chance from 'chance';

function App() {

  const [perro, setPerro] = useState()
  const [aceptado, setAceptado] = useState([])
  const [rechazado, setRechazado] = useState([])
  const [nombres, setNombres] = useState([])
  const [apellidos, setApellidos] = useState([])
  const [loading, setLoading] = useState(true)

  const [perroConNombre, setPerroConNombre] = useState({
    imagen: '',
    nombre: '',
    apellido: '',
    edad: '',
    pais: '',
    ciudad: ''
  });

  const chance = new Chance();

  const obtenerPerro = () => {
    setLoading(true)
    axios
      .get("https://dog.ceo/api/breeds/image/random")
      .then((response) => {
        const nuevoPerroConNombre = {
          imagen: response.data.message,
          nombre: chance.first(),
          apellido: chance.last(),
          edad: chance.age({ type: "child" }),
          pais: chance.country({ full: true }),
          ciudad: chance.city()
        }
        setPerro(response.data.message);
        setPerroConNombre(nuevoPerroConNombre);
        setLoading(false)
      })
  };


  const aceptarPerro = () => {
    obtenerPerro();
    setAceptado([...aceptado, perroConNombre]);
  }

  const rechazarPerro = () => {
    setRechazado([...rechazado, perroConNombre]);
    obtenerPerro();
  }

  useEffect(() => {
    obtenerPerro()
  }, [])

  const agregarPerroAceptado = (perro) => {
    setAceptado([...aceptado, perro]);
    setRechazado(rechazado.filter(p => p.nombre !== perro.nombre));
  }

  const agregarPerroRechazado = (perro) => {
    setRechazado([...rechazado, perro]);
    setAceptado(aceptado.filter(p => p.nombre !== perro.nombre));
  }


  return (
    <Box>
      <Grid container
        direction={'row'}
        justifyContent='center'
        alignItems='center' >
        <Grid
          item md={3}
          sx={{
            background: "white",
            width: "400px",
            height: "600px",
            boxShadow: '0px 0px 10px 2px rgba(0, 0, 0, 0.5)',
            overflow: "auto"
          }}
          borderRadius={5}>
          <h2>Rechazados</h2>
          {rechazado.map((perroConNombre, index) => (
            <>
              <img
                key={perroConNombre.nombre}
                src={perroConNombre.imagen}
                alt="Perro rechazado"
                style={{
                  width: "250px",
                  height: "25%",
                  borderRadius: "3%",
                  margin: "10px"
                }} />
              <h2>{perroConNombre.nombre} {perroConNombre.apellido}</h2>
              <Button onClick={() => agregarPerroAceptado(perroConNombre)}>Cambiar</Button>
            </>
          ))}
        </Grid>
        <Grid
          item md={5}
          sx={{
            background: "white",
            width: "600px",
            height: "800px",
            margin: "0 40px",
            justifyContent: 'center',
            padding: "15px",
            boxShadow: '0px 0px 10px 2px rgba(0, 0, 0, 0.5)'
          }}
          borderRadius={5} >
          <img src={perro}
            alt="Perro aleatorio"
            style={{
              width: "450px",
              height: "50%",
              borderRadius: "4%",
              boxShadow: '0px 0px 10px 2px rgba(0, 0, 0, 0.4)'
            }} />
          <Box>
            <h1>{perroConNombre.nombre} {perroConNombre.apellido}, {perroConNombre.edad}</h1>
            <p> Pais: {perroConNombre.pais}</p>
            <p>Ciudad: {perroConNombre.ciudad} </p>
          </Box>
          <Box sx={{
            justifyContent: 'space-around',
            display: "flex",
            margin: "50px"
          }}>
            <IconButton
              onClick={() => rechazarPerro()}
              disableTouchRipple
              sx={{
                '&:focus': { outline: 'none' },
                opacity: loading ? 0.5 : 1,
                transition: 'opacity 0.2s ease',
                "&:hover": {
                  transform: "scale(1.2)",
                },
              }}
              disabled={loading}>
              <img src={dislike}
                alt="dislike"
                style={{ width: "45px", height: "40px", }} />
            </IconButton>
            <IconButton onClick={() => aceptarPerro()}
              disableTouchRipple
              sx={{
                '&:focus': { outline: 'none' },
                opacity: loading ? 0.5 : 1,
                transition: 'opacity 0.2s ease',
                "&:hover": {
                  transform: "scale(1.2)",
                },
              }}
              disabled={loading}>
              <img src={like}
                alt="like"
                style={{
                  width: "55px",
                  height: "50px"
                }} />
            </IconButton>
          </Box>
        </Grid>
        <Grid
          item md={3}
          sx={{
            background: "white ",
            width: "400px",
            height: "600px",
            boxShadow: '0px 0px 10px 2px rgba(0, 0, 0, 0.5)',
            overflow: "auto"
          }}
          borderRadius={5}>
          <h2>Aceptados</h2>
          {aceptado.map((perroConNombre, index) => (
            <Box key={perroConNombre.nombre} >
              <img
                key={perroConNombre.nombre}
                src={perroConNombre.imagen}
                alt="Perro aceptado"
                style={{
                  width: "250px",
                  height: "25%",
                  borderRadius: "3%",
                  margin: "10px"
                }} />
              <h2>{perroConNombre.nombre} {perroConNombre.apellido}</h2>
              <Button
                onClick={() => agregarPerroRechazado(perroConNombre)}>Cambiar</Button>
            </Box>
          ))}
        </Grid>
      </Grid>
    </Box>
  )
}

export default App

