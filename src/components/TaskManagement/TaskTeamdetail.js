import React, { useEffect, useState } from "react";
import Header from "../../components/Others/Header";
import Sidebar from "../../components/Others/Sidebar";
import TaskCard from "../../components/Others/TaskCard";

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

import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import ButtonIcon from "../../components/Others/ButtonIcon";

import { useLocation } from "react-router";
const TaskProjDetails = ({history}) => {
  const location = useLocation();
  const teamId = location.pathname.split("/")[2];
  const [teammember , setteammember] = useState([]);
  
  let token = localStorage.getItem("auth_token");
  const [loading, setLoading] = useState(true);
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
        console.log(response.data , "teammenenr");
        setteammember(response.data.team_members)
    

        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div>
      <div className="Proj_main">
        <div className="Proj_main_l">
          <Sidebar />
        </div>

        <div className="Proj_main_r">
          <Header />
          <h3 class="projectheadline">
            <img src="/images/backarrows.svg" width="25px"        onClick={() => history.goBack()} />
            <span style={{ margin: "0 5px" }}> Project Details</span>
          </h3>

          <div className="d-flex justify-content-between ">
            <h6 className="tasksubmenu">UI/UX Designers Team</h6>
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
                <th>Email</th>
               
                <th>Status</th>
                <th> Action </th>
              </tr>
            </thead>
           
            <tbody> 
            {teammember.map((items,index) => {
            return (
              <>
                <tr key={items.id}>
                  <td>{index+1}</td>
                  <td></td>
                  <td>{items.email}</td>
                
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
<Link to="/veiwtask" className="signuplinks">
                    <Button variant="danger" size="sm">
                      View Tasks
                    </Button>
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
