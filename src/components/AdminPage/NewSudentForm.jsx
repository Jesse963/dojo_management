import React, { Component } from "react";
import "../core.css";

class NewStudentForm extends Component {
  state = {
    link: "",
    buttonStatus: "Copy",
  };
  generateNewStudentLink = async () => {
    let link = await fetch("/api/generateNewStudentLink");
    link = await link.json();
    link = link.result;
    console.log(link);
    this.setState({ link: link });
  };
  renderLinkButton() {
    if (this.props.fromLink) {
      return null;
    }
    return (
      <button
        type="cancel"
        className="btn btn-primary btn-lg m-2"
        style={{ width: "20%" }}
        onClick={(e) => {
          e.preventDefault();
          this.generateNewStudentLink();
        }}
      >
        Generate Link
      </button>
    );
  }

  copyLink() {
    const linkArea = document.getElementById("newStudentLink");
    linkArea.select();
    document.execCommand("copy");
    window.getSelection().removeAllRanges();
    this.setState({ buttonStatus: "Link Copied to Clipboard!" });
  }
  render() {
    if (this.state.link) {
      return (
        <div
          style={{ height: "45vh" }}
          className="shadow-lg p-3 mb-5 bg-white rounded page container"
        >
          <h1>Student Link</h1>
          <p>
            Send this link to your students and they will be able to add their
            details to your school, saving you the hastle of adding all of your
            students in one go.
          </p>
          <p>
            The link is only valid for 24 hours, but you can create another one
            whenever you need.
          </p>
          <textarea
            name="newStudentLink"
            id="newStudentLink"
            cols="30"
            rows="3"
            stlye={{ border: "none !important" }}
            defaultValue={this.state.link}
          ></textarea>
          <p></p>
          <button
            className="btn btn-primary m-2"
            onClick={() => this.copyLink()}
          >
            {this.state.buttonStatus}
          </button>
          <button
            className="btn btn-secondary m-2"
            onClick={() => (window.location.href = "/")}
          >
            Home
          </button>
        </div>
      );
    }
    return (
      <form
        method="POST"
        action={
          "/api/submit_student?school_id=" + this.props.token
          // document.cookie.split("school_id=")[1]
        }
        className="shadow-lg p-3 mb-5 bg-white rounded page container"
        id="newStudentForm"
        style={{ textAlign: "left" }}
      >
        <h1 style={{ textAlign: "center" }}>Enter New Student Details</h1>
        <div
          style={{ paddingLeft: "5%", paddingRight: "5%", overflow: "auto" }}
        >
          <p>
            First Name:
            <input
              name="first_name"
              type="text"
              style={{ width: "100%" }}
              class="form-control"
              required
            />
          </p>
          <p>
            Last Name:
            <input
              name="last_name"
              type="text"
              style={{ width: "100%" }}
              class="form-control"
              required
            />
          </p>
          <p>
            Date of Birth:
            <input
              name="dob"
              type="text"
              style={{ width: "100%" }}
              class="form-control"
              required
            />
          </p>
          <p>
            Phone Number:
            <input
              name="phone"
              type="text"
              style={{ width: "100%" }}
              class="form-control"
              required
            />
          </p>
          <p>
            Address:
            <input
              name="address"
              type="text"
              style={{ width: "100%" }}
              class="form-control"
              required
            />
          </p>
          <p>
            Email:
            <input
              name="email"
              type="email"
              style={{ width: "100%" }}
              class="form-control"
              required
            />
          </p>
        </div>
        <div style={{ textAlign: "center" }}>
          <button
            type="submit"
            className="btn btn-primary btn-lg m-2"
            style={{ width: "20%" }}
          >
            Submit
          </button>
          {this.renderLinkButton()}
          <button
            type="cancel"
            className="btn btn-danger btn-lg m-2"
            style={{ width: "20%" }}
            onClick={(e) => {
              e.preventDefault();
              window.location.href = "/";
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    );
  }
}

export default NewStudentForm;
