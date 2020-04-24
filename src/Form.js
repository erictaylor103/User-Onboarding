import React, { useState, useEffect } from "react";
import * as yup from "yup";
import axios from "axios";
import "././index.css";

//STEP 3 -> CREATE THE FORM SCHEMA (how my form has to look)

const formSchema = yup.object().shape({
  name: yup.string().required("Name is required").min(3),
  email: yup
    .string()
    .email()
    .required("Email is required"),
  password: yup.string().required("Password is required").min(3),
  terms: yup.boolean().oneOf([true], "Must agree to terms."),
});


export default function Form() {
    //STEP 2 -> SET THE STATE OF MY FORM INPUTS
  
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    password: "",
    terms: false    
  });

  

  //STEP 4 -> SET THE STATE FOR THE ERRORS

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    terms: false
  });

  //STEP 5 -> SET THE STATE OF THE BUTTON TO DISABLED (set to true for disabled)

  //button state / start with the button disabled
  const [buttonDisabled, setButtonDisabled] = useState(true);

  //STEP 6 -> SET THE POST STATE TO AN EMPTY ARRAY
  // new state to set our post request too. So we can console.log and see it.
  const [post, setPost] = useState([]);

  //STEP 7 CREATE A useEffect TO CHECK IF ALL THE INPUTS IN OUR SCHEMA ARE VALID BY PASSING THE formState STATE. IF VALID THE SET THE setButonDisable to the oposite of "true" SO THE BUTTON CAN WORK
  useEffect(() => {
    formSchema.isValid(formState).then(valid => {
      setButtonDisabled(!valid);
    });
  }, [formState]);

//STEP 8 VALIDATE THE CHANGE OF THE USER INPUT BY USING THE forSchema WE SET UP. SO IF THE USER INPUTS ARE INVALID THEN WE WILL DISPLAY THE ERROR FOR EACH TARGET FIELD AND VALUE.
  
  const validateChange = e => {
    // Reach will allow us to "reach" into the schema and test only one part.
    yup
      .reach(formSchema, e.target.name)
      .validate(e.target.value)
      .then(valid => { //checking to see if the value entered is valid
        setErrors({
          ...errors,
          [e.target.name]: "" //if the value entered is empty then add the error message
        });
      })
      .catch(err => {
        setErrors({
          ...errors,
          [e.target.name]: err.errors
        });
      });
  };

//STEP 9 -> CREATE THE SUBMIT METHOD AND USE THE "axios.post" method to post (send) the date to the database

  const formSubmit = e => {
    e.preventDefault();
    axios
      .post("https://reqres.in/api/users", formState) //post the user inputs to the database by passing the formState to the post url
      .then(res => {
        setPost([...post, res.data]);
        

        setFormState({ //after we submit the data, setFormState to empty strings so the form will reset to empty fields
          name: "",
          email: "",
          password:"",
          terms: false
        });
      })
      .catch(err => {
        //console.log(err.res);
      });
  };console.log(post);

  const inputChange = e => {
    e.persist();
    const newFormData = {
      ...formState,
      [e.target.name]: e.target.type === "checkbox" ? e.target.checked : e.target.value
    };
    validateChange(e);
    setFormState(newFormData);
  };

  //STEP 1 -> CREATE MY FORM

  return (    
    <form onSubmit={formSubmit}>
      <label htmlFor="name">
        Name
        <input
          id="name"
          type="text"
          name="name"
          value={formState.name}
          onChange={inputChange}
        />
        <p>{errors.name}</p>
      </label>
    
      <label htmlFor="email">
        Email
        <input
          id="email"
          type="text"
          name="email"
          value={formState.email}
          onChange={inputChange}
        />
        <p> {errors.email}</p>
        <label htmlFor="password">Password: </label>
        <input
          id="password"
          type="text"
          name="password"
          value={formState.password}
          onChange={inputChange}
        />
        <p>{errors.password}</p>
      </label>
      <label htmlFor="terms" className="terms">
        <input
          type="checkbox"
          name="terms"
          checked={formState.terms}
          onChange={inputChange}
        />
        Accept Terms
      </label>
      <pre>{JSON.stringify(post, null, 2)}</pre>
      <button disabled={buttonDisabled}>Submit</button>
    
    </form>
  );

}
