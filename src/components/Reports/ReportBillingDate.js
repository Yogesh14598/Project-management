import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import Header from "../Others/Header";
import Sidebar from "../Others/Sidebar";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import ButtonIcon from "../Others/ButtonIcon";
import { BASE_URL } from "../../config";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import "../../Veiwdetail.css";
import axios from "axios";
import qs from "qs";
import { toast } from "react-toastify";
import ReactPaginate from "react-paginate";
import { Table, Button } from "react-bootstrap";
import Message from "../Others/Message";
import * as moment from "moment";
import { ExportCSV } from "../../ExportCSV";


const ReportBillingDate = () => {
  let repStartdate = localStorage.getItem("deadlineDateStart");
  let repEnddate = localStorage.getItem("deadlineDateEnd");
  let history = useHistory();

  //   const [userlogactivitydate, setuserlogactivitydate] = useState([]);

  const [billingDate, setBillingDate] = useState([]);
  const [searchbar, setsearchbar] = useState("");
  const [showsearchnbtncond, setshowsearchnbtncond] = useState(true);
  const [selectvalactivities, setselectvalactivities] = useState([]);
  const [lastdate, setlastdate] = useState([]);
  const [perpage, setperpage] = useState([]);
  const [startdate, setstartdate] = useState();
  const [enddate, setenddate] = useState();
  console.log(repStartdate, repEnddate);
  const datewiseurl = `${BASE_URL}/admin/reports/billing?deadlineDateStart=${repStartdate}&deadlineDateEnd=${repEnddate}`;
  let token = localStorage.getItem("auth_token");
  //   const datepagewiseurl = `${Baseurl}/admin/user-log-activity?page=${selectvalactivities}&dateFrom=${startdate}&dateTo=${enddate}`;
  //   const selectvalactivity = (e) => {
  //     setselectvalactivities(e.target.value);
  //   };
  console.log(datewiseurl, "datewiseurldatewiseurl");
  useEffect(() => {
    axios
      .get(datewiseurl, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      })
      .then((response) => {
        console.log(response.data, "afdsgsfdgsfd");
        console.log(response.data);
        setBillingDate(response.data.projectBillingReports);
      })
      .catch((error) => {
        console.log("fail", error.reponse);
      });
  }, [token]);

  let getusersdata = billingDate
    .filter((item) => {
      if (searchbar == "") {
        return item;
      } else if (
        item.userName?.toLowerCase().includes(searchbar.toLowerCase())
      ) {
        return item;
      }
    })
    .map((item, index) => {
      let createdDate;
      if (item.created_at) {
        createdDate = moment(new Date(item.created_at)).format("YYYY-MM-DD");
      }
      let lastPaidDate;
      if (item.paidDate) {
        lastPaidDate = moment(new Date(item.paidDate)).format("YYYY-MM-DD");
      }

      const deadlineDate = moment(new Date(item.deadlineDate)).format(
        "YYYY-MM-DD"
      );

      const createdat = moment(new Date(item.created_at)).format("YYYY-MM-DD");
      const tdydate = moment(new Date()).format("YYYY-MM-DD");
      const date1 = new Date(createdat);
      const date2 = new Date(tdydate);
      const diffTime = Math.abs(date2 - date1);
      const sincedate = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      console.log(diffTime, sincedate);
      return (
        <>
          <tr key={item.id}>
            <td>
              <p>{item.project_id}</p>
            </td>
            <td>
              <p>{item.projectName}</p>
            </td>
            <td>
              <p>{createdDate}</p>
            </td>
            <td>
              <p>{item.businessType}</p>
            </td>
            <td>
              <p>{item.amount}</p>
            </td>
            <td>
              <p>{item.paidDate == null ? "NA" : lastPaidDate}</p>
            </td>
            <td>
              <p>{deadlineDate}</p>
            </td>
            <td>
              <p>{sincedate}</p>
            </td>
            <td>
              <p>
                {item.paidStatus == 1 ? (
                  <p style={{ color: "green", fontWeight: "bold" }}>Received</p>
                ) : (
                  <p style={{ color: "red", fontWeight: "bold" }}>Pending</p>
                )}
              </p>
            </td>
            <td>
              <p>{item.installmentName}</p>
            </td>
          </tr>
        </>
      );
    });

  console.log(billingDate, "date-billing");
  const [currentPage, setCurrentPage] = useState(0);
  const PER_PAGE = 2;
  const offset = currentPage * PER_PAGE;
  const pageCount = Math.ceil(getusersdata.length / PER_PAGE);
  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage);
  }
  const currentPosts = getusersdata.slice(offset, offset + PER_PAGE);
  var sub_array = [];
  for (var i = 1; i <= lastdate; i++) {
    sub_array.push(i);
  }
  let sub_arrayies = sub_array.map((item, index) => {
    return (
      <>
        <option value={item}>
          {perpage * index}-{(index + 1) * perpage}
        </option>
      </>
    );
  });

  console.log(sub_array, "sub_array");

  return (
    <div>
      <div className="Proj_main">
        <div className="Proj_main_l">
          <Sidebar />
        </div>
        <div className="Proj_main_r">
          <Header />
          <div className="d-flex justify-content-between">
          <h3 className="projectheadline" style={{width:'80%'}}>
            <img
              src="/images/backarrows.svg"
              width="25px"
              style={{ cursor: "pointer", marginRight: "1%" }}
              onClick={() => history.goBack()}
            />
            Billing report based on date
          </h3>
          <ExportCSV csvData={currentPosts} fileName={"Project Reports"} />
          </div> 
          <hr />
          <div style={{ overflowX: "scroll" }}>
            <Table striped hover responsive>
              <thead>
                <tr>
                  <th>Sl No.</th>
                  <th>Project</th>
                  <th>Date</th>
                  <th>Service</th>
                  <th>Amount</th>
                  <th>Last Date Paid</th>
                  <th>deadlineDate</th>
                  <th>Time since start</th>
                  <th>Status</th>
                  <th>Installement</th>
                </tr>
              </thead>
              <tbody className="userlogactivity">
                {billingDate.length !== 0 ? (
                  currentPosts
                ) : (
                  <tr>
                    <td colspan="10">
                      <p>
                        <Message
                          variant="danger"
                          style={{ margin: "auto", textAlign: "center" }}
                        >
                          No reports found between selected dates
                        </Message>
                      </p>
                    </td>
                  </tr>
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
        </div>
      </div>
    </div>
  );
};

export default ReportBillingDate;
