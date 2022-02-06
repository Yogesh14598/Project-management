import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Header from "../../components/Others/Header";
import Sidebar from "../../components/Others/Sidebar";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as moment from "moment";
import { BASE_URL } from "../../config";

const Notifications = ({history}) => {
  const [allnotification, setallnotification] = useState([]);
  let token = localStorage.getItem("auth_token");

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get(`${BASE_URL}/notifications`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          "Access-Control-Allow-Headers":
            "Origin, X-Requested-With, Content-Type,Accept, x-client-key, x-client-token, x-client-secret, Authorization",
        },
      })
      .then((response) => {
        setallnotification(response.data.notifications);
        console.log(response.data, "allnotifcations");
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token]); 
  
  const deleteall = () => {
    const todelete = window.confirm("Are you sure you want to delete ?");
    if (todelete) {
      axios
        .delete(`${BASE_URL}/notifications/clear-all`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Access-Control-Allow-Origin": "*",
            Accept: "application/json",
          },
        })

        .then((response) => {
          console.log(response.data, "dfasa");
          setLoading(false);
          console.log("notification deleted  Succesfully");
          window.location.reload(false);
          toast("notification deleted Succesfully", { type: "success" });
        })

        .catch((error) => {
          console.error("There was an error!", error.response.data.message);
        });
    }
  };
  return (
    <div>
      <div className="Proj_main">
        <div className="Proj_main_l">
          <Sidebar />
        </div>
        <div className="Proj_main_r">
          <Header />
          <div className="notificatons">
            <div className="notificatons_block">
            <h3 className="projectheadline">
            <img
              src="/images/backarrows.svg"
              width="25px"
              style={{ cursor: "pointer", marginRight: "1%" }}
              onClick={() => history.goBack()}
            />
         All  Notifications
          </h3> 
          <button
                      className="btn-sm btn-danger deleteallitem"
                      type="button"
                      onClick={deleteall}
                    >
                      Delete All
                    </button>
              <ul>
                {allnotification.map((items, index) => {
                  var date = moment(items.created_at).format(
                    " hh:mm A , YYYY-MM-DD "
                  );

                  var matches = items.data.user_name.match(/\b(\w)/g);
                  var acronym = matches.join("");
                  return (
                    <>
                      <li key={items.id}>
                        <div
                          className="notification-rowsitem"
                          key={items.data.id}
                        >
                          <div className="notif-user-img">
                            <div className="userNameImg">{acronym}</div>
                          </div>
                          <div className="notification-details">
                            <div className="notification-head">
                              <h5>{items.data.user_name}</h5>
                              <div className="notif-time"> {date}</div>
                            </div>
                            <p> {items.data.name}</p>
                          </div>
                        </div>
                      </li>
                    </>
                  );
                })}
                
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
