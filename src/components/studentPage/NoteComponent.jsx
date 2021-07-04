import React, { Component } from "react";

class NoteComponent extends Component {
  state = {};
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

  render() {
    const fullDate = this.formatDate();
    console.log(fullDate);
    return (
      <div
        className="note component m-2"
        style={{
          minHeight: "10vh",
          background: "white",
          padding: "5px",
          paddingRight: "10px",
          borderBottom: "2px dashed black",
          textAlign: "justify",
          textJustify: "inter-word",
        }}
      >
        <div className="note content" style={{ overflowY: "auto" }}>
          <h5>{this.props.note.content}</h5>
        </div>
        <div
          className="note info"
          style={{ display: "flex", flexDirection: "column" }}
        >
          {this.props.note.author + "  -  " + fullDate}
        </div>
      </div>
    );
  }
}

export default NoteComponent;
