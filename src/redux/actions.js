export const SET_TASKS = 'SET_TASKS';
export const SET_TASK_ID = 'SET_TASK_ID';

export const setTitle = title => dispatch => {
    dispatch({
        type: SET_TASKS,
        payload: title, //value to be passed to the action
    });
};

export const setDescription = description => dispatch => {
    dispatch({
        type: SET_TASK_ID,
        payload: description,
    });
};