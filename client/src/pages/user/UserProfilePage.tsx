import React from "react";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import FormInput from "../../components/reusable/FormFields/FormInput";
import FormSelect from "../../components/reusable/FormFields/FormSelect";
import Button from "../../components/reusable/FormFields/ButtonComp";
import { toast } from "react-toastify";
import type { UserMetricsPayload } from "../../interface/profileInterface";
import { createUserProfile } from "../../services/userService";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { useNavigate } from "react-router";

const UserProfileForm: React.FC = () => {

  const { user } = useSelector((state: RootState) => state.auth);

  const navigate = useNavigate()

  const selectOptions = {
    gender: [
      { _id: "male", name: "Male" },
      { _id: "female", name: "Female" },
      { _id: "other", name: "Other" },
    ],
    activityLevel: [
      { _id: "sedentary", name: "Sedentary" },
      { _id: "light", name: "Light" },
      { _id: "moderate", name: "Moderate" },
      { _id: "active", name: "Active" },
      { _id: "very active", name: "Very Active" },
    ],
    dietaryPreference: [
      { _id: "vegan", name: "Vegan" },
      { _id: "non-vegan", name: "Non-Vegan" },
    ],
    healthGoal: [
      { _id: "weight loss", name: "Weight Loss" },
      { _id: "weight gain", name: "Weight Gain" },
      { _id: "maintenance", name: "Maintenance" },
    ],
  };


  const saveUserProfile = async (values : UserMetricsPayload) => {
    try {
      const userId = user?._id.toString() || ''
      const data = await createUserProfile({...values, userId})
      
      navigate('/user/dashboard')
      toast.success('Save successful')
    } catch (error) {
      toast.error('Failed to save..Please try later')
    }
  }

  return (
    <div className="mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Complete Your Profile
      </h2>
      <Formik
        initialValues={{
          age: "",
          gender: "",
          heightCm: "",
          weightKg: "",
          activityLevel: "",
          dietaryPreference: "",
          healthGoal: "",
        }}
        validationSchema={Yup.object({
          age: Yup.number()
            .typeError("Age must be a number")
            .required("Age is required")
            .positive("Age must be greater than zero"),
          heightCm: Yup.number()
            .typeError("Height must be a number")
            .required("Height is required")
            .positive("Height must be greater than zero"),
          weightKg: Yup.number()
            .typeError("Weight must be a number")
            .required("Weight is required")
            .positive("Weight must be greater than zero"),
          gender: Yup.string().required("Gender is required"),
          activityLevel: Yup.string().required("Activity level is required"),
          dietaryPreference: Yup.string().required(
            "Dietary preference is required"
          ),
          healthGoal: Yup.string().required("Health goal is required"),
        })}
        onSubmit={(values) => {
          saveUserProfile(values)
        }}
      >
        {({ handleSubmit, errors, touched }) => (
          <form onSubmit={handleSubmit}>
            <Field name="age">
              {({ field }) => (
                <FormInput
                  {...field}
                  labelName="Age"
                  placeHolder="Enter your age"
                  type="number"
                  error={touched.age && errors.age ? errors.age : ""}
                />
              )}
            </Field>

            <Field name="heightCm">
              {({ field }) => (
                <FormInput
                  {...field}
                  labelName="Height (cm)"
                  placeHolder="Enter your height"
                  type="number"
                  error={
                    touched.heightCm && errors.heightCm ? errors.heightCm : ""
                  }
                />
              )}
            </Field>

            <Field name="weightKg">
              {({ field }) => (
                <FormInput
                  {...field}
                  labelName="Weight (kg)"
                  placeHolder="Enter your weight"
                  type="number"
                  error={
                    touched.weightKg && errors.weightKg ? errors.weightKg : ""
                  }
                />
              )}
            </Field>

            <Field name="gender">
              {({ field }) => (
                <FormSelect
                  {...field}
                  labelName="Gender"
                  data={selectOptions.gender}
                  error={touched.gender && errors.gender ? errors.gender : ""}
                />
              )}
            </Field>

            <Field name="activityLevel">
              {({ field }) => (
                <FormSelect
                  {...field}
                  labelName="Activity Level"
                  data={selectOptions.activityLevel}
                  error={
                    touched.activityLevel && errors.activityLevel
                      ? errors.activityLevel
                      : ""
                  }
                />
              )}
            </Field>

            <Field name="dietaryPreference">
              {({ field }) => (
                <FormSelect
                  {...field}
                  labelName="Dietary Preference"
                  data={selectOptions.dietaryPreference}
                  error={
                    touched.dietaryPreference && errors.dietaryPreference
                      ? errors.dietaryPreference
                      : ""
                  }
                />
              )}
            </Field>

            <Field name="healthGoal">
              {({ field }) => (
                <FormSelect
                  {...field}
                  labelName="Health Goal"
                  data={selectOptions.healthGoal}
                  error={
                    touched.healthGoal && errors.healthGoal
                      ? errors.healthGoal
                      : ""
                  }
                />
              )}
            </Field>

            <Button type="submit" variant="primary" className="w-full mt-4">
              Save Profile
            </Button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default UserProfileForm;
