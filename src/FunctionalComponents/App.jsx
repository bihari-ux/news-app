import React, { Component } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Home from "./Home";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      language: "hi",
      search:""
    };
    this.changeLanguage = this.changeLanguage.bind(this);
    this.changeSearch = this.changeSearch.bind(this);
  }
  changeLanguage(input) {
    this.setState({ language: input });
  }
  changeSearch(input) {
    this.setState({ search: input });
  }
  render() {
    return (
      <BrowserRouter>
        <Navbar changeLanguage={this.changeLanguage} changeSearch={this.changeSearch} />

        <Routes>
          <Route
            path=""
            element={<Home search={this.state.search} language={this.state.language} q="All" />}
          />
          <Route
            path="/All"
            element={<Home search={this.state.search} language={this.state.language} q="All" />}
          />
          <Route
            path="/Politics"
            element={<Home search={this.state.search} language={this.state.language} q="Politics" />}
          />
          <Route
            path="/Crime"
            element={<Home search={this.state.search} language={this.state.language} q="Crime" />}
          />
          <Route
            path="/Science"
            element={<Home search={this.state.search} language={this.state.language} q="Science" />}
          />
          <Route
            path="/Technology"
            element={<Home search={this.state.search} language={this.state.language} q="Technology" />}
          />
          <Route
            path="/Entertainment"
            element={<Home search={this.state.search} language={this.state.language} q="Entertainment" />}
          />
          <Route
            path="/Sports"
            element={<Home search={this.state.search} language={this.state.language} q="Sports" />}
          />
          <Route
            path="/Cricket"
            element={<Home search={this.state.search} language={this.state.language} q="Cricket" />}
          />
          <Route
            path="/IPL"
            element={<Home search={this.state.search} language={this.state.language} q="IPL" />}
          />
          <Route
            path="/Economics"
            element={<Home search={this.state.search} language={this.state.language} q="Economics" />}
          />
          <Route
            path="/International"
            element={<Home search={this.state.search} language={this.state.language} q="International" />}
          />
          <Route
            path="/India"
            element={<Home search={this.state.search} language={this.state.language} q="India" />}
          />
          <Route
            path="/Jokes"
            element={<Home search={this.state.search} language={this.state.language} q="Jokes" />}
          />
          <Route
            path="/*"
            element={<Home search={this.state.search} language={this.state.language} q="All" />}
          />
        </Routes>

        <Footer />
      </BrowserRouter>
    );
  }
}
