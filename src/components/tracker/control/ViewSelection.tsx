import React from 'react';
import { connect } from 'react-redux';
import { selectView } from '../../../redux/actions/viewActions';
import { StoreState } from '../../../redux/reducers';
import { ViewOptions } from '../../../redux/actions/types';
import TableIcon from '../../layout/icons/TableIcon';
import Calendar3Icon from '../../layout/icons/Calendar3Icon';

interface Props {
  selectView: Function;
  selectedView: ViewOptions;
}

const ViewSelection: React.FC<Props> = ({ selectView, selectedView }) => {
  return (
    <div className="view-buttons">
      <span onClick={() => selectView('table')} data-testid="table-view-icon">
        <Calendar3Icon className={selectedView === 'table' ? 'selected' : ''} />
      </span>
      <span
        onClick={() => selectView('individual')}
        data-testid="individual-view-icon"
      >
        <TableIcon
          className={selectedView === 'individual' ? 'selected' : ''}
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
