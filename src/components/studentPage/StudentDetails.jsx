import React, { Component } from "react";
import StudentInfo from "./StudentInfo";
import StudentPerformance from "./StudentPerformance";
import NoteComponent from "./NoteComponent";

class StudentDetails extends Component {
  state = {};

  getStudentAttendance = async () => {
    //Set parameters
    const school_id = this.props.student.school;
    const full_name = this.props.student.name;
    let totalAttendance = 0;

    //Set options and make calls to api
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ school: school_id, name: full_name }),
    };
    const studentResponse = await fetch("/api/getStudentAttendance", options);
    const studentAttendance = await studentResponse.json();
    const fullResponse = await fetch("/api/getFullAttendance", options);
    const fullAttendance = await fullResponse.json();

    //Calculate total attendance across all classes
    fullAttendance.result.forEach((lesson) => {
      totalAttendance += lesson.attendees.length;
    });

    //Calculate average attendace per student
    const averageAttendancePerStudent =
      totalAttendance / this.props.totalStudents;

    this.setState({
      studentAttendance: studentAttendance.result.length,
      averageAttendancePerStudent: averageAttendancePerStudent,
    });
    console.log(
      this.props.full_name +
        " has attended " +
        studentAttendance.result.length +
        " classes. The average attendance in this period is: " +
        averageAttendancePerStudent
    );
  };

  componentDidMount() {
    this.getStudentAttendance();
  }

  render() {
    const testNotes = [
      {
        author: "Jesse ",
        date: "3/7/21",
        content: "This is a test note",
      },
      {
        author: "Andy",
        date: "3/7/21",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      },
      {
        author: "Jesse Jenkins",
        date: "3/7/21",
        content: "This is a test note",
      },
      {
        author: " Jenkins",
        date: "3/7/21",
        content: "This is a test note",
      },
      {
        author: "Jess Jenkin",
        date: "3/7/21",
        content: "This is a test note",
      },
    ];

    return (
      <div
        className="page container shadow-lg p-3 mb-5 bg-white rounded"
        style={{ display: "flex", flexDirection: "row" }}
      >
        <StudentInfo student={this.props.student} />
        <StudentPerformance
          student={this.props.student}
          studentAttendance={this.state.studentAttendance}
          averageAttendancePerStudent={this.state.averageAttendancePerStudent}
          notes={testNotes}
        />
      </div>
    );
  }
}

export default StudentDetails;
