const validation = (values) => {
  let errors = {};

  if (!values.Projectname) {
    errors.Projectname = "Project Name is required.";
  }
  if (!values.Projectcost) {
    errors.Projectcost = "Project Cost is required";
  }
  if (!values.ClosureTime) {
    errors.ClosureTime = "End Date is required";
  }
  if (!values.StartDate) {
    errors.StartDate = "Start Date is required";
  }
  if (!values.Business) {
    errors.Business = "Business Type is required";
  }
  if (!values.email) {
    errors.email = "Email is required.";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Email is invalid.";
  }
  if (!values.referral) {
    errors.referral = "Referral is required.";
  }
  if (!values.phone) {
    errors.phone = "Phone Number is required.";
  }
  if (!values.password) {
    errors.password = "Password is required.";
  } else if (values.password.length < 5) {
    errors.password = "Password should be more than eight characters.";
  }
  if (!values.potentialProject) {
    errors.potentialProject = "Select an Option";
  }
  if (!values.firstName) {
    errors.firstName = "First Name is required.";
  }
  if (!values.lastName) {
    errors.lastName = "Last Name is required";
  }
  if (!values.role_id) {
    errors.role_id = "Role is required";
  }
  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password <= 8) {
    errors.password = "Password should be 8 characters";
  }
  if (!values.current_password) {
    errors.current_password = "Current Password is required";
  }
  if (!values.password_confirmation) {
    errors.password_confirmation = "Confirm your password ";
  } else if (values.password_confirmation !== values.password) {
    errors.password_confirmation = "Password is not matching";
  }
  if (!values.teamType) {
    errors.teamType = "TeamTypes is required";
  }
  if (!values.address) {
    errors.address = "Address is required";
  }
  if (!values.sourceOfLead) {
    errors.sourceOfLead = "sourceOfLead is required";
  }
  if (!values.state) {
    errors.state = "State is required";
  }
  if (!values.installmentName) {
    errors.installmentName = "Installment Name is required";
  }
  if (!values.deadlineDate) {
    errors.deadlineDate = "Deadline Date is required";
  }
  if (!values.amount) {
    errors.amount = "Amount is required";
  }

  return errors;
};

export default validation;
