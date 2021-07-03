import React, { Component } from "react";

class NoteComponent extends Component {
  state = {};
  render() {
    console.log(this.props);
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
          <a>{this.props.note.author}</a>
          {this.props.note.date}
        </div>
      </div>
    );
  }
}

export default NoteComponent;
