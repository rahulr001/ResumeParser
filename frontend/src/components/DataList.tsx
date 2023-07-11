import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import axios from "axios";
import { IconButton } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";

export default function DataList() {
  const [rows, setRows] = React.useState();
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const navigate = useNavigate();
  const columns: GridColDef[] = [
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <div
          style={{
            display: "flex",
            gap: ".5rem",
          }}
        >
          <IconButton
            sx={{ boxShadow: 0, color: "green" }}
            size="small"
            aria-label="edit"
            onClick={() => {
              handleEdit(params.row.id, params.row);
            }}
          >
            <SaveIcon />
          </IconButton>
          <IconButton
            sx={{ boxShadow: 0, color: "red" }}
            size="small"
            aria-label="edit"
            onClick={() => {
              handleDelete(params.row.id);
            }}
          >
            <DeleteForeverIcon />
          </IconButton>
        </div>
      ),
    },
    { field: "id", headerName: "ID", width: 240 },
    {
      field: "name",
      headerName: "Name",
      width: 150,
      editable: true,
    },

    {
      field: "email",
      headerName: "Email",

      width: 220,
      editable: true,
    },
    {
      field: "mobile_no",
      headerName: "Mobile NO",
      // sortable: false,
      width: 180,
      editable: true,
    },
    {
      field: "address",
      headerName: "Address",
      // sortable: false,
      width: 180,
      editable: true,
    },
  ];

  const handleGet = () => {
    axios.get("http://127.0.0.1:8000").then((res) => {
      console.log(res);
      setRows(res.data);
    });
  };

  React.useEffect(() => {
    handleGet();
  }, []);
  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    console.log(event)
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const handleDelete = (id: any) => {
    axios.delete(`http://127.0.0.1:8000/delete/${id}`).then((res) => {
      console.log(res);
      setMessage("Data deleted successfully");
      setOpen(true);
      setInterval(() => {
        navigate(0);
      }, 2000);
    });
  };
  const handleEdit = (id: any, params: any) => {
    const values = {
      name: params.name,
      email: params.email,
      mobile_no: params.mobile_no,
    };
    console.log(params);
    axios.put(`http://127.0.0.1:8000/update/${id}`, values).then((res) => {
      console.log(res);
      setMessage("Data updated successfully");
      setOpen(true);
      setInterval(() => {
        navigate(0);
      }, 2000);
    });
  };
  return (
    <Box
      sx={{
        height: "90vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box sx={{ height: 400, width: "70%" }}>
        <DataGrid
          rows={rows ? rows : []}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          editMode="row"
          //   onRowEditCommit={handleEdit}

          //   checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        message={message}
        // action={action}
      />
    </Box>
  );
}
