import { ActionTypes } from "./types";
import { Dispatch } from "redux";
import { db } from "../../indexedDb/connectDb";
import { SetAlert } from "./alerts";

export interface Issue {
  id: number;
  title: string;
  description: string;
  boardId: number;
  column: string;
}

export interface CreateKanbanIssue {
  type: ActionTypes.createKanbanCard;
  payload: Issue;
}

export interface EditKanbanIssueStatus {
  type: ActionTypes.editKanbanIssueStatus;
  payload: Issue;
}

export const createIssue = (formData: Partial<Issue>) => async (
  dispatch: Dispatch
) => {
  try {
    const { boardId } = formData;
    const newIssue: Partial<Issue> = {
      title: formData.title,
      description: formData.description,
      boardId: boardId,
      column: formData.column,
    };

    let id = await db.table("issues").add(newIssue);
    const indexedIssue = await db.issues.get(Number(id));

    dispatch<CreateKanbanIssue>({
      type: ActionTypes.createKanbanCard,
      payload: indexedIssue!,
    });
  } catch (error) {
    dispatch<SetAlert>({
      type: ActionTypes.setAlert,
      payload: {
        msg: "Error creating a issue, please refresh the app",
        alertType: "error",
      },
    });
    console.log(error);
  }
};

export const editIssueStatus = (id: number, column: string) => async (
  dispatch: Dispatch
) => {
  try {
    const issue = await db.issues.get(Number(id));

    if (issue) {
      issue.column = column;
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
        alertType: "error",
      },
    });
    console.log(error);
  }
};
