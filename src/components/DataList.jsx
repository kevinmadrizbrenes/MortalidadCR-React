import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DataList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    axios.get('https://mortalidadcr.onrender.com/mortalidad/')
      .then(response => {
        setData(response.data);
        setFilteredData(response.data);  // Almacenar los datos filtrados
        setLoading(false);
      })
      .catch(error => {
        console.error('Error al obtener los datos:', error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    // Filtrar los datos según el término de búsqueda
    setFilteredData(data.filter(item =>
      Object.values(item).some(val =>
        val.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    ));
  }, [searchTerm, data]);

  // Paginación: Obtener los datos de la página actual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  // Cambiar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(event.target.value);
    setCurrentPage(1); // Resetear a la primera página
  };

  if (loading) {
    return <p>Espere mientras se carga la tabla de la base de datos. Puede tardar un poco.</p>;
  }

  return (
    <div>
      {/* Sección de presentación personal */}
      <section style={{ marginBottom: '30px' }}>
        <h2>Año: 2024</h2>

        <p>
        Esta app fue creada con React y Axios en el frontend para consultar y visualizar datos de accidentes viales de manera interactiva. El objetivo es hacer la información accesible y útil para tomar decisiones informadas sobre seguridad vial.
        En el backend, usé Python con FastAPI para construir una API rápida y eficiente, y Supabase para gestionar los datos en tiempo real. La app está desplegada en Render, asegurando un acceso rápido y escalable a la información.
        </p>
      </section>

      <h3>Datos extraídos de la API de Cosevi</h3>
      <h4>Proyecto desarrollado por: Kevin Madriz Brenes</h4>

      {/* Campo de búsqueda */}
      <input
        type="text"
        placeholder="Buscar..."
        value={searchTerm}
        onChange={handleSearch}
        style={{ marginBottom: '20px', padding: '8px', width: '100%' }}
      />

      {/* Selector de cantidad de elementos por página */}
      <select onChange={handleItemsPerPageChange} value={itemsPerPage}>
        <option value="10">10 por página</option>
        <option value="20">20 por página</option>
        <option value="50">50 por página</option>
      </select>

      {/* Mostrar total de registros */}
      <p>Total de registros mostrados: {filteredData.length}</p>

      {/* Tabla de datos */}
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
          {currentItems.map((item, index) => (
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

      {/* Paginación */}
      <div>
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Anterior
        </button>
        <span> Página {currentPage} </span>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage * itemsPerPage >= filteredData.length}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default DataList;
