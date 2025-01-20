import React, { useState, useEffect } from "react";

const ResultadosTable = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [filters, setFilters] = useState({ startDate: "", endDate: "", maquina: "", microbiota: "" });
  const [sortOrder, setSortOrder] = useState("asc");
  const [uniqueMaquinas, setUniqueMaquinas] = useState([]);
  const [uniqueMicrobiotas, setUniqueMicrobiotas] = useState([]);

  useEffect(() => {
    fetch(`http://37.187.176.243:8001/CL_APP_query_db_client_results?client_id=${3}`)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setFilteredData(data);
        if (data.length > 0) {
          setHeaders(Object.keys(data[0]));
          const maquinas = Array.from(new Set(data.map((row) => row.Maquina))).sort();
          const microbiotas = Array.from(new Set(data.map((row) => row.Microbiota))).filter(Boolean).sort();
          setUniqueMaquinas(maquinas);
          setUniqueMicrobiotas(microbiotas);
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    const { startDate, endDate, maquina, microbiota } = filters;
    const filtered = data.filter((row) => {
      const rowDate = new Date(row.Fecha);
      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;

      return (
        (!start || rowDate >= start) &&
        (!end || rowDate <= end) &&
        (!maquina || row.Maquina === maquina) &&
        (!microbiota || row.Microbiota === microbiota)
      );
    });
    setFilteredData(filtered);
  }, [filters, data]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const toggleSortByFecha = () => {
    const sortedData = [...filteredData].sort((a, b) => {
      const dateA = new Date(a.Fecha);
      const dateB = new Date(b.Fecha);
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });
    setFilteredData(sortedData);
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  return (
    <div class="centered-container">
      <div class="container">
        <div class="content">

          <h2> Resultados </h2>
          <div className="checkbox-container" style={{ margin: "50px", padding: "10px" }}>
            <label className="filter-label">
              Fecha Inicio:
              <input
                style={{ marginLeft: "10px" }}
                type="date"
                name="startDate"
                value={filters.startDate}
                onChange={handleFilterChange}
              />
            </label>
            <label className="filter-label">
              Fecha Fin:
              <input
                style={{ marginLeft: "10px" }}
                type="date"
                name="endDate"
                value={filters.endDate}
                onChange={handleFilterChange}
              />
            </label>
            <label className="filter-label">
              Máquina:
              <select
                style={{ marginLeft: "10px" }}
                name="maquina"
                value={filters.maquina}
                onChange={handleFilterChange}
              >
                <option value="">Todas</option>
                {uniqueMaquinas.map((maquina) => (
                  <option key={maquina} value={maquina}>
                    {maquina}
                  </option>
                ))}
              </select>
            </label>
            <label className="filter-label">
              Microbiota:
              <select
                style={{ marginLeft: "10px" }}
                name="microbiota"
                value={filters.microbiota}
                onChange={handleFilterChange}
              >
                <option value="">Todas</option>
                {uniqueMicrobiotas.map((microbiota) => (
                  <option key={microbiota} value={microbiota}>
                    {microbiota}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="table-container">
            <table border="1" className="table">
              <thead>
                <tr>
                  {headers.map((header) => (
                    <th key={header} onClick={header === "Fecha" ? toggleSortByFecha : undefined} style={header === "Fecha" ? { cursor: "pointer" } : {}}>
                      {header}
                      {header === "Fecha" && (sortOrder === "asc" ? " ⬆️" : " ⬇️")}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredData.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {headers.map((header) => (
                      <td key={`${rowIndex}-${header}`}>
                        {(() => {
                          if (row[header] === "🟢") {
                            return (
                              <div className="tooltip">
                                🟢
                                <span className="tooltip-text">0 - 500 CFU/ml</span>
                              </div>
                            );
                          } else if (row[header] === "🟡") {
                            return (
                              <div className="tooltip">
                                🟡
                                <span className="tooltip-text">500 - 5000 CFU/ml</span>
                              </div>
                            );
                          } else if (row[header] === "🟠") {
                            return (
                              <div className="tooltip">
                                🟠
                                <span className="tooltip-text">5000 - 10000 CFU/ml</span>
                              </div>
                            );
                          } else if (row[header] === "🔴") {
                            return (
                              <div className="tooltip">
                                🔴
                                <span className="tooltip-text">10000 - ∞ CFU/ml</span>
                              </div>
                            );
                          } else {
                            return row[header];
                          }
                        })()}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultadosTable;
