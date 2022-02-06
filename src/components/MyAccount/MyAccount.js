import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import Header from "../../components/Others/Header";
import Sidebar from "../../components/Others/Sidebar";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import ButtonIcon from "../../components/Others/ButtonIcon";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import "../../Veiwdetail.css";
import axios from "axios";
import validation from "../../validation";
import qs from "qs";
import Loader from "../Others/Loader";
import Message from "../Others/Message";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BASE_URL } from "../../config";

const MyAccount = () => {
  toast.configure();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const [errors, setErrors] = useState({});

  const [details, setDetails] = useState({
    current_password: "",
    password: "",
    password_confirmation: "",
  });

  const inputHandler = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const [accountdetail, setaccountdetail] = useState([]);
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const url = `${BASE_URL}/admin/myaccount`;
  let token = localStorage.getItem("auth_token");

  const userData = {
    current_password: details.current_password,
    password: details.password,
    password_confirmation: details.password_confirmation,
  };
  console.log(accountdetail, "accountdetail");

  useEffect(() => {
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((response) => {
        console.log(response.data, "datdrsad");
        setaccountdetail(response.data.user);
        localStorage.setItem("user-first-name", response.data.user.firstName);
        localStorage.setItem("user-email", response.data.user.email);
        localStorage.setItem("user-last-name", response.data.user.lastName);
        localStorage.setItem("user-role-id", response.data.user.role_id);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token, url]);

  let history = useHistory();

  const submitHandler = (event) => {
    event.preventDefault();
    let errorss = 0;
    setErrors(validation(details));

    if (
      (details.current_password,
      details.password,
      details.password_confirmation == "")
    ) {
      errorss++;
    } else if (details.password !== details.password_confirmation) {
      errorss++;
    } else {
      errorss = 0;
    }
    console.log(userData);

    if (errorss == 0) {
      axios
        .put(
          `${BASE_URL}/admin/myaccount/update-password`,
          qs.stringify(userData),
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        )
        .then((response) => {
          console.log(response);
          localStorage.setItem("status", response.status);
          let status = localStorage.getItem("status");
          if (status == 201) {
            toast("Password Updated Successfully", { type: "success" });
            history.push("/admin/dashBoard");
            console.log(details.password);
          }
        })
        .catch((error) => {
          console.log(error);
          setError(true);
          setErrorMessage(error.response.data.password[0]);
        });
    }
  };

  return (
    <div>
      <div className="Proj_main">
        <div className="Proj_main_l">
          <Sidebar cname1="" cname2="activeclass" cname3="" cname4="" />
        </div>
        <div className="Proj_main_r">
          <Header />
          <h3 className="projectheadline">
            <img
              src="/images/backarrows.svg"
              width="25px"
              style={{ cursor: "pointer", marginRight: "1%" }}
              onClick={() => history.goBack()}
            />
            Account Details
          </h3>
          <Tabs
            defaultActiveKey="home"
            transition={false}
            id="noanim-tab-example"
            className="mb-3"
          >
            <Tab eventKey="home" title={<span> Account Details</span>}>
              <div className="  projectmaintabs">
                <div className="viewdetail">
                  <div className="viewdetail_l">
                    {loading ? (
                      <Loader />
                    ) : (
                      <>
                        <div className="d-flex viewdetail">
                          <div className="viewdetail_l">
                            <h5>User Name</h5>
                          </div>
                          <div className="viewdetail_r">
                            <p>
                              {accountdetail.firstName +
                                " " +
                                accountdetail.lastName}
                            </p>
                          </div>
                        </div>
                        <div className="d-flex viewdetail">
                          <div className="viewdetail_l">
                            <h5>Email ID</h5>
                          </div>
                          <div className="viewdetail_r">
                            <p>{accountdetail.email}</p>
                          </div>
                        </div>
                        <div className="d-flex viewdetail">
                          <div className="viewdetail_l">
                            <h5>User Role</h5>
                          </div>
                          <div className="viewdetail_r">
                            <p>{accountdetail.roleName}</p>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </Tab>
            <Tab
              eventKey="changePassword"
              title={<span> Update Password</span>}
            >
              <div className="  projectmaintabs">
                <div className="viewdetail">
                  <div className="viewdetail_l">
                    <div className="addprojects">
                      {error && (
                        <Message variant="danger">{errorMessage}</Message>
                      )}
                      <form onSubmit={submitHandler}>
                        <div className="row my-3">
                          <div className="col-md-8">
                            <h6 style={{ marginBottom: "0%", marginTop: "1%" }}>
                              Current password
                            </h6>
                            <input
                              type="text"
                              className="inp_feild"
                              value={details.current_password}
                              name="current_password"
                              onChange={inputHandler}
                            />
                            {errors.current_password && (
                              <p className="error">{errors.current_password}</p>
                            )}
                            <h6 style={{ marginBottom: "0%", marginTop: "1%" }}>
                              New password
                            </h6>
                            <input
                              type="text"
                              className="inp_feild"
                              value={details.password}
                              name="password"
                              onChange={inputHandler}
                            />
                            {errors.password && (
                              <p className="error">{errors.password}</p>
                            )}
                            <h6 style={{ marginBottom: "0%", marginTop: "1%" }}>
                              Confirm password
                            </h6>
                            <input
                              type="text"
                              className="inp_feild"
                              value={details.password_confirmation}
                              name="password_confirmation"
                              onChange={inputHandler}
                            />
                            {errors.password_confirmation && (
                              <p className="error">
                                {errors.password_confirmation}
                              </p>
                            )}
                          </div>
                        </div>
                        <button type="submit" className="buttonWrap">
                          <ButtonIcon
                            src="../../images/right-arrow.png"
                            text="Submit"
                            id="btn_radius"
                          />
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
