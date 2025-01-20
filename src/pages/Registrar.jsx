import React, { useState } from 'react';
import '../Form.css'; // Import the CSS file
import '../App.css'; // Import the CSS file

// Table Component
const Table = ({ onSubmit }) => (
  <form onSubmit={onSubmit} style={{ margin: '20px' }}>
    <div className="table-container">
      <table border="1" className="table">
        <thead>
          <tr>
            <th>PlateID</th>
            <th>Fila</th>
            <th>Identificador</th>
            <th>Dilución</th>
            <th>Tipo</th>
            <th>Lote</th>
            <th>Observaciones</th>
          </tr>
        </thead>
        <tbody>
          {[1, 2].map((rowNumber) => (
            <tr key={rowNumber}>
              <td>
                <select name={`plateid-${rowNumber}`} required>
                  <option value="0000">0000</option>
                  <option value="0001">0001</option>
                  <option value="0002">0002</option>
                  <option value="0003">0003</option>
                </select>
              </td>
              <td>{rowNumber}</td>
              <td>
                <input type="text" name={`identificador-${rowNumber}`} required />
              </td>
              <td>
                <select name={`dilucion-${rowNumber}`} required>
                  <option value="Sin dilución">Sin dilución</option>
                  <option value="1:2">1:2</option>
                  <option value="1:4">1:4</option>
                  <option value="1:10">1:10</option>
                </select>
              </td>
              <td>
                <select name={`tipo-${rowNumber}`} required>
                  <option value="Huevo">Huevo</option>
                  <option value="Larva">Larva</option>
                  <option value="Mucus">Mucus</option>
                  <option value="Otros">Otros</option>
                </select>
              </td>
              <td>
                <input type="text" name={`lote-${rowNumber}`} required />
              </td>
              <td>
                <input type="text" name={`observaciones-${rowNumber}`} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <button
      type="submit"
      style={{ marginTop: '10px', padding: '8px 16px', fontSize: '16px' }}
    >
      Submit
    </button>
  </form>
);

const Registrar = () => {
  const [submitted, setSubmitted] = useState(false);
  const [reset, setReset] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setReset(false)
  };

  const handleReset = () => {
    setSubmitted(false);
    setReset(true); // To reset the form fields
  };

  return (
    <div className="centered-container">
      <div className="container">
        <div className="content" style={{ width: '100vh' }}>
          <h2>Registrar</h2>

          {!submitted && !reset ? (
            <Table onSubmit={handleSubmit} />
          ) : null}

          {submitted && !reset && (
            <div> 
            <div
              style={{
                marginTop: '20px',
                marginLeft: '50px',
                color: 'gray',
                fontSize: '18px',
                backgroundColor: '#f9f9f9', // Light background color
                border: '1px solid #ccc', // Light gray border
                borderRadius: '5px', // Rounded corners
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Subtle shadow
                padding: '10px', // Inner spacing
              }}
            >              Su muestra se ha registrado correctamente ✅ </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '25px' }}>
              <button
                onClick={handleReset}
                className='btn'
              >
                Nueva muestra
              </button>
              </div>

            </div>
            
          )}

          {reset && !submitted && (
            <Table onSubmit={handleSubmit} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Registrar;
