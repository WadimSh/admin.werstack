import React from "react";
import Header from './components/header';
import Footer from './components/footer';
import Content from "./components/content";

function App() {
  return (
    <React.Fragment>
      <Header />
      <Content />
      <Footer />
    </React.Fragment>
  );
}

export default App;
