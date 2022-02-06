import React, { useEffect, useState } from "react";

import { Modal } from "react-bootstrap";
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
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import EditIcon from "@mui/icons-material/Edit";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import ButtonIcon from "../../components/Others/ButtonIcon";
import Messageinfotask from "./Messageinfotask";

const VeiwTasks = ({history}) => {
  const [taskselectoption, settaskselectoption] = useState("");
  const [taskselectoptionmod, settaskselectoptionmod] = useState("option");
  const [selchangeclass, setselchangeclass] = useState("");
  const [selchangeclassmod, setselchangeclassmod] = useState("selectedmodel");
  const [mymodel, setmymodel] = useState(false);

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
                <th>Task Name</th>
                <th>Reporting Manager</th>
                <th>Priority</th>
                <th>Status</th>
                <th> Timeline </th>
                <th> Notes </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Login Page</td>
                <td>
                  <div class="dp-list_r">Will Smith</div>
                </td>
                <td>
                  <select className="veiwtaskselect">
                    <option value="1" className="highselect">
                      High
                    </option>
                    <option value="2" className="lowselect">
                      Medium
                    </option>
                    <option value="3" className="lowselect">
                      Low
                    </option>
                  </select>
                </td>
                <td>
                  <select className="veiwtaskselect">
                    <option value="1" className="highselect">
                      High
                    </option>
                    <option value="2" className="lowselect">
                      Medium
                    </option>
                    <option value="3" className="lowselect">
                      Low
                    </option>
                  </select>
                </td>
                <td>
                  <div className="d-flex tasktimeline">
                    <div className="tasktimeline_left"></div>

                    <div className="tasktimeline_right"></div>
                    <div className="timetask_block">Oct 12-Dec 15</div>
                  </div>
                </td>
                <td>
                  <ChatBubbleIcon
                    style={{ color: "#C9C9C9", cursor: "pointer" }}
                  />
                </td>
              </tr>
              <tr>
                <td>2</td>
                <td>Backend</td>
                <td>
                  <div className="addpersontask_block">
                    <span className="addpersontask">
                      <PersonAddAlt1Icon
                        style={{ color: "#F23801", cursor: "pointer" }}
                      />
                    </span>
                  </div>
                </td>
                <td>
                  <select className="veiwtaskselect">
                    <option value="1" className="highselect">
                      High
                    </option>
                    <option value="2" className="lowselect">
                      Medium
                    </option>
                    <option value="3" className="lowselect">
                      Low
                    </option>
                  </select>
                </td>
                <td>
                  <select className="veiwtaskselect">
                    <option value="1" className="highselect">
                      High
                    </option>
                    <option value="2" className="lowselect">
                      Medium
                    </option>
                    <option value="3" className="lowselect">
                      Low
                    </option>
                  </select>
                </td>
                <td>
                  <div className="d-flex tasktimeline">
                    <div className="tasktimeline_left"></div>

                    <div className="tasktimeline_right"></div>
                    <div className="timetask_block">Oct 12-Dec 15</div>
                  </div>
                </td>
                <td>
                  <ChatBubbleIcon
                    style={{ color: "#C9C9C9", cursor: "pointer" }}
                  />
                </td>
              </tr>
              <tr>
                <td>3</td>
                <td>UI/UX Developers</td>
                <td>
                  <div className="addpersontask_block">
                    <span className="addpersontask">
                      <PersonAddAlt1Icon
                        style={{ color: "#F23801", cursor: "pointer" }}
                      />
                    </span>
                  </div>
                </td>
                <td>
                  <select className={selchangeclass} onChange={selecttask}>
                    <option value="" disabled="" selected="" hidden="">
                      option
                    </option>
                    <option value="1" className="highselect">
                      success
                    </option>
                    <option value="2" className="lowselect">
                      Medium
                    </option>
                    <option value="3" className="lowselect">
                      Low
                    </option>
                  </select>
                </td>
                <td>
                  <div onClick={openmodel}>
                    <div className={selchangeclassmod}>   {taskselectoptionmod} <img src="/images/down-arrow.png" style={{ width:'10px', margin:'0  0px 0 20px'}}/></div>
                  </div>
                </td>
                <td>
                  <div className="d-flex tasktimeline">
                    <div className="tasktimeline_left"></div>

                    <div className="tasktimeline_right"></div>
                    <div className="timetask_block">Oct 12-Dec 15</div>
                  </div>
                </td>
                <td>
                  <Messageinfotask /> 
                </td>
              </tr>
            </tbody>
          </Table>
          <Modal show={mymodel} onHide={handlemodelchange}>
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
              <div className="model_select">
                <div className="d-flex">
                  <label style={{ fontWeight: "bold", color:'#e2445c' }}>Status:</label>

                  <div className="mx-2 mb-5">
                  <select  onChange={selecttaskmod}>
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

export default VeiwTasks;
