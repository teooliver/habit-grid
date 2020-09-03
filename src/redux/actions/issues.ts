import { ActionTypes } from './types';
import { Dispatch } from 'redux';
import { db } from '../../indexedDb/connectDb';
import { SetAlert } from './alerts';

export interface Issue {
  id: number;
  title: string;
  description: string;
  boardId: number;
  columnId: number;
}

export interface GetKanbanIssues {
  type: ActionTypes.getAllKanbanIssues;
  payload: Issue[];
}

export interface CreateKanbanIssue {
  type: ActionTypes.createKanbanIssue;
  payload: Issue;
}

export interface EditKanbanIssueStatus {
  type: ActionTypes.editKanbanIssueStatus;
  payload: Issue;
}

export interface RemoveKanbanIssue {
  type: ActionTypes.deleteKanbanIssue;
  payload: number;
}

export const getIssues = () => async (dispatch: Dispatch) => {
  try {
    let allIssues: Issue[] = await db.table('issues').toArray();

    dispatch<GetKanbanIssues>({
      type: ActionTypes.getAllKanbanIssues,
      payload: allIssues,
    });
  } catch (error) {
    dispatch<SetAlert>({
      type: ActionTypes.setAlert,
      payload: {
        msg: 'Error creating a issue, please refresh the app',
        alertType: 'error',
      },
    });
    console.log(error);
  }
};

export const createIssue = (formData: Partial<Issue>) => async (
  dispatch: Dispatch
) => {
  try {
    const newIssue: Partial<Issue> = {
      title: formData.title,
      description: formData.description,
      boardId: formData.boardId,
      columnId: formData.columnId,
    };

    let id = await db.table('issues').add(newIssue);
    const indexedIssue = await db.issues.get(Number(id));

    dispatch<CreateKanbanIssue>({
      type: ActionTypes.createKanbanIssue,
      payload: indexedIssue!,
    });
  } catch (error) {
    dispatch<SetAlert>({
      type: ActionTypes.setAlert,
      payload: {
        msg: 'Error creating a issue, please refresh the app',
        alertType: 'error',
      },
    });
    console.log(error);
  }
};

export const editIssueStatus = (id: number, columnId: number) => async (
  dispatch: Dispatch
) => {
  try {
    const issue = await db.issues.get(Number(id));

    if (issue) {
      issue.columnId = columnId;
      await db.issues.put(issue, id);

      dispatch<EditKanbanIssueStatus>({
        type: ActionTypes.editKanbanIssueStatus,
        payload: issue,
      });
    }
  } catch (error) {
    dispatch<SetAlert>({
      type: ActionTypes.setAlert,
      payload: {
        msg: "Error changing the issue's status...",
        alertType: 'error',
      },
    });
    console.log(error);
  }
};

export const removeIssue = (id: number) => async (dispatch: Dispatch) => {
  try {
    await db.table('issues').delete(id);

    dispatch<RemoveKanbanIssue>({
      type: ActionTypes.deleteKanbanIssue,
      payload: id,
    });
  } catch (error) {
    dispatch<SetAlert>({
      type: ActionTypes.setAlert,
      payload: {
        msg: 'Error removing issue...',
        alertType: 'error',
      },
    });
    console.log(error);
  }
};
