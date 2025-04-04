import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DataList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://mortalidadcr.onrender.com/mortalidad/') // Deploy de Back-End
      .then(response => {
        setData(response.data); // Asignar directamente los datos JSON
        setLoading(false);
      })
      .catch(error => {
        console.error('Error al obtener los datos:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Cargando datos...</p>;
  }

  return (
    <div>
      <h2>Registros de Mortalidad</h2>
      <table>
        <thead>
          <tr>
            <th>Año</th>
            <th>Tipo de Accidente</th>
            <th>Provincia</th>
            <th>Cantón</th>
            <th>Ruta</th>
            <th>Rol Persona</th>
            <th>Sexo</th>
            <th>Edad</th>
            <th>Franja</th>
            <th>Día</th>
            <th>Mes</th>
            <th>Edad Quinquenal</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.año}</td>
              <td>{item['tipo de accidente']}</td>
              <td>{item.provincia}</td>
              <td>{item.cantón}</td>
              <td>{item.ruta}</td>
              <td>{item['rol persona']}</td>
              <td>{item.sexo}</td>
              <td>{item.edad}</td>
              <td>{item.franja}</td>
              <td>{item.día}</td>
              <td>{item.mes}</td>
              <td>{item['edad quinquenal']}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataList;


