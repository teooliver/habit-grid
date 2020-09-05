import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createBoard } from '../../redux/actions';
import { useLocation, useHistory } from 'react-router-dom';

interface CreateBoardFormProps {
  createBoard: Function;
  setIsModalOpen?: Function;
}

const CreateBoardForm: React.FC<CreateBoardFormProps> = ({
  createBoard,
  setIsModalOpen,
}) => {
  const [boardName, setBoardName] = useState<string>('');
  const [columnsNames, setColumnNames] = useState<string[]>([]);
  const { pathname } = useLocation();
  const history = useHistory();

  const handleOnSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let formData = { boardName, columnsNames };
    createBoard(formData);
    setBoardName('');
    setColumnNames([]);
    if (pathname !== '/boards') {
      history.push('/boards');
    }

    if (setIsModalOpen) {
      setIsModalOpen(false);
    }
  };

  const onChangeBoardName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBoardName(e.target.value);
  };

  const onChangeColumnName = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const columnsArray = e.target.value.split(',');

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
        placeholder="New Board"
      />
      <label htmlFor="columnsName">{'Columns Names'}</label>
      <input
        id="columnsName"
        type="text"
        name="columnsName"
        value={columnsNames}
        onChange={(e) => onChangeColumnName(e)}
        placeholder="Todo, In Progress, Done"
      />
      <button>Submit</button>
    </form>
  );
};

export default connect(null, { createBoard })(CreateBoardForm);
