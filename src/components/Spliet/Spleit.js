import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import Loader from "../Others/Loader";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BASE_URL } from "../../config";
import ReactPaginate from "react-paginate";
import { Modal } from "react-bootstrap";
import Select from "react-select";
import DateTimePicker from "react-datetime-picker";


const Spleit = () => {

    const [ManagementUsersList, setManagementUsersList] = useState([]);
    const [searchbar, setsearchbar] = useState("");
    const [showsearchnbtncond, setshowsearchnbtncond] = useState(true);
    const [mymodel, setmymodel] = useState(false);
  const [valuedatetime, onChange] = useState(new Date());
  const [loading, setLoading] = useState(true);

  
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
  const handlemodelchange = () => {
    setmymodel(false);
  };
  const openmodel = () => {
    setmymodel(true);
  };
    console.log(ManagementUsersList, "ManagementUsersList");
  
    const url = `${BASE_URL}/admin/master-menu/internal-management-user-list`;
  
    let token = localStorage.getItem("auth_token");
  
    toast.configure();
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
    useEffect(() => {
      axios
        .get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        })
        .then((response) => {
          console.log(response.data, "usrtslist");
          setManagementUsersList(response.data.users);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }, [token]);
  
    const deleteClientHandler = (id) => {
      const todelete = window.confirm("Are you sure you want to delete ?");
      if (todelete) {
        axios
          .delete(
            `${BASE_URL}/admin/masterMenu/internalManagementUserList/${id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods":
                  "GET,PUT,POST,DELETE,PATCH,OPTIONS",
                "Access-Control-Allow-Headers":
                  "Origin, X-Requested-With, Content-Type,Accept, x-client-key, x-client-token, x-client-secret, Authorization",
              },
            }
          )
          .then(() => {
            console.log("User Deleted Succesfully");
            toast("User Deleted Succesfully", { type: "success" });
            setTimeout(function () {
              window.location.reload(false);
            }, 2000);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    };
  
    //pagination
  
    const [currentPage, setCurrentPage] = useState(0);
  
    const PER_PAGE = 4;
  
    const offset = currentPage * PER_PAGE;
  
    const pageCount = Math.ceil(ManagementUsersList.length / PER_PAGE);
  
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
    return (
      <> 
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
                <DateTimePicker
                  name="TaskEndTime"
                  onChange={onChange}
                  value={valuedatetime}
                />
              </div>
              <div className="col-md-6">
                <h6>Task end Time</h6>

                <DateTimePicker
                  name="TaskEndTime"
                  onChange={onChange}
                  value={valuedatetime}
                />
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
      <div style={{ textAlign:'right'}}>
                <button type="button" className="btn_val btn-lg mx-3" style={{borderRadius:'15px'}} onClick={openmodel}> +  Add Split </button>
    
      </div>

        <div className="searchbar">
          {showsearchnbtncond ? <Showsearchnbtn /> : null}
        </div>
        <div style={{ overflow: "hidden", margin: "10px 0" }}>
          <Table striped hover>
            <thead>
              <tr>
                <th>SI NO</th>
                <th>User Name</th>
  
                <th>User email</th>
                <th>Veiw Details</th>
                <th> Action </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <Loader />
              ) : (
                ManagementUsersList.filter((item) => {
                  if (searchbar == "") {
                    return item;
                  } else if (
                    item.firstName.toLowerCase().includes(searchbar.toLowerCase())
                  ) {
                    return item;
                  }
                })
                  .map((item, index) => (
                    <tr key={item.id}>
                      <td>{index + 1}</td>
                      <td>{item.firstName + " " + item.lastName}</td>
  
                      <td>{item.email} </td>
                      <td>
                        <div className="editDelete">
                          <Link
                            to={`/ManagementUserViewDetails/${item.id}`}
                            className="signuplinks"
                          >
                            <Button variant="danger" size="sm">
                              View Details
                            </Button>
                          </Link>
                        </div>
                      </td>
                      <td>
                        <DeleteIcon
                          style={{ color: "red", cursor: "pointer" }}
                          onClick={() => deleteClientHandler(item.id)}
                        />
                      </td>
                    </tr>
                  ))
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
      </>
    );
};

export default Spleit;
