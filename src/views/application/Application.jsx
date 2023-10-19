import React, { useState } from "react";
import {
  Box,
  Alert,
  Snackbar,
  TextField,
  Card,
  CardContent,
  Button,
  Typography,
  Grid,
  Divider,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Checkbox,
  Switch,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  FormGroup,
  CardMedia,
  Autocomplete,
  Chip
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';
import { Country, State, City }  from 'country-state-city';
import "./Application.css";

//For Image Upload Firebase Storage
import ImageUpload from "./ImageUpload";
//Firebase Imports
import {
  submitCompanyApplication,
  validateApplicationCode,
} from "../../firebase/utils";
import Pdf from './IPP Membership Levels.pdf';

// Create themes for typography and palette customization
const theme = createTheme({
  typography: {
    fontFamily: "franklin-gothic-atf",
    fontWeight: 200,
  },
  palette: {
    primary: {
      main: '#193AA5',
    },
    secondary: {
      main: '#FFFFFF',
    },
  },
});

// style for popup positions panel input fields
const PositionTextField = styled((props) => (
  <TextField InputProps={{ disableUnderline: true }} {...props} />
))(({ theme }) => ({
  '& .MuiFilledInput-root': {
    backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2b2b2b',
    transition: theme.transitions.create([
      'background-color',
    ]),
    '&:hover': {
      backgroundColor: 'white',
    },
    '&.Mui-focused': {
      backgroundColor: 'white',
    },
  },
}));

const industryOptions = [
  'Advertisements',
  'Agriculture',
  'Arts',
  'Construction',
  'Consumer Goods',
  'Corporate Services',
  'Data & Analytics',
  'Design',
  'E-commerce',
  'Education',
  'Energy & Mining',
  'Entertainment',
  'Finance',
  'Food & Beverage',
  'Gaming',
  'Government',
  'Green Energy',
  'Hardware & Networking',
  'Healthcare',
  'Legal',
  'Manufacturing',
  'Media & Communications',
  'Public Administration',
  'Public Safety',
  'Real Estate',
  'Recreation & Travel',
  'Retail',
  'Social Networking',
  'Software & IT Services',
  'Transportation & Logistics',
  'Wellness & Fitness'
];

const locationOptions = City.getCitiesOfCountry('US').map((city) => {
  const cityState = city.name + ", " + State.getStateByCodeAndCountry(city.stateCode, 'US').name;
  return cityState;
});

export default function Application() {

  /** Handlers for positions popup panel */
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  /**Start Date Handler */
  const [startDate, setStartDate] = React.useState(null);

  /**End Date Handler */
  const [endDate, setEndDate] = React.useState(null);

  /**Deadline Handler */
  const [deadline, setDeadline] = React.useState(null);

  /**
   * Functions for Current Openings Toggle Button
   */
  const [showForm, setShowForm] = useState(false);

  const handleToggle = () => {
    setShowForm(!showForm);
  };

  /**
   * template application for empty state -- should contain all relevant fields for company application
   */
  const blankApp = {
    applicationId: "",
    name: "",
    industry: [],
    website: "",
    size: "",
    locations: [],
    busType: "",
    mission: "",
    dei: "",
    envRes: "",
    socImp: "",
    mentor: "",
    current: {}, //Should we create separate object for this? Some companies may not have current openings. Or should we just make the forms fill N/A for all categories within if the switch is false
    future: "",
    validCode: false,
  };

  /**
   * template for job position object
   */
  const blankPosition = {
    jobTitle: "",
    compensationRange: "",
    startDate: "",
    endDate: "",
    locations: [],
    skillsQual: [],
    deadline: "",
    howApply: "",
    remote: false,
    active: true, // toggle to display/validate job object 
  };

  /**
   * adds new position to applicationInfo.current using the length of the object as the key value
   */
  const addPosition = () => {
    setApplicationInfo({
      ...applicationInfo,
      current: {
        ...applicationInfo.current,
        [Object.keys(applicationInfo.current).length]: blankPosition,
      },
    });
  };

  /**
   * application object to be updated by the form and sent to firebase on form submit
   */
  const [applicationInfo, setApplicationInfo] = React.useState(blankApp);

  /**
   * object used for keeping track of application errors
   */
  const [errors, setErrors] = React.useState({
    validation: false, // form submitted without all fields
    verification: false, // server error
    invalidId: false, // submitted id does not exist in the database
    submitSuccess: false, // used to display form submit success snackbar
  });

  /**
   * handler function for updating applicationInfo object
   * @param {event} event should come from a form input object with target.name equal to the name of the key you wish to update
   */
  const handleInput = (event) => {
    event.preventDefault();
    setApplicationInfo({
      ...applicationInfo,
      [event.target.name]: event.target.value,
    });
  };

  const handleInputArray = (event, label, values) => {
    event.preventDefault();
    setApplicationInfo({
      ...applicationInfo,
      [label]: values,
    });
  };

  /**
   * input handler for job openings
   * @param {event} event
   * @param {ind} ind used as the key for application.current object (hopefully a temporary solution -- would be better to create a UUID or something)
   */
  const updateJobInfo = (event, ind) => {
    if (event) {
      event.preventDefault();
      setApplicationInfo({
        ...applicationInfo,
        current: {
          ...applicationInfo.current,
          [ind]: {
            ...applicationInfo.current[ind],
            [event.target.name]: event.target.value,
          },
        },
      });
    }
  };

  const updateJobInfoArray = (event, ind, label, values) => {
    if (event) {
      event.preventDefault();
      setApplicationInfo({
        ...applicationInfo,
        current: {
          ...applicationInfo.current,
          [ind]: {
            ...applicationInfo.current[ind],
            [label]: values
          },
        },
      });
    }
  };

  const updateJobInfoDate = (date, ind, label) => {
    if (date) {
      setApplicationInfo({
        ...applicationInfo,
        current: {
          ...applicationInfo.current,
          [ind]: {
            ...applicationInfo.current[ind],
            [label]: date.toString()    // date.toISOString().split('T')[0]
          },
        },
      });
    }
  };


  /**
   * checks validation rules against applicationInfo object
   * @returns boolean indicating if form is valid & can be submitted
   */
  const validateForm = () => {
    // Object.values(applicationInfo).every((x) => !!x) // checks to see if all values are not empty
    return applicationInfo.validCode && applicationInfo.name !== ""
      && applicationInfo.industry !== "" && applicationInfo.website !== ""
      && applicationInfo.size !== "" && applicationInfo.locations !== ""
      && applicationInfo.busType !== "" && applicationInfo.mission !== ""
      && applicationInfo.dei !== "" && applicationInfo.envRes !== ""
      && applicationInfo.socImp !== "" && applicationInfo.mentor !== "";
  };

  /**
   * calls submitCompanyApplication using current applicationInfo object -- checks for form validation and verification
   * @param {event} event should only be called on form submit
   */
  const submitForm = (event) => {
    event.preventDefault();
    if (validateForm()) {
      submitCompanyApplication(
        applicationInfo.applicationId.trim(),
        applicationInfo
      )
        .then(() => {
          console.log("successfully submitted application");
          setApplicationInfo(blankApp);
          setStartDate(null);
          setEndDate(null);
          setDeadline(null);
          setShowForm(false);
          setErrors(
            Object.keys(errors).reduce((acc, key) => {
              acc[key] = false;
              return acc;
            }, {})
          );
          setErrors({ ...errors, submitSuccess: true });
        })
        .catch(
          (
            _ // error in verifying id
          ) =>
            setErrors({
              ...errors,
              validation: false,
              verification: true,
            })
        );
    } else {
      setErrors({
        // errors in validating information (parts of form are not complete)
        ...errors,
        validation: true,
        verification: false,
      });
    }
  };

  /**
   * checks if code exists in database and updates errors/applicationInfo object
   * @param {string} code
   * @returns boolean validating code existence in firebase
   */
  const validateCode = (code) => {
    validateApplicationCode(code)
      .then((valid) => {
        setErrors({ ...errors, invalidId: !valid });
        setApplicationInfo({ ...applicationInfo, validCode: valid });
      })
      .catch((error) => {
        console.log("error validating application code", error);
        setErrors({ ...errors, verification: error });
      });
    // setErrors({ ...errors, invalidId: false });
    // setApplicationInfo({ ...applicationInfo, validCode: true });
  };
  // codes that should work rn:
  // test-company-1
  // test-company-2
  // test-william


  return (
    <>
      <ThemeProvider theme={theme}>

        <div>
          <div className="code-block" align="center">
            <br></br>
            <br></br>
            <br></br>
            <Grid justifyContent="center" alignItems="center">
              <Card variant="outlined"
                sx={{ minWidth: 300, maxWidth: isBrowser? 460 : 0.9 * window.innerWidth }}>
                <CardContent>
                  <Typography variant="body2" component="div">
                    Thank you for your interest in applying to IPP! Before you
                    continue with your application, please enter the Application
                    Code provided by one of our IPP staff:
                  </Typography>
                  <Box
                    component="form"
                    sx={{
                      "& > :not(style)": { m: 2, width: isBrowser ? "30ch" : "90%" },
                    }}
                    noValidate
                    autoComplete="off"
                  >
                    <TextField
                      width="90%"
                      id="outlined-basic"
                      label="Application Code"
                      variant="outlined"
                      name="applicationId"
                      //color="secondary"
                      onKeyPress={(e) => e.key === "Enter" && e.preventDefault()}
                      value={applicationInfo.applicationId}
                      onChange={handleInput}
                      error={errors.invalidId}
                      disabled={applicationInfo.validCode}
                      helperText={
                        errors.invalidId
                          ? "Invalid application code: Please try again."
                          : applicationInfo.validCode
                            ? "Thank you! Please proceed to fill out the form."
                            : ""
                      }
                      helperTextStyles={{ color:  errors.invalidId ? "red" : applicationInfo.validCode ? "#193AA5" : "" }}
                    />
                  </Box>
                  <Button
                    variant="contained"
                    //color="success"
                    disabled={applicationInfo.validCode}
                    onClick={() => validateCode(applicationInfo.applicationId)}
                  >
                    {applicationInfo.validCode ? "Validated" : "Validate"}
                  </Button>
                  <Typography variant="body2">
                    <br></br>
                    Don’t have a code yet? Please reach out to our partner
                    relations staff at: brown-cs-ipp@brown.edu to be provided with
                    one. In the mean time, feel free to browse our application
                    below.
                  </Typography>
                </CardContent>
              </Card>
              <br></br>
              <br></br>
              <br></br>
            </Grid>
          </div>
          <br></br>

          <div id="form" align="center" style={{
            background: '#fafafa',
            margin: isBrowser ? '0 15%' : '0 5%',
            padding: isBrowser ? "40px" : "10px",
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)' }}>
            <Typography variant="body2">
              To apply to become a partner, please provide the following details
              so we can best inform our students about your job opportunities.
            </Typography>
            <Button href={Pdf} target="_blank" rel="noopener">
              View IPP Membership Levels
            </Button>
            <br></br>
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 2, width: isBrowser ? "25ch" : "90%" },
              }}
              noValidate
              autoComplete="off"
            >
              <div className="input-row">
                <TextField
                  id="outlined-multiline-flexible"
                  label="Company Name"
                  //color="secondary"
                  name="name"
                  value={applicationInfo.name}
                  onChange={handleInput}
                  disabled={!applicationInfo.validCode}
                />

                <TextField
                  id="standard-basic"
                  label="Website"
                  //color="secondary"
                  name="website"
                  value={applicationInfo.website}
                  onChange={handleInput}
                  disabled={!applicationInfo.validCode}
                />
              </div>

              <div className="input-row">
                <TextField
                  InputProps={{ inputMode: 'numeric' }}
                  id="filled-multiline-flexible"
                  label="Size (Employees)"
                  //color="secondary"
                  name="size"
                  value={applicationInfo.size}
                  onChange={handleInput}
                  disabled={!applicationInfo.validCode}
                />

                <div className="input-radio">
                  <FormControl disabled={!applicationInfo.validCode}>
                    <FormLabel
                      id="demo-radio-buttons-group-label"
                    //color="secondary"
                    >
                      Business Type
                    </FormLabel>
                    <RadioGroup
                      name="busType"
                      value={applicationInfo.busType}
                      onChange={handleInput}
                      style={{ display: "flex", flexDirection: "row" }}
                    >
                      <FormControlLabel
                        value="For Profit"
                        control={<Radio />}
                        label="For Profit"
                      />
                      <FormControlLabel
                        value="Non-Profit"
                        control={<Radio />}
                        label="Non-Profit"
                      />
                    </RadioGroup>
                  </FormControl>
                </div>
              </div>
            </Box>

            <div>
              <Box
                component="form"
                sx={{
                  "& .MuiTextField-root": { m: 1, width: isBrowser ? "54ch" : "90%" },
                }}
                noValidate
                autoComplete="off" >
                <Autocomplete
                  multiple
                  freeSolo
                  id="outlined-multiline-flexible"
                  options={locationOptions}
                  disabled={!applicationInfo.validCode}
                  value={applicationInfo.locations}
                  defaultValue={[]}
                  name="locations"
                  onChange={(e, v) => handleInputArray(e, "locations", v)}
                  renderInput={params => (
                    <TextField
                      {...params}
                      id="outlined-textarea"
                      label="Office Locations"
                      placeholder="Hit Enter to add a new location"
                      //color="secondary"
                      variant="outlined"
                      name="locations"
                      value={applicationInfo.locations}
                      disabled={!applicationInfo.validCode}
                    />
                  )}
                />
              </Box>
            </div>

            <div>
              <Box
                component="form"
                sx={{
                  "& .MuiTextField-root": { m: 1, width: isBrowser ? "54ch" : "90%" },
                }}
                noValidate
                autoComplete="off" >
                <Autocomplete
                  multiple
                  freeSolo
                  id="outlined-multiline-flexible"
                  name="industry"
                  options={industryOptions}
                  value={applicationInfo.industry}
                  defaultValue={[]}
                  disabled={!applicationInfo.validCode}
                  onChange={(e, v) => handleInputArray(e, "industry", v)}
                  renderInput={params => (
                    <TextField
                      {...params}
                      id="outlined-textarea"
                      label="Industry"
                      placeholder="Hit Enter to add a new industry"
                      //color="secondary
                      variant="outlined"
                      name="industry"
                      value={applicationInfo.industry}
                      disabled={!applicationInfo.validCode}
                    />
                  )}
                />
              </Box>
            </div>

            <div>
              <Box
                component="form"
                sx={{
                  "& .MuiTextField-root": { m: 1, width: isBrowser ? "54ch" : "90%" },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  id="filled-multiline-static"
                  label="Mission Statement"
                  //color="secondary"
                  multiline
                  rows={4}
                  name="mission"
                  value={applicationInfo.mission}
                  onChange={handleInput}
                  disabled={!applicationInfo.validCode}
                />
              </Box>
            </div>
            
            <div>
              <br></br>
            <ImageUpload id={applicationInfo.applicationId}/>
            <br></br>
            </div>
            <div>
            <br></br>
            <br></br>
            </div>
            <div>
              <Typography variant="h6">
                <b>Values</b>
              </Typography>
            </div>
            <div>
              <br></br>
              <CardMedia
                component="img"
                sx={{
                  width: isBrowser ? "80ch" : "90%",
                  height: 100,
                  objectFit: "contain",
                }}
                image={require("./temp_imgs/badges.png")}
              ></CardMedia>
              <br></br>
              <Box
                sx={{
                  "& .MuiTextField-root": { m: 1, width: isBrowser ? "60ch" : "90%" },
                }}
                noValidate
                autoComplete="off"
              >
                <Accordion
                  expanded={expanded === "panel1"}
                  onChange={handleChange("panel1")}
                  sx={{
                    maxWidth: '80ch',
                    minHeight: '8ch',
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                  >
                    <div className="value-accordian">
                      <Typography className="value-accordian-header" sx={{ flexShrink: 0 }}>
                        DEI (Diversity, Equity, Inclusion)
                      </Typography>
                      <Typography className="value-accordian-content" sx={{ color: "text.secondary" }}>
                        {" "}
                        How does your company build an environment that fosters
                        diversity, equity, and inclusion?
                      </Typography>
                    </div>
                  </AccordionSummary>
                  <AccordionDetails>
                    <TextField
                      id="filled-multiline-static"
                      //color="secondary"
                      label="Response"
                      multiline
                      rows={4}
                      name="dei"
                      value={applicationInfo.dei}
                      onChange={handleInput}
                      disabled={!applicationInfo.validCode}
                    />
                  </AccordionDetails>
                </Accordion>
                <Accordion
                  sx={{
                    maxWidth: '80ch',
                    minHeight: '8ch',
                  }}
                  expanded={expanded === "panel2"}
                  onChange={handleChange("panel2")}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2bh-content"
                    id="panel2bh-header"
                  >
                    <div className="value-accordian">
                      <Typography className="value-accordian-header" sx={{ flexShrink: 0 }}>
                        Environmental Responsibility
                      </Typography>
                      <Typography className="value-accordian-content" sx={{ color: "text.secondary" }}>
                        How is your company working to protect the environment and
                        address climate change?
                      </Typography>
                    </div>
                  </AccordionSummary>
                  <AccordionDetails>
                    <TextField
                      id="filled-multiline-static"
                      //color="secondary"
                      label="Response"
                      multiline
                      rows={4}
                      name="envRes"
                      value={applicationInfo.envRes}
                      onChange={handleInput}
                      disabled={!applicationInfo.validCode}
                    />
                  </AccordionDetails>
                </Accordion>
                <Accordion
                  sx={{
                    maxWidth: '80ch',
                    minHeight: '8ch',
                  }}
                  expanded={expanded === "panel3"}
                  onChange={handleChange("panel3")}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3bh-content"
                    id="panel3bh-header"
                  >

                    <div className="value-accordian">
                      <Typography className="value-accordian-header" sx={{ flexShrink: 0 }}>
                        Social Impact
                      </Typography>
                      <Typography className="value-accordian-content" sx={{ color: "text.secondary" }}>
                        How does your company have/aim to have a positive social
                        impact?
                      </Typography>
                    </div>
                  </AccordionSummary>
                  <AccordionDetails>
                    <TextField
                      id="filled-multiline-static"
                      //color="secondary"
                      label="Response"
                      multiline
                      rows={4}
                      name="socImp"
                      value={applicationInfo.socImp}
                      onChange={handleInput}
                      disabled={!applicationInfo.validCode}
                    />
                  </AccordionDetails>
                </Accordion>
                <Accordion
                  sx={{
                    maxWidth: '80ch',
                    minHeight: '8ch',
                  }}
                  expanded={expanded === "panel4"}
                  onChange={handleChange("panel4")}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel4bh-content"
                    id="panel4bh-header"
                  >

                    <div className="value-accordian">
                      <Typography className="value-accordian-header" sx={{ flexShrink: 0 }}>
                        Mentorship
                      </Typography>
                      <Typography className="value-accordian-content" sx={{ color: "text.secondary" }}>
                        How do opportunities with your company facilitate
                        professional growth and mentorship?
                      </Typography>
                    </div>
                  </AccordionSummary>
                  <AccordionDetails>
                    <TextField
                      id="filled-multiline-static"
                      //color="secondary"
                      label="Response"
                      multiline
                      rows={4}
                      name="mentor"
                      value={applicationInfo.mentor}
                      onChange={handleInput}
                      disabled={!applicationInfo.validCode}
                    />
                  </AccordionDetails>
                </Accordion>
              </Box>
            </div>
            <br></br>
            <div>
              <Typography variant="h6">
                <b>Current Openings</b>
                <div style={{ maxWidth: "90%" }}>
                  <FormControl
                    component="fieldset"
                    disabled={!applicationInfo.validCode}
                  >
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Switch
                            //color="secondary"
                            checked={showForm}
                            onChange={handleToggle}
                          />
                        }
                        label="Would you like to advertise current open positions through IPP?"
                      />
                    </FormGroup>
                  </FormControl>
                  <br />
                  {showForm && (
                    <>
                      <br></br>
                      <Button
                        variant="contained"
                        //color="secondary"
                        endIcon={<AddIcon />}
                        onClick={addPosition}
                      >
                        Add Position
                      </Button>
                      <br />
                      <br></br>
                      {Object.values(applicationInfo.current).map((elt, ind) => {
                        return (
                          elt.active && (
                            <div key={`current-position-${ind}`}>
                              <Card
                                variant="outlined"
                                style={{ backgroundColor: "#193AA5" }}
                                sx={{ minWidth: isBrowser ? "60ch" : "50%", maxWidth: isBrowser ? "65ch" : "100%" }}
                              >
                                <CardContent>
                                  <Box
                                    component="form"
                                    sx={{
                                      "& .MuiTextField-root": {
                                        m: 2,
                                        width: isBrowser ? "28.623ch" : "90%",
                                      },
                                    }}
                                    noValidate
                                    autoComplete="off"
                                  >
                                    <PositionTextField
                                      id="filled-multiline-static"
                                      label="Job Title"
                                      //color="secondary"
                                      variant="filled"
                                      name="jobTitle"
                                      value={elt.jobTitle}
                                      onChange={(e) => updateJobInfo(e, ind)}
                                      disabled={!applicationInfo.validCode}
                                    />
                                    <PositionTextField
                                      inputProps={{
                                        inputMode: 'numeric',
                                      }}
                                      id="filled-multiline-static"
                                      label="Compensation Range"
                                      //color="secondary"
                                      variant="filled"
                                      name="compensationRange"
                                      value={elt.compensationRange}
                                      onChange={(e) => updateJobInfo(e, ind)}
                                      disabled={!applicationInfo.validCode}
                                    />
                                  </Box>
                                  <Box
                                    component="form"
                                    sx={{
                                      "& .MuiTextField-root": {
                                        m: 2,
                                        width: isBrowser ? "28.623ch" : "90%",
                                      },
                                    }}
                                    noValidate
                                    autoComplete="off"
                                  >
                                    {/* <PositionTextField
                                    id="filled-multiline-static"
                                    label="Start Date"
                                    //color="secondary"
                                    variant="filled"
                                    name="startDate"
                                    value={elt.startDate}
                                    onChange={(e) => updateJobInfo(e, ind)}
                                    disabled={!applicationInfo.validCode}
                                  /> */}
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                      <DatePicker
                                        label="Start Date"
                                        name="startDate"
                                        defaultValue={null}
                                        value={startDate}
                                        onChange={(date) => {
                                          setStartDate(date);
                                          updateJobInfoDate(date, ind, "startDate");
                                        }}
                                        renderInput={(params) => <PositionTextField variant="filled" {...params} />}
                                      />
                                    </LocalizationProvider>
                                    {/* <PositionTextField
                                    id="filled-multiline-static"
                                    label="End Date"
                                    //color="secondary"
                                    name="endDate"
                                    variant="filled"
                                    value={elt.endDate}
                                    onChange={(e) => updateJobInfo(e, ind)}
                                    disabled={!applicationInfo.validCode}
                                  /> */}
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                      <DatePicker
                                        label="End Date"
                                        name="endDate"
                                        defaultValue={null}
                                        value={endDate}
                                        onChange={(date) => {
                                          setEndDate(date);
                                          updateJobInfoDate(date, ind, "endDate");
                                        }}
                                        renderInput={(params) => <PositionTextField variant="filled" {...params} />}
                                      />
                                    </LocalizationProvider>
                                  </Box>

                                  <Box
                                    component="form"
                                    sx={{
                                      "& .MuiTextField-root": {
                                        m: 2,
                                        width: isBrowser ? "60ch" : "90%",
                                      },
                                    }}
                                    noValidate
                                    autoComplete="off"
                                  >
                                    <Autocomplete
                                      multiple
                                      freeSolo
                                      id="outlined-multiline-flexible"
                                      options={locationOptions}
                                      value={elt.locations}
                                      defaultValue={[]}
                                      disabled={!applicationInfo.validCode}
                                      onChange={(e, v) => updateJobInfoArray(e, ind, "locations", v)}
                                      renderInput={params => (
                                        <PositionTextField
                                          {...params}
                                          id="outlined-textarea"
                                          // id="filled-multiline-static"
                                          label="Locations"
                                          placeholder="Hit Enter to add a new location"
                                          //color="secondary"
                                          name="locations"
                                          variant="filled"
                                          value={elt.locations}
                                          // onChange={(e) => updateJobInfo(e, ind)}
                                          disabled={!applicationInfo.validCode}
                                        />
                                      )}
                                    />

                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                      <DatePicker
                                        label="Deadline"
                                        name="deadline"
                                        defaultValue={null}
                                        value={deadline}
                                        onChange={(date) => {
                                          setDeadline(date);
                                          updateJobInfoDate(date, ind, "deadline");
                                        }}
                                        renderInput={(params) => <PositionTextField variant="filled" {...params} />}
                                      />
                                    </LocalizationProvider>
                                    {/* <PositionTextField
                                    id="filled-multiline-static"
                                    label="Deadline"
                                    //color="secondary"
                                    variant="filled"
                                    name="deadline"
                                    value={elt.deadline}
                                    onChange={(e) => updateJobInfo(e, ind)}
                                    disabled={!applicationInfo.validCode}
                                  /> */}
                                  </Box>
                                  <Box
                                    component="form"
                                    sx={{
                                      "& .MuiTextField-root": {
                                        m: 2,
                                        width: isBrowser ? "60ch" : "90%",
                                      },
                                    }}
                                    noValidate
                                    autoComplete="off"
                                  >
                                    <Autocomplete
                                      multiple
                                      freeSolo
                                      id="outlined-multiline-flexible"
                                      options={[]}
                                      value={elt.skillsQual}
                                      defaultValue={[]}
                                      disabled={!applicationInfo.validCode}
                                      onChange={(e, v) => updateJobInfoArray(e, ind, "skillsQual", v)}
                                      renderInput={params => (
                                        <PositionTextField
                                          {...params}
                                          id="filled-multiline-static"
                                          // id="outlined-textarea"
                                          label="Skills and Qualifications"
                                          placeholder="Hit Enter to add a new skill/qualification"
                                          //color="secondary"
                                          name="skillsQual"
                                          variant="filled"
                                          value={elt.skillsQual}
                                          disabled={!applicationInfo.validCode}
                                        />
                                      )}
                                    />
                                  </Box>
                                  <Box
                                    component="form"
                                    sx={{
                                      "& .MuiTextField-root": {
                                        m: 2,
                                        width: isBrowser ? "60ch" : "90%",
                                      },
                                    }}
                                    noValidate
                                    autoComplete="off"
                                  >
                                    <PositionTextField
                                      id="filled-multiline-static"
                                      multiline
                                      rows={2}
                                      label="How to Apply"
                                      //color="secondary"
                                      name="howApply"
                                      variant="filled"
                                      value={elt.howApply}
                                      onChange={(e) => updateJobInfo(e, ind)}
                                      disabled={!applicationInfo.validCode}
                                    />
                                  </Box>
                                  <div>
                                    <FormControlLabel
                                      style={{ color: 'white' }}
                                      control={
                                        <Checkbox
                                          defaultChecked
                                          color="secondary"
                                          name="remote"
                                          value={elt.remote}
                                          onChange={(event, checked) => {
                                            event.preventDefault();
                                            setApplicationInfo({
                                              ...applicationInfo,
                                              current: {
                                                ...applicationInfo.current,
                                                [ind]: {
                                                  ...applicationInfo.current[ind],
                                                  [event.target.name]: checked,
                                                },
                                              },
                                            });
                                          }}
                                          disabled={!applicationInfo.validCode}
                                        />
                                      }
                                      label="Remote"
                                    />
                                    <FormControlLabel
                                      style={{ color: 'white' }}
                                      control={
                                        <Checkbox
                                          defaultChecked
                                          color="secondary"
                                          name="remote"
                                          value={elt.remote}
                                          onChange={(event, checked) => {
                                            event.preventDefault();
                                            setApplicationInfo({
                                              ...applicationInfo,
                                              current: {
                                                ...applicationInfo.current,
                                                [ind]: {
                                                  ...applicationInfo.current[ind],
                                                  [event.target.name]: checked,
                                                },
                                              },
                                            });
                                          }}
                                          disabled={!applicationInfo.validCode}
                                        />
                                      }
                                      label="Hybrid"
                                    />
                                    <FormControlLabel
                                      style={{ color: 'white' }}
                                      control={
                                        <Checkbox
                                          defaultChecked
                                          color="secondary"
                                          name="remote"
                                          value={elt.remote}
                                          onChange={(event, checked) => {
                                            event.preventDefault();
                                            setApplicationInfo({
                                              ...applicationInfo,
                                              current: {
                                                ...applicationInfo.current,
                                                [ind]: {
                                                  ...applicationInfo.current[ind],
                                                  [event.target.name]: checked,
                                                },
                                              },
                                            });
                                          }}
                                          disabled={!applicationInfo.validCode}
                                        />
                                      }
                                      label="In-person"
                                    />
                                  </div>
                                  <Button
                                    variant="outlined"
                                    color="secondary"
                                    endIcon={<DeleteIcon />}
                                    onClick={() => {
                                      setApplicationInfo({
                                        ...applicationInfo,
                                        current: {
                                          ...applicationInfo.current,
                                          [ind]: {
                                            ...applicationInfo.current[ind],
                                            active: false
                                          }
                                        },
                                      });
                                      console.log(applicationInfo)
                                    }}
                                  >
                                    Delete
                                  </Button>
                                </CardContent>
                              </Card>
                              <br />
                            </div>
                          )
                        );
                      })}
                    </>
                  )}
                </div>
              </Typography>
            </div>

            <div>
              <br></br>
              <Typography variant="h6">
                <b>Future Hiring Timeline</b>
              </Typography>

              <Typography variant="body2">
                Optionally include more information here so we can keep an eye out
                for future roles.
              </Typography>
              <Box
                component="form"
                sx={{
                  "& .MuiTextField-root": { m: 1, width: isBrowser ? "60ch" : "90%" },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  id="filled-multiline-static"
                  //color="secondary"
                  multiline
                  rows={4}
                  name="future"
                  value={applicationInfo.future}
                  onChange={handleInput}
                  disabled={!applicationInfo.validCode}
                />
              </Box>
              <br></br>
              <Button
                variant="contained"
                color={errors.validation ? "error" : "primary"}
                onClick={submitForm}
                disabled={!applicationInfo.validCode}
              >
                <b>Submit</b>
              </Button>
              {/* <Button onClick={() => console.log(applicationInfo)}> // for testing purposes
              Check Application
            </Button> */}
              {errors.validation && (
                <Snackbar
                  open={errors.validation}
                  autoHideDuration={9000}
                  anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                  onClose={() => setErrors({ ...errors, validation: false })}
                  action={() => console.log("action")}
                >
                  <Alert severity="error" sx={{ width: "100%" }}>
                    Please fill out all parts of the form!
                  </Alert>
                </Snackbar>
              )}
              {errors.verification && (
                <Snackbar
                  open={errors.verification}
                  autoHideDuration={9000}
                  onClose={() => setErrors({ ...errors, verification: false })}
                  anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                >
                  <Alert severity="error" sx={{ width: "100%" }}>
                    Issue submitting the application, please try again!
                  </Alert>
                </Snackbar>
              )}
              {errors.submitSuccess && (
                <Snackbar
                  open={errors.submitSuccess}
                  onClose={() => setErrors({ ...errors, submitSuccess: false })}
                  anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                >
                  <Alert
                    onClose={() => setErrors({ ...errors, submitSuccess: false })}
                    severity="success"
                    sx={{ width: "100%" }}
                  >
                    Application successfully submitted!
                  </Alert>
                </Snackbar>
              )}
              <br></br>
              <br></br>
            </div>
          </div>
        </div>
      </ThemeProvider>
    </>
  );
}