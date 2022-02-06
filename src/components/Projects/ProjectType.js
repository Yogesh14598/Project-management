import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Dropdown, Table } from "react-bootstrap";
import "font-awesome/css/font-awesome.min.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Header from "../../components/Others/Header";
import Sidebar from "../../components/Others/Sidebar";
import Message from "../../components/Others/Message";
import qs from "qs";
import { useLocation } from "react-router";
import { toast } from "react-toastify";
import { BASE_URL } from "../../config";
import ReactPaginate from "react-paginate";

const ProjectType = () => {
  const location = useLocation();

  const id = location.pathname.split("/")[2];

  const url = `${BASE_URL}/admin/masterMenu/projectTypes`;
  const [inpprojecttype, setinpprojecttype] = useState({
    name: "",
  });

  let token = localStorage.getItem("auth_token");
  const [ProjectType, setProjectType] = useState([]);
  const [searchbar, setsearchbar] = useState("");
  const [error, setError] = useState(false);
  const [showerrormsg, setshowerrormsg] = useState();
  const [showsearchnbtncond, setshowsearchnbtncond] = useState(true);
  const [showResults, setshowResults] = useState(false);
  var emptyfeild = /^$|^.*@.*\..*$/;
  const searchonchange = (e) => {
    setsearchbar(e.target.value);
  };

  useEffect(() => {
    axios
      .get(`${BASE_URL}/admin/master-menu/project-types`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      })
      .then((response) => {
        console.log(response, "statusresp");
        console.log(response.data);
        setProjectType(response.data.projectTypes);
      })
      .catch((error) => {
        console.log("fail");
      });
  }, [token]);

  const deleteHandler = (id) => {
    setshowResults("false");
    const todelete = window.confirm("Are you sure you want to delete ?");
    if (todelete) {
      axios
        .delete(`${BASE_URL}/admin/master-menu/project-types/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
            "Access-Control-Allow-Headers":
              "Origin, X-Requested-With, Content-Type,Accept, x-client-key, x-client-token, x-client-secret, Authorization",
          },
        })
        .then((response) => {
          console.log("Deleted Successfully");
          setTimeout(function () {
            window.location.reload(false);
          }, 2000);
          toast("Deleted successfully", { type: "success" });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const updateHandler = (id) => {
    setshowResults("true");
    localStorage.setItem("idvalue", `${id}`);

    axios
      .get(`${BASE_URL}/admin/master-menu/project-types/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      })
      .then((response) => {
        console.log(response.data);

        setinpprojecttype({ name: response.data.projectType.name });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const projecttypechanges = (event) => {
    event.preventDefault();

    axios
      .post(
        `${BASE_URL}/admin/master-menu/project-types`,
        qs.stringify(inpprojecttype),
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response);
        console.log("success");

        setTimeout(function () {
          window.location.reload(false);
        }, 2000);
        if (response.status == 201) {
          toast("Successfully Added", { type: "success" });
        }
      })

      .catch((error) => {
        console.error("There was an error!", error.response);
        localStorage.setItem("errorstatus", error.response.data.errors.name);
        let errorstatus = localStorage.getItem("errorstatus");
        toast(errorstatus, { type: "error" });
        setshowerrormsg(errorstatus);
        setError(true);
        setTimeout(() => setError(false), 3000);
      });
  };
  const handleupdatevaal = (e) => {
    setinpprojecttype({
      ...inpprojecttype,
      [e.target.name]: e.target.value,
    });
  };
  let idvalue = localStorage.getItem("idvalue");
  const urlput = `${BASE_URL}/admin/masterMenu/projectTypes/${idvalue}`;

  const updatethevalue = () => {
    axios
      .put(urlput, qs.stringify(inpprojecttype), {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      })
      .then((response) => {
        console.log("update");
        console.log(response);

        if (response.status == 201) {
          toast("Successfully Updated", { type: "success" });
        } else {
          toast("the given data was invalid ", { type: "error" });
        }

        setTimeout(function () {
          window.location.reload(false);
        }, 2000);
      })

      .catch((error) => {
        console.error("There was an error!", error);
        console.log("error");
        console.log("not update");
        console.log(error, "errordata");
      });
  };
  const [currentPage, setCurrentPage] = useState(0);

  const PER_PAGE = 4;

  const offset = currentPage * PER_PAGE;

  const pageCount = Math.ceil(ProjectType.length / PER_PAGE);

  function handlePageClick({ selected: pageIndex }) {
    if (pageIndex + 1 == "1") {
      setshowsearchnbtncond(true);
    } else {
      setshowsearchnbtncond(false);
    }

    setCurrentPage(pageIndex);
  }

  return (
    <div>
      <div className="Proj_main">
        <div className="Proj_main_l">
          <Sidebar
           
          />
        </div>

        <div className="Proj_main_r">
          <Header />
          <div className="projectType_sec">
            <h3 style={{ fontSize: "23px", fontWeight: "700" }}>
              Project Type
            </h3>
            <hr />
            {/* {error && <Message variant="danger">{showerrormsg}</Message>}  */}
            <h5
              className="projectheadline"
              style={{
                marginBottom: "0%",
                fontSize: "18px",
                fontWeight: "600",
                color: "#F23801",
              }}
            >
              Add Project Type
            </h5>

            <input
              type="text"
              style={{
                border: "1px solid darkgray",
                padding: "3px 5px",
                borderRadius: "5px",
              }}
              className="projectype_inp"
              name="name"
              value={inpprojecttype.name}
              onChange={handleupdatevaal}
            />
            {showResults ? (
              <button className="btn_val" onClick={updatethevalue}>
                Update
              </button>
            ) : (
              <button className="btn_val" onClick={projecttypechanges}>
                Add
              </button>
            )}

            <hr />
            <div className="searchbar">
              {showsearchnbtncond ? (
                <div className="">
                  <img src="/images/Icon awesome-filter.svg" class="mx-3" />
                  <input
                    type="text"
                    placeholder="Search"
                    value={searchbar}
                    style={{
                      border: "1px solid darkgray",
                      padding: "3px 5px",
                      borderRadius: "5px",
                    }}
                    onChange={searchonchange}
                  />
                  <hr />
                </div>
              ) : null}
            </div>

            <Table striped hover responsive>
              <thead>
                <tr>
                  <th>SI NO</th>
                  <th>Project Type</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {ProjectType.filter((item) => {
                  if (searchbar == "") {
                    return item;
                  } else if (
                    item.name?.toLowerCase().includes(searchbar.toLowerCase())
                  ) {
                    return item;
                  }
                })
                  .map((item, index) => {
                    return (
                      <>
                        <tr key={item.id}>
                          <td>{index + 1}</td>
                          <td>{item.name}</td>
                          <td>
                            <EditIcon
                              style={{ cursor: "pointer" }}
                              onClick={() => updateHandler(item.id)}
                            />
                            <DeleteIcon
                              style={{ color: "#F23801", cursor: "pointer" }}
                              onClick={() => deleteHandler(item.id)}
                            />
                          </td>
                        </tr>
                      </>
                    );
                  })
                  .slice(offset, offset + PER_PAGE)}
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
        </div>
      </div>
    </div>
  );
};

export default ProjectType;
