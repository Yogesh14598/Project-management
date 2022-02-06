import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
// import Button from "../../components/Others/Button";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import Loader from "../../components/Others/Loader";
import axios from "axios";
import { useLocation } from "react-router";
import { toast } from "react-toastify";
import ReactPaginate from "react-paginate";
import "react-toastify/dist/ReactToastify.css";
import Message from "../Others/Message";
import { BASE_URL } from "../../config";

const ClientList = () => {
  toast.configure();
  const [loading, setLoading] = useState(true);
  const [clientList, setClientList] = useState([]);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [searchbar, setsearchbar] = useState("");
  const [showsearchnbtncond, setshowsearchnbtncond] = useState(true);

  const url = `${BASE_URL}/admin/project-management/clients`;

  let token = localStorage.getItem("auth_token");

  //getting clients
  useEffect(() => {
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          "Access-Control-Allow-Headers":
            "Origin, X-Requested-With, Content-Type,Accept, x-client-key, x-client-token, x-client-secret, Authorization",
        },
      })
      .then((response) => {
        console.log(response.data.clients);
        setClientList(response.data.clients);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token]);

  const deleteClientHandler = (id) => {
    const todelete = window.confirm("Are you sure you want to delete ?");
    if (todelete) {
      axios
        .delete(`${BASE_URL}/admin/project-management/clients/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
            "Access-Control-Allow-Headers":
              "Origin, X-Requested-With, Content-Type,Accept, x-client-key, x-client-token, x-client-secret, Authorization",
          },
        })
        .then(() => {
          console.log("Client Deleted Succesfully");
          setTimeout(function () {
            window.location.reload(false);
          }, 2000);
          toast("Client Deleted Succesfully", { type: "success" });
        })
        .catch((error) => {
          console.log(error);
          setError(true);
          setErrorMessage(error.response.data.message);
        });
    }
  };

  //pagination

  const [currentPage, setCurrentPage] = useState(0);

  const PER_PAGE = 5;

  const offset = currentPage * PER_PAGE;

  const pageCount = Math.ceil(clientList.length / PER_PAGE);

  function handlePageClick({ selected: pageIndex }) {
    if (pageIndex + 1 == "1") {
      setshowsearchnbtncond(true);
    } else {
      setshowsearchnbtncond(false);
    }
    setCurrentPage(pageIndex);
  }

  const Showsearchnbtn = () => (
    <div className="">
      <h6></h6>
      <img src="/images/Icon awesome-filter.svg" className="mx-3" />

      <input
        type="text"
        placeholder="Search...."
        autoFocus
        value={searchbar}
        style={{
          border: "1px solid darkgray",
          padding: "3px 5px",
          borderRadius: "5px",
        }}
        onChange={(e) => {
          setsearchbar(e.target.value);
        }}
      />
    </div>
  );

  return (
    <>
      <hr />
      <div className="searchbar">
        {showsearchnbtncond ? <Showsearchnbtn /> : null}
      </div>
      {error && <Message variant="danger">{errorMessage}</Message>}
      <div style={{ overflow: "hidden", Margin: "10px 0" }}>
        <Table striped hover>
          <thead>
            <tr>
              <th>SI NO</th>
              <th>Client Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th> Source of Lead </th>
              <th> Action </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <Loader />
            ) : (
              clientList
                .filter((item) => {
                  if (searchbar == "") {
                    return item;
                  } else if (
                    item.firstName
                      .toLowerCase()
                      .includes(searchbar.toLowerCase())
                  ) {
                    return item;
                  }
                })
                .map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.firstName + " " + item.lastName}</td>
                    <td> {item.email}</td>
                    <td>{item.phone} </td>
                    <td>{item.sourceOfLead}</td>
                    <td>
                      <div className="editDelete">
                        <Link
                          to={`/clientDetails/${item.id}`}
                          className="signuplinks"
                        >
                          <Button variant="danger" size="sm">
                            View Details
                          </Button>
                        </Link>
                      </div>
                    </td>
                    <td>
                      <DeleteIcon
                        style={{ color: "red", cursor: "pointer" }}
                        onClick={() => deleteClientHandler(item.id)}
                      />
                    </td>
                  </tr>
                ))
                .slice(offset, offset + PER_PAGE)
            )}
          </tbody>
        </Table>
        <ReactPaginate
          previousLabel={"← Previous"}
          nextLabel={"Next →"}
          pageCount={pageCount}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          previousLinkClassName={"pagination__link"}
          nextLinkClassName={"pagination__link"}
          disabledClassName={"pagination__link--disabled"}
          activeClassName={"pagination__link--active"}
        />
      </div>
    </>
  );
};

export default ClientList;
