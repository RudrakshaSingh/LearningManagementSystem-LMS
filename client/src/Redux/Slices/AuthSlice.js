import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

import axiosInstance from "../../Helpers/axiosInstance";
const initialState = {
	isLoggedIn: localStorage.getItem("isLoggedIn") || false,
	role: localStorage.getItem("role") || "",
	data: (() => {
        const storedData = localStorage.getItem("data");
        return storedData && storedData !== "undefined" ? JSON.parse(storedData) : {};
      })(),
};

//asyncthunk like async await to do operations asynchronous actions
export const createAccount = createAsyncThunk("/auth/signup", async (data) => {
	try {
		const res = axiosInstance.post("user/register", data);
		toast.promise(res, {
			loading: "Wait! creating your account",
			success: (data) => {
				return data?.data?.message;
			},
			error: "Failed to create account",
		});
		return (await res).data;//we are await here ,as if we put as res above it will take time to toast to come on screen also ,so it is better to use await here
	} catch (error) {
		toast.error(error?.response?.data?.message);
	}
});

export const login = createAsyncThunk("/auth/login", async (data) => {
	try {
		const res = axiosInstance.post("user/login", data);
		toast.promise(res, {
			loading: "Wait! authentication in progress...",
			success: (data) => {
				return data?.data?.message;
			},
			error: "Failed to log in",
		});
		return (await res).data;
	} catch (error) {
		toast.error(error?.response?.data?.message);
	}
});

export const logout = createAsyncThunk("/auth/logout", async () => {
	try {
		const res = axiosInstance.get("user/logout");
		toast.promise(res, {
			loading: "Wait! logout in progress...",
			success: (data) => {
				return data?.data?.message;
			},
			error: "Failed to log out",
		});
		return (await res).data;
	} catch (error) {
		toast.error(error?.response?.data?.message);
	}
});

//data is send as e can pass only one data in thunk api
export const updateProfile = createAsyncThunk("/user/update/profile", async (data) => {
	try {
		const res = axiosInstance.put(`user/update/${data[0]}`, data[1]);
		toast.promise(res, {
			loading: "Wait! profile update in progress...",
			success: (data) => {
				return data?.data?.message;
			},
			error: "Failed to update profile",
		});
		return (await res).data;
	} catch (error) {
		toast.error(error?.response?.data?.message);
	}
});

export const getUserData = createAsyncThunk("/user/details", async () => {
	try {
		const res = axiosInstance.get("user/me");
		return (await res).data;
	} catch (error) {
		toast.error(error.message);
	}
});

export const forgotPassword = createAsyncThunk("/auth/forgot-password", async (email) => {
    try {
        const res = axiosInstance.post("user/forgot-password", { email }); // Updated endpoint
        toast.promise(res, {
            loading: "Sending reset instructions...",
            success: (data) => {
                return data?.data?.message;
            },
            error: "Failed to send reset instructions",
        });
        return (await res).data;
    } catch (error) {
        toast.error(error?.response?.data?.message || "Something went wrong");
        throw error;
    }
});
export const resetPassword = createAsyncThunk("/auth/reset-password", async ({ resetToken, password }) => {
    try {
        const res = axiosInstance.post(`user/reset-password/${resetToken}`, { password });
        toast.promise(res, {
            loading: "Resetting your password...",
            success: (data) => {
                return data?.data?.message;
            },
            error: "Failed to reset password",
        });
        return (await res).data;
    } catch (error) {
        toast.error(error?.response?.data?.message || "Something went wrong");
        throw error;
    }
});

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {},
	extraReducers: (builder) => {//to do extra things when route is hit succesfully
		builder
			.addCase(login.fulfilled, (state, action) => {
				localStorage.setItem("data", JSON.stringify(action?.payload?.user));
				localStorage.setItem("isLoggedIn", true);
				localStorage.setItem("role", action?.payload?.user?.role);
				state.isLoggedIn = true;
				state.data = action?.payload?.user;
				state.role = action?.payload?.user?.role;
			})
			.addCase(logout.fulfilled, (state) => {
				localStorage.clear();
				state.data = {};
				state.isLoggedIn = false;
				state.role = "";
			})
			.addCase(getUserData.fulfilled, (state, action) => {
				if (!action?.payload?.user) return;
				localStorage.setItem("data", JSON.stringify(action?.payload?.user));
				localStorage.setItem("isLoggedIn", true);
				localStorage.setItem("role", action?.payload?.user?.role);
				state.isLoggedIn = true;
				state.data = action?.payload?.user;
				state.role = action?.payload?.user?.role;
			});
	},
});

// export const {} = authSlice.actions;
export default authSlice.reducer;
