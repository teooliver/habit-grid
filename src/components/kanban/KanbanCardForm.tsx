import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createIssue, Issue } from '../../redux/actions';

interface KanbanCardFormProps {
  createIssue: Function;
  columnId: number;
  boardId: number;
}

const KanbanCardForm: React.FC<KanbanCardFormProps> = ({
  createIssue,
  columnId,
  boardId,
}) => {
  const [issueTitle, setissueTitle] = useState('');
  const [issueDescription, setIssueDescription] = useState('');

  const handleOnSubmit = (e: any) => {
    e.preventDefault();
    const formData: Partial<Issue> = {
      title: issueTitle,
      description: issueDescription,
      boardId: boardId,
      columnId: columnId,
    };
    createIssue(formData);
    setissueTitle('');
    setIssueDescription('');
  };

  const handleOnIssueTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setissueTitle(e.target.value);
  };
  const handleOnIssueDescriptionChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIssueDescription(e.target.value);
  };

  return (
    <form className="KanbanCardForm" onSubmit={(e) => handleOnSubmit(e)}>
      <input
        placeholder="+ What needs to be done?"
        onChange={(e) => handleOnIssueTitleChange(e)}
        value={issueTitle}
      />
      <input
        placeholder="+ Description"
        onChange={(e) => handleOnIssueDescriptionChange(e)}
        value={issueDescription}
      />
      <button>Create Issue</button>
    </form>
  );
};

export default connect(null, { createIssue })(KanbanCardForm);
