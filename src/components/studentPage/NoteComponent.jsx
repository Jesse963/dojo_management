import React, { Component } from "react";

class NoteComponent extends Component {
  state = { mode: "display", buttonMethod: "Edit", deleteButton: "Delete" };
  componentDidMount() {
    this.setState({ note: this.props.note });
  }
  formatDate() {
    const date = new Date(this.props.note.date);
    let dt = date.getDate();
    let month = date.getMonth() + 1; //Months are zero based
    const year = date.getFullYear();

    if (dt < 10) {
      dt = "0" + dt;
    }
    if (month < 10) {
      month = "0" + month;
    }
    return `${dt}/${month}/${year}`;
  }
  buttonHandler = async () => {
    let note;
    if (this.state.mode === "display") {
      this.setState({
        mode: "edit",
        buttonMethod: "Submit",
        deleteButton: "Delete",
      });
    } else if (this.state.mode === "edit") {
      note = document.getElementById("editNote").value;
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          _id: this.props.note._id,
          note: note,
        }),
      };
      const result = await fetch("/api/editNote", options);
      this.setState(
        {
          editedNote: note,
          mode: "display",
          buttonMethod: "Edit",
          deleteButton: "Delete",
        },
        () => this.toggleEditAndDisplay(note)
      );
    }
  };

  deleteHandler = async () => {
    if (this.state.deleteButton !== "Confirm Deletion") {
      console.log("Changing State");
      this.setState({ deleteButton: "Confirm Deletion" });
    } else if (this.state.deleteButton === "Confirm Deletion") {
      console.log("Deleting");
      await fetch(`/api/deleteNote?note=${this.props.note._id}`);
      document.getElementById("note component " + this.props.id).remove();
    }
  };

  toggleEditAndDisplay(editedNote) {
    if (editedNote && this.state.mode === "display") {
      console.log(editedNote);
      return <h5>{this.state.editedNote}</h5>;
    }
    if (this.state.mode === "display") {
      return <h5>{this.props.note.content}</h5>;
    } else if (this.state.mode === "edit") {
      return (
        <textarea
          name="editNote"
          id="editNote"
          cols="50"
          rows="3"
          defaultValue={this.props.note.content}
        ></textarea>
      );
    }
  }

  render() {
    const fullDate = this.formatDate();
    console.log(fullDate);
    return (
      <div
        id={"note component " + this.props.id}
        className="note component m-2"
        style={{
          minHeight: "8vh",
          background: "white",
          padding: "5px",
          paddingRight: "10px",
          borderBottom: "2px dashed black",
          textAlign: "justify",
          textJustify: "inter-word",
        }}
      >
        <div className="note content" style={{ overflowY: "auto" }}>
          {this.toggleEditAndDisplay(this.state.editedNote)}
        </div>
        <div
          className="note info"
          style={{ display: "flex", flexDirection: "row" }}
        >
          <div style={{ width: "90%" }}>
            {this.props.note.author + "  -  " + fullDate}{" "}
          </div>
          <button
            className="btn btn-sm btn-outline-primary"
            style={{ float: "" }}
            onClick={() => {
              this.buttonHandler();
            }}
          >
            {this.state.buttonMethod}
          </button>
          <button
            className="btn btn-sm btn-outline-danger ml-2"
            style={{ float: "" }}
            onClick={() => {
              this.deleteHandler();
            }}
          >
            {this.state.deleteButton}
          </button>
        </div>
      </div>
    );
  }
}

export default NoteComponent;
