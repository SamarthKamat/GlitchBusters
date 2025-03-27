import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ImpactVideo from '../../components/ImpactVideo';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { FaLeaf, FaHandHoldingHeart, FaUsers, FaHandsHelping } from 'react-icons/fa';

const ImpactDashboard = () => {
  const [metrics, setMetrics] = useState({
    totalFoodSaved: 0,
    totalMealsProvided: 0,
    activeDonors: 0,
    activeCharities: 0,
    monthlyData: [],
    categoryData: []
  });

  useEffect(() => {
    const fetchImpactData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/impact/metrics');
        setMetrics(response.data);
      } catch (error) {
        console.error('Error fetching impact data:', error);
      }
    };

    fetchImpactData();
  }, []);

  const [userMetrics, setUserMetrics] = useState({
    personalFoodSaved: 0,
    personalMealsProvided: 0,
    personalCO2Reduced: 0,
    monthlyContributions: []
  });

  const monthlyData = metrics.monthlyData.length > 0 ? metrics.monthlyData : [
    { month: 'Jan', foodSaved: 1200, mealsProvided: 4800, co2Reduced: 2400 },
    { month: 'Feb', foodSaved: 1500, mealsProvided: 6000, co2Reduced: 3000 },
    { month: 'Mar', foodSaved: 1800, mealsProvided: 7200, co2Reduced: 3600 },
    { month: 'Apr', foodSaved: 2100, mealsProvided: 8400, co2Reduced: 4200 },
    { month: 'May', foodSaved: 2400, mealsProvided: 9600, co2Reduced: 4800 },
    { month: 'Jun', foodSaved: 2700, mealsProvided: 10800, co2Reduced: 5400 },
  ];

  useEffect(() => {
    const fetchUserMetrics = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/impact/user-metrics', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setUserMetrics(response.data);
      } catch (error) {
        console.error('Error fetching user metrics:', error);
      }
    };

    fetchUserMetrics();
  }, []);

  const categoryData = [
    { category: 'Produce', amount: 3500, color: '#10B981' },
    { category: 'Bakery', amount: 2800, color: '#F59E0B' },
    { category: 'Dairy', amount: 2000, color: '#3B82F6' },
    { category: 'Prepared', amount: 1500, color: '#8B5CF6' },
    { category: 'Pantry', amount: 1200, color: '#EC4899' }
  ];

  const impactData = [
    { name: 'CO2 Emissions Saved', value: 12000, color: '#10B981' },
    { name: 'Water Saved (Liters)', value: 50000, color: '#3B82F6' },
    { name: 'Land Preserved (m²)', value: 2500, color: '#F59E0B' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <ImpactVideo />
      <div className="relative py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-white mb-8 text-center">Impact Dashboard</h1>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 transform hover:scale-105 transition-all duration-300 border border-emerald-100 hover:border-emerald-300">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-emerald-100 rounded-full">
                  <FaLeaf className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-gray-600 text-sm font-medium mb-1">Total Food Saved</h3>
                  <p className="text-3xl font-bold text-emerald-600">{metrics.totalFoodSaved.toLocaleString()}kg</p>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex justify-between text-sm text-gray-500 mb-1">
                  <span>Progress</span>
                  <span>75%</span>
                </div>
                <div className="h-2 bg-emerald-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full animate-pulse" style={{ width: '75%' }} />
                </div>
              </div>
            </div>

            <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 transform hover:scale-105 transition-all duration-300 border border-emerald-100 hover:border-emerald-300">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-emerald-100 rounded-full">
                  <FaHandHoldingHeart className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-gray-600 text-sm font-medium mb-1">Meals Provided</h3>
                  <p className="text-3xl font-bold text-emerald-600">{metrics.totalMealsProvided.toLocaleString()}</p>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex justify-between text-sm text-gray-500 mb-1">
                  <span>Progress</span>
                  <span>80%</span>
                </div>
                <div className="h-2 bg-emerald-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full animate-pulse" style={{ width: '80%' }} />
                </div>
              </div>
            </div>

            <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 transform hover:scale-105 transition-all duration-300 border border-emerald-100 hover:border-emerald-300">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-emerald-100 rounded-full">
                  <FaUsers className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-gray-600 text-sm font-medium mb-1">Active Donors</h3>
                  <p className="text-3xl font-bold text-emerald-600">{metrics.activeDonors}</p>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex justify-between text-sm text-gray-500 mb-1">
                  <span>Progress</span>
                  <span>65%</span>
                </div>
                <div className="h-2 bg-emerald-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full animate-pulse" style={{ width: '65%' }} />
                </div>
              </div>
            </div>

            <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 transform hover:scale-105 transition-all duration-300 border border-emerald-100 hover:border-emerald-300">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-emerald-100 rounded-full">
                  <FaHandsHelping className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-gray-600 text-sm font-medium mb-1">Partner Charities</h3>
                  <p className="text-3xl font-bold text-emerald-600">{metrics.activeCharities}</p>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex justify-between text-sm text-gray-500 mb-1">
                  <span>Progress</span>
                  <span>70%</span>
                </div>
                <div className="h-2 bg-emerald-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full animate-pulse" style={{ width: '70%' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Personal Impact */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6">
              <h3 className="text-gray-800 text-lg font-semibold mb-4">Your Food Impact</h3>
              <div className="text-3xl font-bold text-emerald-600 mb-2">{userMetrics.personalFoodSaved.toLocaleString()}kg</div>
              <p className="text-gray-600">Food Saved</p>
            </div>

            <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6">
              <h3 className="text-gray-800 text-lg font-semibold mb-4">Your Meal Impact</h3>
              <div className="text-3xl font-bold text-emerald-600 mb-2">{userMetrics.personalMealsProvided.toLocaleString()}</div>
              <p className="text-gray-600">Meals Provided</p>
            </div>

            <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6">
              <h3 className="text-gray-800 text-lg font-semibold mb-4">Your Environmental Impact</h3>
              <div className="text-3xl font-bold text-emerald-600 mb-2">{userMetrics.personalCO2Reduced.toLocaleString()}kg</div>
              <p className="text-gray-600">CO2 Emissions Reduced</p>
            </div>
          </div>

          {/* Monthly Trends */}
          <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 mb-8">
            <h3 className="text-gray-800 text-lg font-semibold mb-4">Monthly Impact Trends</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="month" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    borderRadius: '0.5rem',
                    border: 'none',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Legend />
                <Line type="monotone" dataKey="foodSaved" name="Food Saved (kg)" stroke="#10B981" strokeWidth={2} />
                <Line type="monotone" dataKey="mealsProvided" name="Meals Provided" stroke="#3B82F6" strokeWidth={2} />
                <Line type="monotone" dataKey="co2Reduced" name="CO2 Reduced (kg)" stroke="#F59E0B" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6">
              <h3 className="text-gray-800 text-lg font-semibold mb-4">Environmental Impact</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={impactData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {impactData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      borderRadius: '0.5rem',
                      border: 'none',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6">
              <h3 className="text-gray-800 text-lg font-semibold mb-4">Food Categories</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={categoryData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="category" stroke="#6B7280" />
                  <YAxis stroke="#6B7280" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      borderRadius: '0.5rem',
                      border: 'none',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Bar dataKey="amount" name="Amount (kg)" radius={[4, 4, 0, 0]}>
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6">
            <div className="lg:col-span-2 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6">
              <h3 className="text-gray-800 text-lg font-semibold mb-4">Monthly Impact</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="month" stroke="#6B7280" />
                  <YAxis stroke="#6B7280" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      borderRadius: '0.5rem',
                      border: 'none',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="foodSaved" stroke="#059669" name="Food Saved (kg)" strokeWidth={2} />
                  <Line type="monotone" dataKey="mealsProvided" stroke="#10B981" name="Meals Provided" strokeWidth={2} />
                  <Line type="monotone" dataKey="co2Reduced" stroke="#3B82F6" name="CO2 Reduced (kg)" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6">
              <h3 className="text-gray-800 text-lg font-semibold mb-4">Food Categories</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={categoryData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="category" stroke="#6B7280" />
                  <YAxis stroke="#6B7280" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      borderRadius: '0.5rem',
                      border: 'none',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Bar dataKey="amount" fill="#10B981" name="Amount (kg)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImpactDashboard;