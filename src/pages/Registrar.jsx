import React, { useState } from 'react';
import '../Form.css'; // Import the CSS file
import '../App.css'; // Import the CSS file

const Registrar = () => {
  const [formData, setFormData] = useState({
    plate_id: '',
    identifier: '',
    dilution: '',
    sample_type: '',
    batch: '',
    observations: '',
    fila: '', // Added field for "Fila"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/api/samples', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Sample submitted successfully!');
        setFormData({
          plate_id: '',
          identifier: '',
          dilution: '',
          sample_type: '',
          batch: '',
          observations: '',
          fila: '', // Reset the new field as well
        });
      } else {
        const errorData = await response.json();
        console.error('Error:', errorData);
        alert(`Error submitting the sample: ${errorData.detail}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error connecting to the server.');
    }
  };

  return (
    <div className="centered-container">
      <div className="container">
        <div className="content" style={{ width: '100vh' }}>
          <h2>Registrar</h2>

          <form onSubmit={handleSubmit}>
            <label>
              PlateID (required):
              <input
                type="text"
                name="plate_id"
                value={formData.plate_id}
                onChange={handleChange}
                required
              />
            </label>
            <br />
            <label>
              Fila (required):
              <select name="fila" value={formData.fila} onChange={handleChange} required>
                <option value="">Select...</option>
                <option value="1">1</option>
                <option value="2">2</option>
              </select>
            </label>
            
            <br />
            <label>
              Identificador muestra (required):
              <input
                type="text"
                name="identifier"
                value={formData.identifier}
                onChange={handleChange}
                required
              />
            </label>
            <br />
            <label>
              Dilución (required):
              <input
                type="text"
                name="dilution"
                value={formData.dilution}
                onChange={handleChange}
                required
              />
            </label>
            <br />
            <label>
              Tipo muestra (optional):
              <select name="sample_type" value={formData.sample_type} onChange={handleChange}>
                <option value="">Select...</option>
                <option value="water">Huevo</option>
                <option value="soil">Larva</option>
                <option value="air">Otros</option>
              </select>
            </label>
            <br />
            <label>
              Lote (optional):
              <input
                type="text"
                name="batch"
                value={formData.batch}
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              Observaciones (optional):
              <input
                type="text"
                name="observations"
                value={formData.observations}
                onChange={handleChange}
              />
            </label>

            <br />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registrar;
