import React, { Component } from "react";
import ReactDOM from "react-dom";
import Students from "../NewClassPage/students";
import StudentDetails from "../studentPage/StudentDetails";
import AdminPage from "../AdminPage/AdminPage";
import TrendsPage from "../TrendsPage/TrendsPage";

class StartPage extends Component {
  state = {
    isHidden: false,
  };

  navigateToNewClass = () => {
    console.log("Navigated to New Class");
    ReactDOM.render(<Students />, document.querySelector(".container"));
  };

  navigateToTrends = () => {
    console.log("Navigated to Trends");
    ReactDOM.render(<TrendsPage />, document.querySelector(".container"));
  };
  navigateToAdmin = () => {
    console.log("Navigated to Admin");
    ReactDOM.render(<AdminPage />, document.querySelector(".container"));
  };

  render() {
    return (
      <div
        className="startPageContainer"
        style={{
          marginTop: "15%",
          padding: "15px",
          border: "2px solid black",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          height: "100%",
        }}
        className="shadow-lg p-3 mb-5 bg-white rounded"
      >
        <h1 className="m-3" style={{ textAlign: "center" }}>
          Welcome to Mushin, what would you like to do?
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
