import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "../styles/App.scss";
import Header from "../components/header";
import Footer from "../components/footer";
import DropArrow from "../components/droparrow";
import Front from "../components/front";
import How from "../pages/how";
import Plans from "../pages/plans";
import What from "../pages/what";
import Who from "../pages/who";
import Description from "../components/description";
import Slideshow from "../components/slideshow";
import Template from "../components/templates";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Front />
              <Description />
              <Slideshow />
              <Template />
            </>
          }
        />
        <Route path="/how" element={<How />} />
        <Route path="/plans" element={<Plans />} />
        <Route path="/what" element={<What />} />
        <Route path="/who" element={<Who />} />
      </Routes>
      <Footer />
      <DropArrow />
    </Router>
  );
}

export default App;
