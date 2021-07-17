import React, { Component } from "react";
import reactDom from "react-dom";
import "../core.css";
import NewSchoolForm from "../newSchoolPage/newSchoolForm";

class LoginPanel extends Component {
  state = { display: "Login" };

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
                <input
                  name="email"
                  type="text"
                  style={{ width: "100%" }}
                  class="form-control"
                />
              </p>
              <p>
                Password:
                <input
                  name="password"
                  type="password"
                  style={{ width: "100%" }}
                  class="form-control"
                />
                <a
                  class="hyperlink"
                  onClick={() => this.setState({ display: "Reset" })}
                >
                  Forgot your password?
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
            <div>
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
            id="newStudnetForm"
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
