import React, { Component } from "react";

class NoteForm extends Component {
  state = {};
  render() {
    return (
      <form
        method="POST"
        action={
          "/api/postNote?school_id=" +
          this.props.student.school +
          "&student_id=" +
          this.props.student.name
        }
        style={{ margin: "2.5%" }}
      >
        <textarea
          name="content"
          id="noteContent"
          style={{ height: "70%" }}
          wrap="hard"
          rows="8"
          columns="2"
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
