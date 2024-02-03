import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Explore from "./pages/Explore";
import NoPage from "./pages/NoPage";

import NewStory from "./pages/NewStory";
import StoryEditor from "./pages/StoryEditor";
import MyStories from "./pages/MyStories";
import ReadStory from "./pages/ReadStory";

import Login from "./pages/Login";
import Register from "./pages/Register";

import CommitHistory from "./pages/CommitHistory";

import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/newStory" element={<NewStory />} />
        <Route path="/storyEditor" element={<StoryEditor />} />
        <Route path="/myStories" element={<MyStories />} />
        <Route path="/readStory" element={<ReadStory />} />
        <Route path="/commitHistory" element={<CommitHistory />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
