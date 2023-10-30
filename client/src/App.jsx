import "./App.css";

import { Route, Routes } from "react-router-dom";

import AboutUs from "./Pages/AboutUs";
import Contact from "./Pages/Contact";
import CourseList from "./Pages/Course/CourseList";
import HomePage from "./Pages/HomePage";
import Login from "./Pages/Login";
import NotFound from "./Pages/NotFound";
import SignUp from "./Pages/SignUp";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<HomePage />}></Route>
                <Route path="/about" element={<AboutUs />}></Route>

                <Route path="/signup" element={<SignUp />} />
                <Route path="/login" element={<Login />} />
                <Route path="/courses" element={<CourseList />} />
                <Route path="contact" element={<Contact />} />

                <Route path="*" element={<NotFound />}></Route>
            </Routes>
        </>
    );
}

export default App;
