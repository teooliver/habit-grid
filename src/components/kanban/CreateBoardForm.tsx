import React, { useReducer } from 'react';
import { connect } from 'react-redux';
import { createBoard } from '../../redux/actions';

interface CreateBoardFormProps {
  createBoard: Function;
}

const initialState = {
  boardName: '',
  columnsNames: [],
};

const formReducer = (formState, action) => {
  switch (action.type) {
    case 'changeBoardName':
      return action.payload;
  }
};

const CreateBoardForm: React.FC<CreateBoardFormProps> = ({ createBoard }) => {
  const [formState, dispatch] = useReducer(formReducer, initialState);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createBoard(formState);
  };

  return (
    <form className="CreateBoardForm">
      <input type="text" />
      <input type="text" />
      <input type="text" />
      <input type="text" />
    </form>
  );
};

export default connect(null, { createBoard })(CreateBoardForm);
