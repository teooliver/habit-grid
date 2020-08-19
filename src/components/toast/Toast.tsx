import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { StoreState } from "../../redux/reducers";
import { Message } from "../../redux/actions";
import { setAlert } from "../../redux/actions/alerts";

interface Props {
  alerts: Message[];
  setAlert: Function;
}

const Toast: React.FC<Props> = ({ alerts, setAlert }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    console.log("Alerts!!!!", alerts.length);
    if (alerts.length > 0) {
      setIsOpen(true);
    } else {
      console.log(alerts.length);
      setIsOpen(false);
    }
    console.log(isOpen);
  }, [alerts]);

  return (
    <>
      {isOpen ? (
        <div className={`Toast ${isOpen ? "open" : ""}`}>
          <p className='toast_type'>{alerts[0]?.alertType}</p>
          <p className='toast_body'>{alerts[0]?.msg}</p>
          <button>X</button>
        </div>
      ) : null}
    </>
  );
};

const mapStateToProps = ({ alerts }: StoreState) => {
  return {
    alerts,
  };
};

export default connect(mapStateToProps, { setAlert })(Toast);
