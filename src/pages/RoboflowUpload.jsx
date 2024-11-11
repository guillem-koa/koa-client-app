import React, { useState } from 'react';

const RoboflowUpload = () => {
  // Set initial state for each field
  const [serialNumber, setSerialNumber] = useState('');
  const [plateID, setPlateID] = useState('');
  const [row, setRow] = useState('');
  const [agarType, setAgarType] = useState('');

  // Hardcoded options for each dropdown
  const serialNumbers = ['AA-202310-001', 'AA-202403-005'];  // Example serial numbers
  const rows = ['F1', 'F2'];                       // Example Rows
  const agarTypes = ['TCBS', 'MSA', 'Blood'];      // Example Agar Types

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate PlateID as a 4-digit string
    if (!/^\d{4}$/.test(plateID)) {
      alert('PlateID must be a 4-digit string.');
      return;
    }

    try {
      // Make HTTP POST request with fetch
      const response = await fetch(`http://37.187.176.243:8001/LAB_upload_image_roboflow?serial_num=${serialNumber}&plate_id=${plateID}&row=${row}&agar_type=${agarType}`);

      if (response.ok) {
        const data = await response.json();
        console.log('Response:', data);
        alert('Request submitted successfully!');
      } else {
        throw new Error('Failed to submit the request.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to submit the request.');
    }
  };
    

  return (
    <div class="centered-container">
    <div className="container">
      <div className="content">
        <h2>Roboflow Image Upload 🌅</h2>

        <div class="info-box" style={{ marginLeft: '50px', marginBottom: '40px' }}>
          <p>
            Roboflow is an <strong> annotation tool</strong> we use to label bacterial colonies. <br />
            Fill in the form to <strong>upload to Roboflow</strong> the image of a well you would like to annotate. 
          </p>
        </div>


    <form onSubmit={handleSubmit} style={{ alignItems: 'center', marginBottom: '20px', marginLeft: '50px' }}>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ fontWeight: 'bold', marginRight: '30px' }}>Machine Serial Number:</label>
        <select style={{padding: '10px', fontSize: '16px',  width: '350px'}} 
            value={serialNumber} onChange={(e) => setSerialNumber(e.target.value)}>
          <option value="">Select Serial Number</option>
          {serialNumbers.map((sn) => (
            <option key={sn} value={sn}>{sn}</option>
          ))}
        </select>
      </div>
      
      <div style={{ marginBottom: '15px' }}>
        <label style={{ fontWeight: 'bold', marginRight: '30px' }}>PlateID (4-digit):</label>
        <input
          type="text"
          value={plateID}
          onChange={(e) => setPlateID(e.target.value)}
          maxLength="4"
          placeholder="Enter 4-digit PlateID"
          style={{padding: '10px', fontSize: '16px',  width: '150px'}} 
        />
      </div>
      
      <div style={{ marginBottom: '15px' }}>
        <label style={{ fontWeight: 'bold', marginRight: '30px' }}>Row:</label>
        <select style={{padding: '10px', fontSize: '16px',  width: '150px'}}  value={row} onChange={(e) => setRow(e.target.value)}>
          <option value="">Select Row</option>
          {rows.map((r) => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
      </div>
      
      <div style={{ marginBottom: '15px' }}>
        <label style={{ fontWeight: 'bold', marginRight: '30px' }}>Agar Type:</label>
        <select style={{padding: '10px', fontSize: '16px',  width: '200px'}} value={agarType} onChange={(e) => setAgarType(e.target.value)}>
          <option value="">Select Agar Type</option>
          {agarTypes.map((at) => (
            <option key={at} value={at}>{at}</option>
          ))}
        </select>
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
      {/*<button type="submit" className="btn">Submit</button>*/}

      <button className="btn" onClick={() => window.open(`http://37.187.176.243:8001/LAB_upload_image_roboflow?serial_num=${serialNumber}&plate_id=${plateID}&row=${row}&agar_type=${agarType}`, '_blank')} style={{ margin: '20px' }}> Upload to Roboflow  </button>
      </div>
    </form>

    </div>
    </div>
    </div>
  );
};

export default RoboflowUpload;
