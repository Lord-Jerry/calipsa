import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 4, 3),
    "& h3, p": {
      display: "inline-block",
    },
  },
}));

export default function CustomModal({ open, data, setOpen }) {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h1 id="simple-modal-title">Alarm Events</h1>
      <div>
        <h3>Location</h3>: <p>{data.locationName} </p>
      </div>
      <div>
        <h3>Outcome</h3>: <p>{String(data.outcome)}</p>
      </div>
      <div>
        {" "}
        <h3>Time</h3>: <p>{data.timestamp}</p>
      </div>
    </div>
  );

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
