import FileUpload from "./FileUpload";
import Form from "./Form";
import { Button, Paper, Typography } from "@mui/material";

const Home = () => {
  return (
    <>
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "95vh",
          // borderRadius: "12px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}>
        <Typography
          variant="h3"
          style={{
            fontFamily: "Poppins",
            fontWeight: "500",
            color: "inherit",
            textDecoration: "none",
            margin: "2rem",
          }}>
          Add User
        </Typography>
        <Paper
          // elevation={3}
          style={{
            position: "relative",
            width: "40rem",
            borderRadius: "12px",
            //   margin: "4rem",
            padding: "1rem 0rem 1rem 1rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}>
          <FileUpload />
        
        </Paper>
      </div>
    </>
  );
};

export default Home;
