import React from "react";
import { useDispatch } from "react-redux";
import { Formik, Form } from "formik";
import { RegisterValidationSchema } from "../../validators/validators";
import { Input } from "../../components/reusable/Input";
import { Button } from "../../components/reusable/Button";
import { Link, useNavigate } from "react-router-dom";
import type { RegisterInterface } from "../../interface/registerInterface";
import type { AppDispatch } from "../../redux/store";
import { toast } from "react-toastify";
import { registerThunk } from "../../redux/actions/thunk";

const initialValues: RegisterInterface = {
  name: "",
  phone: "",
  email: "",
  password: ""
};

const Register: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleSubmit = async (values: RegisterInterface) => {
    try {
      
      const resultAction = await dispatch(registerThunk(values));

      if (registerThunk.fulfilled.match(resultAction)) {
        toast.success("Registration successful");
       navigate('/user/dashboard/profile')
      } else {
        toast.error("Registration failed");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    }
  };

  return (
    <div className="bg-[linear-gradient(to_right,#bfe2f2,#cdf7f5)] max-w-md mx-auto mt-6 rounded-xl shadow-lg overflow-hidden p-6 !min-h-[400px]">
      <h2 className="text-2xl font-semibold mb-2 text-center">
        User Registration
      </h2>

      {/* Divider line */}
      <hr className="mb-6 border-black opacity-18" />

      <Formik
        initialValues={initialValues}
        validationSchema={RegisterValidationSchema}
        onSubmit={handleSubmit}
        validateOnBlur={true}
        validateOnChange={true}
      >
       
{({
  values,
  handleChange,
  errors,
  touched,
  handleBlur,
  isSubmitting,
  isValid,
  setFieldValue,
dirty
}) => (

          <Form>
            <Input
              id="name"
              label="Name"
              type="text"
              value={values.name}
              onChange={(name, value) => setFieldValue(name, value)}

              onBlur={handleBlur}
              error={touched.name && errors.name ? errors.name : ""}
              required
            />

            <Input
              id="phone"
              label="Phone Number"
              type="text"
              value={values.phone}
             onChange={(name, value) => setFieldValue(name, value)}

              onBlur={handleBlur}
              error={touched.phone && errors.phone ? errors.phone : ""}
              required
            />
            <Input
              id="email"
              label="Email"
              type="email"
              value={values.email}
              onChange={(name, value) => setFieldValue(name, value)}

              onBlur={handleBlur}
              error={touched.email && errors.email ? errors.email : ""}
              required
            />
            <Input
              id="password"
              label="Password"
              type="password"
              value={values.password}
              onChange={(name, value) => setFieldValue(name, value)}

              onBlur={handleBlur}
              error={touched.password && errors.password ? errors.password : ""}
              required
            />

            



    

            <div className="mt-6 text-center">
            
              <Button
  type="submit"
  label="Register"
  isLoading={isSubmitting}
  isDisabled={!dirty}
/>

              {status && (
                <div className="text-red-600 text-sm mt-4">{status}</div>
              )}
            </div>

            <div className="mt-4 text-center text-sm text-gray-600">
              Already Registered?{" "}
              <Link to="/login" className="text-blue-600 hover:underline">
                Login
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Register;
