import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import MenuIcon from "@mui/icons-material/Menu";
import Loader from "../Others/Loader";
import { BASE_URL } from "../../config";

function Sidebar(props) {
  // const location = useLocation();
  // const { pathname } = location;
  // const splitLocation = pathname.split("/");

  let token = localStorage.getItem("auth_token");
  console.log(token);

  const [sidebar, setsidebar] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/admin/auth-menus`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      })
      .then((response) => {
        // handle success
        console.log(response.data, "sidebar");
        console.log("sidebar success");

        setsidebar(response.data);
        setLoading(false);
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  }, []);

  console.log(sidebar);

  return (
    <div>
      <div className="sidebar">
        <div className="sidebar_block">
          <div className="sidebar_block_img">
            <Link to="/admin/dashboard" className="">
              <img src="/images/logoimg.png" className="sidebar_logo" alt="" />
            </Link>
          </div>
          <div className="sidebar_block_list">
            <ul className="sidebarList">
              {sidebar.map((item, index) => {
                if (item.menus.length == 0) {
                  console.log(item.url, "itemurl");
                  return (
                    <>
                      {loading ? (
                        <Loader />
                      ) : (
                        <NavLink
                          activeClassName="navbar__link--active"
                          className="sidebarListItem"
                          to={`/${item.url}`}
                        >
                          <li key={item.id}>
                            <div style={{ display: "flex", width: "100%" }}>
                              <i
                                className={item.imageIcon}
                                style={{
                                  marginTop: "6px",
                                  marginLeft: "10px",
                                  marginRight: "5px",
                                }}
                              ></i>
                              {item.name}
                            </div>
                          </li>
                        </NavLink>
                      )}
                    </>
                  );
                } else {
                  return (
                    <>
                      {loading ? (
                        <Loader />
                      ) : (
                        <Dropdown>
                          <Dropdown.Toggle
                            key={item.id}
                            className="dropdownlists"
                            style={{ marginLeft: "0%" }}
                          >
                            <MenuIcon />
                            {item.name}
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            {item.menus.map((menus) => (
                              <NavLink
                                activeClassName="navbar__link--active"
                                className="sidebarListItem"
                                to={`/${menus.url}`}
                                key={menus.id}
                                activeClassName="navbar__link--active"
                                className="sidebarListItem"
                              >
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "flex-start",
                                    width: "100%",
                                    margin: "10px auto",
                                    fontSize: "15px",
                                    padding: "5px 10px",
                                    fontWeight: "600",
                                  }}
                                >
                                  <i
                                    className={menus.imageIcon}
                                    style={{
                                      marginTop: "4px",
                                      marginLeft: "10px",
                                      marginRight: "8px",
                                    }}
                                  ></i>

                                  {menus.name}
                                </div>
                              </NavLink>
                            ))}
                          </Dropdown.Menu>
                        </Dropdown>
                      )}
                    </>
                  );
                }
              })}

            
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
