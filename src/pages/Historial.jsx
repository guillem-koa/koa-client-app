import React, { useState, useEffect } from "react";
import EditableTable from "../components/EditableTable";

const Historial = () => {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    fetch(`http://37.187.176.243:8001/CL_APP_query_db_client_results?client_id=${3}`)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        console.log(data)
        if (data.length > 0) {
          const cols = Object.keys(data[0]).map((key) => ({
            key,
            label: key,
            editable: key !== "Fecha", // Example: make Fecha non-editable
          }));
          setColumns(cols);
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleSave = (updatedData) => {
    // Update the state
    setData(updatedData);

    // Send changes to the backend
    fetch("https://httpbin.org/get", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to save changes");
        }
        return response.json();
      })
      .then((data) => console.log("Saved successfully:", data))
      .catch((error) => console.error("Error saving data:", error));
  };

  return (
    <div className="centered-container">
      <h2>Resultados</h2>
      <EditableTable data={data} columns={columns} onSave={handleSave} />
    </div>
  );
};

export default Historial;
