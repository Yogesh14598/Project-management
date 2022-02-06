import React, { useState, useEffect } from "react";
import Header from "../../components/Others/Header";
import Sidebar from "../../components/Others/Sidebar";
import { toast } from "react-toastify";
import qs from "qs";
import { useLocation } from "react-router";
import axios from "axios";
import Message from "../Others/Message";
import { BASE_URL } from "../../config";

const AddProjectBilling = ({ history }) => {
  const [error, setError] = useState(false);
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState(false);
  const location = useLocation();
  const id = location.pathname.split("/")[2];

  const [installments, setinstallments] = useState([
    { installmentName: "", deadlineDate: "", amount: "" , deduction:""},
  ]);

  let token = localStorage.getItem("auth_token");

  const url = `${BASE_URL}/admin/project-management/installments/multiple`;

  const intsallmentsdata = {
    project_id: id,
    installments: installments,
  };
console.log(intsallmentsdata , "intsallmentsdata")
  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...installments];
    list[index][name] = value;
    setinstallments(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...installments];
    list.splice(index, 1);
    setinstallments(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setinstallments([
      ...installments,
      { installmentName: "", deadlineDate: "", amount: "" , deduction:""},
    ]);
  };

  const updateinstallment = (event) => {
    console.log(installments, "installments");
    let errorss = 0;
    event.preventDefault();

    if (
      (installments.installmentName,
      installments.deadlineDate,
      installments.amount == "",
      installments.deduction == "")
 
    ) {
      errorss++;
    } else {
      errorss = 0;
    }
    console.log(installments);

    if (errorss == 0) {
      axios
        .post(url, qs.stringify(intsallmentsdata), {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        })
        .then((response) => {
          console.log(response);
          console.log("success");

          history.push("/admin/project/projects");
          if (response.status == 201) {
            toast("Successfully created the Installment", {
              type: "success",
            });
          }
        })

        .catch((error) => {
          console.error("There was an error!", error.response);
          setError(true);
          setErrorMessage(error.response.data.message);
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

          <div className="addproject">
            {error && <Message variant="danger"> {errorMessage}</Message>}
            <h3 className="projectheadline" style={{ fontSize: "20px" }}>
              
              <img
                src="/images/backarrows.svg"
                width="25px"
                style={{ cursor: "pointer", fontSize: "15px" }}
                onClick={() => history.goBack()}
              />
              Billing Installments
            </h3>

            <form>
              <div className="Appsource">
                {installments.map((x, i) => {
                  return (
                    <div className="box">
                      <div>
                        <label>Installment Name *</label>

                        <input
                          type="text"
                          name="installmentName"
                          placeholder="Enter Installment Name"
                          autoComplete="off"
                          value={x.installmentName}
                          onChange={(e) => handleInputChange(e, i)}
                        />
                      </div>
                      <div>
                        <label>Deadline Date *</label>

                        <input
                          type="date"
                          name="deadlineDate"
                          placeholder="Enter deadlineDate"
                          autoComplete="off"
                          value={x.deadlineDate}
                          onChange={(e) => handleInputChange(e, i)}
                        />
                      </div>
                      <div>
                        <label>Installment Amount *</label>

                        <input
                          type="text"
                          className="ml10"
                          name="amount"
                          autoComplete="off"
                          placeholder="Enter Amount"
                          value={x.amount}
                          onChange={(e) => handleInputChange(e, i)}
                        />
                      </div> 
                      <div>
                        <label>Deduction *</label>

                        <input
                          type="number"
                          className="ml10"
                          name="deduction"
                          autoComplete="off"
                          placeholder="Enter  Deduction"
                          value={x.deduction}
                          onChange={(e) => handleInputChange(e, i)}
                        />
                      </div>  
                      <div className="btn-box">
                        {installments.length !== 1 && (
                          <button
                            type="button"
                            className="mr10"
                            onClick={() => handleRemoveClick(i)}
                          >
                            Remove
                          </button>
                        )}

                        {installments.length - 1 === i && (
                          <button onClick={handleAddClick} className="mr10">
                            Add
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
              <button
                type="button"
                onClick={updateinstallment}
                className="mr10"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProjectBilling;
