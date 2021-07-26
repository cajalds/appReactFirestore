import React, { useEffect, useState } from 'react'
import reactDom from 'react-dom';
import { store } from './fireconfig'


function App() {
  const [modoEdicion, setModoEdicion] = useState(null)
  const [idUsuario, setIdUsuario] = useState('')
  const [nombre, setNombre] = useState('')
  const [phone, setPhone] = useState('')
  const [error, setError] = useState('')
  const [usuarioAgenda, setUsuarioAgenda] = useState([])

  useEffect(() => {
    const getUsuarios = async () => {
      const { docs } = await store.collection('agenda').get()
      const nuevoArray = docs.map(item => ({ id: item.id, ...item.data() }))
      setUsuarioAgenda(nuevoArray)
    }
    getUsuarios()
  }, [])

  const setUsuarios = async (e) => {
    e.preventDefault()
    if (!nombre.trim()) {
      setError('El campo nombre esta vacio')
    } else if (!phone.trim()) {
      setError('El campo telefono esta vacio')
    }
    const usuario = {
      nombre: nombre,
      telefono: phone
    }
    try {
      const data = await store.collection('agenda').add(usuario)
      const { docs } = await store.collection('agenda').get()
      const nuevoArray = docs.map(item => ({ id: item.id, ...item.data() }))
      setUsuarioAgenda(nuevoArray)
      alert('Usuario añadido')
    } catch (e) {
      console.log(e)
    }

    setNombre('')
    setPhone('')
  }

  const BorrarUsuario = async (id) => {
    try {
      await store.collection('agenda').doc(id).delete()
      const { docs } = await store.collection('agenda').get()
      const nuevoArray = docs.map(item => ({ id: item.id, ...item.data() }))
      setUsuarioAgenda(nuevoArray)
    } catch (e) {
      console.log(e)
    }
  }

  const pulsarActualizar = async (id) =>{
    try{
      const data = await store.collection('agenda').doc(id).get()
      const { nombre, telefono} = data.data()
      setNombre(nombre)
      setPhone(telefono)
      setIdUsuario(id)
      setModoEdicion(true)
      console.log(id)
      
    }catch(e){
      console.log(e)
    }
  }

  const setUpdate = async (e) => {
    e.preventDefault()
    if (!nombre.trim()) {
      setError('El campo nombre esta vacio')
    } else if (!phone.trim()) {
      setError('El campo telefono esta vacio')
    }
    const userUpdate = {
      nombre:nombre,
      telefono:phone
    }
    try{
      await store.collection('agenda').doc(idUsuario).set(userUpdate)
      const { docs } = await store.collection('agenda').get()
      const nuevoArray = docs.map(item => ({ id: item.id, ...item.data() }))
      setUsuarioAgenda(nuevoArray)
    }catch(e){
      console.log(e)
    }
      setNombre('')
      setPhone('')
      setIdUsuario('')
      setModoEdicion(false)

  }

  return (
    <div className="container bg-dark">
      <div className="row">
        <h1 className='text-warning'>AgendaApp</h1>
        <hr className='bg-primary' />
        <h3 className='text-warning'>Jesus Cajal</h3>
        <div className="col mt-5">
          <h2 className='text-primary mb-3'>Agendar Contactos</h2>
          <form onSubmit={modoEdicion ? setUpdate : setUsuarios} className='form-group'>
            <input
              value={nombre}
              onChange={(e) => { setNombre(e.target.value) }}
              className='form-control'
              placeholder='Introduce el nombre'
              type="text"
            />
            <input
              value={phone}
              onChange={(e) => { setPhone(e.target.value) }}
              className='form-control mt-3'
              placeholder='Introduce el numero de telefono'
              type="text"

            />
            {
              modoEdicion ? 
              (
              <input
                type="submit"
                value='Actualizar'
                className='btn btn-primary col-12 mt-3 mb-3'
              />
              )
              :
              (<input
                type="submit"
                value='Registrar'
                className='btn btn-primary col-12 mt-3 mb-3'
              />)
            }
            
          </form>
          {
            error ?
              (
                <div>
                  <p>{error}</p>
                </div>
              )
              :
              (
                <span></span>
              )
          }
        </div>
        <div className="col mt-5">
          <h2 className='text-primary mb-3 mg-auto'>Lista de Contactos</h2>
          <table className='table table-dark table-striped'>
            {
              usuarioAgenda.length !== 0 ? (
                usuarioAgenda.map(item => (
                  <tbody>
                    <tr key={item.id}><td>{item.nombre}</td><td>{item.telefono}</td>
                    <td>
                      <button
                        onClick={(id) => {pulsarActualizar(item.id)}}
                        className='btn btn-success'
                        style={{ float: 'right' }}
                        >
                          Actualizar
                        </button>                        
                      </td>
                      <td>
                        <button
                          onClick={(id)=>{BorrarUsuario(item.id)}}
                          className='btn btn-danger'
                          style={{ float: 'right' }}>Borrar
                        </button>
                      </td>                     
                    </tr>
                  </tbody>
                ))
              )
                :
                (
                  <span>
                    No hay contactos para mostrar
                  </span>
                )
            }

          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
