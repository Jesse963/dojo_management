import React, { Component } from "react";
import reactDom from "react-dom";
import NewStudentForm from "../AdminPage/NewSudentForm";
import NewSchoolForm from "../newSchoolPage/newSchoolForm";
import "../core.css";

class LoginPanel extends Component {
  state = { display: "Login" };

  componentDidMount() {
    //on login page, if url contains a link to add student, render the new student form
    if (window.location.href.includes("addStudentFromLink")) {
      const params = new URLSearchParams(window.location.search);
      const token = params.get("token");
      console.log(token);
      reactDom.render(
        <NewStudentForm token={token} fromLink={true} />,
        document.querySelector(".container")
      );
    }
    const school_id = document.cookie.split("school_id=")[1];
    switch (school_id) {
      case "failed_login":
        this.setState({ success: "Username or password incorrect" });
        break;
      case "Unvalidated_Account":
        this.setState({ success: "Account has not been validated yet" });
        break;
      default:
        this.setState({ success: "" });
    }

    //check if the url includes a newAccountVerification and send them to the route if so.
    //Here instead of app.js as in theory an unverified account should only ever see the login page
    console.log(window.location.href);
    if (window.location.href.includes("verifyNewAccount")) {
      this.verifyNewAccount();
    }
  }
  verifyNewAccount = async () => {
    const request = window.location.href.split("/")[4];
    await fetch(`/api/${request}`);
    window.location.href = "/";
  };

  createAccount(e) {
    e.preventDefault();
    reactDom.render(<NewSchoolForm />, document.querySelector(".container"));
  }

  render() {
    if (this.props.display && this.props.display !== this.state.display) {
      this.setState({ display: this.props.display });
    }

    switch (this.state.display) {
      case "Login":
        return (
          <form
            method="POST"
            action="/api/login"
            className="shadow-lg p-3 mb-5 bg-white rounded page container"
            id="loginForm"
            style={{
              marginTop: "20%",
              width: "30%",
              paddingLeft: "5%",
              paddingRight: "5%",
            }}
          >
            <div style={{ textAlign: "left", margin: "5%" }}>
              <h1 style={{ textAlign: "center" }}>Login</h1>
              <p>
                Email:
                <input
                  name="email"
                  type="text"
                  style={{ width: "100%" }}
                  class="form-control"
                  required
                />
              </p>
              <p>
                Password:
                <input
                  name="password"
                  type="password"
                  style={{ width: "100%" }}
                  class="form-control"
                  required
                />
                <a
                  class="hyperlink"
                  onClick={() => this.setState({ display: "Reset" })}
                >
                  Forgot your password?
                </a>
              </p>
              <a style={{ color: "red" }}>{this.state.success}</a>
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
                  // onClick={() => this.login()}
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
            </div>
          </form>
        );
      // ~~~~~~~~~~~~~~~~~~~~~ SUBMIT RESET PASSWORD REQUEST ~~~~~~~~~~~~~~~~~~~~~
      case "Reset":
        return (
          <form
            method="POST"
            action="/api/sendTestEmail"
            className="shadow-lg p-3 mb-5 bg-white rounded page container"
            id="newStudnetForm"
            style={{
              marginTop: "20%",
              width: "30%",
              paddingLeft: "5%",
              paddingRight: "5%",
            }}
          >
            <div style={{ textAlign: "left" }}>
              <h1 style={{ textAlign: "center" }}>Reset Password</h1>
              <p>Enter your email below to receive a password reset email</p>
              <p>
                Email:
                <input
                  name="email"
                  type="text"
                  style={{ width: "100%" }}
                  class="form-control"
                />
                <a
                  class="hyperlink"
                  onClick={() => this.setState({ display: "Login" })}
                >
                  Back to sign in
                </a>
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
            </div>
          </form>
        );
      // ~~~~~~~~~~~~~~~~~~~~~ PASSWORD ONLY FOR RESET ~~~~~~~~~~~~~~~~~~~~~
      case "Password":
        const params = new URLSearchParams(window.location.search);
        const token = params.get("token");
        return (
          <form
            method="POST"
            action={`/api/updateUserPassword?token=${token}`}
            className="shadow-lg p-3 mb-5 bg-white rounded page container"
            id="newStudentForm"
            style={{
              marginTop: "20%",
              width: "30%",
              paddingLeft: "5%",
              paddingRight: "5%",
            }}
          >
            <div>
              <h1 style={{ textAlign: "center" }}>Reset Password</h1>
              <p>Enter your new password below</p>
              <p>
                Password:
                <input
                  name="password"
                  type="password"
                  style={{ width: "100%" }}
                  class="form-control"
                  minLength="8"
                />
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
            </div>
          </form>
        );
    }
  }
}

export default LoginPanel;
