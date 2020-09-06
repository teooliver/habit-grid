import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createBoard } from '../../redux/actions';
import { useLocation, useHistory } from 'react-router-dom';

interface CreateBoardFormProps {
  createBoard: Function;
  setIsModalOpen?: Function;
  isModalOpen?: boolean;
}

const CreateBoardForm: React.FC<CreateBoardFormProps> = ({
  createBoard,
  isModalOpen,
  setIsModalOpen,
}) => {
  const [boardName, setBoardName] = useState<string>('');
  const [columnsNames, setColumnNames] = useState<string[]>([]);
  const [isColumnNamesValid, setIsColumnNamesValid] = useState<boolean>(true);
  const [isBoardNameValid, setIsBoardNameValid] = useState<boolean>(true);
  const { pathname } = useLocation();
  const history = useHistory();

  useEffect(() => {
    if (!isModalOpen) {
      setBoardName('');
      setColumnNames([]);
      setIsColumnNamesValid(true);
      setIsBoardNameValid(true);
    }
  }, [isModalOpen]);

  const handleOnSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let formData = { boardName, columnsNames };
    createBoard(formData);
    setBoardName('');
    setColumnNames([]);

    if (isColumnNamesValid) {
      if (pathname !== '/boards') {
        history.push('/boards');
      }

      if (setIsModalOpen) {
        setIsModalOpen(false);
      }
    } else {
      return;
    }
  };

  const onChangeBoardName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBoardName(e.target.value);
    validateBoardName(e.target.value);
  };

  const onChangeColumnName = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const columnsArray = e.target.value.split(',');
    validateColumnsNames(columnsArray);
    if (!columnsArray) setColumnNames([e.target.value]);
    setColumnNames(columnsArray);
  };

  const validateBoardName = (name: string) => {
    if (name.length > 0) {
      setIsBoardNameValid(true);
    } else {
      setIsBoardNameValid(false);
    }
  };

  const validateColumnsNames = (colNames: string[]) => {
    if (colNames.length < 2) {
      setIsColumnNamesValid(false);
      console.log('please provide at least 2 column names separeted by comas.');
    } else {
      setIsColumnNamesValid(true);
    }
  };

  return (
    <form className="BoardForm" onSubmit={handleOnSubmit}>
      <label htmlFor="boardName">Board Name</label>
      <input
        className={isBoardNameValid ? '' : 'error'}
        id="boardName"
        type="text"
        name="boardName"
        value={boardName}
        onChange={(e) => onChangeBoardName(e)}
        placeholder="New Board"
      />
      <label htmlFor="columnsName">{'Columns Names'}</label>
      <input
        className={isColumnNamesValid ? '' : 'error'}
        id="columnsName"
        type="text"
        name="columnsName"
        value={columnsNames}
        onChange={(e) => onChangeColumnName(e)}
        placeholder="Todo, In Progress, Done"
      />
      <button
        className={isColumnNamesValid ? '' : 'error'}
        disabled={isColumnNamesValid ? false : true}
      >
        Submit
      </button>
    </form>
  );
};

export default connect(null, { createBoard })(CreateBoardForm);
