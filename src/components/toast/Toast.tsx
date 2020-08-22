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
    alerts.length > 0 ? setIsOpen(true) : setIsOpen(false);
  }, [alerts]);

  return (
    <>
      {isOpen ? (
        <div
          className={`Toast ${isOpen ? "open " + alerts[0]?.alertType : ""}`}
        >
          <p className='toast_type'>{alerts[0]?.alertType}</p>
          <p className='toast_body'>{alerts[0]?.msg}</p>
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
