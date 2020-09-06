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

  const [columnsValidationError, setColumnsValidationError] = useState<string>(
    ''
  );
  const [boardValidationError, setBoardValidationError] = useState<string>('');

  const { pathname } = useLocation();
  const history = useHistory();

  useEffect(() => {
    if (!isModalOpen) {
      setBoardName('');
      setColumnNames([]);
    }
  }, [isModalOpen]);

  const handleOnSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isColumnNamesValid = validateColumnsNames(columnsNames);
    const isBoardNameValid = validateBoardName(boardName);
    if (isColumnNamesValid && isBoardNameValid) {
      let formData = { boardName, columnsNames };
      createBoard(formData);
      if (pathname !== '/boards') {
        history.push('/boards');
      }

      if (setIsModalOpen) {
        setIsModalOpen(false);
      }
      setBoardName('');
      setColumnNames([]);
    } else {
      return;
    }
  };

  const handleChangeBoardName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBoardValidationError('');
    setBoardName(e.target.value);
  };

  const handleChangeColumnName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColumnsValidationError('');
    const columnsArray = e.target.value.split(',');
    if (!columnsArray) setColumnNames([e.target.value]);
    setColumnNames(columnsArray);
  };

  const validateBoardName = (name: string) => {
    if (name.length > 0) {
      return true;
    } else {
      setBoardValidationError('This field is required');
      return false;
    }
  };

  const validateColumnsNames = (colNames: string[]) => {
    if (colNames.length < 2) {
      setColumnsValidationError(
        'please provide at least 2 column names separeted by comas.'
      );
      return false;
    } else {
      return true;
    }
  };

  return (
    <form className="BoardForm" onSubmit={handleOnSubmit}>
      <h2>Create Board</h2>
      <div className="input-wrapper">
        <label htmlFor="boardName">Board Name</label>
        <input
          className={boardValidationError ? 'error' : ''}
          id="boardName"
          type="text"
          name="boardName"
          value={boardName}
          onChange={(e) => handleChangeBoardName(e)}
          placeholder="New Board"
        />
        {boardValidationError && (
          <p className="error-message">{boardValidationError}</p>
        )}
      </div>
      <div className="input-wrapper">
        <label htmlFor="columnsName">{'Columns Names'}</label>
        <input
          className={columnsValidationError ? 'error' : ''}
          id="columnsName"
          type="text"
          name="columnsName"
          value={columnsNames}
          onChange={(e) => handleChangeColumnName(e)}
          placeholder="Todo, In Progress, Done"
        />
        {columnsValidationError && (
          <p className="error-message">{columnsValidationError}</p>
        )}
      </div>
      <button
        type="submit"
        className={
          columnsValidationError && boardValidationError ? 'error' : ''
        }
        disabled={columnsValidationError && boardValidationError ? true : false}
      >
        Submit
      </button>
    </form>
  );
};

export default connect(null, { createBoard })(CreateBoardForm);
