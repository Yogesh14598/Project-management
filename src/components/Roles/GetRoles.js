import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Header from "../../components/Others/Header";
import Sidebar from "../../components/Others/Sidebar";
import Loader from "../../components/Others/Loader";
import ButtonIcon from "../../components/Others/ButtonIcon";
import DeleteIcon from "@mui/icons-material/Delete";
import { Table, Button } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BASE_URL } from "../../config";

const GetRoles = () => {
  const url = `${BASE_URL}/admin/master/roles`;
  let token = localStorage.getItem("auth_token");
  const [getRoles, setGetRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchbar, setsearchbar] = useState("");
  const [showsearchnbtncond, setshowsearchnbtncond] = useState(true);

  toast.configure();

  useEffect(() => {
    axios
      .get(`${BASE_URL}/admin/master/roles`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          "Access-Control-Allow-Headers":
            "Origin, X-Requested-With, Content-Type,Accept, x-client-key, x-client-token, x-client-secret, Authorization",
        },
      })
      .then((response) => {
        console.log(response.data.roles);
        setGetRoles(response.data.roles);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token]);

  //delete projects

  const deleteHandler = (id) => {
    const todelete = window.confirm("Are you sure you want to delete ?");
    if (todelete) {
      axios
        .delete(`${BASE_URL}/admin/master/roles/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
            "Access-Control-Allow-Headers":
              "Origin, X-Requested-With, Content-Type,Accept, x-client-key, x-client-token, x-client-secret, Authorization",
          },
        })
        .then((response) => {
          setLoading(false);
          console.log("Role Deleted Succesfully");
          window.location.reload(false);
          toast("Role Deleted Succesfully", { type: "success" });
        })
        .catch((error) => {
          console.log("error" , );
          toast(error.response.data.message, { type: "error" });
        });
    }
  };

  //pagination

  const [currentPage, setCurrentPage] = useState(0);

  const PER_PAGE = 4;

  const offset = currentPage * PER_PAGE;

  const pageCount = Math.ceil(getRoles.length / PER_PAGE);

  function handlePageClick({ selected: pageIndex }) {
    if (pageIndex + 1 == "1") {
      setshowsearchnbtncond(true);
    } else {
      setshowsearchnbtncond(false);
    }

    setCurrentPage(pageIndex);
  }

  const Showsearchnbtn = () => (
    <div className="">
      <h6></h6>
      <img src="/images/Icon awesome-filter.svg" className="mx-3" />

      <input
        type="text"
        placeholder="Search...."
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
  );

  return (
    <div>
      <div className="Proj_main">
        <div className="Proj_main_l">
          <Sidebar
            cname1=""
            cname2=""
            cname3=""
            cname4=""
            cname5=""
            cname6="activeclass"
          />
        </div>

        <div className="Proj_main_r">
          <Header />

          <div className="roles-head">
            <div>
              <h3 className="projectheadline">Roles</h3>
            </div>

            <div className="">
              <Link to="/AddRoleDetail" className="side_links">
                <ButtonIcon
                  text="Add Roles"
                  src="../../images/Icon ionic-ios-add (2).svg"
                  id="btn_radius"
                />
              </Link>
            </div>
          </div>

          <hr />
          <div className="searchbar">
            {showsearchnbtncond ? <Showsearchnbtn /> : null}
          </div>

          <div style={{ overflow: "hidden" }}>
            <Table striped hover>
              <thead>
                <tr>
                  <th>Role Id</th>
                  <th>Role Name</th>
                  <th> Action </th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <Loader />
                ) : (
                  getRoles
                    .filter((item) => {
                      if (searchbar == "") {
                        return item;
                      } else if (
                        item.name
                          .toLowerCase()
                          .includes(searchbar.toLowerCase())
                      ) {
                        return item;
                      }
                    })
                    .map((item, index) => (
                      <tr key={item.id}>
                        <td>{index + 1}</td>
                        <td>{item.name}</td>

                        <td>
                          <Link
                            to={`/RoleVeiwDetail/${item.id}`}
                            className="signuplinks"
                          >
                            <Button variant="danger" size="sm">
                              Veiw Details
                            </Button>
                          </Link>
                        </td>
                        <td>
                          <DeleteIcon
                            style={{ color: "#F23801", cursor: "pointer" }}
                            onClick={() => deleteHandler(item.id)}
                          />
                        </td>
                      </tr>
                    ))
                    .slice(offset, offset + PER_PAGE)
                )}
              </tbody>
            </Table>
            <ReactPaginate
              previousLabel={"← Previous"}
              nextLabel={"Next →"}
              pageCount={pageCount}
              onPageChange={handlePageClick}
              containerClassName={"pagination"}
              previousLinkClassName={"pagination__link"}
              nextLinkClassName={"pagination__link"}
              disabledClassName={"pagination__link--disabled"}
              activeClassName={"pagination__link--active"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetRoles;
