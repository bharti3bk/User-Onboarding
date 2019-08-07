import React from 'react';
import ReactDOM from 'react-dom';
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";  


function UserForm({ values ,errors, touched, isSubmitting}){  
    return(
    <Form className="ui form" id = "formikForm">
    <div className="field">
    <label id="lableOne">Name</label>
    <Field type="text" name="name" placeholder="Name" />
    </div>
    <div className="field">
      <label id="lableTwo">E-mail</label>
      {touched.email && errors.email && <p id = "message">{errors.email}</p>}
      <Field type="email" name="email" placeholder="E-mail"/>
    </div>
    <div className="field">
      <label id="lableThree">Password</label>
      {touched.password && errors.password && <p id = "messageTwo">{errors.password}</p>}
      <Field type="password" name="password" placeholder="Password"/>
    </div>
    <div className="field">
      <div className="ui checkbox">
        <Field type="checkbox" name = "check" tabindex="0" checked={values.check}/>
        <label id="lableFour">I agree to the Terms and Conditions</label>
      </div>
    </div>
    <button className="ui button" type="submit" disabled={isSubmitting}>Submit</button>
  </Form>
    )
}  

const UserLoginForm = withFormik({
mapPropsToValues({email , password}){
    return {
        email: email || "",
      password: password || "",
    }
}, 
validationSchema: Yup.object().shape({
    email: Yup.string()
      .email("Email is not valid")
      .required("Email is required"),
    password: Yup.string()
      .min(16, "Password must be 10characters or longer")
      .required("Password is required")
  }), 
 handleSubmit(values, {resetForm}){
   const results = axios.post(`https://reqres.in/api/users_` , values) 
   console.log(values)
   results.then(res => {
       console.log(res)
       resetForm();
   })
   .catch(error => {
       console.log(error);
   })
 }
})(UserForm)



export default UserLoginForm;