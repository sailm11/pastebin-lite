import { Route, Routes } from "react-router-dom";
import CreatePaste from "./components/CreatePaste";
import ViewPaste from "./components/ViewPaste";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<CreatePaste />} />
      <Route path="/p/:id" element={<ViewPaste />} />
    </Routes>
  );
}
