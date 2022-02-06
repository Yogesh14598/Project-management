import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Dropdown, Table, Button } from "react-bootstrap";
import Header from "../../components/Others/Header";
import Sidebar from "../../components/Others/Sidebar";
import * as moment from "moment";
import ReactPaginate from "react-paginate";
import Loader from "../../components/Others/Loader";
import { BASE_URL } from "../../config";
import { ExportCSV } from "../../ExportCSV";

const ReportProjectdeadline = ({ history }) => {
  const deadlinelisturl = `${BASE_URL}/admin/reports/project?deadlineCrossedOnly=1`;
  let token = localStorage.getItem("auth_token");
  const [deadlinelist, setdeadlinelist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(deadlinelisturl, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      })
      .then((response) => {
        console.log(response.data, "setdeadlinelist");
        setdeadlinelist(response.data.projectReports);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  console.log(deadlinelist, "deadlinelist");

  const [currentPage, setCurrentPage] = useState(0);

  const PER_PAGE = 5;

  const offset = currentPage * PER_PAGE;

  const pageCount = Math.ceil(deadlinelist.length / PER_PAGE);

  function handlePageClick({ selected: pageIndex }) {
    setCurrentPage(pageIndex);
  }

  return (
    <div>
      <div className="Proj_main">
        <div className="Proj_main_l">
          <Sidebar cname1="" cname2="" cname3="" cname4="activeclass" />
        </div>

        <div className="Proj_main_r">
          <Header />
          <div className="d-flex justify-content-between">
            <h3 className="projectheadline" style={{ marginBottom: "2%"    , width:' 75%'}}>
              <img
                src="/images/backarrows.svg"
                width="25px"
                style={{ cursor: "pointer", marginRight: "1%" }}
                onClick={() => history.goBack()}
              />
              Projects that have exceeded the deadline
            </h3>
            <ExportCSV csvData={deadlinelist} fileName={"Project Reports"} />
          </div>
          <hr />
          <div style={{ overflowX: "scroll" }}>
            <Table striped bordered hover responsive>
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
                {deadlinelist
                  .map((item, index) => {
                    let lastPaidDate;
                    if (item.lastPaidDate) {
                      lastPaidDate = moment(new Date(item.lastPaidDate)).format(
                        "YYYY-MM-DD"
                      );
                    }

                    const createdat = moment(new Date(item.created_at)).format(
                      "YYYY-MM-DD"
                    );
                    const tdydate = moment(new Date()).format("YYYY-MM-DD");
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
                          <p>{item.totalPaidAmount}</p>
                        </td>
                        <td>
                          <p>{item.totalUnPaidAmount}</p>
                        </td>
                        <td>
                          <p>
                            {item.lastPaidDate == null ? "NA" : lastPaidDate}
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
                              {item.projectTeamType}
                              {user.team_users.map((user) => (
                                <p key={user.id}>
                                  {user.memberName} <br />
                                </p>
                              ))}
                            </td>
                          ))}
                        </td>
                      </tr>
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

export default ReportProjectdeadline;
