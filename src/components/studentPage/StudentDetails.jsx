import React, { Component } from "react";
import StudentInfo from "./StudentInfo";
import StudentPerformance from "./StudentPerformance";

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
    console.log(fullAttendance.result.length);

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
    if (!this.state.studentAttendance) {
      return null;
    }
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
        />
      </div>
    );
  }
}

export default StudentDetails;
