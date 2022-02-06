import React, { useState, useEffect } from "react";
import Header from "../../components/Others/Header";
import Sidebar from "../../components/Others/Sidebar";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { Table, Button } from "react-bootstrap";
import Loader from "../../components/Others/Loader";
import ClientsList from "../../components/Clients/ClientsList";
import { Link } from "react-router-dom";
import ButtonIcon from "../../components/Others/ButtonIcon";
import { useLocation } from "react-router";
import DeleteIcon from "@mui/icons-material/Delete";
import ReactPaginate from "react-paginate";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import RestoreIcon from "@mui/icons-material/Restore";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Message from "../Others/Message";
import { BASE_URL } from "../../config";

function Projects() {
  toast.configure();

  let token = localStorage.getItem("auth_token");

  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [searchbar, setsearchbar] = useState("");
  const [projectstatusupdates, setprojectstatusupdates] = useState("");
  const [showsearchnbtncond, setshowsearchnbtncond] = useState(true);

  const location = useLocation();

  const id = location.pathname.split("/")[2];

  //getting project Types

  const [proTypes, setproTypes] = useState([]);
  console.log(projectstatusupdates, "projectstatusupdates");

  useEffect(() => {
    axios
      .get(`${BASE_URL}/admin/master-menu/project-types`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          "Access-Control-Allow-Headers":
            "Origin, X-Requested-With, Content-Type,Accept, x-client-key, x-client-token, x-client-secret, Authorization",
        },
      })
      .then((response) => {
        setproTypes(response.data.projectTypes);

        setLoading(false);
        console.log(response.data.projectTypes);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token]);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/admin/project-management/projects`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          "Access-Control-Allow-Headers":
            "Origin, X-Requested-With, Content-Type,Accept, x-client-key, x-client-token, x-client-secret, Authorization",
        },
      })
      .then((response) => {
        console.log(response.data, "projects");
        setProjects(response.data.projects);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token]);

  //delete projects

  const deleteHandler = (id) => {
    const todelete = window.confirm("Are you sure you want to delete ?");
    if (todelete) {
      axios
        .delete(`${BASE_URL}/admin/project-management/projects/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
            "Access-Control-Allow-Headers":
              "Origin, X-Requested-With, Content-Type,Accept, x-client-key, x-client-token, x-client-secret, Authorization",
          },
        })
        .then((response) => {
          setLoading(false);
          console.log("Project Deleted Succesfully");
          setTimeout(function () {
            window.location.reload(false);
          }, 2000);
          toast("Project Deleted Succesfully", { type: "success" });
        })
        .catch((error) => {
          console.log(error);
          setError(true);
          setErrorMessage(error.response.data.message);
        });
    }
  };

  //trash projects

  const projectstatusupdate = (e) => {
    setprojectstatusupdates(e.target.value);
  };

  const trashHandler = (id) => {
    const todelete = window.confirm("Are you sure you want to trash ?");
    if (todelete) {
      axios
        .delete(`${BASE_URL}/admin/project-management/projects/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
            "Access-Control-Allow-Headers":
              "Origin, X-Requested-With, Content-Type,Accept, x-client-key, x-client-token, x-client-secret, Authorization",
          },
        })
        .then((response) => {
          setLoading(false);
          console.log("Project Trashed Succesfully");
          setTimeout(function () {
            window.location.reload(false);
          }, 2000);
          toast("Project Trashed Succesfully", { type: "success" });
        })
        .catch((error) => {
          console.log(error);
          setError(true);
          setErrorMessage(error.response.data.message);
        });
    }
  };

  //restore projects

  const restoreHandler = (id) => {
    const todelete = window.confirm("Are you sure you want to restore ?");
    if (todelete) {
      axios
        .get(`${BASE_URL}/admin/project-management/projects/${id}/restore`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
            "Access-Control-Allow-Headers":
              "Origin, X-Requested-With, Content-Type,Accept, x-client-key, x-client-token, x-client-secret, Authorization",
          },
        })
        .then((response) => {
          setLoading(false);
          console.log("Project Restored Succesfully");
          setTimeout(function () {
            window.location.reload(false);
          }, 2000);
          toast("Project Restored Succesfully", { type: "success" });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const clock = <img src="/images/Icon awesome-file-alt.svg" />;

  //display project status by project id

  const [projectStatus, setProjectStatus] = useState([]);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/admin/master-menu/project-status-list`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          "Access-Control-Allow-Headers":
            "Origin, X-Requested-With, Content-Type,Accept, x-client-key, x-client-token, x-client-secret, Authorization",
        },
      })
      .then((response) => {
        setLoading(false);
        console.log("Status Fetched Succesfully");
        console.log(response.data.projectStatusLists, "status list");
        setProjectStatus(response.data.projectStatusLists);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //pagination

  const [currentPage, setCurrentPage] = useState(0);

  const PER_PAGE = 6;

  const offset = currentPage * PER_PAGE;

  const pageCount = Math.ceil(projects.length / PER_PAGE);

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

  const Showselectoptions = () => (
    <div className="mx-5 mt-auto">
      <h6 className="">Status</h6>
      <select
        value={projectstatusupdates}
        onChange={projectstatusupdate}
        style={{
          border: "1px solid darkgray",
          padding: "3px 5px",
          borderRadius: "5px",
        }}
      >
        <option value="All"> All </option>
        <option value="Not started">Not started</option>
        <option value="Completed">Completed</option>
        <option value="On Hold">On Hold</option>
        <option value="On Going">On Going</option>
      </select>
    </div>
  );

  return (
    <div>
      <div className="Proj_main">
        <div className="Proj_main_l">
          <Sidebar />
        </div>

        <div className="Proj_main_r">
          <Header />
          <div className="projectmaintabs_sec addprojdet">
                  <Link to={"/AddProjectDetail"} className="side_links">
                    <ButtonIcon
                      text="Add Project"
                      src="../../images/Icon ionic-ios-add (2).svg"
                      id="btn_radius"
                    />
                  </Link>
                </div> 
          <Tabs
            defaultActiveKey="home"
            transition={false}
            id="noanim-tab-example"
            className="mb-3"
          > 
        
            <Tab eventKey="home" title={<span>{clock} Existing Projects</span>}>
              <div className="d-flex justify-content-end projectmaintabs">
                {showsearchnbtncond ? <Showselectoptions /> : null}

             
                
                <div className="searchbar mx-5 mt-auto">
                  {showsearchnbtncond ? <Showsearchnbtn /> : null}
                </div>
              </div>
              {/* //project details */}
              <hr />

              <div style={{ overflow: "hidden" }}>
                {error && <Message variant="danger"> {errorMessage}</Message>}
                <Table striped hover>
                  <thead>
                    <tr>
                      <th>SI NO</th>
                      <th>Project Name</th>
                      <th> Client Name</th>
                      <th>Business Type</th>
                      <th> Status </th>
                      <th> Action </th>
                    </tr>
                  </thead>

                  <tbody>
                    {loading ? (
                      <Loader />
                    ) : (
                      projects
                        .filter((item) => {
                          if (projectstatusupdates == "All") {
                            return item;
                          } else if (
                            item.status
                              ?.toLowerCase()
                              .includes(projectstatusupdates?.toLowerCase())
                          ) {
                            return item;
                          }
                        })
                        .filter((item) => {
                          if (searchbar == "") {
                            return item;
                          } else if (
                            item.projectName
                              .toLowerCase()
                              .includes(searchbar.toLowerCase())
                          ) {
                            return item;
                          } else if (
                            item.clientName
                              .toLowerCase()
                              .includes(searchbar.toLowerCase())
                          ) {
                            return item;
                          }
                        })
                        .map((item, index) =>
                          item !== "" ? (
                            <>
                              <tr key={item.id}>
                                <td>{index + 1}</td>
                                <td>{item.projectName}</td>
                                <td> {item.clientName}</td>
                                <td>{item.businessType} </td>
                                <td>{item.status}</td>
                                <td>
                                  {item.deleted_at !== null ? (
                                    <Button variant="danger" size="sm" disabled>
                                      View Details
                                    </Button>
                                  ) : (
                                    <Link
                                      to={`/ProjectVeiwDetail/${item.id}`}
                                      className="signuplinks"
                                    >
                                      <Button variant="danger" size="sm">
                                        View Details
                                      </Button>
                                    </Link>
                                  )}
                                </td>

                                <td>
                                  {item.deleted_at ? (
                                    <>
                                      <RestoreIcon
                                        style={{ cursor: "pointer" }}
                                        onClick={() => restoreHandler(item.id)}
                                      />
                                      <DeleteForeverIcon
                                        style={{
                                          cursor: "pointer",
                                          marginLeft: "6%",
                                        }}
                                        onClick={() => deleteHandler(item.id)}
                                      />
                                    </>
                                  ) : (
                                    <DeleteIcon
                                      onClick={() => trashHandler(item.id)}
                                      style={{
                                        cursor: "pointer",
                                        color: "red",
                                      }}
                                    />
                                  )}
                                </td>
                              </tr>
                            </>
                          ) : (
                            <Message>No Projects Found</Message>
                          )
                        )
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
              {/* project details-end */}
            </Tab>
            <Tab
              eventKey="profile"
              title={<span>{clock} Potential Projects</span>}
            >
              <ClientsList />
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default Projects;
