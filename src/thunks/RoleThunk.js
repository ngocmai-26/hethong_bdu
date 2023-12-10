import { createAsyncThunk } from "@reduxjs/toolkit";
import { setActionStatus, setAllRole, setListPermission, setSingleRole } from "../slices/RoleSlice";
import { API } from "../constants/api";
import { setAlert } from "../slices/AlertSlice";

const token = localStorage.getItem('auth_token')

export const getAllRole = createAsyncThunk(
    "/roles",
    async (_, { dispatch, rejectWithValue }) => {
        try {
      const resp = await fetch(`${API.uri}/roles`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (resp.status >= 200 && resp.status < 300) {
        const dataJson = await resp.json();
        dispatch(setAllRole(dataJson?.response?.content));
      }
    }catch (e) {
        console.log(e);
      }
    }
);

export const getRoleById = createAsyncThunk(
  "/roles/id",
  async (id, { dispatch, rejectWithValue }) => {
    try {
      let uri = `${API.uri}/roles/${id}`;

      const resp = await fetch(uri, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (resp.status >= 200 && resp.status < 300) {
        const jsonData = await resp.json();
        dispatch(setSingleRole(jsonData));
      }
    } catch (e) {
      console.log(e);
    }
  }
);


export const deleteRole = createAsyncThunk(
  "/roles/id",
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const token = localStorage.getItem("auth_token");
      const resp = await fetch(`${API.uri}/roles/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (resp.status < 200 || resp.status >= 400) {
        dispatch(
          setAlert({
            type: "error",
            content: resp.json()?.defaultMessage ?? "Error when delete role",
          })
        );
        return rejectWithValue();
      }
      dispatch(setAlert({ type: "success", content: "Success" }));
      dispatch(getAllRole());
    } catch (e) {
      dispatch(
        setAlert({ type: "error", content: "Error when delete role" })
      );
    }
  }
);

export const updateRole = createAsyncThunk(
  "/roles/id",
  async (data, { dispatch, rejectWithValue }) => {
    try {
      console.log("here");
      const token = localStorage.getItem("auth_token");
      const resp = await fetch(`${API.uri}/roles/${data.id}`, {
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
        dispatch(getAllRole());
      } else {
        dispatch(
          setAlert({
            type: "error",
            content: resp.json()?.defaultMessage ?? "Update role error ",
          })
        );
        dispatch(getAllRole())
      }
    } catch (e) {
      console.log(e);
    }
  }
);

export const updatePermission = createAsyncThunk(
  "/permission",
  async (data, { dispatch, rejectWithValue }) => {
    console.log("data",data)
    try {
      console.log("here");
      const token = localStorage.getItem("auth_token");
      const resp = await fetch(`${API.uri}/roles/give_permission_for_role/${data.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      if (resp.status >= 200 && resp.status < 300) {
        dispatch(
          setAlert({ type: "success", content: "Update product success" })
        );

        dispatch(setListPermission(resp));
      } else {
        dispatch(
          setAlert({
            type: "error",
            content: resp.json()?.defaultMessage ?? "Update product error ",
          })
        );
      }
      dispatch(setActionStatus(resp.status))
    } catch (e) {
      console.log(e);
    }
  }
);

export const addNewRole = createAsyncThunk(
  "role/add",
  async (data, { dispatch, rejectWithValue }) => {
    const token = localStorage.getItem("auth_token");
    if (!token) {
      dispatch(
        setAllRole({
          type: "error",
          content: "Phiên đăng nhập đã hết hạn vui lòng thử lại",
        })
      );
    }
    const resp = await fetch(`${API.uri}/roles`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    if (resp.status >= 200 && resp.status < 300) {
      dispatch(
        setAlert({ type: "success", content: "Thêm chức vụ thành công" })
      );
      dispatch(getAllRole())
    }
    dispatch(setActionStatus(resp.status))
  }
);
