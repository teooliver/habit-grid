import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createBoard } from '../../redux/actions';

interface CreateBoardFormProps {
  createBoard: Function;
}

const CreateBoardForm: React.FC<CreateBoardFormProps> = ({ createBoard }) => {
  const [boardName, setBoardName] = useState<string>();
  const [columnsNames, setColumnNames] = useState<string[]>();

  const handleOnSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let formData = { boardName, columnsNames };
    createBoard(formData);
    setBoardName('');
    setColumnNames([]);
  };

  const onChangeBoardName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBoardName(e.target.value);
  };

  const onChangeColumnName = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const columnsArray = e.target.value.split(',');
    console.log('COLUMN ARRAY', columnsArray);
    if (!columnsArray) setColumnNames([e.target.value]);
    setColumnNames(columnsArray);
  };

  return (
    <form className="BoardForm" onSubmit={handleOnSubmit}>
      <label htmlFor="boardName">Board Name</label>
      <input
        id="boardName"
        type="text"
        name="boardName"
        value={boardName}
        onChange={(e) => onChangeBoardName(e)}
      />
      <label htmlFor="columnsName">{'Columns Names'}</label>
      <input
        id="columnsName"
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