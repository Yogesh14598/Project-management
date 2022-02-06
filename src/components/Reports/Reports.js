import React, { useState, useEffect } from "react";
import Header from "../../components/Others/Header";
import Sidebar from "../../components/Others/Sidebar";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { Table, Button } from "react-bootstrap";
import Loader from "../../components/Others/Loader";
import { useLocation } from "react-router";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";
import { BASE_URL } from "../../config";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Message from "../Others/Message";
import { ExportCSV } from "../../ExportCSV";
import * as moment from "moment";
import { useHistory } from "react-router-dom";

function Reports() {
  toast.configure();
  let history = useHistory();
  let token = localStorage.getItem("auth_token");

  const [loading, setLoading] = useState(true);
  const [projectrole, setprojectrole] = useState([]);
  const [billingrole, setbillingrole] = useState([]);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [startdate, setstartdate] = useState();
  const [enddate, setenddate] = useState();
  const [startdatereport, setstartdatereport] = useState();
  const [enddatereport, setenddatereport] = useState();
  const [searchbar, setsearchbar] = useState("");
  const [projectstatusupdates, setprojectstatusupdates] = useState("");
  const [billingstatusupdates, setbillingstatusupdates] = useState("");
  const [showsearchnbtncond, setshowsearchnbtncond] = useState(true);

  const location = useLocation();

  const id = location.pathname.split("/")[2];

  //getting project Types
  console.log(projectrole, "projectrole");
  console.log(startdate, enddate);

  let Reportenddate = moment(new Date(enddate)).format("DD-MM-YYYY");

  let Reportstartdate = moment(new Date(startdate)).format("DD-MM-YYYY");

  localStorage.setItem("reportstartdate", Reportstartdate);
  localStorage.setItem("reportenddate", Reportenddate);
  const datewiseurl = `${BASE_URL}/admin/reports/project?startDateTo=${enddate}&startDateFrom=${startdate}`;
  console.log(datewiseurl, "datewiseurl");
  localStorage.setItem("datewiseurl", datewiseurl);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/admin/reports/project`, {
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
        setprojectrole(response.data.projectReports);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(`${BASE_URL}/admin/reports/billing`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          "Access-Control-Allow-Headers":
            "Origin, X-Requested-With, Content-Type,Accept, x-client-key, x-client-token, x-client-secret, Authorization",
        },
      })
      .then((response) => {
        console.log(response.data, "setbillingrole");
        setbillingrole(response.data.projectBillingReports);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token]);

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

  const projectstatusupdate = (e) => {
    setprojectstatusupdates(e.target.value);
  };
  const billingstatusupdate = (e) => {
    setbillingstatusupdates(e.target.value);
  };
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
      <h6 className="" style={{ marginLeft: "49px" }}>
        Status
      </h6>
      <select
        onChange={projectstatusupdate}
        value={projectstatusupdates}
        style={{
          border: "1px solid darkgray",
          padding: "3px 5px",
          borderRadius: "5px",
        }}
      >
        <option value="All">All</option>
        <option value="Not started">Not started</option>
        <option value="Completed">Completed</option>
        <option value="On Hold">On Hold</option>
        <option value="On Going">On Going</option>
        <option value="Testing">Testing</option>
      </select>
    </div>
  );
  const movetodatebased = () => {
    if (enddate > startdate && (startdate || enddate)) {
      history.push("/ReportProjectDate");
    } else if (enddate < startdate) {
      history.push("/admin/reports");

      toast("The Deadlinedate End must be a greater than Deadlinedate Start", {
        type: "error",
      });
    } else {
      history.push("/admin/reports");

      toast("please select Deadlinedate Start and Deadlinedate End", {
        type: "error",
      });
    }
  };
  const movetodatebilling = () => {
    if (enddatereport > startdatereport && (startdatereport || enddatereport)) {
      history.push("/ReportBillingDate");
    } else if (enddatereport < startdatereport) {
      history.push("/admin/reports");
      toast("The Deadlinedate End must be greater than Deadlinedate Start", {
        type: "error",
      });
    } else {
      history.push("/admin/reports");
      toast("please select Deadlinedate Start and Deadlinedate End", {
        type: "error",
      });
    }
  };

  localStorage.setItem("deadlineDateStart", startdatereport);
  localStorage.setItem("deadlineDateEnd", enddatereport);

  const handlecheckbox = (e) => {
    const isChecked = e.target.checked;

    if (isChecked) {
      history.push("/ReportProjectdeadline");
    } else {
      history.push("/admin/reports");
    }
  };

  const checkBoxHandler = (e) => {
    if (e.target.checked) {
      history.push("/ReportBillingdeadline");
    } else {
      history.push("/admin/reports");
    }
  };
  const finalprojectlist = projectrole.filter((item) => {
    if (projectstatusupdates == "All") {
      return item;
    } else if (
      item.status?.toLowerCase().includes(projectstatusupdates?.toLowerCase())
    ) {
      return item;
    }
  });

  const finalbillinglist = billingrole.filter((item) => {
    if (billingstatusupdates == "3") {
      return item;
    } else if (
      item.paidStatus
        .toString()
        .toLowerCase()
        .includes(billingstatusupdates?.toLowerCase())
    ) {
      return item;
    }
  });

  //pagination projects

  const [currentPage, setCurrentPage] = useState(0);

  const PER_PAGE = 5;

  const offset = currentPage * PER_PAGE;

  const pageCount = Math.ceil(finalprojectlist.length / PER_PAGE);

  function handlePageClick({ selected: pageIndex }) {
    if (pageIndex + 1 == "1") {
      setshowsearchnbtncond(true);
    } else {
      setshowsearchnbtncond(false);
    }

    setCurrentPage(pageIndex);
  }

  //pagination billings

  const [currentPageBilling, setCurrentPageBilling] = useState(0);

  const PER_PAGE_BILLING = 5;

  const offsetBilling = currentPageBilling * PER_PAGE_BILLING;

  const pageCountBilling = Math.ceil(
    finalbillinglist.length / PER_PAGE_BILLING
  );

  function handlePageClickBilling({ selected: pageIndex }) {
    if (pageIndex + 1 == "1") {
      setshowsearchnbtncond(true);
    } else {
      setshowsearchnbtncond(false);
    }

    setCurrentPageBilling(pageIndex);
  }

  return (
    <div>
      <div className="Proj_main">
        <div className="Proj_main_l">
          <Sidebar />
        </div>

        <div className="Proj_main_r">
          <Header />

          <h5 style={{ fontWeight: "600", marginBottom: "2%" }}>Reports</h5>

          <Tabs
            defaultActiveKey="home"
            transition={false}
            id="noanim-tab-example"
            className="mb-3"
          >
            <Tab eventKey="home" title={<span>{clock} Project Reports</span>}>
              <div
                className="d-flex  projectmaintabs "
                style={{ alignItems: "center" }}
              >
                <div style={{ width: "80%", display: "flex" }}>
                  <img
                    src="/images/Icon awesome-filter.svg"
                    style={{ marginRight: "2.3%", marginTop: "2%" }}
                  />

                  <div className=" my-3" style={{ marginRight: "2%" }}>
                    <h6 className="">From Date</h6>
                    <input
                      type="date"
                      value={startdate}
                      onChange={(e) => {
                        setstartdate(e.target.value);
                      }}
                    />
                  </div>
                  <div className=" my-3">
                    <h6 className="">To Date</h6>

                    <input
                      type="date"
                      value={enddate}
                      onChange={(e) => {
                        setenddate(e.target.value);
                      }}
                    />
                  </div>
                  <div className="mt-auto mb-3 mx-5">
                    <Button
                      variant="danger"
                      onClick={movetodatebased}
                      type="button"
                    >
                      Submit
                    </Button>
                  </div>
                </div>

                <div>
                  <ExportCSV
                    csvData={finalprojectlist}
                    fileName={"Project Reports"}
                  />
                </div>
              </div>

              <div className="d-flex  projectmaintabs w-100">
                <div className=" mt-auto" style={{ marginLeft: "3.4%" }}>
                  <h6 className="">Status</h6>
                  <select
                    onChange={projectstatusupdate}
                    value={projectstatusupdates}
                    style={{
                      border: "1px solid darkgray",
                      padding: "3px 5px",
                      borderRadius: "5px",
                    }}
                  >
                    <option value="All">All</option>
                    <option value="Not started">Not started</option>
                    <option value="Completed">Completed</option>
                    <option value="On Hold">On Hold</option>
                    <option value="On Going">On Going</option>
                    <option value="Testing">Testing</option>
                  </select>
                </div>

                <div className="mt-auto w-100" style={{ marginLeft: "2%" }}>
                  <input
                    type="checkbox"
                    className="report-checkbox"
                    onChange={handlecheckbox}
                  />
                  <label>Projects that have exceeded the deadline</label>
                </div>
              </div>

              {/* //project details */}
              <hr />

              <div style={{ overflowX: "scroll" }}>
                {error && <Message variant="danger"> {errorMessage}</Message>}
                <Table striped hover>
                  <thead>
                    <tr className="reportsproject">
                      <th>SI NO</th>
                      <th>Project</th>
                      <th> Service</th>
                      <th>Amount</th>
                      <th> Amount Paid </th>
                      <th> Pending amount </th>
                      <th>Last Date Paid</th>
                      <th>Time since start</th>
                      <th> Status</th>

                      <th colspan="4">Development Team</th>
                    </tr>
                  </thead>

                  <tbody>
                    {loading ? (
                      <Loader />
                    ) : (
                      finalprojectlist
                        .map((item, index) => {
                          let lastPaidDate;
                          if (item.lastPaidDate) {
                            lastPaidDate = moment(
                              new Date(item.lastPaidDate)
                            ).format("YYYY-MM-DD");
                          }

                          const createdat = moment(
                            new Date(item.created_at)
                          ).format("YYYY-MM-DD");
                          const tdydate = moment(new Date()).format(
                            "YYYY-MM-DD"
                          );
                          const date1 = new Date(createdat);
                          const date2 = new Date(tdydate);
                          const diffTime = Math.abs(date2 - date1);
                          const sincedate = Math.ceil(
                            diffTime / (1000 * 60 * 60 * 24)
                          );

                          console.log(diffTime, sincedate);
                       
                        
                          return (
                            <tr key={item.id} className="reportsproject">
                              <td>
                                <p>{index + 1}</p>
                              </td>
                              <td>
                                <p>{item.projectName}</p>
                              </td>
                              <td>
                                <p>{item.businessType} </p>
                              </td>
                              <td>
                                <p>{item.cost}</p>
                              </td>
                              <td>
                                <p>
                                  {item.totalPaidAmount == ""
                                    ? "NA"
                                    : item.totalPaidAmount}
                                </p>
                              </td>
                              <td>
                              <p>
                          ₹
                          {(
                           item.cost-item.totalPaidAmount
                          ).toFixed(2) < 1
                            ? 0
                            : (
                              item.cost-item.totalPaidAmount
                              ).toFixed(2)}
                        </p>
                              </td>
                              <td>
                                <p>
                                  {item.lastPaidDate == null
                                    ? "NA"
                                    : lastPaidDate}
                                </p>
                              </td>
                              <td>
                                <p>{sincedate} Days</p>
                              </td>
                              <td>
                                <p>{item.status}</p>
                              </td>

                              <td>
                                {item.teamsList.map((user) => (
                                  <td>
                                    {user.team_users.map((user) => (
                                      <p key={user.id}>
                                        {user.memberName} <br />
                                      </p>
                                    ))}

                                    <p style={{ color: "darkgray" }}>
                                      ( {user.projectTeamType} )
                                    </p>
                                  </td>
                                ))}
                              </td>
                            </tr>
                          );
                        })
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
              title={<span>{clock} Billing Reports </span>}
            >
              <div
                className="d-flex  projectmaintabs"
                style={{ alignItems: "center" }}
              >
                <div style={{ width: "80%", display: "flex" }}>
                  <img
                    src="/images/Icon awesome-filter.svg"
                    style={{ marginRight: "2.3%", marginTop: "2%" }}
                  />

                  <div className=" my-3" style={{ marginRight: "2%" }}>
                    <h6 className="">From Date</h6>
                    <input
                      type="date"
                      value={startdatereport}
                      onChange={(e) => {
                        setstartdatereport(e.target.value);
                      }}
                    />
                  </div>
                  <div className=" my-3">
                    <h6 className="">To Date</h6>

                    <input
                      type="date"
                      value={enddatereport}
                      onChange={(e) => {
                        setenddatereport(e.target.value);
                      }}
                    />
                  </div>
                  <div className="mt-auto mb-3 mx-5">
                    <Button
                      variant="danger"
                      onClick={movetodatebilling}
                      type="button"
                    >
                      Submit
                    </Button>
                  </div>
                </div>
                <div>
                  <ExportCSV
                    csvData={finalbillinglist}
                    fileName={"Billing Reports"}
                  />
                </div>
              </div>

              <div className="d-flex  projectmaintabs w-100">
                <div className=" mt-auto" style={{ marginLeft: "3.4%" }}>
                  <h6 className="">Status</h6>
                  <select
                    onChange={billingstatusupdate}
                    style={{
                      border: "1px solid darkgray",
                      padding: "3px 5px",
                      borderRadius: "5px",
                      width: "190px",
                    }}
                  >
                    <option value="3"> All </option>
                    <option value="0">Pending</option>
                    <option value="1">Received</option>
                  </select>
                </div>

                <div className="mt-auto w-100" style={{ marginLeft: "2%" }}>
                  <input
                    type="checkbox"
                    className="report-checkbox"
                    onChange={checkBoxHandler}
                  />
                  <label>Installments that have exceeded the deadline</label>
                </div>
              </div>

              {/* //project details */}
              <hr />

              <div style={{ overflow: "scroll" }}>
                {error && <Message variant="danger"> {errorMessage}</Message>}
                <Table striped hover>
                  <thead>
                    <tr className="reportsproject">
                      <th>SI NO</th>
                      <th>Project</th>
                      <th> Date</th>
                      <th> Service</th>
                      <th>Amount</th>
                      <th>Last Date Paid</th>
                      <th>deadlineDate</th>
                      <th>Time since start</th>
                      <th> Status</th>
                      <th>Installement</th>
                    </tr>
                  </thead>

                  <tbody>
                    {loading ? (
                      <Loader />
                    ) : (
                      finalbillinglist
                        .map((item, index) => {
                          let lastPaidDate;
                          if (item.paidDate) {
                            lastPaidDate = moment(
                              new Date(item.paidDate)
                            ).format("YYYY-MM-DD");
                          }
                          const deadlineDate = moment(
                            new Date(item.deadlineDate)
                          ).format("YYYY-MM-DD");

                          const createdat = moment(
                            new Date(item.created_at)
                          ).format("YYYY-MM-DD");
                          const tdydate = moment(new Date()).format(
                            "YYYY-MM-DD"
                          );
                          const date1 = new Date(createdat);
                          const date2 = new Date(tdydate);
                          const diffTime = Math.abs(date2 - date1);
                          const sincedate = Math.ceil(
                            diffTime / (1000 * 60 * 60 * 24)
                          );

                          console.log(diffTime, sincedate);
                          return (
                            <tr key={item.id} className="reportsproject">
                              <td>
                                <p>{index + 1}</p>
                              </td>
                              <td>
                                <p>{item.projectName}</p>
                              </td>
                              <td>
                                <p>{createdat}</p>
                              </td>
                              <td>
                                <p>{item.businessType} </p>
                              </td>

                              <td>
                                <p>{item.amount}</p>
                              </td>

                              <td>
                                <p>
                                  {item.paidDate == null ? "NA" : lastPaidDate}
                                </p>
                              </td>

                              <td>
                                <p>{deadlineDate}</p>
                              </td>
                              <td>
                                <p>{sincedate} Days</p>
                              </td>

                              <td>
                                <p>
                                  {item.paidStatus == 1 ? (
                                    <p
                                      style={{
                                        color: "green",
                                        fontWeight: "bold",
                                      }}
                                    >
                                      Received
                                    </p>
                                  ) : (
                                    <p
                                      style={{
                                        color: "red",
                                        fontWeight: "bold",
                                      }}
                                    >
                                      Pending
                                    </p>
                                  )}
                                </p>
                              </td>
                              <td>
                                <p>{item.installmentName}</p>
                              </td>
                            </tr>
                          );
                        })
                        .slice(offsetBilling, offsetBilling + PER_PAGE_BILLING)
                    )}
                  </tbody>
                </Table>

                <ReactPaginate
                  previousLabel={"← Previous"}
                  nextLabel={"Next →"}
                  pageCount={pageCountBilling}
                  onPageChange={handlePageClickBilling}
                  containerClassName={"pagination"}
                  previousLinkClassName={"pagination__link"}
                  nextLinkClassName={"pagination__link"}
                  disabledClassName={"pagination__link--disabled"}
                  activeClassName={"pagination__link--active"}
                />
              </div>
              {/* project details-end */}
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default Reports;
