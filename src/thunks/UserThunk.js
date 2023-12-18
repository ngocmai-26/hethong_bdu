
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setAlert } from "../slices/AlertSlice";
import { API } from "../constants/api";
import { setActionStatus, setUser } from "../slices/AuthSlice";
import { setAllUser } from "../slices/UserSlide";

  

  export const addUser = createAsyncThunk(
    "/account",
    async (data, { dispatch, rejectWithValue }) => {
      try {
        const token = localStorage.getItem("auth_token");
        const resp = await fetch(`${API.uri}/account`, {
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
          const token = localStorage.getItem('auth_token')
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


export const deleteUser = createAsyncThunk(
  "/account/delete/id",
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const token = localStorage.getItem('auth_token')
      const resp = await fetch(`${API.uri}/account/delete/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (resp.status < 200 || resp.status >= 400) {
        dispatch(
          setAlert({
            type: "error",
            content: resp.json()?.defaultMessage ?? "Error when delete user",
          })
        );
        return rejectWithValue();
      }
      dispatch(setAlert({ type: "success", content: "Success" }));
      dispatch(getAllUser());
    } catch (e) {
      dispatch(
        setAlert({ type: "error", content: "Error when delete users" })
      );
    }
  }
);

export const updateUser = createAsyncThunk(
  "/update/id",
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const token = localStorage.getItem('auth_token')
      const resp = await fetch(`${API.uri}/account/${data.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      if (resp.status >= 200 && resp.status < 300) {
        dispatch(
          setAlert({ type: "success", content: "Update role success" })
        );
        dispatch(getAllUser());
      } else {
        dispatch(
          setAlert({
            type: "error",
            content:  "Update role error ",
          })
        );
        dispatch(getAllUser())
      }
    } catch (e) {
      console.log(e);
    }
  }
);
