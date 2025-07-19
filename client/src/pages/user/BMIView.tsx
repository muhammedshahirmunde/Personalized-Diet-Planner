import React, { useEffect, useState } from 'react';
import { fetchBMIData } from '../../services/userService';
import { useNavigate } from 'react-router-dom';
import type { RootState } from '../../redux/store';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import type { BMIData } from '../../interface/profileInterface';




const BMIViewer: React.FC = () => {
  const [bmiData, setBmiData] = useState<BMIData | null>(null);
  const navigate = useNavigate();

  const { user, loading } = useSelector((state: RootState) => state.auth);


  const userId = user?._id || ''

  useEffect(() => {
    
    if(userId)
       loadData();
  }, [userId]);

  const loadData = async () => {
    try {
      const data = await fetchBMIData(userId?.toString());
      setBmiData(data);
    } catch (error) {
        toast.error('Error loading data')
    }
    };

  const handleGenerateDietPlan = () => {
    // You can replace this with actual logic or navigation
    alert('Diet plan generation triggered!');
  };

  const handleEditProfile = () => {
    navigate('/edit-profile');
  };

  if (loading) return <div className="text-center text-gray-500">Loading...</div>;
  if (!bmiData) return <div className="text-center text-red-500">No BMI data found.</div>;

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-semibold mb-4 text-center">BMI Information</h2>
      <p><strong>Date:</strong> {new Date(bmiData.date).toLocaleDateString()}</p>
      <p><strong>BMI:</strong> {bmiData.bmi.toFixed(2)}</p>
      <p><strong>Category:</strong> {bmiData.bmiCategory}</p>

      <div className="mt-6 flex flex-col gap-4">
        <button
          onClick={handleGenerateDietPlan}
          className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
        >
          Generate Diet Plan
        </button>
        <button
          onClick={handleEditProfile}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default BMIViewer;
