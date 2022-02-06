import React, { useState, useEffect } from "react";
import useForm from "./UseForm";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link, useHistory } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import styled from "styled-components";
import NotificationBtn from "./NotificationBtn";
import Modal from "react-modal";
import { BASE_URL } from "../../config";
import axios from "axios";
import * as moment from "moment";
import { useLocation } from "react-router";

import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function Header(props) {
  const location = useLocation();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [checknotification, setchecknotification] = useState("");
  var history = useHistory();
  const { handleChange, handleSubmit, values, errors } = useForm();
  let token = localStorage.getItem("auth_token");
  const [loading, setLoading] = useState(true);
  const [notification, setnotification] = useState([]);

  let firstName = localStorage.getItem("firstName");
  let lastName = localStorage.getItem("lastName");
  let roleName = localStorage.getItem("role-names");

  let username = firstName + " " + lastName;

  if (firstName !== "") {
    var firstStringChar = firstName.charAt(0).toUpperCase(); //H
  } else {
    var firstStringChar = "p"; //H
  }

  const logOut = (e) => {
    const toLogout = window.confirm("Are you sure to logout ?");
    if (toLogout) {
      localStorage.clear();
      history.push("/");
    } else {
    }
  };
  const modalHandler = (e) => {
    setModalIsOpen(true);
  };
  const modalClose = (e) => {
    setModalIsOpen(false);
  };
  const myaccountpage = () => {
    history.push("/myAccount");
  };
  useEffect(() => {
    axios
      .get(`${BASE_URL}/notifications/un-read`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          "Access-Control-Allow-Headers":
            "Origin, X-Requested-With, Content-Type,Accept, x-client-key, x-client-token, x-client-secret, Authorization",
        },
      })
      .then((response) => {
        setnotification(response.data.notifications);
        console.log(response.data.notifications, "notifcations");
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token]);

  // moment().format("ddd, hA");
  const notofication = location.pathname.split("/")[2];

  const markallasread = () => {
    const todelete = window.confirm("Are you sure you want to make all as read ?");
    if (todelete) {
      axios
        .put(`${BASE_URL}/notifications/mark-all-as-read`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Access-Control-Allow-Origin": "*",
            Accept: "application/json",
          },
        })

        .then((response) => {
          console.log(response.data, "dfasa");
          setLoading(false);
          console.log("mark all as read  Succesfully");
          window.location.reload(false);
          toast("mark all as Succesfully", { type: "success" });
        })

        .catch((error) => {
          console.error(error.response, "There was an error!");
        });
    }
  };

  // console.log(`${BASE_URL}/notifications/${id}/mark-as-read` , "dsfasdf") 


  const markthisread = (id) => { 
    console.log(`${BASE_URL}/notifications/${id}/mark-as-read/Bearer ${token}` , "dsfasdf") 
    axios.put(`${BASE_URL}/notifications/${id}/mark-as-read `, { 
        headers: {
          Authorization:`Bearer ${token}`,
          Accept:"application/json",
        },
      })

      .then((response) => {
        console.log(response.data, "dfasa");
        setLoading(false);
        console.log("Successfully updated the notification");
        window.location.reload(false);
        toast("Successfully updated the notification", { type: "success" });
      })

      .catch((error) => {
        console.error("There was an error!", error.response.data.message);
      });
  };
  console.log(notification.length, "notificationlength");
  useEffect(() => {
    if (notification.length > "0") {
      setchecknotification("");
    } else {
      setchecknotification("veiwnotifications");
    }
  }, [notification]);

  return (
    <div>
      <div className="header_main">
        <div className="header_main_l">
          <input
            className="search_inp"
            type="text"
            name="Search"
            id="Search"
            placeholder="Search"
          />
          <img src="/images/Icon ionic-ios-search.svg" className="search_img" />
        </div>
        <div className="d-flex header_side">
          <div className="header_main_c" onClick={modalHandler}>
            <div className="notif_btn">
              <NotificationsNoneIcon />
              <span className={checknotification}></span>
            </div>
          </div>
          <div className="header_main_r">
            <h6 style={{ marginTop: "-10px" }}>{firstStringChar}</h6>
            <SignOut>
              <div>
                <h4 style={{ fontWeight: "650", fontSize: "17px" }}>
                  {username}
                </h4>
                <p style={{ textAlign: "left" }}>{roleName}</p>
              </div>
              <DropDown>
                <span onClick={myaccountpage}>My Account</span>
              </DropDown>
            </SignOut>
            <LogoutIcon
              style={{
                cursor: "pointer",
                marginLeft: "15%",
                marginTop: "-15px",
              }}
              onClick={logOut}
            />
            <Modal isOpen={modalIsOpen} onRequestClose={modalClose}>
              <div className="notifModalCover">
                <div className="modalHeading">
                  <button onClick={modalClose} className="notifModalCloseBtn">
                    <span>x</span> Close
                  </button>
                  <div className="d-flex model_btns">
                    <button
                      className="btn-sm btn-success"
                      type="button"
                      onClick={markallasread}
                    >
                      Mark all as read
                    </button>
                
                  </div>

                  <h4>Notifications</h4>
                </div>

                <ul>
                  {notification.map((items, index) => {
                    var date = moment(items.created_at).format(
                      " hh:mm A , YYYY-MM-DD "
                    );

                    var matches = items.data.user_name.match(/\b(\w)/g);
                    var acronym = matches.join("");
                    return (
                      <>
                        <li key={items.id}>
                          <div key={items.data.id}>
                            <div className="notification-row">
                              <div className="d-flex">
                                <div className="notif-user-img">
                                  <div className="userNameImg">{acronym}</div>
                                </div>
                                <div className="notification-details">
                                  <div className="notification-head">
                                    <h5>{items.data.user_name}</h5>
                                    <div className="notif-time">{date}</div>
                                  </div>
                                  <p>{items.data.name}</p>
                                </div>
                              </div>

                              <div>
                                <button
                                  type="button"
                                  className="markasreadbtn"
                                  onClick={() => markthisread(items.id)}
                                >
                                  Mark as Read
                                </button>
                              </div>
                            </div>
                          </div>
                        </li>
                      </>
                    );
                  })}
                </ul>
              </div>
              <Link to="/notifications" className="">
                <button type="button" className="btn_val veiwnot">
                  Veiw All Notifications
                </button>
              </Link>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
}

const DropDown = styled.div`
  position: absolute;
  top: 40px;
  left: -30px;
  border: 1px solid rgba(151, 151, 151, 0.34);
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  padding: 5px 10px;
  font-size: 14px;
  -webkit-letter-spacing: 3px;
  -moz-letter-spacing: 3px;
  -ms-letter-spacing: 3px;
  letter-spacing: 2px;
  width: 140px;
  opacity: 0;
  background: #f23801;
  color: #fff;
`;

const SignOut = styled.div`
  position: relative;
  height: 48px;

  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;

  &:hover {
    ${DropDown} {
      opacity: 1;
      transition-duration: 1s;
      z-index: 999;
    }
  }
`;
export default Header;
