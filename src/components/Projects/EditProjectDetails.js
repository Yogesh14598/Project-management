

import React, { useState, useEffect } from "react";
import Header from "../../components/Others/Header";
import Sidebar from "../../components/Others/Sidebar";
import { Button } from "react-bootstrap";
import axios from "axios";
import qs from "qs";
import Select from "react-select";
import Message from "../../components/Others/Message";
import { useLocation } from "react-router";
import { toast } from "react-toastify";
import dateFormat from "dateformat";
import validation from "../../validation";
import { BASE_URL } from "../../config";
import "react-toastify/dist/ReactToastify.css";
import { CountertopsOutlined } from "@mui/icons-material";

const EditProjectDetail = ({ history }) => {
  let projectstatuss = localStorage.getItem("projectstatuss");
  let PotentialProjectss = localStorage.getItem("potentialProject");
  let projclientName = localStorage.getItem("projclientName");
  const url = `${BASE_URL}/admin/projectManagement/projects`;
  let token = localStorage.getItem("auth_token");
  const [error, setError] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [showmeselects, setshowmeselects] = useState(true);
  const [showmeselectstype, setshowmeselectstype] = useState(true);
  const [showmeselectscleint, setshowmeselectscleint] = useState(true);
  const [showmeselectspotential, setshowmeselectspotential] = useState(true);

  const [errors, setErrors] = useState({});
  const location = useLocation();

  const id = location.pathname.split("/")[2];

  const [errorMessage, setErrorMessage] = useState();

  const [potentialProject, setPotentialProjects] = useState("");
  const [status, setStatus] = useState("");
  const [Clientveiw, setClientveiw] = useState([]);
  const [veiwprojtypes, setveiwprojtypes] = useState([]);
  const [veiwprojtechnologies, setveiwprojtechnologies] = useState([]);

  const [values, setValues] = useState({
    Projectcost: "",
    ClosureTime: "",
    StartDate: "",
    Business: "",
    Projectname: "",
    referral: "",
    potentialProject: "",
    status: "",
  });
  console.log(PotentialProjectss, "valuesrefreal");
  const handleChangesHappened = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const Results = () => (
    <div className="">
      <h6>Status</h6>

      <select
        onChange={(e) => {
          setStatus(e.target.value);
        }}
        value={status}
      >
        <option value={projectstatuss} disabled hidden selected>
          {projectstatuss}
        </option>

        {projectStatus.map((item) => (
          <option value={item.id}>{item.name}</option>
        ))}
      </select>
    </div>
  );

  const selectpotentialproject = (e) => {
    setPotentialProjects(e.target.value);
    if (e.target.value == 0) {
      setShowResults(true);
    }
    if (e.target.value == 1) {
      setShowResults(false);
    }
  };

  //getting clients

  const [loading, setLoading] = useState(true);
  const [clients, setClients] = useState([]);

  console.log(projectstatuss, "projstatus");
  useEffect(() => {
    axios
      .get(`${BASE_URL}/admin/project-management/clients`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          "Access-Control-Allow-Headers":
            "Origin, X-Requested-With, Content-Type,Accept, x-client-key, x-client-token, x-client-secret, Authorization",
        },
      })
      .then((response) => {
        setClients(response.data.clients);
        console.log(clients);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token]);

  const clientLists = [];

  for (let i = 0; i < clients.length; i++) {
    clientLists.push({
      value: clients[i].id,
      label: clients[i].firstName,
    });
  }

  const [value, setValue] = useState("");

  const changeHandler = (value) => {
    setValue(value);
  };

  console.log(value.value);

  //getting Technologies

  const [technologies, setTechnologies] = useState([]);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/admin/master-menu/project-technologies`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          "Access-Control-Allow-Headers":
            "Origin, X-Requested-With, Content-Type,Accept, x-client-key, x-client-token, x-client-secret, Authorization",
        },
      })
      .then((response) => {
        setTechnologies(response.data.projectTechnologies);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token]);

  //getting project Types

  const [proTypes, setproTypes] = useState([]);

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

  const people = [];
  for (let i = 0; i < technologies.length; i++) {
    people.push({
      value: technologies[i].id,
      label: technologies[i].name,
    });
  }
  const peopletype = [];

  for (let i = 0; i < proTypes.length; i++) {
    peopletype.push({
      value: proTypes[i].id,
      label: proTypes[i].name,
    });
  }

  const [selectedValue, setSelectedValue] = useState([]);
  const [showerrormsg, setshowerrormsg] = useState();
  console.log(showerrormsg, "showerrormsg");

  // handle onChange event of the dropdown
  const handleChange = (e) => {
    setSelectedValue(Array.isArray(e) ? e.map((x) => x.value) : []);
  };
  const [projecttypeselect, setprojecttypeselect] = useState([]);

  // handle onChange event of the dropdown
  const handleChanges = (e) => {
    setprojecttypeselect(Array.isArray(e) ? e.map((x) => x.value) : []);
  };

  //getting project details

  let pName = localStorage.getItem("project-name");
  let bType = localStorage.getItem("business-type");
  let pCost = localStorage.getItem("project-cost");
  let startDateproj = localStorage.getItem("startDateproj");
  let endDateproj = localStorage.getItem("endDateproj");
  let referrals = localStorage.getItem("referral");

  useEffect(() => {
    if (
      (values.Projectname,
      values.Business,
      values.Projectcost,
      values.StartDate,
      values.ClosureTime == "")
    ) {
      setValues({
        Projectname: pName,
        Business: bType,
        StartDate: startDateproj,
        ClosureTime: endDateproj,
        Projectcost: pCost,
        referral: referrals,
      });
    } else {
      console.log("details are filled");
    }
  }, [id]);

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

  //handle create submit
  //updating the project

  const project = {
    client_id: value.value,
    projectName: values.Projectname,
    businessType: values.Business,
    cost: values.Projectcost,
    referral: values.referral,
    startDate: values.StartDate,
    endDate: values.ClosureTime,
    potentialProject: potentialProject,
    status_id: status,
    projectType_id_list: projecttypeselect,
    projectTechnology_id_list: selectedValue,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let errorss = 0;
    setErrors(validation(values));
    console.log(project);

    if (
      (values.Projectname,
      values.Business,
      values.Projectcost,
      values.referral,
      values.StartDate,
      values.ClosureTime,
      potentialProject == "")
    ) {
      errorss++;
    } else {
      errorss = 0;
    }

    axios
      .put(
        `${BASE_URL}/admin/project-management/projects/${id}`,
        qs.stringify(project),
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
            "Access-Control-Allow-Headers":
              "Origin, X-Requested-With, Content-Type,Accept, x-client-key, x-client-token, x-client-secret, Authorization",
          },
        }
      )

      .then((response) => {
        console.log(response.data);
        history.push("/admin/project/projects");
        toast("Project Updated Succesfully", { type: "success" });
      })

      .catch((error) => {
        console.error("There was an error!", error);
        setError(true);
        setErrorMessage(error.response.data.message);
      });
  };

  useEffect(() => {
    axios
      .get(`${BASE_URL}/admin/project-management/projects/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          "Access-Control-Allow-Headers":
            "Origin, X-Requested-With, Content-Type,Accept, x-client-key, x-client-token, x-client-secret, Authorization",
        },
      })
      .then((response) => {
        console.log(response.data, "project");

        setveiwprojtypes(response.data.projectTypes);
        setveiwprojtechnologies(response.data.projectTechnologies);

        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token]);
  let Projectclient_id = localStorage.getItem("Projectclient_id");

  useEffect(() => {
    axios
      .get(`${BASE_URL}/admin/project-management/clients/${Projectclient_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          "Access-Control-Allow-Headers":
            "Origin, X-Requested-With, Content-Type,Accept, x-client-key, x-client-token, x-client-secret, Authorization",
        },
      })
      .then((response) => {
        console.log(response.data, "project");
        setClientveiw(response.data.client);

        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token]);

  console.log(Clientveiw, veiwprojtypes);
  console.log(veiwprojtechnologies, "veiwprojtechnologies");

  return (
    <div>
      <div className="Proj_main">
        <div className="Proj_main_l">
          <Sidebar cname1="" cname2="" cname3="activeclass" cname4="" />
        </div>
        <div className="Proj_main_r">
          <Header />

          <div className="addproject">
            <h3 className="projectheadline">
              <img
                src="/images/backarrows.svg"
                width="25px"
                style={{ cursor: "pointer", marginRight: "0.5%" }}
                onClick={() => history.goBack()}
              />
              Edit Project Details
            </h3>
            {error && <Message variant="danger">{errorMessage}</Message>}
            <form>
              <div className="row my-3">
                <div className="col-md-3">
                  <h6>Project Name*</h6>
                  <input
                    type="text"
                    name="Projectname"
                    className="inp_feild"
                    value={values.Projectname}
                    onChange={handleChangesHappened}
                  />
                  {errors.Projectname && (
                    <p className="error">{errors.Projectname}</p>
                  )}
                </div>
                <div className="col-md-3">
                  <h6>Business Type*</h6>
                  <input
                    type="text"
                    name="Business"
                    className="inp_feild"
                    value={values.Business}
                    onChange={handleChangesHappened}
                  />
                  {errors.Business && (
                    <p className="error">{errors.Business}</p>
                  )}
                </div>
              </div>
              <div className="row my-3">
                <div className="col-md-3">
                  <h6>Project Cost*</h6>
                  <input
                    type="text"
                    name="Projectcost"
                    className="inp_feild"
                    value={values.Projectcost}
                    onChange={handleChangesHappened}
                  />
                  {errors.Projectcost && (
                    <p className="error">{errors.Projectcost}</p>
                  )}
                </div>
                <div className="col-md-3">
                  <h6>Referral*</h6>
                  <select
                    value={values.referral}
                    onChange={handleChangesHappened}
                    name="referral"
                    value={values.referral}
                  >
                    <option></option>
                    <option value="yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                  {errors.referral && (
                    <p className="error">{errors.referral}</p>
                  )}
                </div>
              </div>
              <div className="row my-3">
                <div className="col-md-3">
                  <h6>Start Date*</h6>
                  <input
                    type="date"
                    name="StartDate"
                    className="inp_feild"
                    value={values.StartDate}
                    onChange={handleChangesHappened}
                  />
                  {errors.StartDate && (
                    <p className="error">{errors.StartDate}</p>
                  )}
                </div>
                <div className="col-md-3">
                  <h6>Estimated Closure Time*</h6>
                  <input
                    type="date"
                    name="ClosureTime"
                    className="inp_feild"
                    value={values.ClosureTime}
                    onChange={handleChangesHappened}
                  />
                  {errors.ClosureTime && (
                    <p className="error">{errors.ClosureTime}</p>
                  )}
                </div>
              </div>
              <div className="row my-3">
                <div className="col-md-3">
                  <h6>Select Project Type*</h6>
                  <div
                    onClick={() => {
                      setshowmeselects(false);
                    }}
                  >
                    {showmeselects ? (
                      <div className="showmeselect">
                        {veiwprojtypes.map((item) => (
                          <span value={item.id}>{item.name}</span>
                        ))}
                        <i class="fas fa-angle-down"></i>
                      </div>
                    ) : (
                      <div>
                        <Select
                          onChange={handleChanges}
                          isMulti
                          name="projectTypes"
                          options={peopletype}
                          value={peopletype.filter((obj) =>
                            projecttypeselect.includes(obj.value)
                          )} // set selected values
                          // options={peopletype}
                          className="basic-multi-select"
                          classNamePrefix="select"
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div className="col-md-3">
                  <h6>Select Technologies*</h6>
                  <div
                    onClick={() => {
                      setshowmeselectstype(false);
                    }}
                  >
                    {showmeselectstype ? (
                      <div className="showmeselect">
                        {veiwprojtechnologies.map((item) => (
                          <span value={item.id}>{item.name}</span>
                        ))}
                        <i class="fas fa-angle-down"></i>
                      </div>
                    ) : (
                      <div>
                        <Select
                          onChange={handleChange}
                          isMulti
                          name="projectTechs"
                          options={people} // set list of the data}
                          value={people.filter((obj) =>
                            selectedValue.includes(obj.value)
                          )} // set selected values
                          className="basic-multi-select"
                          classNamePrefix="select"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="row my-3">
                <div className="col-md-3">
                  <h6>Select Client*</h6>
                  <div
                    onClick={() => {
                      setshowmeselectscleint(false);
                    }}
                  >
                    {showmeselectscleint ? (
                      <div className="showmeselect">
                        <span>{projclientName}</span>

                        <i class="fas fa-angle-down"></i>
                      </div>
                    ) : (
                      <div>
                        <Select
                          options={clientLists}
                          onChange={changeHandler}
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div className="col-md-3">
                  <h6>Potential Project*</h6>
                  <div
                    onClick={() => {
                      setshowmeselectspotential(false);
                    }}
                  >
                    {showmeselectspotential ? (
                      <div className="showmeselect">
                        <span> {PotentialProjectss == "0" ? "NO" : "YES"}</span>

                        <i class="fas fa-angle-down"></i>
                      </div>
                    ) : (
                      <div>
                        <select
                          onChange={selectpotentialproject}
                          value={potentialProject}
                        >
                          <option selected hidden disabled></option>
                          <option value="1">Yes</option>
                          <option value="0">No</option>
                        </select>
                      </div>
                    )}
                  </div>

                  {/* {errors.potentialProject && <p className="error">{errors.potentialProject}</p>} */}
                </div>
              </div>

              <div className="row my-3">
                <div className="col-md-3">
                  {showResults ? <Results /> : null}
                </div>
              </div>

              <Button type="submit" variant="danger" onClick={handleSubmit}>
                Update
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProjectDetail;
