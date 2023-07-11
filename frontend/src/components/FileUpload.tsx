import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import { useNavigate } from "react-router-dom";
import Form from "./Form";
const FileUpload = () => {
  const [file, setFile] = useState<any>();
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState({
    name: "",
    emial: "",
    mobile_no: "",
    address: "",
  });
  const navigate = useNavigate();
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    axios
      .post("http://127.0.0.1:8000/parse_data/", formData, config)
      .then((res: any) => {
        console.log(res);
        setValues(res.data.result);
        // setOpen(true);
        // setInterval(() => {
        //   navigate("/list");
        // }, 2000);
      });
  };
  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    console.log(event);
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          // height: "90vh",
          flexDirection: "column",
          gap: "1rem",
        }}>
        <form
          style={{
            padding: "1rem",
            backgroundColor: "#ffd0d08f",
            borderRadius: "10px",
            display: "flex",
            // flexDirection: "column",
            gap: "2rem",
          }}
          method="post"
          encType="multipart/form-data">
          <div style={{ display: "flex", alignItems: "center" }}>
            <Typography
              variant="h6"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                color: "inherit",
                textDecoration: "none",
              }}>
              File:
            </Typography>
            <input
              id="file"
              name="file"
              type="file"
              onChange={(e: any) => {
                setFile(e.target.files[0]);
              }}
            />
          </div>
          <Button variant="contained" onClick={handleSubmit}>
            Upload
          </Button>
        </form>
        <Snackbar
          open={open}
          autoHideDuration={2000}
          onClose={handleClose}
          message="Data added successfully"
          // action={action}
        />
      </div>
      <Form values={values} setValues={setValues} setOpen={setOpen} />
    </>
  );
};

export default FileUpload;
