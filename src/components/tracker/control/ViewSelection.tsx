import React from "react";
import { connect } from "react-redux";
import TableIcon from "../../layout/icons/TableIcon";
import Calendar3Icon from "../../layout/icons/Calendar3Icon";
import { selectView } from "../../../redux/actions/viewActions";
import { StoreState } from "../../../redux/reducers";
import { ViewOptions } from "../../../redux/actions/types";

interface Props {
  selectView: typeof selectView;
  selectedView: ViewOptions;
}

const ViewSelection: React.FC<Props> = ({ selectView, selectedView }) => {
  return (
    <div className='view-buttons'>
      <span onClick={() => selectView("table")}>
        <TableIcon className={selectedView === "table" ? "selected" : ""} />
      </span>
      <span onClick={() => selectView("individual")}>
        <Calendar3Icon
          className={selectedView === "individual" ? "selected" : ""}
        />
      </span>
    </div>
  );
};

const mapStateToProps = ({ selectedView }: StoreState) => {
  return {
    selectedView,
  };
};

export default connect(mapStateToProps, { selectView })(ViewSelection);
