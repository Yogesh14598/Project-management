import React, { useEffect, useState } from "react";
import Header from "../../components/Others/Header";
import Sidebar from "../../components/Others/Sidebar";
import TaskCard from "../../components/Others/TaskCard";
import axios from "axios";
import { Link } from "react-router-dom";
import { Dropdown, Table, Button } from "react-bootstrap";
import Loader from "../Others/Loader";
import { toast } from "react-toastify";
import { BASE_URL } from "../../config";
import { margin } from "@mui/system";
import { Progress } from "react-sweet-progress";
import "react-sweet-progress/lib/style.css";
import PeichartCard from "../Others/PeichartCard";
import AddIcon from "@mui/icons-material/Add";
import { Modal } from "react-bootstrap";
import Select from "react-select";
import DateTimePicker from "react-datetime-picker";
import EditIcon from "@mui/icons-material/Edit";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import ButtonIcon from "../../components/Others/ButtonIcon";
import { useLocation } from "react-router";
import * as moment from "moment";

const TaskProjDetails = ({ history }) => { 
  const [valuedatetime, onChange] = useState(new Date());
  const [mymodel , setmymodel] = useState(false);

  const [projDetails, setProjDetails] = useState([]);
  const [teamlists , setteamlists] = useState([]);

  const location = useLocation();
  const projectId = location.pathname.split("/")[2];

  let token = localStorage.getItem("auth_token");
  const [loading, setLoading] = useState(true);

  const handlemodelchange = () => {
      setmymodel(false)
    }
    const openmodel = () => {
      setmymodel(true)
    }

    useEffect(() => {
      axios
        .get(`${BASE_URL}/admin/task-management/project/${projectId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
            "Access-Control-Allow-Headers":
              "Origin, X-Requested-With, Content-Type,Accept, x-client-key, x-client-token, x-client-secret, Authorization",
          },
        })
        .then((response) => {
          console.log(response.data.project , "project");
          setProjDetails(response.data.project);
          setteamlists(response.data.teams);

          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }, [token]);
 
    console.log(teamlists , "teamliststeamlists")

    const starttDate = moment(
      new Date(projDetails.startDate)
    ).format("YYYY-MM-DD"); 
    const tdydate = moment(new Date()).format(
      "YYYY-MM-DD"
    );
    const date1 = new Date(starttDate);
    const date2 = new Date(tdydate);
    const diffTime = Math.abs(date2 - date1);
    const daysLeft = Math.ceil(
      diffTime / (1000 * 60 * 60 * 24)
    ); 
 
  return (
    <div>
      <div className="Proj_main">
        <div className="Proj_main_l">
          <Sidebar />
        </div>
        <div className="Proj_main_r">
          <Header />
          <div>  
<Modal show={mymodel} onHide={handlemodelchange}>  
  <Modal.Header closeButton>This is a Modal Heading</Modal.Header>  
  <Modal.Body>
            <h6>Task Name</h6>
            <input
              type="text"
              className="inp_feild"
              name="TaskName"
              value=""
              autoFocus="true"
            />
            <h6>Description</h6>
            <textarea
              placeholder="Add Notes"
              name="TaskDescription"
              className="todo-input edit"
              value=""
            ></textarea>
           
            <div className="row my-3">
              <div className="col-md-6">
                <h6>Report to</h6>
                <Select
                  isMulti
                  name="TaskReport"
                  className="basic-multi-select"
                  classNamePrefix="select"
                  values=""
                />
              </div>
              <div className="col-md-6">
                <h6>Select Name</h6>
                <Select
                  isMulti
                  name="TaskRepName"
                  className="basic-multi-select"
                  classNamePrefix="select"
                  values=""
                />
              </div>
            </div>
            <div className=" my-3">
              <div className="col-md-12 my-3 ">
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
              <div className="col-md-12 my-3">
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
    <Button onClick={handlemodelchange} className="cancel_btnsmodel">Cancel</Button>  
    <button onClick={handlemodelchange} className="linkmsg_btn" >Save</button>  
  </Modal.Footer>  
</Modal>  

</div>
          <h3 class="projectheadline">
            <img src="/images/backarrows.svg" width="25px"        onClick={() => history.goBack()}/>
            <span style={{ margin: "0 5px" }}> Project Details</span>
          </h3>
          <div className="d-flex justify-content-between align-items-center">
            <h6 className="tasksubmenu"> {projDetails.projectName}</h6>
<div onClick={openmodel}>
              <ButtonIcon
                text="Add Task"
                src="../../images/Icon ionic-ios-add (2).svg"
                id="btn_radius"
              />
              </div>
          </div>
          <div className="home_block mt-3">
            <TaskCard
              src="../../images/taskimgs.svg"
              text="Total Teams"
              val="10"
              style={{ width: "auto" }}
            />
            <TaskCard
              src="../../images/taskimgs.svg"
              text="Total Tasks"
              val={projDetails.tasksCount}
              style={{ width: "auto" }}
            />
            <TaskCard
              src="../../images/taskimgs.svg"
              text="Completed Tasks"
              val={projDetails.tasksCompletedCount}
              style={{ width: "auto" }}
            />
            <TaskCard
              src="../../images/taskimgs.svg"
              text="Total Days Left"
              val={daysLeft}
              style={{ width: "auto" }}
            />
            <PeichartCard
              text="Project Status"
             val={(projDetails.tasksCompletedCount)/(projDetails.tasksCount)}
              style={{ width: "auto", color: "#F23801" }}
            />
          
          </div>
          <div className="d-flex justify-content-between ">
            <h6 className="tasksubmenu">Teams</h6>
            <div className="">
              <img src="/images/Icon awesome-filter.svg" class="mx-3" />
              <input
                type="text"
                placeholder="Search"
                value=""
                style={{
                  border: "1px solid darkgray",
                  padding: "3px 5px",
                  borderRadius: "5px",
                }}
              />
            </div>
          </div>
          <Table striped hover className="my-3">
            <thead>
              <tr>
                <th>SI NO</th>
                <th>Team Type</th>
                <th>Team</th>
                <th>Deadline</th>
                <th>Status</th>
                <th> Action </th>
              </tr>
            </thead>
            <tbody> 
            {teamlists.map((items,index) => {
            return (
              <>
                <tr key={items.project_id}>
                  <td>{index+1}</td>
                  <td>{items.projectTeamType}</td>
                  <td> 
                    <div className="dp-list_r">
                      {items.team_members.map((teams) => {
                        let datalistteam = teams.memberName.match(/\b(\w)/g);
                        return (
                          <div className="item-nm" key={teams.memberId}>
                            {datalistteam}
                          </div>
                        );
                      })}
                    </div>
                  </td>
                  <td>{moment(items.deadlineDate).format("YYYY-MM-DD")}</td>
                  <td>
                    <Progress
                      percent={(items.tasksCompletedCount)/(items.tasksCount)}
                      status="error"
                      theme={{
                        error: { 
                          symbol: "70%",
                          color: "#F23801",
                        },
                      }}
                    />
                  </td>
                  <td>
                    <Link to={`/taskteamdetail/${items.team_id}`} className="signuplinks">
                      <RemoveRedEyeIcon style={{ color: "#F23801", cursor: "pointer" }}>
                      </RemoveRedEyeIcon> 
                    </Link>
                    <Link to={` `}>
                      <EditIcon style={{ color: "#000", cursor: "pointer" }} />
                    </Link>
                  </td>
                 
                </tr>
              </>
            );
          })} 
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default TaskProjDetails;
