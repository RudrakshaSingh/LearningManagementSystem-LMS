import "./App.css";

import { Route, Routes } from "react-router-dom";

import RequireAuth from "./Components/Auth/RequireAuth";
import AboutUs from "./Pages/AboutUs";
import Contact from "./Pages/Contact";
import CourseDescription from "./Pages/Course/CourseDescription";
import CourseList from "./Pages/Course/CourseList";
import CreateCourse from "./Pages/Course/CreateCourse";
import AddLecture from "./Pages/Dashboard/AddLecture";
import AdminDashboard from "./Pages/Dashboard/AdminDashboard";
import DisplayLectures from "./Pages/Dashboard/DisplayLectures";
import Denied from "./Pages/Denied";
import HomePage from "./Pages/HomePage";
import Login from "./Pages/Login";
import NotFound from "./Pages/NotFound";
import Checkout from "./Pages/Payment/Checkout";
import CheckoutFailure from "./Pages/Payment/CheckoutFailure";
import CheckoutSuccess from "./Pages/Payment/CheckoutSuccess";
import PrivacyPolicy from "./Pages/Policy/PrivacyPolicy";
import TermsofService from "./Pages/Policy/TermsofService";
import SignUp from "./Pages/SignUp";
import EditProfile from "./Pages/User/EditProfile";
import Profile from "./Pages/User/Profile";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<HomePage />}></Route>
                <Route path="/about" element={<AboutUs />}></Route>
                <Route path="/courses" element={<CourseList />} />
                <Route path="contact" element={<Contact />} />
                <Route path="/denied" element={<Denied />} />

                <Route path="/course/description" element={<CourseDescription />} />

                <Route path="/signup" element={<SignUp />} />
                <Route path="/login" element={<Login />} />

                <Route element={<RequireAuth allowedRoles={["ADMIN"]} />}>
                    <Route path="/course/create" element={<CreateCourse />} />
                    <Route path="/course/addlecture" element={<AddLecture />} />
                    <Route path="/admin/dashboard" element={<AdminDashboard />} />
                </Route>

                <Route element={<RequireAuth allowedRoles={["ADMIN", "USER"]} />}>
                    <Route path="/user/profile" element={<Profile />} />
                    <Route path="/user/editprofile" element={<EditProfile />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/checkout/success" element={<CheckoutSuccess />} />
                    <Route path="/checkout/fail" element={<CheckoutFailure />} />
                    <Route path="/course/displaylectures" element={<DisplayLectures />} />
                </Route>

                <Route path="*" element={<NotFound />}></Route>

                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/terms" element={<TermsofService />} />
            </Routes>
        </>
    );
}

export default App;
