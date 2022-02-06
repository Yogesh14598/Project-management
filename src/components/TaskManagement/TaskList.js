import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import ReactPaginate from "react-paginate";
import { Button } from "react-bootstrap";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import AddIcon from "@mui/icons-material/Add";
import { Modal } from "react-bootstrap";
import Select from "react-select";
import DateTimePicker from "react-datetime-picker";
import axios from "axios";
import { BASE_URL } from "../../config";
import * as moment from "moment";
const TaskList = ({ searchbar }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [valuedatetime, onChange] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const [taskProjList, setTaskProjList] = useState([]);
  
  const [values, setValues] = useState({
    TaskName: "",
    TaskDescription: "",
    TaskTeam: "",
    TaskEmployee: "",
    TaskReport: "",
    TaskRepName: "",
    TaskStartTime: "",
    TaskEndTime: "",
  });
  let token = localStorage.getItem("auth_token");
  const inputHandler = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
  };
  const [value] = useState(new Date());

  //   const PER_PAGE = 5;
  //   const offset = currentPage * PER_PAGE;
  //   const pageCount = Math.ceil(TaskReportsTable.length / PER_PAGE);

  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage);
  }

  useEffect(() => {
    axios
      .get(`${BASE_URL}/admin/task-management/projects`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      })
      .then((response) => {
        setLoading(false);
        setTaskProjList(response.data.projects);
        console.log("Status Fetched successfully");
        console.log(response.data.projects);
      })
      .catch((error) => {
        console.log(error.data, "error");
      });
  }, []);

  const [mymodel, setmymodel] = useState(false);
  const handlemodelchange = () => {
    setmymodel(false);
  };
  const openmodel = () => {
    setmymodel(true);
  };

  console.log(taskProjList, "taskProjList");

  //   let getusersdata = taskProjList.map((item, index) => {
  //     return (
  //       <>
  //         <tr key={item.project_id}>
  //           <td>{index + 1}</td>
  //           <td>{item.projectName}</td>
  //           <td>{item.clientName}</td>
  //           <td>{item.totalAmount === null ? "NA" : item.totalAmount}</td>
  //           <td>{item.totalInstallments}</td>
  //           <td>{item.totalPaidAmount}</td>
  //           <td>{item.totalUnPaidAmount}</td>
  //           <td>
  //             <Link to={`/ProjectVeiwDetail/${item.project_id}`}>
  //               <EditIcon style={{ color: "#000", cursor: "pointer" }} />
  //             </Link>
  //             {/* <Link to={`/ProjectVeiwDetail/${item.project_id}`}> */}
  //             {/* <DeleteIcon
  //               style={{ color: "#F23801", cursor: "pointer" }}/> */}
  //             {/* </Link>  */}
  //           </td>
  //         </tr>
  //       </>
  //     );
  //   }).slice(offset, offset + PER_PAGE);
  return (
    <div style={{ overflow: "hidden" }}>
      <div>
        <Modal
          show={mymodel}
          onHide={handlemodelchange}
          className="addTaskModal"
        >
          <Modal.Header className="justify-center">
            <h4
              style={{
                fontWeight: "bold",
                textAlign: "center",
                fontSize: "20px",
              }}
            >
              {" "}
              Create Task
            </h4>
          </Modal.Header>

          <Modal.Body>
            <h6>Task Name</h6>
            <input
              type="text"
              className="inp_feild"
              name="TaskName"
              onChange={inputHandler}
              value={values.TaskName}
              autoFocus="true"
            />
            <h6>Description</h6>
            <textarea
              placeholder="Add Notes"
              name="TaskDescription"
              className="todo-input edit"
              onChange={inputHandler}
              value={values.TaskDescription}
            ></textarea>
            <div className="row my-3">
              <div className="col-md-6">
                <h6>Select Team</h6>
                <Select
                  name="TaskTeam"
                  className="basic-multi-select"
                  classNamePrefix="select"
                  onChange={inputHandler}
                  value={values.TaskTeam}
                />
              </div>
              <div className="col-md-6">
                <h6>Select Employee</h6>
                <Select
                  isMulti
                  name="TaskEmployee"
                  className="basic-multi-select"
                  classNamePrefix="select"
                  onChange={inputHandler}
                  value={values.TaskEmployee}
                />
              </div>
            </div>
            <div className="row my-3">
              <div className="col-md-6">
                <h6>Report to</h6>
                <Select
                  isMulti
                  name="TaskReport"
                  className="basic-multi-select"
                  classNamePrefix="select"
                  onChange={inputHandler}
                  values={values.TaskReport}
                />
              </div>
              <div className="col-md-6">
                <h6>Select Name</h6>
                <Select
                  isMulti
                  name="TaskRepName"
                  className="basic-multi-select"
                  classNamePrefix="select"
                  onChange={inputHandler}
                  values={values.TaskRepName}
                />
              </div>
            </div>
            <div className="row my-3">
              <div className="col-md-6">
                <h6>Task start Time</h6>
                {/* <input
                type="time"
                name="TaskStartTime"
                className="inp_feild"
                onChange={inputHandler}
                value={values.TaskStartTime}
              /> */}
               <input type="date" 
                 onChange={inputHandler}
                 name="TaskStartTime"
                 className="w-100"
                 value={values.TaskStartTime} />
              </div>
              <div className="col-md-6">
                <h6>Task end Time</h6>

                <input type="date" 
                  onChange={inputHandler}
                  className="w-100"
                  name="TaskEndTime"
                  value={values.TaskEndTime} />
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              type="submit"
              variant="danger"
              style={{ backgroundColor: "#F23801" }}
              onClick={handleSubmit}
              className="linkmsg_btn"
            >
              Create
            </Button>
            <Button className="mx-4 btn-cancel cancel_btnsmodel">Cancel</Button>
          </Modal.Footer>
        </Modal>
      </div>
      <Table striped hover>
        <thead>
          <tr>
            <th>SI NO</th>
            <th>Project Name</th>
            <th> Status</th>
            <th>Deadline</th>
            <th>Team</th>
            <th> Action </th>
          </tr>
        </thead>
        {/* <tbody>{getusersdata}</tbody> */}
        <tbody>
          {taskProjList.filter((item) => {
                          if (searchbar == "") {
                            return item;
                          } else if (
                            item.projectName
                              .toLowerCase()
                              .includes(searchbar.toLowerCase())
                          ) {
                            return item;
                          }
                        })
.map((item, index) => { 
  const deadlineDate = moment(new Date(item.endDate)).format(
    "YYYY-MM-DD"
  );
            return (
              <>
                <tr key={item.project_id}>
                  <td>{index + 1}</td>
                  <td>{item.projectName}</td>
                  <td>{item.status}</td>
                  <td>{deadlineDate}</td>
                  <td>
                    <div className="dp-list_r">
                      {item.teamsList.map((teamsList) => {
                        let datalistteam =
                          teamsList.projectTeamType.match(/\b(\w)/g);
                        return (
                          <div className="item-nm" key={teamsList.id}>
                            {datalistteam}
                          </div>
                        );
                      })}
                    </div>
                  </td>
                  <td> 
                    <Link to={`/TaskProjDetails/${item.id}`} className="signuplinks">
                      <RemoveRedEyeIcon
                        style={{ color: "#F23801", cursor: "pointer" }}
                      ></RemoveRedEyeIcon>
                    </Link>
                    <Link to={` `}>
                      <EditIcon style={{ color: "#000", cursor: "pointer" }} />
                    </Link>
                    <AddIcon
                      style={{ color: "#F23801", cursor: "pointer" }}
                      onClick={openmodel}
                    />
                  </td>
                </tr>
              </>
            );
          })}
        </tbody>
      </Table>

      {/* <ReactPaginate
        previousLabel={"← Previous"}
        nextLabel={"Next →"}
        // pageCount={pageCount}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        previousLinkClassName={"pagination__link"}
        nextLinkClassName={"pagination__link"}
        disabledClassName={"pagination__link--disabled"}
        activeClassName={"pagination__link--active"}
      /> */}
    </div>
  );
};

export default TaskList;
