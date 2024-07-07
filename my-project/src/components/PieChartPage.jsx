import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import Data from './employee-list.json'; // Import your data file

const PieChartPage = () => {
  const calculateLeaveCounts = () => {
    let approved = 0;
    let planned = 0;
    let pending = 0;

    Data.forEach(employee => {
      approved += employee.approvedLeaves.length;
      planned += employee.plannedLeaves.length;
      pending += employee.pendingLeaves.length;
    });

    return [
      { name: 'Approved', value: approved },
      { name: 'Planned', value: planned },
      { name: 'Pending', value: pending },
    ];
  };

  const leaveCounts = calculateLeaveCounts();
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border border-gray-300 rounded shadow-lg">
          <p className="text-sm font-semibold">{`${payload[0].name}: ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-full min-h-screen bg-gradient-to-r from-blue-100 to-purple-300 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Leave Distribution</h2>
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={leaveCounts}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={150}
              fill="#8884d8"
              label={({ name, value }) => `${name}: ${value}`}
              isAnimationActive={true}
              animationDuration={800}
              animationEasing="ease-out"
            >
              {leaveCounts.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend verticalAlign="top" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PieChartPage;
