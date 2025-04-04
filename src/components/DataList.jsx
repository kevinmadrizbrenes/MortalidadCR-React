import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DataList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://mortalidadcr.onrender.com/mortalidad/')
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
            <th>Rol Persona</th>
            <th>Mes</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.año}</td>
              <td>{item['tipo de accidente']}</td>
              <td>{item.provincia}</td>
              <td>{item['rol persona']}</td>
              <td>{item.mes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataList;


