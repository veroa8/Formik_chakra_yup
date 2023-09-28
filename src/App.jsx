import { useState, useEffect } from 'react'
import './App.css'
import { Link } from 'react-router-dom'
import { FormControl, FormErrorMessage, FormHelperText, FormLabel, Input } from '@chakra-ui/react'
import { useFormik } from 'formik';
import { object, string, number, date } from 'yup';
import axios from 'axios';

let schema = object({
  nombre: string("Por favor ingrese todo en texto").min(3).required("Este campo es obligatorio"),
  precio: number("Debes ingresar únicamente números").min(3).required("Este campo es obligatorio"),
  categorias: string("Ingrese solamente caracteres").min(3).required("Este campo es obligatorio"),
  descripcion: string("Ingrese solamente caracteres"),
  marca: string("Ingrese solamente caracteres").required("Este campo es obligatorio"),
  fechaVen: date("Ingresa por favor en formato tipo fecha").default(() => new Date()),

});

function App(props) {
  const formik = useFormik({
    initialValues: {
      nombre: '',
      precio: '',
      categorias: '',
      descripcion: '',
      marca: '',
      fechaVen: '',

    },
    validationSchema: schema,
    onSubmit: async(values) => {
      console.log(values.nombre);
      alert(JSON.stringify(values, null, 2));
      const elemento={
        nombre: values.nombre,
            precio: values.precio,
            categorias: values.categorias,
            descripcion: values.descripcion,
            marca: values.marca,
            fechaVen: values.fechaVen
      }
          try {
              const response = await axios.post("http://localhost:3000/productos", elemento);
              console.log("response create", response.data)
              return response
          } catch (error) {
              console.error('Error creating element:', error);
          }
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>

        <FormControl isInvalid={formik.errors.nombre}>
          <FormLabel>Nombre</FormLabel>
          <Input type='text' name="nombre" onChange={formik.handleChange}
          value={formik.values.nombre} />      
          <FormErrorMessage>{formik.errors.nombre}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={formik.errors.precio}>
          <FormLabel>Precio</FormLabel>
          <Input type='number' name="precio" onChange={formik.handleChange}
          value={formik.values.precio} />      
          <FormErrorMessage>{formik.errors.precio}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={formik.errors.categorias}>
          <FormLabel>Categorias</FormLabel>
          <Input type='text' name="categorias" onChange={formik.handleChange}
          value={formik.values.categorias} />      
          <FormErrorMessage>{formik.errors.categorias}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={formik.errors.descripcion}>
          <FormLabel>Descripción</FormLabel>
          <Input type='text' name="descripcion" onChange={formik.handleChange}
          value={formik.values.descripcion} />      
          <FormErrorMessage>{formik.errors.descripcion}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={formik.errors.marca}>
          <FormLabel>Marca</FormLabel>
          <Input type='text' name="marca" onChange={formik.handleChange}
          value={formik.values.marca} />      
          <FormErrorMessage>{formik.errors.marca}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={formik.errors.fechaVen}>
          <FormLabel>Fecha de vencimiento</FormLabel>
          <Input type='date' name="fechaVen" onChange={formik.handleChange}
          value={formik.values.fechaVen} />      
          <FormErrorMessage>{formik.errors.fechaVen}</FormErrorMessage>
        </FormControl>
        
        <button type="submit">Submit</button>
      </form>
    </>
  )
}

export default App
