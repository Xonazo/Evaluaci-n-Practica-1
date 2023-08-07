import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Box, Grid, Paper, IconButton, Button, Grow, CircularProgress, circularProgressClasses, Tooltip, Modal, TextField } from '@mui/material';
import axios from 'axios';
import like from './assets/like.png'
import dislike from './assets/dislike.png'
import Chance from 'chance';
import { useBuscarInfoQuery } from './queries/buscarPerro.jsx'
import ojo from './assets/ojo.png'
import invisible from './assets/ojo-cerrado.png'
import visible from './assets/ojo.png'
import change from './assets/actualizar.png'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Divider from '@mui/material/Divider';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';




function App() {

  const [aceptado, setAceptado] = useState([])
  const [rechazado, setRechazado] = useState([])
  const [params, setParams] = useState()
  const [mostrarDescripcion, setMostrarDescripcion] = useState(
    [...aceptado, ...rechazado].map(() => false)
  );



  const aceptarPerro = () => {
    recargar();
    setAceptado([infoPerro, ...aceptado]);

  }

  const rechazarPerro = () => {
    setRechazado([infoPerro, ...rechazado]);
    recargar();

  }


  const agregarPerroAceptado = (perro) => {
    setAceptado([perro, ...aceptado]);
    setRechazado(rechazado.filter(p => p.nombre !== perro.nombre));
  }

  const agregarPerroRechazado = (perro) => {
    setRechazado([perro, ...rechazado]);
    setAceptado(aceptado.filter(p => p.nombre !== perro.nombre));
  }

  const {
    data: infoPerro,
    isFetching: cargando,
    refetch: recargar,
    isError: errors,
  } = useBuscarInfoQuery(params);
  console.log(cargando)


  //cambiar las imagenes y dejarlas igual que el primer grid, osea en porcentajes

  const [newPerro, setNewPerro] = useState(
    {
      nombre: "",
      url_foto: "",
      descripcion: "",
      sexo: "",
    },
  );

  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };


  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewPerro((prevPerro) => ({
      ...prevPerro,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    // Realizar la petición al backend con axios
    axios.post('http://127.0.0.1:8000/api/perro/create', newPerro)
      .then((response) => {
        // Manejar la respuesta del backend si es necesario
        console.log(response.data);
        // Cerrar el modal después de enviar la petición exitosamente
        handleCloseModal();
        window.location.reload();
      })
      .catch((error) => {
        // Manejar errores si ocurren en la petición
        console.error(error);
      });
  };

  const [perros, setPerros] = useState([]);

  const getPerro = () => {
    axios.get('http://127.0.0.1:8000/api/perro/all')
      .then((response) => {
        // Manejar la respuesta del backend si es necesario
        console.log(response.data.perros);
        setPerros(response.data.perros);
      })
      .catch((error) => {
        // Manejar errores si ocurren en la petición
        console.error(error);
      });
  };

  useEffect(() => {
    getPerro();
  }, []);

  const mostrarPerro = (
    <Box display="flex" justifyContent="center" marginTop={2}>
      <TableContainer component={Paper} elevation={0} sx={{ maxWidth: 600 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontSize: '1.2rem', color: 'black' }}>Nombre</TableCell>
              <Divider orientation="vertical" flexItem sx={{ background: 'black' }} />
              <TableCell sx={{ fontSize: '1.2rem', color: 'black' }}>Descripción</TableCell>
              <Divider orientation="vertical" flexItem sx={{ background: 'black' }} />
              <TableCell sx={{ fontSize: '1.2rem', color: 'black' }}>Sexo</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {perros.map((perro) => (
              <TableRow key={perro.id}>
                <TableCell>{perro.nombre}</TableCell>
                <Divider orientation="vertical" flexItem sx={{ background: 'black' }} />
                <TableCell>{perro.descripcion}</TableCell>
                <Divider orientation="vertical" flexItem sx={{ background: 'black' }} />
                <TableCell>{perro.sexo}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>

  );

  const modalPerro = (
    <Modal
      open={openModal}
      onClose={handleCloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}
      >
        <h2 id="modal-modal-title">Formulario</h2>
        <div id="modal-modal-description">
          <TextField
            name="nombre"
            label="Nombre"
            fullWidth
            sx={{ mb: 2 }}
            value={newPerro.nombre}
            onChange={handleChange}
          />
          <TextField
            name="url_foto"
            label="URL"
            fullWidth
            sx={{ mb: 2 }}
            value={newPerro.url_foto}
            onChange={handleChange}
          />
          <TextField
            name="descripcion"
            label="Descripción"
            fullWidth
            sx={{ mb: 2 }}
            value={newPerro.descripcion}
            onChange={handleChange}
          />
          <TextField
            name="sexo"
            label="Sexo"
            fullWidth
            sx={{ mb: 2 }}
            value={newPerro.sexo}
            onChange={handleChange}
            select
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              startAdornment: (
                <InputLabel htmlFor="sexo-helper">Sexo</InputLabel>
              ),
            }}
          >
            <MenuItem value="macho">Macho</MenuItem>
            <MenuItem value="hembra">Hembra</MenuItem>
          </TextField>
          <Button variant="contained" onClick={handleSubmit}>
            Enviar
          </Button>
        </div>
      </Box>
    </Modal>
  )

  return (
    <Box>
      <Grid container
        columns={12}
        gap={2}
        direction={'row'}
        justifyContent='center'
        alignItems='center'
        sx={{
          scrollX: "hidden",
          margin: "0px"
        }}
      >
        <Grid
          item md={4}
          xs={7}
          sm={7}
          sx={{
            background: "white",
            width: "600px",
            height: "600px",
            justifyContent: 'center',
            padding: "15px",
            boxShadow: '0px 0px 10px 2px rgba(0, 0, 0, 0.5)',
            overflowY: "auto",
          }}
          borderRadius={5} >
          <Box style={{
            height: "50%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}>
            {cargando ? (
              <CircularProgress />
            ) : (
              <img
                src={infoPerro?.imagen}
                alt="Perro aleatorio"
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "3%",
                  boxShadow: '0px 0px 10px 2px rgba(0, 0, 0, 0.4)'
                }}
              />
            )}
          </Box>
          <Box sx={{
            justifyContent: 'center',
            display: "flex",
            marginTop: "-44px"
          }}>
            <Tooltip title="Rechazar">
              <IconButton style={{
                backgroundColor: "white"
              }}
                onClick={() => rechazarPerro()}
                disableTouchRipple
                sx={{
                  '&:focus': { outline: 'none' },
                  opacity: cargando ? 0.5 : 1,
                  transition: 'opacity 0.2s ease',
                  border: "7px solid #e3e4e5",
                  marginRight: "3px",
                  "&:hover": {
                    transform: "scale(1.2)",
                  },
                }}
                disabled={cargando}>
                <img
                  src={dislike}
                  alt="dislike"
                  style={{
                    width: "50px",
                    height: "40px",
                  }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Aceptar">
              <IconButton
                style={{
                  backgroundColor: "white"
                }}
                onClick={() => aceptarPerro()}
                disableTouchRipple
                sx={{
                  '&:focus': { outline: 'none' },
                  opacity: cargando ? 0.5 : 1,
                  transition: 'opacity 0.2s ease',
                  border: "7px solid #e3e4e5",
                  marginLeft: "3px",
                  "&:hover": {
                    transform: "scale(1.2)",
                  },
                }}
                disabled={cargando}>
                <img
                  src={like}
                  alt="like"
                  style={{
                    width: "55px",
                    height: "50px"
                  }} />
              </IconButton>
            </Tooltip>
          </Box>
          <Box style={{
            textAlign: 'left',
            lineHeight: '1'
          }}>
            <Box style={{
              marginTop: "-16px"
            }}>
              <h1>{infoPerro?.nombre} {infoPerro?.apellido}, {infoPerro?.edad}</h1>
            </Box>
            <h2>{infoPerro?.pais} - {infoPerro?.ciudad} </h2>
            <p>{infoPerro?.descripcion}</p>
          </Box>
        </Grid>


        <Grid
          item md={3}
          xs={5}
          sm={5}

          sx={{
            background: "white ",
            width: "400px",
            height: "600px",
            boxShadow: '0px 0px 10px 2px rgba(0, 0, 0, 0.5)',
            overflowY: "auto",
            "&::-webkit-scrollbar": {
              width: "10px",
              height: "10px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#ccc",
              borderRadius: "10px",
            },


          }}
          borderRadius={5}>
          <h2>Aceptados</h2>
          {aceptado.map((perrosAceptados, index) => (
            <Box
              key={index}>
              <img
                key={perrosAceptados.nombre}
                src={perrosAceptados.imagen}
                alt="Perro aceptado"
                style={{
                  width: "250px",
                  height: "150px",
                  borderRadius: "3%",
                  margin: "10px",
                  maxWidth: "100%",
                  maxHeight: "100%",
                }}
              />
              <Box style={{ marginTop: "-30px" }}>
                <h2>
                  {perrosAceptados.nombre} {perrosAceptados.apellido}
                </h2>

                <Tooltip title="Cambiar de Fila">
                  <IconButton onClick={() => agregarPerroRechazado(perrosAceptados)} >
                    <img
                      src={change}
                      alt="Change List"
                      style={{
                        width: "40px",
                        height: "40px"
                      }} />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Mostrar Descripcion">
                  <IconButton
                    onClick={() => {
                      const nuevosValores = [...mostrarDescripcion];
                      nuevosValores[index] = !nuevosValores[index];
                      setMostrarDescripcion(nuevosValores);
                    }}
                  >
                    {mostrarDescripcion[index] ? (
                      <img src={invisible} alt="Mostrar Descripcion" style={{ width: "40px", height: "40px" }} />
                    ) : (
                      <img src={visible} alt="Ocultar Descripcion" style={{ width: "40px", height: "40px" }} />
                    )}
                  </IconButton>

                </Tooltip>
                {mostrarDescripcion[index] && (
                  <p style={{ fontSize: '18px' }}>{perrosAceptados.descripcion}</p>
                )}
              </Box>
            </Box>
          ))}
        </Grid>

        <Grid

          xs={5}
          sm={5}
          item md={3}
          sx={{
            background: "white",
            width: "400px",
            height: "600px",
            boxShadow: '0px 0px 10px 2px rgba(0, 0, 0, 0.5)',
            overflowY: "auto",
            "&::-webkit-scrollbar": {
              width: "10px",
              height: "10px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#ccc",
              borderRadius: "10px",
            },
          }}
          borderRadius={5}>
          <h2>Rechazados</h2>
          {rechazado.map((perroRechazados, index) => (
            <Box
              key={index}>
              <img
                key={perroRechazados.nombre}
                src={perroRechazados.imagen}
                alt="Perro rechazado"
                style={{
                  width: "250px",
                  height: "150px",
                  borderRadius: "3%",
                  margin: "10px",
                  borderRadius: "3%",
                  maxWidth: "100%",
                  maxHeight: "100%",
                }}
              />
              <Box style={{ marginTop: "-30px" }}>
                <h2>{perroRechazados.nombre} {perroRechazados.apellido}</h2>
                <Box>
                  <Tooltip title="Cambiar de Fila">
                    <IconButton onClick={() => agregarPerroAceptado(perroRechazados)}>
                      <img
                        src={change}
                        alt="Change List"
                        style={{
                          width: "40px",
                          height: "40px"
                        }} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Mostrar Descripcion">
                    <IconButton
                      onClick={() => {
                        const nuevosValores = [...mostrarDescripcion];
                        nuevosValores[index + aceptado.length] = !nuevosValores[index + aceptado.length];
                        setMostrarDescripcion(nuevosValores);
                      }}
                    >
                      {mostrarDescripcion[index + aceptado.length] ? (
                        <img src={invisible} alt="Mostrar Descripcion" style={{ width: "40px", height: "40px" }} />
                      ) : (
                        <img src={visible} alt="Ocultar Descripcion" style={{ width: "40px", height: "40px" }} />
                      )}
                    </IconButton>
                  </Tooltip>
                </Box>
                {mostrarDescripcion[index + aceptado.length] && (
                  <p style={{ fontSize: '18px' }}>{perroRechazados.descripcion}</p>
                )}
              </Box>
            </Box>
          ))}
        </Grid>

      </Grid>
      <Button onClick={handleOpenModal} style={{ backgroundColor: '#f50057', color: 'white' }}>
        Registrar Perro
      </Button>

      {modalPerro}
      {mostrarPerro}
    </Box>

  )
}

export default App

