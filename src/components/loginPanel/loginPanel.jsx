import React, { Component } from "react";
import reactDom from "react-dom";
import "../core.css";
import NewSchoolForm from "../newSchoolPage/newSchoolForm";

class LoginPanel extends Component {
  state = {};

  createAccount(e) {
    e.preventDefault();
    reactDom.render(<NewSchoolForm />, document.querySelector(".container"));
  }

  render() {
    return (
      <form
        method="POST"
        action="/api/login"
        className="shadow-lg p-3 mb-5 bg-white rounded page container"
        id="newStudnetForm"
        style={{
          marginTop: "20%",
          width: "30%",
          paddingLeft: "5%",
          paddingRight: "5%",
        }}
      >
        <div>
          <h1 style={{ textAlign: "center" }}>Login</h1>
          <p>
            Email:
            <input name="email" type="text" style={{ width: "100%" }} />
          </p>
          <p>
            Password:
            <input name="password" type="password" style={{ width: "100%" }} />
            <a href="">Forgot your password?</a>
          </p>
        </div>
        <div
          style={{
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <button
            type="submit"
            className="btn btn-success mt-3"
            onClick={this.login}
          >
            Submit
          </button>
          <button
            type="cancel"
            className="btn btn-secondary mt-3"
            onClick={this.createAccount}
          >
            Create Account
          </button>
        </div>
      </form>
    );
  }
}

export default LoginPanel;
