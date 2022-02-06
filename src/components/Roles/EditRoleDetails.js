import React, { useState, useEffect, useRef } from "react";
import Header from "../../components/Others/Header";
import Sidebar from "../../components/Others/Sidebar";
import { Button } from "react-bootstrap";
import axios from "axios";
import qs from "qs";
import { useLocation } from "react-router";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Message from "../../components/Others/Message";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BASE_URL } from "../../config";

const EditRoleDetails = ({ history }) => {
  let token = localStorage.getItem("auth_token");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [roleName, setRoleName] = useState("");
  const [permissions, setPermissions] = useState([]);

  const [accessablemenu, setaccessablemenu] = useState([]);

  const inputref = useRef();

  console.log(inputref.current, "CURRENTINPUT");

  let rName = localStorage.getItem("role-name");

  const handleChange = (e) => {
    console.log(e.target.checked);
    const isChecked = e.target.checked;
    let index;

    if (isChecked) {
      accessablemenu.push(e.target.value);
    } else {
      var x = accessablemenu.indexOf(e.target.value);
      accessablemenu.splice(x, 1);
    }

    console.log(Object.values(accessablemenu), "permissionss");
  };

  useEffect(() => {
    if (roleName == "") {
      setRoleName(rName);
    } else {
      console.log("details are filled");
    }
  }, [id]);

  //getting menus

  const [getRoles, setGetRoles] = useState([]);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/admin/master/menus`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          "Access-Control-Allow-Headers":
            "Origin, X-Requested-With, Content-Type,Accept, x-client-key, x-client-token, x-client-secret, Authorization",
        },
      })
      .then((response) => {
        console.log(response.data, "All menus");
        setGetRoles(response.data.menuList);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token]);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/admin/master/roles/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          "Access-Control-Allow-Headers":
            "Origin, X-Requested-With, Content-Type,Accept, x-client-key, x-client-token, x-client-secret, Authorization",
        },
      })
      .then((response) => {
        console.log(response.data, "user role data");
        setRoleDetails(response.data.role);
        setaccessablemenu(response.data.accessable_menu_id_list);
        setPermissions(response.data.accessable_menus);

        localStorage.setItem("role-name", response.data.role.name);

        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token]);

  // ---------for update
  const roles = {
    name: roleName,
    menu_id_list: Object.values(accessablemenu),
  };
  console.log(accessablemenu, "rolesroles");
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("clicked");

    axios
      .put(`${BASE_URL}/admin/master/roles/${id}`, qs.stringify(roles), {
        headers: {
          Authorization: `Bearer ${token}`,
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          "Access-Control-Allow-Headers":
            "Origin, X-Requested-With, Content-Type,Accept, x-client-key, x-client-token, x-client-secret, Authorization",
        },
      })

      .then((response) => {
        console.log(response.data, "showdata");
        history.push("/admin/roles");
      })

      .catch((error) => {
        console.error("There was an error!", error);
        setError(true);
      });
  };

  const [roleDetails, setRoleDetails] = useState([]);

  return (
    <div>
      <div className="Proj_main">
        <div className="Proj_main_l">
          <Sidebar
            cname1=""
            cname2=""
            cname3=""
            cname4=""
            cname5="activeclass"
          />
        </div>
        <div className="Proj_main_r">
          <Header />

          <div className="addproject">
            <h3 className="projectheadline" style={{ marginBottom: "2%" }}>
              <img
                src="/images/backarrows.svg"
                width="25px"
                style={{ cursor: "pointer", marginRight: "1%" }}
                onClick={() => history.goBack()}
              />
              Edit Role Details
            </h3>
            {error && <Message variant="danger">{}</Message>}
            <form>
              <div className="col-md-3">
                <h6 style={{ marginTop: "2%", fontWeight: "600" }}>
                  Role Name
                </h6>
                <input
                  type="text"
                  className="inp_feild"
                  value={roleName}
                  ref={inputref}
                  onChange={(e) => {
                    setRoleName(e.target.value);
                  }}
                />
              </div>

              <div className="viewdetail_l">
                <h6 style={{ marginTop: "2%", fontWeight: "600" }}>
                  Permissions
                </h6>
              </div>

              {getRoles.map((item, index) => {
                console.log(accessablemenu, "accessable menus");

                if (item.menus.length == 0) {
                  if (accessablemenu.includes(item.id)) {
                    return (
                      <>
                        <div>
                          <label key={item.id} class="rolelabel">
                            <input
                              type="checkbox"
                              defaultChecked={!!`checked${item.id}`}
                              onChange={handleChange}
                              value={item.id}
                              name="permission"
                            />
                            {item.name}
                            <span class="checkmark"></span>
                          </label>
                        </div>
                      </>
                    );
                  } else {
                    return (
                      <>
                        <div>
                          <label key={item.id} class="rolelabel">
                            <input
                              type="checkbox"
                              onChange={handleChange}
                              value={item.id}
                              name="permission"
                            />
                            {item.name}
                            <span class="checkmark"></span>
                          </label>
                        </div>
                      </>
                    );
                  }
                } else {
                  // for menus length greater than 0
                  const isMainMenuChecked = accessablemenu.includes(item.id);
                  const isMenuChecked = accessablemenu.includes(item.menus.id);

                  return (
                    <>
                      <ul className="showul">
                        <li key={item.id}>
                          <label key={item.id} class="rolelabel">
                            {isMainMenuChecked ? (
                              <input
                                type="checkbox"
                                defaultChecked={!!`checked${item.id}`}
                                onChange={handleChange}
                                value={item.id}
                                name="permission"
                              />
                            ) : (
                              <input
                                type="checkbox"
                                onChange={handleChange}
                                value={item.id}
                                name="permission"
                              />
                            )}
                            {item.name}
                            <span class="checkmark"></span>
                          </label>
                        </li>

                        {item.menus.map((menus, index) => (
                          <li>
                            <label key={menus.id} class="rolelabel">
                              {(() => {
                                if (accessablemenu.includes(menus.id)) {
                                  return (
                                    <input
                                      type="checkbox"
                                      defaultChecked={!!`checked${menus.id}`}
                                      onChange={handleChange}
                                      value={menus.id}
                                      name="permission"
                                    />
                                  );
                                }
                                if (!accessablemenu.includes(menus.id)) {
                                  return (
                                    <input
                                      type="checkbox"
                                      onChange={handleChange}
                                      value={menus.id}
                                      name="permission"
                                    />
                                  );
                                }
                              })()}
                              {menus.name}
                              <span class="checkmark"></span>
                            </label>

                            {menus.subMenus.map((subMenus, index) => (
                              <li key={subMenus.id} className="showlitags">
                                <label key={subMenus.id} class="rolelabel">
                                  {(() => {
                                    if (accessablemenu.includes(subMenus.id)) {
                                      return (
                                        <input
                                          type="checkbox"
                                          onChange={handleChange}
                                          defaultChecked={
                                            !!`checked${subMenus.id}`
                                          }
                                          value={subMenus.id}
                                          name="permission"
                                        />
                                      );
                                    }
                                    if (!accessablemenu.includes(subMenus.id)) {
                                      return (
                                        <input
                                          type="checkbox"
                                          onChange={handleChange}
                                          value={subMenus.id}
                                          name="permission"
                                        />
                                      );
                                    }
                                  })()}
                                  {subMenus.name}
                                  <span class="checkmark"></span>
                                </label>
                              </li>
                            ))}
                          </li>
                        ))}
                      </ul>
                    </>
                  );
                }
              })}

              <Button
                type="submit"
                variant="danger"
                onClick={handleSubmit}
                style={{ marginTop: "2%" }}
              >
                Update
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditRoleDetails;
