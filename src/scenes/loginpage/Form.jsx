import { useState , } from "react";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "state";
import Dropzone from "react-dropzone";
import FlexBetween from "components/FlexBetween";

const registerSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
  location: yup.string().required("required"),
  occupation: yup.string().required("required"),
  picture: yup.string().required("required"),
  enteredYear: yup.number().required("required"),
  passOutYear: yup.number().required("required"),
  enteredYear: yup.number().required("required"),
  phoneNumber: yup.number().required("required"),
  roleOfDegree: yup.string().required("required"),
  studentIdNumber: yup.string().required("required"),
  workPlace: yup.string().required("required"),
  country: yup.string().required("required"),
});

const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

const initialValuesRegister = {
  firstName: "",
  lastName: "",
  enteredYear: "",
  passOutYear: "",
  studentIdNumber: "",
  phoneNumber: "",
  country: "",
  location: "",
  roleOfDegree: "",
  workPlace: "",
  occupation: "",
  email: "",
  password: "",
  picture: "",
  viewedProfile:"",
  impressions: "",
};

const initialValuesLogin = {
  email: "",
  password: "",
};

const Form = () => {
  const [pageType, setPageType] = useState("login");
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const isLogin = pageType === "login"; 
  const isRegister = pageType === "register";
  const baseURL = process.env.REACT_APP_BASE_URL;
  // const [formError, setFormError] = useState("");


  const register = async (values, onSubmitProps) => {
    // this allows us to send form info with image
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }
    formData.append("picturePath", values.picture.name);

    

    const savedUserResponse = await fetch(
      `${baseURL}/auth/register`,
      {
        method: "POST",
        body: formData,
      }
    );
    const savedUser = await savedUserResponse.json();
    onSubmitProps.resetForm();

    if (savedUser) {
      setPageType("login");
    }
  };
  //    const loggedInResponse = await fetch(`${baseURL}/auth/login`,

  const login = async (values, onSubmitProps) => {
    try {
      const loggedInResponse = await fetch(`${baseURL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
  
      if (!loggedInResponse.ok) {
        if (loggedInResponse.status === 400) {
          onSubmitProps.setErrors({ email: "Invalid email or password" ,password: "Invalid email or password",});     

        }
        return;
      }
  
      const loggedIn = await loggedInResponse.json();
      onSubmitProps.resetForm();
      if (loggedIn.token) {
        dispatch(
          setLogin({
            user: loggedIn.user,
            token: loggedIn.token,
          })
        );
        navigate("/home");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };
  

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) await login(values, onSubmitProps);
    if (isRegister) await register(values, onSubmitProps);
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
      validationSchema={isLogin ? loginSchema : registerSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >

            {isRegister && (
              <>
                <TextField
                  label="First Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  name="firstName"
                  error={
                    Boolean(touched.firstName) && Boolean(errors.firstName)
                  }
                  helperText={touched.firstName && errors.firstName}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="Last Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  name="lastName"
                  error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="Entered Year"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.enteredYear}
                  name="enteredYear"
                  error={Boolean(touched.enteredYear) && Boolean(errors.enteredYear)}
                  helperText={touched.enteredYear && errors.enteredYear}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="Pass Out Year"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.passOutYear}
                  name="passOutYear"
                  error={
                    Boolean(touched.passOutYear) && Boolean(errors.passOutYear)
                  }
                  helperText={touched.passOutYear && errors.passOutYear}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="Student ID Number ( SC / Year / ID )"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.studentIdNumber}
                  name="studentIdNumber"
                  error={Boolean(touched.studentIdNumber) && Boolean(errors.studentIdNumber)}
                  helperText={touched.studentIdNumber && errors.studentIdNumber}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  label="Country"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.country}
                  name="country"
                  error={Boolean(touched.country) && Boolean(errors.country)}
                  helperText={touched.country && errors.country}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="City"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.location}
                  name="location"
                  error={Boolean(touched.location) && Boolean(errors.location)}
                  helperText={touched.location && errors.location}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="Phone Number"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.phoneNumber}
                  name="phoneNumber"
                  error={
                    Boolean(touched.phoneNumber) && Boolean(errors.phoneNumber)
                  }
                  helperText={touched.phoneNumber && errors.phoneNumber}
                  sx={{ gridColumn: "span 4" }}
                />


              <FormControl sx={{ gridColumn: "span 4" }}>
                            <InputLabel htmlFor="role">Role Of Degree</InputLabel>
                            <Select
                              labelId="role-label"
                              id="role"
                              value={values.roleOfDegree}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              name="roleOfDegree"
                              error={Boolean(touched.roleOfDegree) && Boolean(errors.roleOfDegree)}
                            >
                              <MenuItem value="BCS General">BCS General</MenuItem>
                              <MenuItem value="BCS Special">BCS Special</MenuItem>
                              <MenuItem value="BSC General">BSC General</MenuItem>
                              <MenuItem value="BSC Special">BSC Special</MenuItem>
                            </Select>
                            
                </FormControl>

                <TextField
                  label="workPlace"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.workPlace}
                  name="workPlace"
                  error={
                    Boolean(touched.workPlace) && Boolean(errors.workPlace)
                  }
                  helperText={touched.workPlace && errors.workPlace}
                  sx={{ gridColumn: "span 4" }}
                />

                <TextField
                  label="Job Position"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.occupation}
                  name="occupation"
                  error={
                    Boolean(touched.occupation) && Boolean(errors.occupation)
                  }
                  helperText={touched.occupation && errors.occupation}
                  sx={{ gridColumn: "span 4" }}
                />

                <Box
                  gridColumn="span 4"
                  border={`1px solid ${palette.neutral.medium}`}
                  borderRadius="5px"
                  p="1rem"
                >
                  <Dropzone
                    acceptedFiles=".jpg,.jpeg,.png"
                    multiple={false}
                    onDrop={(acceptedFiles) =>
                      setFieldValue("picture", acceptedFiles[0])
                    }
                  >
                    {({ getRootProps, getInputProps }) => (
                      <Box
                        {...getRootProps()}
                        border={`2px dashed ${palette.primary.main}`}
                        p="1rem"
                        sx={{ "&:hover": { cursor: "pointer" } }}
                      >
                        <input {...getInputProps()} />
                        {!values.picture ? (
                          <p>Profile Picture</p>
                        ) : (
                          <FlexBetween>
                            <Typography>{values.picture.name}</Typography>
                            <EditOutlinedIcon />
                          </FlexBetween>
                        )}
                      </Box>
                    )}
                  </Dropzone>
                </Box>
              </>
            )}

            <TextField
              label="Email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              label="Password"
              type="password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name="password"
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              sx={{ gridColumn: "span 4" }}
            />
          </Box>

          {/* BUTTONS */}
          <Box>
              <>
                {/* BUTTONS */}
                <Button
                  fullWidth
                  type="submit"
                  sx={{
                    m: "2rem 0",
                    p: "1rem",
                    backgroundColor: palette.primary.main,
                    color: palette.background.alt,
                    "&:hover": { color: palette.primary.main },
                  }}
                >
                  {isLogin ? "LOGIN" : "REGISTER"}
                </Button>
                <Typography
                  onClick={() => {
                    setPageType(isLogin ? "register" : "login");
                    resetForm();
                  }}
                  sx={{
                    textDecoration: "underline",
                    color: palette.primary.main,
                    "&:hover": {
                      cursor: "pointer",
                      color: palette.primary.light,
                    },
                  }}
                >
                  {isLogin
                    ? "Don't have an account? Sign Up here."
                    : "Already have an account? Login here."}
                </Typography>
              </>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default Form;