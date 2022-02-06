import React, { useEffect, useState } from "react";
import Header from "../../components/Others/Header";
import Sidebar from "../../components/Others/Sidebar";
import Card from "../../components/Others/Card";
import axios from "axios";
import { useHistory } from "react-router-dom"; 
import { Link } from "react-router-dom";
import { Dropdown, Table, Button } from "react-bootstrap";
import Loader from "../Others/Loader";
import { toast } from "react-toastify";
import { BASE_URL } from "../../config";
import TaskList from "./TaskList";



function Tasks() {
  let history = useHistory();
  
  const [TaskReports, setTaskReports] = useState([]);
  const [TaskReportsArray, setTaskReportsArray] = useState([]);
  const [TaskReportsTable, setTaskReportsTable] = useState([]);
  const [startdate, setstartdate] = useState();
  const [loading, setLoading] = useState(true);
  const [enddate, setenddate] = useState();
  const [searchbar, setsearchbar] = useState("");
  const [showsearchnbtncond, setshowsearchnbtncond] = useState(true);
  localStorage.setItem("startdate", startdate);
  localStorage.setItem("enddate", enddate);
  let token = localStorage.getItem("auth_token");

  const movetodatebased = () => {
    if (enddate > startdate && (startdate || enddate)) {
      history.push("/TaskBasedDate");
    } else if (enddate < startdate) {
      history.push("/admin/Task-reports");

      toast("The Deadlinedate End must be a greater than Deadlinedate Start", {
        type: "error",
      });
    } else {
      history.push("/admin/Task-reports");

      toast("please select Deadlinedate Start and Deadlinedate End", {
        type: "error",
      });
    }
  };

  console.log(enddate > startdate, "truefalse");
  console.log(startdate, enddate);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/admin/Task-reports`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      })
      .then((response) => {
        // handle success
        console.log(response.data, "Task-reports");
        console.log("setTaskReports success");
        setTaskReportsArray(response.data);
        setTaskReports(response.data.TaskReportCount);
        setTaskReportsTable(response.data.projectTaskReports);
        setLoading(false);
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  }, []);
  console.log(startdate, "1");
  console.log(enddate, "2");

  return (
    <div>
      <div className="Proj_main">
        <div className="Proj_main_l">
          <Sidebar />
        </div>

        <div className="Proj_main_r">
          <Header />
          <div className="home">
            <h1>All Projects</h1>
            
          </div>
          <div className="d-flex projectmaintabs taskFilter">
          <div className="d-flex  ">
          <img src="/images/Icon awesome-filter.svg" class="mx-3" style={{marginTop:"30px"}}/>
              <div className=" taskSelect">
                <h6 className="">Project Status</h6>
                <select 
                    style={{
                    border: "1px solid darkgray",
                    padding: "3px 5px",
                    borderRadius: "5px",
                    }}
                >
                    <option value="All"> All </option>
                    <option value="Not started">Not started</option>
                    <option value="Completed">Completed</option>
                    <option value="On Hold">On Hold</option>
                    <option value="On Going">On Going</option>
                </select> 
              </div>
              
                </div>
                <div className=" mt-auto">
                  <div className="searchbar">
                    {showsearchnbtncond ?  <div className="">
      <img src="/images/Icon awesome-filter.svg" class="mx-3" />
      <input
        type="text"
        placeholder="Search"
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
     : null}
                  </div>
                </div>
            
           
            {/* <div className="mx-3 mt-auto mb-3">
              <Button variant="danger" onClick={movetodatebased} type="button">
                Submit
              </Button>
            </div> */}
          </div> 
          
          <div className="Task_list">
                <TaskList searchbar={searchbar}/>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Tasks;
