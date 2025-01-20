import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://37.187.176.243:8001/CL_APP_query_db_client_results?client_id=${3}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const processDataForChart = (data) => {
    const groupedData = {};
    const allMonths = new Set();

    data.forEach((entry) => {
      const { Maquina, Fecha } = entry;
      const date = new Date(Fecha);
      const month = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

      if (!groupedData[Maquina]) {
        groupedData[Maquina] = {};
      }

      groupedData[Maquina][month] = (groupedData[Maquina][month] || 0) + 1;
      allMonths.add(month);
    });

    const sortedMonths = Array.from(allMonths).sort();

    const datasets = Object.entries(groupedData).map(([maquina, monthlyCounts]) => {
      const data = sortedMonths.map((month) => monthlyCounts[month] || 0);

      return {
        label: maquina,
        data,
        borderColor: `rgba(${Math.random() * 150 + 100}, ${Math.random() * 150 + 100}, ${Math.random() * 150 + 100}, 1)`,
        backgroundColor: `rgba(${Math.random() * 150 + 100}, ${Math.random() * 150 + 100}, ${Math.random() * 150 + 100}, 0.2)`,
        tension: 0.3,
      };
    });

    return { labels: sortedMonths, datasets };
  };

  const getUniqueMachines = (data) => {
    const maquinas = new Set(data.map((entry) => entry.Maquina));
    return Array.from(maquinas);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const { labels, datasets } = processDataForChart(data);
  const uniqueMachines = getUniqueMachines(data);

  const chartData = {
    labels,
    datasets,
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: false,
        text: 'Entries Per Month by Machine',
      },
    },
  };

  const doughnutData = {
    labels: ['Used', 'Unused'],
    datasets: [
      {
        data: [60, 40], // Replace with actual values from your backend if available
        backgroundColor: [
          'rgba(135, 206, 235, 0.8)', // Light blue for "Used"
          'rgba(192, 192, 192, 0.8)', // Light gray for "Unused"
        ],
        hoverBackgroundColor: [
          'rgba(135, 206, 235, 1)',
          'rgba(192, 192, 192, 1)',
        ],
      },
    ],
  };

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="centered-container">
      <div className="container">
        <div className="content" style={{ marginTop: "20px", marginRight: "30px", marginBottom: "40px", width: "30%" }}>
          <h2 style={{ marginLeft: "10px", marginTop: "10px" }}>Máquinas</h2>
          <h3 style={{ marginLeft: "10px" }}>activas</h3>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginLeft: "10px" }}>
            {uniqueMachines.map((maquina, index) => (
              <div
                key={index}
                style={{
                  padding: "10px 15px",
                  backgroundColor: "#f0f8ff",
                  borderRadius: "15px",
                  color: "#333",
                  fontWeight: "normal",
                  border: "1px solid #ccc",
                }}
              >
                {maquina}
              </div>
            ))}
          </div>
        </div>

        <div className="content" style={{ marginTop: "20px", marginBottom: "40px", width: "40%" }}>
          <h2 style={{ marginLeft: "10px", marginTop: "10px" }}>Placas</h2>
          <h3 style={{ marginLeft: "10px", marginBottom:"-20px" }}>Disponibles</h3>
          <div style={{ width: "200px", height: "200px", margin: "5px auto", marginBottom:"-20px" ,display: "flex",
    justifyContent: "center", // Horizontally centers the items
    alignItems: "center", // Vertically centers the items
    gap: "30px", // Optional: space between items
  }} >
            <Doughnut data={doughnutData} options={doughnutOptions} />
            <div style={{    display: "flex",
    justifyContent: "center",
    alignItems: "center",}}> <button className="btn">Order</button>
          </div>
          </div>

        </div>

        <div className="content">
          <h2>Muestras analizadas</h2>
          <h3>Según máquina</h3>
          <div style={{ marginLeft: "50px" }}>
            <Line data={chartData} options={options} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
