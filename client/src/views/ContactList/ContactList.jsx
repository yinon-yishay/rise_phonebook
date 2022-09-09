import { useState, useEffect, useReducer } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";

import httpRequest from "../../utils/httpRequest/httpRequest";

import "./contact-list.scss";

import text from "../../utils/language/text.json";

const ContactList = ({ page }) => {
  const [data, setData] = useState([]);
  const [_, forceUpdate] = useReducer((x) => x + 1, 0);

  useEffect(() => {
    httpRequest
      .get(`/contacts?page=${page - 1}`)
      .then((res) => setData(res.data));
  }, [page]);

  const getColSpan = {
    "First name": 1,
    "Last name": 1,
    "Phone number": 2,
    Address: 5,
    Delete: 1,
    Edit: 1,
  };
  const getRowSpan = {
    "First name": 2,
    "Last name": 2,
    "Phone number": 1,
    Address: 1,
    Delete: 2,
    Edit: 2,
  };

  const mergeSubTitle = [...text.phoneSubTitle, ...text.addressSubTitle];

  const onDelete = (item) => {
    httpRequest.del(`/contacts/${item.contactID}`).then(
      httpRequest.get(`/contacts?page=${page - 1}`).then((res) => {
        setData(res.data);
      })
    );
  };

  return (
    <div className="table-container">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {text.gridTitle.map((item) => {
                return (
                  <TableCell
                    align="center"
                    sx={{ border: "1px solid #c4c4c4" }}
                    key={item}
                    colSpan={getColSpan[item]}
                    rowSpan={getRowSpan[item]}
                  >
                    {item}
                  </TableCell>
                );
              })}
            </TableRow>
            <TableRow>
              {mergeSubTitle.map((item, index) => {
                return (
                  <TableCell
                    align="center"
                    sx={{ border: "1px solid #c4c4c4" }}
                    key={`${item}${index}`}
                  >
                    {item}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((item) => (
              <TableRow
                key={item?.contactID}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell sx={{ border: "1px solid #c4c4c4" }} align="center">
                  {item?.firstName}
                </TableCell>
                <TableCell sx={{ border: "1px solid #c4c4c4" }} align="center">
                  {item?.lastName}
                </TableCell>
                <TableCell sx={{ border: "1px solid #c4c4c4" }} align="center">
                  {item?.phone?.length ? item.phone[0].description : ""}
                </TableCell>
                <TableCell sx={{ border: "1px solid #c4c4c4" }} align="left">
                  {item?.phone?.length ? item.phone[0].phone_number : ""}
                </TableCell>
                <TableCell sx={{ border: "1px solid #c4c4c4" }} align="center">
                  {item?.address?.length ? item.address[0].description : ""}
                </TableCell>
                <TableCell sx={{ border: "1px solid #c4c4c4" }} align="left">
                  {item?.address?.length ? item.address[0].city : ""}
                </TableCell>
                <TableCell sx={{ border: "1px solid #c4c4c4" }} align="left">
                  {item?.address?.length ? item.address[0].street : ""}
                </TableCell>
                <TableCell sx={{ border: "1px solid #c4c4c4" }} align="center">
                  {item?.address?.length ? item.address[0].home_number : ""}
                </TableCell>
                <TableCell sx={{ border: "1px solid #c4c4c4" }} align="center">
                  {item?.address?.length ? item.address[0].apartment : ""}
                </TableCell>
                <TableCell sx={{ border: "1px solid #c4c4c4" }} align="center">
                  <Button
                    style={{ textTransform: "none" }}
                    variant="contained"
                    startIcon={<DeleteIcon />}
                    onClick={() => onDelete(item)}
                  >
                    {text.delete}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ContactList;
