import React, { Component } from "react";

class NoteForm extends Component {
  state = {};
  render() {
    return (
      <form
        method="POST"
        action={
          "/api/postNote?school_id=" +
          document.cookie.split("school_id=")[1] +
          "&student_id=" +
          this.props.student._id
        }
        style={{ margin: "2.5%" }}
      >
        <textarea
          name="content"
          id="noteContent"
          style={{
            height: "90%",
            width: "100%",
            border: "none",
            overflow: "auto",
          }}
          wrap="hard"
          rows="9"
          columns="2"
          placeholder="Enter a note here"
        />
        <p></p>
        <button className="btn btn-success" type="submit">
          Post Note
        </button>
        <button
          className="btn btn-danger ml-3"
          type="cancel"
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          Cancel
        </button>
      </form>
    );
  }
}

export default NoteForm;
