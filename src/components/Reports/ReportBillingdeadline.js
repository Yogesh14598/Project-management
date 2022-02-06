import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Dropdown, Table, Button } from "react-bootstrap";
import Header from "../Others/Header";
import Sidebar from "../Others/Sidebar";
import * as moment from "moment";
import ReactPaginate from "react-paginate";
import Loader from "../Others/Loader";
import { BASE_URL } from "../../config";
import { ExportCSV } from "../../ExportCSV";
const ReportBillingdeadline = ({ history }) => {
  const deadlinelisturl = `${BASE_URL}/admin/reports/billing?deadlineCrossedOnly=1`;
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
        setdeadlinelist(response.data.projectBillingReports);
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
  console.log(deadlinelist, "deadlinelist");
  return (
    <div>
      <div className="Proj_main">
        <div className="Proj_main_l">
          <Sidebar cname1="" cname2="" cname3="" cname4="activeclass" />
        </div>

        <div className="Proj_main_r">
          <Header />
          <div className="d-flex">
            <div style={{ width: "80%" }}>
              <h3 className="projectheadline" style={{ marginBottom: "2%" }}>
                <img
                  src="/images/backarrows.svg"
                  width="25px"
                  style={{ cursor: "pointer", marginRight: "1%" }}
                  onClick={() => history.goBack()}
                />
                Projects that have exceeded the deadline
              </h3>
            </div>
            <div>
              <ExportCSV csvData={deadlinelist} fileName={"Project Reports"} />
            </div>
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
                  <th>Last Date Paid </th>
                  <th>Deadline</th>
                  <th>Time since start</th>
                  <th> Status</th>
                  <th>Installment </th>
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
                    let deadlineDate;
                    if (item.deadlineDate) {
                      deadlineDate = moment(new Date(item.deadlineDate)).format(
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
                          <p>{item.amount}</p>
                        </td>
                        <td>
                          <p>{item.paidDate == null ? "NA" : lastPaidDate}</p>
                        </td>

                        <td>
                          <p>{deadlineDate} Days</p>
                        </td>
                        <td>
                          <p>{sincedate} </p>
                        </td>
                        <td>
                          <p>
                            {item.paidStatus == 1 ? (
                              <p style={{ color: "green", fontWeight: "bold" }}>
                                Received
                              </p>
                            ) : (
                              <p style={{ color: "red", fontWeight: "bold" }}>
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

export default ReportBillingdeadline;
