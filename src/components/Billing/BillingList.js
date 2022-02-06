import React, { useState } from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import ReactPaginate from "react-paginate";

const BillingList = ({ BillingReportsTable }) => {
  const [currentPage, setCurrentPage] = useState(0);

  const PER_PAGE = 5;

  const offset = currentPage * PER_PAGE;

  const pageCount = Math.ceil(BillingReportsTable.length / PER_PAGE);

  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage);
  }


  let getusersdata = BillingReportsTable.map((item, index) => {
    let unpaidamount= (item.projectCost-item.totalPaidAmount).toFixed(2);
    return (
      <>
        <tr key={item.project_id}>
          <td>{index + 1}</td>
          <td>{item.projectName}</td>
          <td>{item.clientName}</td>
          <td>{item.projectCost === null ? "NA" : item.projectCost}</td>
          <td>{item.totalInstallments}</td>
          <td>{item.totalPaidAmount}</td>
          <td>{unpaidamount}</td>
          <td>
            <Link to={`/ProjectVeiwDetail/${item.project_id}`}>
              <EditIcon style={{ color: "#000", cursor: "pointer" }} />
            </Link>
            {/* <Link to={`/ProjectVeiwDetail/${item.project_id}`}> */}
            {/* <DeleteIcon
              style={{ color: "#F23801", cursor: "pointer" }}/> */}
            {/* </Link>  */}
          </td>
        </tr>
      </>
    );
  }).slice(offset, offset + PER_PAGE);
  return (
    <div style={{ overflow: "hidden" }}>
      <Table striped hover>
        <thead>
          <tr>
            <th>SI NO</th>
            <th>Project Name</th>
            <th> Client Name</th>

            <th>Project Cost</th>
            <th>Total Installments</th>
            <th>Paid Amount </th>
            <th> UnPaid Amount </th>
            <th> Action </th>
          </tr>
        </thead>
        <tbody>{getusersdata}</tbody>
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
  );
};

export default BillingList;
