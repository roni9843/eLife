import { createSlice } from "@reduxjs/toolkit";
import setUserInfo from "../services/setUserInfo";

export const usersSlice = createSlice({
  name: "users",
  initialState: {
    AllUser: [],
    currentUser: null,
    token: null,
    fetchForAllUserAndAllStatusData: null,
    allStatusPost: [],
    viewScreenData: [],
    postPaginationPage: 0,
    isOtp: true,
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
      console.log(action.payload, "this is redux -> ", state.allStatusPost);

      state.allStatusPost = [...state.allStatusPost, ...action.payload];
      // state.allStatusPost = action.payload;
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
    testDataAdd: (state, action) => {
      state.testData = [...state.testData, ...action.payload];
    },
    addLatestPost: (state, action) => {
      state.allStatusPost = [...action.payload, ...state.allStatusPost];
    },
    updatePost: (state, action) => {
      //  [...action.payload, ...state.allStatusPost];

      let newData = state.allStatusPost.map((item) =>
        item._id === action.payload._id ? action.payload : item
      );

      state.allStatusPost = newData;
    },
    removePost: (state, action) => {
      //  = [...action.payload, ...state.allStatusPost];

      console.log("state.allStatusPost old ", state.allStatusPost);
      state.allStatusPost = state.allStatusPost.filter(
        (p) => p._id !== action.payload
      );

      console.log("this is delete 12 action.payload ->  ", action.payload);
      console.log("this is delete 12 all state ->  ", state.allStatusPost);
    },

    replaceStatusPost: (state, action) => {
      state.allStatusPost = action.payload;
    },

    addPostPaginationPage: (state, action) => {
      state.postPaginationPage = state.postPaginationPage + action.payload;
    },
    replacePaginationPage: (state, action) => {
      state.postPaginationPage = action.payload;
    },

    logOut: (state, action) => {
      //state.postPaginationPage = state.postPaginationPage + action.payload;

      state.AllUser = [];
      state.currentUser = null;
      state.token = null;
      state.fetchForAllUserAndAllStatusData = null;
      state.allStatusPost = [];
      state.viewScreenData = [];
      state.postPaginationPage = 0;
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
  testDataAdd,
  addPostPaginationPage,
  addLatestPost,
  removePost,
  updatePost,
  replacePaginationPage,
  replaceStatusPost,
  logOut,
} = usersSlice.actions;
