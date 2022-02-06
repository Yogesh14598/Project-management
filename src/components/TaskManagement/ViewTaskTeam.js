import React, { useEffect, useState } from "react";

import { Modal } from "react-bootstrap";
import Header from "../../components/Others/Header";
import Sidebar from "../../components/Others/Sidebar";
import TaskCard from "../../components/Others/TaskCard";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { Dropdown, Table, Button } from "react-bootstrap";
import Loader from "../Others/Loader";
import { toast } from "react-toastify";
import { BASE_URL } from "../../config";
import { margin } from "@mui/system";
import { Progress } from "react-sweet-progress";
import "react-sweet-progress/lib/style.css";
import PeichartCard from "../Others/PeichartCard";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import EditIcon from "@mui/icons-material/Edit";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import ButtonIcon from "../../components/Others/ButtonIcon";
import Messageinfotask from "./Messageinfotask";
import { useLocation } from "react-router";

const VeiwTaskTeam = ({ history }) => {
  const [taskselectoption, settaskselectoption] = useState("");
  const [taskselectoptionmod, settaskselectoptionmod] = useState("option");
  const [selchangeclass, setselchangeclass] = useState("");
  const [selchangeclassmod, setselchangeclassmod] = useState("selectedmodel");
  const [mymodel, setmymodel] = useState(false);
  let token = localStorage.getItem("auth_token");
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const teamId = location.pathname.split("/")[2];
  console.log(teamId, "teamIdvvvvvvvv");

  const [teamDetails, setTeamDetails] = useState([]);

  const selecttask = (e) => {
    settaskselectoption(e.target.value);
    if (e.target.value == "1") {
      setselchangeclass("selchangeclass1");
    }
    if (e.target.value == "2") {
      setselchangeclass("selchangeclass2");
    }
    if (e.target.value == "3") {
      setselchangeclass("selchangeclass3");
    }
  };

  const selecttaskmod = (e) => {
    settaskselectoptionmod(e.target.value);
    if (e.target.value == "success") {
      setselchangeclassmod("selchangeclass1");
    }
    if (e.target.value == "Medium") {
      setselchangeclassmod("selchangeclass2");
    }
    if (e.target.value == "Low") {
      setselchangeclassmod("selchangeclass3");
    }
    if (e.target.value == "option") {
      setselchangeclassmod("selectedmodel");
    }
  };
  const handlemodelchange = () => {
    setmymodel(false);
  };
  const openmodel = () => {
    setmymodel(true);
  };

  useEffect(() => {
    axios
      .get(`${BASE_URL}/admin/task-management/project/team/${teamId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          "Access-Control-Allow-Headers":
            "Origin, X-Requested-With, Content-Type,Accept, x-client-key, x-client-token, x-client-secret, Authorization",
        },
      })
      .then((response) => {
        console.log(response.data.team, "Teamsssssssss");
        setTeamDetails(response.data.team_members);

        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token]);

  return (
    <div>
      <div className="Proj_main">
        <div className="Proj_main_l">
          <Sidebar />
        </div>
        <div className="Proj_main_r">
          <Header />
          <h3 class="projectheadline">
            <img
              src="/images/backarrows.svg"
              width="25px"
              onClick={() => history.goBack()}
            />
            <span style={{ margin: "0 5px" }}>Team Details</span>
          </h3>

          <div className="d-flex justify-content-between">
            <h6 className="tasksubmenu">
              <span>{teamDetails.projectName}</span>UI/UX Designers Team
            </h6>
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
                <th>Name</th>
                <th>Email</th>
                <th>Deadline</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {teamDetails.map((item, key) => {
                let finalres = item.tasksCompletedCount / item.tasksCount;
                return (
                  <tr key={item.id}>
                    <td>{key + 1}</td>
                    <td>{item.memberName}</td>
                    <td>{item.email}</td>
                    <td>
                      {item.tasksCount}, {item.tasksCompletedCount}
                    </td>
                    <td>
                      <Progress
                        percent={item.tasksCompletedCount / item.tasksCount}
                        status="error"
                        theme={{
                          error: {
                            symbol: { finalres },
                            color: "#F23801",
                          },
                        }}
                      />
                    </td>
                    <td>
                    <Link to="/taskTeamdetail" className="signuplinks">
                    <button type="button">Veiw Details</button>
                    </Link>
              
                  </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          <Modal show={mymodel} onHide={handlemodelchange}>
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
              <div className="model_select">
                <div className="d-flex">
                  <label style={{ fontWeight: "bold", color: "#e2445c" }}>
                    Status:
                  </label>
                  <div className="mx-2 mb-5">
                    <select onChange={selecttaskmod}>
                      <option value="option" disabled="" selected="" hidden="">
                        option
                      </option>
                      <option value="success" className="highselect">
                        success
                      </option>
                      <option value="Medium" className="lowselect">
                        Medium
                      </option>
                      <option value="Low" className="lowselect">
                        Low
                      </option>
                    </select>
                  </div>
                </div>

                <h3>Describe about your status</h3>
                <textarea> </textarea>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button
                onClick={handlemodelchange}
                type="success"
                className="linkmsg_btn"
              >
                submit
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default VeiwTaskTeam;
