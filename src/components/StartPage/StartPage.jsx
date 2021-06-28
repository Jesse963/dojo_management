import React, { Component } from "react";
import ReactDOM from "react-dom";
import Students from "../NewClassPage/students";
import StudentDetails from "../studentPage/StudentDetails";
import AdminPage from "../AdminPage/AdminPage";
import TrendsPage from "../TrendsPage/TrendsPage";
import "../core.css";

class StartPage extends Component {
  state = {
    isHidden: false,
  };

  navigateToNewClass = () => {
    console.log("Navigated to New Class");
    ReactDOM.render(
      <Students students={this.props.students} />,
      document.querySelector(".container")
    );
  };

  navigateToTrends = () => {
    console.log("Navigated to Trends");
    ReactDOM.render(
      <TrendsPage students={this.props.students} />,
      document.querySelector(".container")
    );
  };
  navigateToAdmin = () => {
    console.log("Navigated to Admin");
    ReactDOM.render(<AdminPage />, document.querySelector(".container"));
  };

  render() {
    return (
      <div
        className="start page container shadow-lg p-3 mb-5 bg-white rounded"
        style={{ marginTop: "15%" }}
      >
        <h1 className="m-3" style={{ textAlign: "center" }}>
          Welcome to {this.props.school.name}, what would you like to do?
        </h1>
        <button
          className="btn btn-primary btn-lg m-3"
          onClick={this.navigateToNewClass}
        >
          Start Class
        </button>
        <button
          className="btn btn-primary btn-lg m-3"
          onClick={this.navigateToTrends}
        >
          Trends
        </button>
        <button
          className="btn btn-primary btn-lg m-3"
          onClick={this.navigateToAdmin}
        >
          Admin
        </button>
      </div>
    );
  }
}

export default StartPage;
