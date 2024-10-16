import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import './SubscriptionPieChart.css';  // Import any CSS for styling if needed

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChartForSubscriptions = () => {
  const [pieData, setPieData] = useState({ labels: [], datasets: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data from the API
    axios.get('http://localhost:9090/mealmate-admin/SubscriptionList')  // Replace with your API endpoint
      .then(response => {
        const data = response.data;

        // Aggregate data by diet type
        const dietTypeCounts = data.reduce((acc, item) => {
          acc[item.dietType] = (acc[item.dietType] || 0) + 1;
          return acc;
        }, {});

        const dietTypes = Object.keys(dietTypeCounts);
        const counts = Object.values(dietTypeCounts);

        // Set data for the Pie chart
        setPieData({
          labels: dietTypes,
          datasets: [
            {
              data: counts,
              backgroundColor: [
                'rgba(255, 99, 132, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 206, 86, 0.6)',
                'rgba(75, 192, 192, 0.6)',
                'rgba(153, 102, 255, 0.6)',
                'rgba(255, 159, 64, 0.6)',
              ],
              borderColor: 'rgba(0, 0, 0, 0.1)',
              borderWidth: 1
            }
          ]
        });

        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading data!</p>;

  return (
    <div className="chart-container">
      <h2>Subscription Distribution by Diet Type</h2>
      <Pie data={pieData} options={{
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            callbacks: {
              label: function(tooltipItem) {
                const label = tooltipItem.label || '';
                const value = tooltipItem.raw || 0;
                return `${label}: ${value}`;
              }
            }
          }
        }
      }} />
    </div>
  );
};

export default PieChartForSubscriptions;
