
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setAlert } from "../slices/AlertSlice";
import { API } from "../constants/api";
import { setActionStatus, setUser } from "../slices/AuthSlice";
import { setAllUser } from "../slices/UserSlide";

  

const token = localStorage.getItem("auth_token");
  export const addUser = createAsyncThunk(
    "/account/create",
    async (data, { dispatch, rejectWithValue }) => {
      try {
        const resp = await fetch(`${API.uri}/account/create`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        });
        const jsonData = await resp.json();
        console.log(jsonData);
        if (resp.status < 200 || resp.status >= 400) {
          dispatch(
            setAlert({
              type: "error",
              content: jsonData.defaultMessage
                ? jsonData.defaultMessage
                : "Form not valid",
            })
          );
          return rejectWithValue();
        }
        dispatch(setAlert({ type: "success", content: "Success" }));
        dispatch(setActionStatus(resp.status))
        dispatch(setUser())
        dispatch(getAllUser());

      } catch (e) {
        dispatch(
          setAlert({ type: "error", content: "Error when fetch user list" })
        );
      }
    }
  );
  
  export const getAllUser = createAsyncThunk(
    "/account",
    async (_, { dispatch, rejectWithValue }) => {
        try {
      const resp = await fetch(`${API.uri}/account`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (resp.status >= 200 && resp.status < 300) {
        const dataJson = await resp.json();
        dispatch(setAllUser(dataJson?.response));
      }
    }catch (e) {
        console.log(e);
      }
    }
);
