// services/userService.ts
import User from '../../models/UserModel';
import UserMetrics from '../../models/UserMetrics';

interface SubmitMetricsInput {
  userId: string;
  activityLevel: string;
  dietaryPreference: 'vegan' | 'non-vegan';
  healthGoal: string;
  weightKg: number;
  heightCm: number;
  date: string;
}

export const updateUserAndCreateMetrics = async (data: SubmitMetricsInput) => {
  const {
    userId,
    activityLevel,
    dietaryPreference,
    healthGoal,
    weightKg,
    heightCm
  } = data;

  try {
    const bmi = +(weightKg / ((heightCm / 100) ** 2)).toFixed(2);
  const bmiCategory = bmi < 18.5 ? 'Underweight' :
                      bmi < 25 ? 'Normal' :
                      bmi < 30 ? 'Overweight' : 'Obese';

  

  // Update user profile
  await User.findByIdAndUpdate(userId, {
    activityLevel,
    dietaryPreference,
    healthGoal
  });

  // Create metrics entry
  const metrics = new UserMetrics({
    userId,
    date: Date.now(),
    weightKg,
    heightCm,
    bmi,
    bmiCategory
  });

  return await metrics.save();
  } catch (error) {
    throw error
  }

  
};





export const getUserMetricsByUserId = async (userId: string) => {
  try {
    
  const data = await UserMetrics.findOne({ userId }).sort({ date: -1 });
    return data
  } catch (error) {
    throw error
  }
};

