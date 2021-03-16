/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type TodoInput = {
  task?: string | null,
  id: string,
};

export type Event = {
  __typename: "Event",
  result?: string | null,
};

export type Todo = {
  __typename: "Todo",
  task?: string | null,
  id?: string,
};

export type AddTodoMutationVariables = {
  todo?: TodoInput | null,
};

export type AddTodoMutation = {
  addTodo?:  {
    __typename: "Event",
    result?: string | null,
  } | null,
};

export type DeleteTodoMutationVariables = {
  id?: string | null,
};

export type DeleteTodoMutation = {
  deleteTodo?:  {
    __typename: "Event",
    result?: string | null,
  } | null,
};

export type GetTodosQuery = {
  getTodos?:  Array< {
    __typename: "Todo",
    task?: string | null,
    id: string,
  } | null > | null,
};
