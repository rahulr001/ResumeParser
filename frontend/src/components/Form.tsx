import { Button, Typography } from "@mui/material";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { Grid } from "@mui/material";
import { FormInputs, TextValidatorStyle, TypographyStyles } from "../constants";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreateUser = ({ values, setValues, setOpen }: any) => {
  const navigate = useNavigate();
  console.log("value", values);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setValues((preVal: any) => {
      return {
        ...preVal,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    axios.post("http://127.0.0.1:8000/add_data/", values).then((res: any) => {
      console.log(res);
      setValues(res.data.result);
      setOpen(true);
      setInterval(() => {
        navigate("/list");
      }, 2000);
    });
  };
  return (
    <ValidatorForm
      onSubmit={handleSubmit}
      onError={(errors: any) => console.log(errors)}>
      <Grid
        container
        spacing={2}
        xs={20}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "12px",
          },
          "& .MuiTextValidator-root": {},
          padding: "2.5rem 0rem 2rem 4rem",
        }}>
        {FormInputs.map((inputs) => (
          <Grid item xs={5}>
            <Typography style={TypographyStyles}>{inputs.label}</Typography>
            <TextValidator
              id="outlined-basic"
              variant="outlined"
              value={values[inputs.name]}
              onChange={handleChange}
              name={inputs.name}
              required={true}
              style={{
                width: "225px",
                // marginTop: "0.5rem",
              }}
              sx={TextValidatorStyle}
            />
          </Grid>
        ))}

        <Grid item xs={3}>
          <Button
            variant="contained"
            type="submit"
            style={{
              fontFamily: "Poppins",
              padding: ".5rem 3rem",
              margin: "2rem 0rem 0rem 2rem",
            }}>
            Submit
          </Button>
        </Grid>
      </Grid>
    </ValidatorForm>
  );
};

export default CreateUser;
