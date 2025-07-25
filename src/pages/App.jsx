import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "../styles/App.scss";
import Header from "../components/header";
import Footer from "../components/footer";
import DropArrow from "../components/droparrow";
import Front from "../components/front";

import Description from "../components/description";
import Slideshow from "../components/slideshow";
import Template from "../components/templates";
import Form from "../components/Form";
import ScrollStepsContainer from "../components/ScrollStepsContainer";

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
              <ScrollStepsContainer />
              <Form />
            </>
          }
        />
      </Routes>
      <Footer />
      <DropArrow />
    </Router>
  );
}

export default App;
