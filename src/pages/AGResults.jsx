import React, { useState, useEffect } from 'react';

function AGResults() {
  const [apiResponse, setApiResponse] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://37.187.176.243:8001/AG_outputs_and_emails_tables_optimized');
      const data = await response.json();
      setApiResponse(data);
      setIsLoading(false); // Set loading to false once data is fetched
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsLoading(false); // Set loading to false in case of error
    }
  };

  const generateOutputsData = apiResponse[0];
  //const sendEmailsData = apiResponse[1];

  const getUniqueMachines = (data) => {if (!data || !Array.isArray(data)) {
    return [];
  }
  return [...new Set(data.map(item => item.Machine))].sort();
};
  const uniqueMachines = getUniqueMachines(generateOutputsData);
  const [selectedMachines, setSelectedMachines] = useState(uniqueMachines);
  const [generateOutputsDataFiltered, setFilteredData] = useState(generateOutputsData);

  const handleMachineChange = (event) => {
    const { value, checked } = event.target;
    const updatedMachines = checked 
      ? [...selectedMachines, value]
      : selectedMachines.filter(machine => machine !== value);

    setSelectedMachines(updatedMachines);
    setFilteredData(generateOutputsData.filter(item => updatedMachines.includes(item.Machine)));
  };

  const generateOutputsTable = (
    <div class="container">
    <div class="content">
      <h2 style={{ fontWeight: 'bold' }}> AQUAGEN Outputs 📊</h2>

      <div className="checkbox-container">
          {uniqueMachines.map(machine => (
            <label key={machine} className="checkbox-label">
              <input
                type="checkbox"
                value={machine}
                checked={selectedMachines.includes(machine)}
                onChange={handleMachineChange}
              />
              {machine}
            </label>
          ))}
        </div>

      {generateOutputsDataFiltered && generateOutputsDataFiltered.length > 0 ? (
      <table>
        <thead>
          <tr>
            {generateOutputsDataFiltered && Object.keys(generateOutputsDataFiltered[0]).map(key => (
              <th key={key}>{key}</th>
            ))}
          <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {generateOutputsDataFiltered && generateOutputsDataFiltered.map((item, index) => (
            <tr key={index}>
              {Object.entries(item).map(([key,value]) => (
                <td key={key}>
                  {key === "Folder ID" ? (
                    <button class = "btn" onClick={() => window.open(value, '_blank')}>
                      Go to Folder
                    </button>
                ) : (
                  value
                )}
                  </td>
              ))}
              <td>
              {loading ? (
                  <img src="https://i.gifer.com/ZKZg.gif" alt="Loading..." style={{ width: '20px', height: '20px' }}/>
                ) : (
                  <button class = "btn" onClick={() => handleOutputsButtonClick(item['Machine'], item['Cycle Start'], item['Folder ID'].split("/").pop())}>
                    Generate Output
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      ) : uniqueMachines && uniqueMachines.length === 0 ? (
        <p style={{ textAlign: 'center' }}>Everything is up to date! ✅ 🫡</p>
      ) : (
        <p style={{ textAlign: 'center' }}>Select some machine ⚙️ ⬆️</p>
      )}
    </div>
    </div>
  );

  async function handleOutputsButtonClick(machine, cycleStart, experiment_folder_id) {
    const url = `http://37.187.176.243:8001/AG_generate_outputs?experiment_folder_id=${experiment_folder_id}`;
    try {
      setLoading(true); // Set loading state to true when the button is clicked
      const response = await fetch(url);
      if (response.ok) {
        window.open(url, '_blank');
        window.location.reload(); // Reload the entire page after opening the window
      } else {
        console.error('Failed to fetch data:', response.status);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false); // Reset loading state after the API call completes
    }
  }

  
  const [serialNum, setSerialNum] = useState("defaultSerial"); // To be introduced in dropdown
  const [dataframe, setDataframe] = useState(null);
  const [fileId, setFileId] = useState(null);
  const [folderId, setFolderId] = useState(null)
  const [error, setError] = useState(null);
  const [loadingRefreshResults, setLoadingRefreshResults] = useState(false); // State for loading

  const handleSubmitRefreshResults = async () => {
    setLoadingRefreshResults(true); // Show loading GIF
    try {
      const response = await fetch(`http://37.187.176.243:8001/AG_refresh_results?serial_num=${serialNum}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setDataframe(data.dataframe);
      setFileId(data.results_excel_id);
      setFolderId(data.folderId)
      setError(null); // Clear any previous errors
    } catch (err) {
      console.error(err);
      setError('Failed to fetch data. Please try again.');
    } finally {
      setLoadingRefreshResults(false); // Hide loading GIF
    }
  };

  const renderTable = () => {
    if (!dataframe) return null;
  
    const headers = Object.keys(dataframe);
    const rows = Object.keys(dataframe[headers[0]]).map((index) => {
      return (
        <tr key={index}>
          {headers.map((header) => (
            <td key={header}>{dataframe[header][index]}</td>
          ))}
        </tr>
      );
    });
  
    return (
      <div style={{ marginTop: '30px', textAlign: 'left' }}>
        <h2>Results 🧪</h2>
        <div
          style={{
            overflowX: 'auto',
            overflowY: 'auto',
            maxHeight: '500px',
            margin: '0 auto', // Center the scrollable container
            maxWidth: '90%', // Limit the maximum width of the container
          }}
        >
          <table
            border="1"
            cellPadding="5"
            style={{
              width: '80%', // Set the table width to be a bit smaller
              minWidth: '600px', // Adjust to make sure it fits content but not too wide
              margin: '0 auto', // Center the table inside the container
            }}
          >
            <thead>
              <tr>
                {headers.map((header) => (
                  <th
                    key={header}
                    style={{
                      position: 'sticky',
                      top: '0',
                      backgroundColor: '#fff',
                      zIndex: 1,
                    }}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </table>
        </div>
      </div>
    );
  };
  

  const refreshResults = (
    <div class="container">
      <div class="content" >
        <h2>Refresh Results 🔄</h2>
        <div style={{ display: 'flex', marginTop: '50px', marginBottom: '40px'}}>
        <label style={{ fontWeight: 'bold', marginLeft: '50px' }}>Machine</label>
        <select
          id="serialNum"
          value={serialNum}
          onChange={(e) => setSerialNum(e.target.value)}
          style={{
            marginLeft: '50px',
            marginRight: '60px',
            padding: '10px', // Increase padding for larger input box
            fontSize: '14px', // Larger text
            width: '180px', // Increase width
          }}>
          <option value="">Select AQUAGEN</option>
          <option value="AG-202403-001">AG-202403-001</option>
        </select>
          {loadingRefreshResults ? (
            <img
              src="https://i.gifer.com/ZKZg.gif"
              alt="Loading..."
              style={{ width: '20px' }} // Adjust the size of the GIF as needed
            />
          ) : (
            <button className="btn" style={{ marginLeft: '10px' }} onClick={handleSubmitRefreshResults}>Refresh</button>
          )}
        </div>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        {renderTable()}

        {fileId && (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
            <button className="btn" onClick={() => window.open(`https://drive.google.com/drive/folders/${folderId}`, '_blank')} style={{ margin: '20px' }}> Go to Folder  </button>
            <button className="btn" onClick={() => window.open(`https://docs.google.com/spreadsheets/d/${fileId}`, '_blank')} style={{ margin: '20px' }}> Go to Spreadsheet </button>
          </div>
        )}
      </div>
    </div>
  );



  if (isLoading) {
    return (
<div style={{ textAlign: 'center' }}>
  {/* Loading message */}
  <h2>Loading...</h2>
  {/* Animated gif */}
  <img
    src="https://freight.cargo.site/w/1200/i/6d15619850e4dc71a7e11f56b78f035094558e1a1e447406aa05d4b3a0a2d407/DNA-04_nobg.gif"
    alt="Loading animation"
    style={{
      display: 'block',
      margin: '0 auto', // Center the image horizontally
      maxWidth: '80%',  // Adjust max width to fit the screen nicely
      maxHeight: '50%',   // Keep the aspect ratio
    }}
  />
</div>

    );
  } 

  return (
<div class="centered-container">    
<main className="main-content">
        {generateOutputsTable}
        {refreshResults}
      </main>
    </div>
  );


}

export default AGResults;
