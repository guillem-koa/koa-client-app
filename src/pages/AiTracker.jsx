import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';

Chart.register(...registerables);
Chart.register(annotationPlugin);

const AiTracker = () => {
    const [chartData, setChartData] = useState(null);
    const [deploymentData, setDeploymentData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://37.187.176.243:8001/AA_query_db_aitracker');
                const data = await response.json();
                
                const [chartDataRaw, deploymentDataRaw] = data;

                // Modify the data: Change values of 100 to 99
                const modifiedDatasets = chartDataRaw.datasets.map(dataset => ({
                    ...dataset,
                    data: dataset.data.map(value => (value === 100 ? 99 : value)),
                }));

                setChartData({
                    labels: chartDataRaw.labels,
                    datasets: modifiedDatasets,
                });

                setDeploymentData(deploymentDataRaw);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    if (!chartData || !deploymentData) {
        return <div>Loading...</div>;
    }

    const annotations = Object.keys(deploymentData).map(month => ({
        type: 'line',
        scaleID: 'x',
        value: month,
        borderColor: 'rgba(255, 99, 132, 0.5)',
        borderWidth: 2,
        label: {
            enabled: true,
            content: deploymentData[month], // Show deployment info on hover
            position: 'top',
            backgroundColor: 'rgba(255, 99, 132, 0.8)',
            font: {
                size: 10,
            },
        },
    }));

    return (
        <div className="centered-container">    
        <div className="container">
        <div className="content">
            <h2> AI Tracker 🚀</h2>
            <div style={{ display: 'flex', margin: '50px' }}>
            <Line
                data={chartData}
                options={{
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 100,
                            ticks: {
                                callback: (value) => `${value}%`, // Add percentage sign
                            },
                        },
                        x: {
                            type: 'category'
                        }
                    },
                    plugins: {
                        legend: {
                            display: true,
                            position: 'top',
                        },
                        tooltip: {
                            enabled: true,
                            mode: 'index',
                            intersect: false,
                            callbacks: {
                                label: function(tooltipItem) {
                                    const month = tooltipItem.label;
                                    return deploymentData[month] ? deploymentData[month] : '';
                                }
                            }
                        },
                        annotation: {
                            annotations: annotations,
                        },
                    },
                }}
            />
            </div>
        </div>
        </div>
        </div>
    );
};

export default AiTracker;
