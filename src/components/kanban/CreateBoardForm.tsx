import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createBoard } from '../../redux/actions';

interface CreateBoardFormProps {
  createBoard: Function;
}

const CreateBoardForm: React.FC<CreateBoardFormProps> = ({ createBoard }) => {
  const [boardName, setBoardName] = useState<string>();
  const [columnsNames, setColumnNames] = useState<string[]>([]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let formData = { boardName, columnsNames };

    createBoard(formData);
  };

  const onChangeBoardName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBoardName(e.target.value);
  };

  const onChangeColumnName = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const columnsArray = e.target.value.split(',');
    setColumnNames(columnsArray);
  };

  return (
    <form className="BoardForm" onSubmit={onSubmit}>
      <label htmlFor="">Board Name</label>
      <input
        type="text"
        name="boardName"
        value={boardName}
        onChange={(e) => onChangeBoardName(e)}
      />
      <label htmlFor="">{'Columns Names'}</label>
      <input
        type="text"
        name="columnsName"
        value={columnsNames}
        onChange={(e) => onChangeColumnName(e)}
      />
      <button>Submit</button>
    </form>
  );
};

export default connect(null, { createBoard })(CreateBoardForm);
