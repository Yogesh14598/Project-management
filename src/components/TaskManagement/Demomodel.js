import React, { useEffect, useState } from "react";

import { Button, Modal } from "react-bootstrap";

const Demomodel = () => {
  const [mymodel, setmymodel] = useState(false);

  const handlemodelchange = () => {
    setmymodel(false);
  };
  const openmodel = () => {
    setmymodel(true);
  };
  return (
    <div>
      <h2 align="center">Example of Modal in Reactjs</h2>
      <div className="modalClass">
        <button onClick={openmodel}>Click To Open Modal</button>
      </div>

      <Modal show={mymodel} onHide={handlemodelchange}>
        <Modal.Header closeButton>This is a Modal Heading</Modal.Header>
        <Modal.Body>
          <label>Is it working ?</label>
          <input type="text" />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handlemodelchange}>Close</Button>
          <Button onClick={handlemodelchange}>Save</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Demomodel;
