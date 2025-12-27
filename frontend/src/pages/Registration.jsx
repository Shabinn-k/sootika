import {useFormik} from "formik";
import { Validation } from "../Authentication/Validation";
import { useNavigate } from "react-router-dom";
import {useAuth} from "../Authentication/AuthContext.jsx";
import "./Registration.css"

const initialValue = {
    name:"",
    number:"",
    email:"",
    password:"",
    cpass:""
}

const Registration = () => {
    const navigate = useNavigate();
    const { signup } = useAuth();

    const formik = useFormik({
        initialValues: initialValue,
        validationSchema: Validation,
        onSubmit: async(values)=>{
            const succes = await signup(values);
            console.log(values);

            if (succes){
                navigate("/");
            }
        }
    });

    const {values,errors,handleBlur,handleSubmit,handleChange} = formik;

  return (
    <div className="register-page">
      <form onSubmit={handleSubmit} className="register-card">

        <h2>Create Your Account</h2>
        <p className="subtitle">Join us and start shopping!</p>

        <div className="input-group">
            <input type="text" name="name" placeholder="Full Name" required
            value={values.name} onChange={handleChange} onBlur={handleBlur} autoComplete="name"/>
            {errors.name && <small>{errors.name}</small>}
        </div>

        <div className="input-group">
            <input type="number" name="number" placeholder="Phone Number" required
            value={values.number} onChange={handleChange} onBlur={handleBlur} autoComplete="tel"/>
        </div>

        <div className="input-group">
            <input type="email" name="email" placeholder="Email Address" required
            value={values.email} onChange={handleChange} onBlur={handleBlur} autoComplete="username"/>
            {errors.email && <small>{errors.email}</small>}
        </div>

        <div className="input-group">
            <input type="password" name="password" placeholder="Password" required
            value={values.password} onChange={handleChange} onBlur={handleBlur} autoComplete="new-password"/>
            {errors.password && <small>{errors.password}</small>}
        </div>

        <div className="input-group">
            <input type="password" name="cpass" placeholder="Confirm Password" required
            value={values.cpass} onChange={handleChange} onBlur={handleBlur} autoComplete="new-password"/>
        </div>
            <div className="login-popup-condition">
          <input type="checkbox" required className="ch"/>
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
        <button type="submit" className="register-btn">Create Account</button>
      </form>
    </div>
  )
}

export default Registration;
