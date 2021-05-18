import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { StoreState } from '../../redux/reducers';
import { Message } from '../../redux/actions';

interface Props {
  alerts: Message[];
}

const Toast: React.FC<Props> = ({ alerts }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    alerts.length > 0 ? setIsOpen(true) : setIsOpen(false);
  }, [alerts]);

  return (
    <>
      {isOpen ? (
        <div
          className={`Toast ${isOpen ? 'open ' + alerts[0]?.alertType : ''}`}
          data-testid="toast"
        >
          <p className="toast_type">{alerts[0]?.alertType}</p>
          <p className="toast_body">{alerts[0]?.msg}</p>
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

export default connect(mapStateToProps)(Toast);
