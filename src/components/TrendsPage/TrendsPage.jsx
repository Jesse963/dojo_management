import React, { Component } from "react";
import StudentsOverview from "./StudentsOverview";
import ClassAttendanceGraph from "../charting/classAttendanceGraph";

class TrendsPage extends Component {
  state = {
    students: this.props.students,
    display: "Students",
    graphPeriod: 1,
  };

  componentDidMount = async () => {
    //set options for api calls
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        students: this.props.students,
        school: this.props.school.schoolID,
      }),
    };

    //retrieve list of all classes from DB
    const allClasses = await fetch("/api/getFullAttendance", options);
    const fullClassList = await allClasses.json();
    console.log("here are all your classes: ", fullClassList.result);

    //retrieve attendance % for each student in the school
    const attendances = await fetch(
      "/api/calculateFullAttendancePercentages",
      options
    );
    const fullAttendanceArray = await attendances.json();

    //set values to state
    this.setState({
      classList: fullClassList.result,
      fullAttendanceArray: fullAttendanceArray.result,
      loaded: true,
    });

    const graphData = this.generateAttendanceGraphDataSet();
    console.log(graphData);
  };

  setGraphPeriod(period) {
    this.setState({ graphPeriod: period });
  }

  generateAttendanceGraphDataSet = () => {
    const classList = this.state.classList;
    let dates = [];
    let counts = [];
    let date;
    classList.forEach((Class) => {
      date = new Date(Class.date);

      dates.push(date);
      counts.push(Class.attendees.length);
    });
    this.setState({ dates: dates, counts: counts });
  };

  classClickHandler = (classKey) => {
    console.log("clicked: " + classKey + typeof classKey);
    this.setState({ classKey: classKey, display: "Single" });
  };

  render() {
    if (this.state.dates === undefined) {
      return null;
    } else {
      //calculate date to start graph from
      let filterDate = new Date();
      filterDate.setMonth(filterDate.getMonth() - this.state.graphPeriod);

      let filteredCount = [];

      //filter dates and counts for graphing purposes
      const filteredDates = this.state.dates.filter((date, i) => {
        let classDate = new Date(date);
        if (classDate > filterDate) {
          filteredCount.push(this.state.counts[i]);
        } else {
          console.log(classDate);
        }
        return classDate > filterDate;
      });
      return (
        <div
          className="start page container shadow-lg p-3 mb-5 bg-white rounded"
          style={{
            display: "flex",
            flexDirection: "row",
            marginTop: "10%",
            height: "65vh",
          }}
        >
          <div
            className="left panel"
            style={{ minHeight: "45vh", width: "25%" }}
          >
            <h2
              style={{ textAlign: "center", cursor: "pointer" }}
              onClick={() => (window.location.href = "/")}
            >
              {this.props.school.name}
            </h2>
            <div className="filters panel ml-3" style={{ textAlign: "center" }}>
              <button
                className="btn btn-sm btn-outline-primary  m-2"
                onClick={() => this.setState({ display: "Students" })}
              >
                Students
              </button>
              <button
                className="btn btn-sm btn-outline-primary m-2"
                onClick={() => this.setState({ display: "Classes" })}
              >
                Classes
              </button>
            </div>
            <StudentsOverview
              students={this.state.students}
              school={this.props.school}
              display={this.state.display}
              classList={this.state.classList}
              fullAttendanceArray={this.state.fullAttendanceArray}
              graphData={this.state.graphData}
              classKey={this.state.classKey}
              classClickHandler={(classKey) => this.classClickHandler(classKey)}
            />
          </div>
          <div
            className="right panel"
            style={{ width: "75%", height: "75vh", textAlign: "center" }}
          >
            <h2>Attendance over past {this.state.graphPeriod} months</h2>
            <ClassAttendanceGraph
              dates={filteredDates.reverse()}
              counts={filteredCount.reverse()}
            />
            <div className="controls panel">
              <button
                className="btn btn-outline-success btn-lg m-2"
                onClick={() => this.setGraphPeriod(1)}
              >
                1 Month
              </button>
              <button
                className="btn btn-outline-success btn-lg m-2"
                onClick={() => this.setGraphPeriod(3)}
              >
                3 Months
              </button>
              <button
                className="btn btn-outline-success btn-lg m-2"
                onClick={() => this.setGraphPeriod(6)}
              >
                6 Months
              </button>
              <button
                className="btn btn-outline-success btn-lg m-2"
                onClick={() => this.setGraphPeriod(12)}
              >
                12 Months
              </button>
              <button
                className="btn btn-primary btn-lg m-2"
                onClick={() => (window.location.href = "/")}
              >
                Home
              </button>
            </div>
          </div>
        </div>
      );
    }
  }
}
export default TrendsPage;
