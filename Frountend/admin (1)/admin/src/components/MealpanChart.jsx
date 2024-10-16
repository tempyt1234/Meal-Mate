
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './MealpanChart.css';  // Import the CSS file

const categories = [
  'Weight Loss-Veg',
  'Weight Loss-Non-Veg',
  'Balanced-Veg',
  'Balanced-Non-Veg',
  'Weight Gain-Veg',
  'Weight Gain-Non-Veg',
];

// Color scheme for days of the week
const dayColors = {
  MONDAY: '#c1E899',
  TUESDAY: '#36A2EB',
  WEDNESDAY: '#FFCE56',
  THURSDAY: '#4BC0C0',
  FRIDAY: '#9966FF',
  SATURDAY: '#FF9F40',
  SUNDAY: '#8E44AD',
};

const MealpanChart = () => {
  const [mealPlans, setMealPlans] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch data from server using Axios
  useEffect(() => {
    axios.get('http://localhost:9090/mealmate-admin/mealPlans') 
      .then((response) => {
        setMealPlans(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data", error);
        setLoading(false);
      });
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  // Filter data based on selected category
  const filteredMealPlans = mealPlans.filter(
    (plan) => plan.dietType === selectedCategory
  );

  
  const chartData = filteredMealPlans[0]?.meals.map((meal) => ({
    day: meal.dayOfTheWeek,
    price: meal.meal.mealPrice,
    fill: dayColors[meal.dayOfTheWeek],  
  }));

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* Category buttons */}
      <div className="category-buttons">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryChange(category)}
            className={selectedCategory === category ? 'active' : ''}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Bar chart */}
      {chartData && chartData.length > 0 ? (
        <div className="chart-container">
          <h2>Meal Prices by Day of the Week for {selectedCategory}</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={chartData}
              margin={{
                top: 20, right: 30, left: 20, bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="price" fill="#8884d8">
                {
                  chartData.map((entry, index) => (
                    <Bar key={`bar-${index}`} fill={entry.fill} />
                  ))
                }
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div>No data available for the selected category</div>
      )}
    </div>
  );
};

export default MealpanChart;











































