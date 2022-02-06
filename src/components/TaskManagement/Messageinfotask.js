import React, { useState, useEffect } from "react";
import Modal from "react-modal";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import qs from "qs";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Loader from "../Others/Loader";
import { toast } from "react-toastify";
import { BASE_URL } from "../../config";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";

const Messageinfotask = () => {

  let token = localStorage.getItem("auth_token");
  const [linksnotes, setlinksnotes] = useState([]);
  const [showResults, setshowResults] = useState(false);
  const [inputval, setinputval] = useState({
    heading: "",
    link: "",

  });


  const [modalIsOpen, setModalIsOpen] = useState(false);
  const modalHandler = (e) => {
    setModalIsOpen(true);
  };
  const modalClose = (e) => {
    setModalIsOpen(false);
  };


  const eventhandle = (event) => {
    setinputval({
      ...inputval,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    axios
      .get(`${BASE_URL}/admin/task-management/tasks/1/links`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      })
      .then((response) => {
        // handle success
        console.log(response.data, "linksnotes");
        setlinksnotes(response.data.links)


      })
      .catch((error) => {
        // handle error
        console.log(error.response, "errorsaaaa");
      });
  }, []);


  const linksadd = {
    heading: inputval.heading,
    link: inputval.link,

  };

  const handleSubmit = (e) => {
    let errorss = 0;
    e.preventDefault();

    if (
      (inputval.heading,
        inputval.link == "")
    ) {
      errorss++;
    } else {
      errorss = 0;
    }
    if (errorss == 0) {
      axios
        .post(
          `${BASE_URL}/admin/task-management/tasks/1/links`,
          qs.stringify(linksadd),
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

        .then((response) => {
          console.log(response);
          toast("Successfully added the link", { type: "success" });
          
        setTimeout(function () {
          window.location.reload(false);
        }, 2000);
      

        })

        .catch((error) => {
          console.log("there is an error y", error.response.data);

        });
    }
  };

 
  const updateHandler = (id) => {
    setshowResults("true"); 
    localStorage.setItem("idvaluelink", `${id}`);

    axios
      .get(`${BASE_URL}/admin/task-management/tasks/links/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      })
      .then((response) => {
        console.log(response.data, "fjksdldnjzkvbxdzc");

        setinputval({
          heading: response.data.link.heading,
        }); 
        
        setinputval({
          link: response.data.link.link,
        }); 
      })
      .catch((error) => {
        console.log(error);
      });
  };



  
  const updatethevalue = () => { 
    setshowResults("false")
    let idvaluelink = localStorage.getItem("idvaluelink");
    axios
      .put(`${BASE_URL}/admin/task-management/tasks/links/${idvaluelink}` , qs.stringify(inputval), { 
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      })
      .then((response) => {
        console.log("update");
        toast("Successfully updated", { type: "success" });
        
        setTimeout(function () {
          window.location.reload(false);
        }, 2000);
      
      })
      .catch((error) => {
        console.error("There was an error!", error);
    
      });
  };

  const deleteHandler = (id) => {
    const todelete = window.confirm("Are you sure you want to delete ?");
    if (todelete) {
      axios
        .delete(`${BASE_URL}/admin/task-management/tasks/links/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
             },
        })
        .then((response) => {
          console.log("Project Deleted Succesfully");
          setTimeout(function () {
            window.location.reload(false);
          }, 2000);
          toast("link deleted successfully", { type: "success" });
        })
        .catch((error) => {
          console.error("There was an error!", error.response);
        
        });
    }
  };
  return (
    <div>
      <div className="chaticon" onClick={modalHandler}>
        <ChatBubbleIcon style={{ color: "#C9C9C9", cursor: "pointer" }} />
        <div className="chaticon_block"></div>
      </div>

      <Modal isOpen={modalIsOpen} onRequestClose={modalClose} ariaHideApp={false}>
        <Tabs>
          <Tab eventKey="notes" title="Notes">
            <h5>Description</h5>
            <div className="d-flex description">
              <div className="description_left">
                <div className="descr_sec">HR</div>
              </div>
              <div className="description_right">
                <h4>
                  Rick Grimes
                  <span className="submenu-desc"> 3:00PM, Today</span>
                </h4>
                <p>Waiting for requirement sheet from the client.</p>
                <h6>
                  Status: <label className="submenu-desc">On Hold</label>
                </h6>
              </div>
            </div>
            <div className="d-flex description">
              <div className="description_left">
                <div className="descr_sec">HR</div>
              </div>
              <div className="description_right">
                <h4>
                  Rick Grimes
                  <span className="submenu-desc"> 3:00PM, Today</span>
                </h4>
                <p>Waiting for requirement sheet from the client.</p>
                <h6>
                  Status: <label className="submenu-desc">On Hold</label>
                </h6>
              </div>
            </div>
            <div className="textfeldmsg">
              <div className="messubmit">
                <input type="text" className="desc_submit" />
                <img
                  src="/images/send.png"
                  className="desc_submit_img"
                  alt=""
                />
              </div>
            </div>
          </Tab>
          <Tab eventKey="link" title="Link">
            <div className="linkmsg">


              {linksnotes.map((items, index) => {
                return (
                  <>
                    <div className="linkmsg_block_main ">
                      <div className="linkmsg_block">
                        <h4>
                          {items.heading}
                        </h4>
                        <a href="" target="_blank">
                          {items.link}
                        </a>
                      </div>
                      <div>
                        <EditIcon
                          style={{ cursor: "pointer" }}
                       
                          onClick={() => updateHandler(items.id)} 
                        />
                        <DeleteIcon
                          style={{ color: "#F23801", cursor: "pointer" }}
                          onClick={() => deleteHandler(items.id)}
                        />
                      </div>
                    </div>
                  </>
                );
              })}

              <div className="linkmsg_footer">
                <input type="text" placeholder="Add Heading" name="heading" value={inputval.heading} onChange={eventhandle} />
                <input type="text" placeholder="Add Link" name="link" value={inputval.link} onChange={eventhandle} />
                <div className="linkmsg_footer_btns"> 
                {showResults ? (
                  
              <button type="button" className="linkmsg_btn" onClick={updatethevalue}>update</button>
            ) : (

              <button type="button" className="linkmsg_btn" onClick={handleSubmit}>Upload</button>
            )}
                

                </div>
              </div>
            </div>
          </Tab>
        </Tabs>

        <button onClick={modalClose} className="modalCloseBtn">
          X
        </button>
      </Modal>
    </div>
  );
};

export default Messageinfotask;
