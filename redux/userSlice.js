import { createSlice } from "@reduxjs/toolkit";
import setUserInfo from "../services/setUserInfo";

export const usersSlice = createSlice({
  name: "users",
  initialState: {
    AllUser: [],
    currentUser: null,
    token: null,
    fetchForAllUserAndAllStatusData: null,
    allStatusPost: null,
    viewScreenData: [],
  },
  reducers: {
    addAllUser: (state, action) => {
      state.AllUser = action.payload;

      console.log("this is store -> ", state);
    },
    addCurrentUser: (state, action) => {
      state.currentUser = action.payload.user;
      state.token = action.payload.token;

      setUserInfo({
        token: action.payload.token,
        userId: action.payload.user._id,
      });
    },
    addTeacherUser: (state, action) => {},
    addStatusPost: (state, action) => {
      state.allStatusPost = action.payload;
    },
    addPostReaction: (state, action) => {
      console.log("this is payload -> ", action.payload);
    },

    addfetchForAllUserAndAllStatusData: (state, action) => {
      state.fetchForAllUserAndAllStatusData = action.payload;
    },
    addViewScreenData: (state, action) => {
      state.viewScreenData = action.payload;
    },
    removeTodo: (state, action) => {
      return state.filter((todo) => todo.id !== action.payload);
    },
    updateTodo: (state, action) => {
      const { id, text } = action.payload;
      const todoToUpdate = state.find((todo) => todo.id === id);
      if (todoToUpdate) {
        todoToUpdate.text = text;
      }
    },
  },
});

export const {
  addAllUser,
  addCurrentUser,
  removeTodo,
  updateTodo,
  addTeacherUser,
  addfetchForAllUserAndAllStatusData,
  addStatusPost,
  addViewScreenData,
  addPostReaction,
  addCurrentUserPost,
} = usersSlice.actions;
