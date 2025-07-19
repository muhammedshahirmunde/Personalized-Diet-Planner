export interface UserMetricsPayload {
  userId: string;
  activityLevel: string;
  dietaryPreference: 'vegan' | 'non-vegan';
  healthGoal: string;
  weightKg: number;
  heightCm: number;
  date: string; // ISO format (e.g., "2025-07-19")
}

export interface BMIData {
  userId: string;
  bmi: number;
  bmiCategory: string;
  date: string;
  weightKg?: number;
  heightCm?: number;
}

