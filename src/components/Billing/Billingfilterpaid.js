import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Dropdown, Table, Button } from "react-bootstrap";
import Header from "../../components/Others/Header";
import Sidebar from "../../components/Others/Sidebar";
import * as moment from "moment";
import { ExportCSV } from "../../ExportCSV";
import ReactPaginate from "react-paginate";
import { BASE_URL } from "../../config";

const Billingfilterpaid = ({ history }) => {
  let token = localStorage.getItem("auth_token");
  const [showsearchnbtncond, setshowsearchnbtncond] = useState(true);
  const [Billingfilterpaid, setBillingfilterpaid] = useState([]);
  const [searchbar, setsearchbar] = useState("");

  useEffect(() => {
    axios
      .get(`${BASE_URL}/admin/project-management/installments?paidStatus=1`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      })
      .then((response) => {
        console.log(response.data, "billing");
        setBillingfilterpaid(response.data.installments);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  console.log(Billingfilterpaid, "Billingfilterpaid");

  const [currentPage, setCurrentPage] = useState(0);

  const PER_PAGE = 5;

  const offset = currentPage * PER_PAGE;

  const pageCount = Math.ceil(Billingfilterpaid.length / PER_PAGE);

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
      <img src="/images/Icon awesome-filter.svg" class="mx-3" />
      <input
        type="text"
        placeholder="Search"
        value={searchbar}
        autoFocus
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
    <div>
      <div className="Proj_main">
        <div className="Proj_main_l">
          <Sidebar cname1="" cname2="" cname3="" cname4="activeclass" />
        </div>

        <div className="Proj_main_r">
          <Header />

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h3
              className="projectheadline"
              style={{ marginBottom: "2%", width: "40%" }}
            >
              <img
                src="/images/backarrows.svg"
                width="25px"
                style={{
                  cursor: "pointer",
                  marginRight: "1%",
                  marginTop: "-3px",
                }}
                onClick={() => history.goBack()}
              />
              Completed Payments
            </h3>

            <ExportCSV
              csvData={Billingfilterpaid}
              fileName={"Completed Payments"}
            />
          </div>

          <hr />
          <div className="searchbar">
            {showsearchnbtncond ? <Showsearchnbtn /> : null}
          </div>

          <Table striped hover responsive>
            <thead>
              <tr>
                <th>SI No</th>
                <th>projectName</th>
                <th>clientName</th>
                <th>installmentName</th>
                <th>invoiceNo</th>
                <th>paidDate </th>
                <th>status </th>
              </tr>
            </thead>
            <tbody>
              {Billingfilterpaid.filter((item) => {
                if (searchbar == "") {
                  return item;
                } else if (
                  item.projectName
                    ?.toLowerCase()
                    .includes(searchbar?.toLowerCase())
                ) {
                  return item;
                }
              })
                .map((item, index) => {
                  let paidDate = moment(new Date(item.paidDate)).format(
                    "YYYY-MM-DD"
                  );
                  let deadlineDate = moment(new Date(item.deadlineDate)).format(
                    "YYYY-MM-DD"
                  );
                  return (
                    <>
                      <tr key={item.id}>
                        <td>{index + 1}</td>
                        <td>{item.projectName}</td>
                        <td>{item.clientName}</td>
                        <td>{item.installmentName}</td>
                        <td>{item.invoiceNo ? item.invoiceNo : "NA"}</td>
                        <td>{paidDate ? paidDate : "NA"}</td>
                        <td>
                          {" "}
                          <p style={{ color: "green", fontWeight: "bold" }}>
                            Paid
                          </p>
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
  );
};

export default Billingfilterpaid;
