import React, { Component } from "react";
import StudentsOverview from "./StudentsOverview";
import ClassAttendanceGraph from "../charting/classAttendanceGraph";
import "../core.css";

class TrendsPage extends Component {
  state = {
    students: this.props.students,
    display: "Students",
    graphPeriod: 12,
    sortLabel: "Name",
    sortDirection: 1,
  };

  componentDidMount = async () => {
    //set options for api calls
    const school_id = document.cookie.split("school_id=")[1];
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        students: this.props.students,
        school: school_id,
      }),
    };
    //retrieve list of all classes from DB
    const allClasses = await fetch("/api/getFullAttendance", options);
    const fullClassList = await allClasses.json();

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
    this.generateAttendanceGraphDataSet();
    this.sortStudents();
  };

  //~~~~~ DEFINE SORT FUNCTIONS FOR NAME/DATE/ATTENDANCE
  studentSort = (a, b) => {
    let method;
    if (this.state.sortMethod === "Name") {
      method = "name";
    } else {
      method = "attendancePercentage";
    }
    if (a[method] < b[method]) {
      return this.state.sortDirection;
    }
    if (a[method] > b[method]) {
      return this.state.sortDirection * -1;
    }
    return 0;
  };

  classSort = (a, b) => {
    let methodA;
    let methodB;
    if (this.state.sortMethod === "Date") {
      methodA = a.date;
      methodB = b.date;
    } else {
      methodA = a.attendees.length;
      methodB = b.attendees.length;
    }
    if (methodA < methodB) {
      return this.state.sortDirection;
    }
    if (methodA > methodB) {
      return this.state.sortDirection * -1;
    }
    return 0;
  };

  sortStudents() {
    if (this.state.display === "Students") {
      const sortedArray = this.state.fullAttendanceArray.sort(this.studentSort);
      this.setState({
        fullAttendanceArray: sortedArray,
        sortDirection: this.state.sortDirection * -1,
      });
    } else if (this.state.display === "Classes") {
      const sortedArray = this.state.classList.sort(this.classSort);
      this.setState({
        classList: sortedArray,
        sortDirection: this.state.sortDirection * -1,
      });
    }
  }

  setGraphPeriod(period) {
    //set the time period to filter the graph of attendance and change button props to show which is selected
    const periods = [1, 3, 6, 12];
    this.setState({ graphPeriod: period });

    //deactivate all buttons
    periods.forEach((period) => {
      const button = document.getElementById(`${period} month button`);
      button.classList.add("btn-outline-success");
      button.classList.remove("btn-success");
    });

    //activate selected button
    const button = document.getElementById(`${period} month button`);
    button.classList.toggle("btn-success");
    button.classList.toggle("btn-outline-success");
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

  filterButtonHandler(button) {
    const filters = ["students", "classes"];
    const sorts = ["name", "attendance"];
    //get button
    const filterButton = document.getElementById(`${button} filter button`);
    if (
      filters.includes(button) &&
      filterButton.classList.contains("btn-outline-primary")
    ) {
      filters.map((filter) => {
        document
          .getElementById(`${filter} filter button`)
          .classList.toggle("btn-primary");
        document
          .getElementById(`${filter} filter button`)
          .classList.toggle("btn-outline-primary");
      });
    } else if (
      sorts.includes(button) &&
      filterButton.classList.contains("btn-outline-primary")
    ) {
      sorts.map((sort) => {
        document
          .getElementById(`${sort} filter button`)
          .classList.toggle("btn-primary");
        document
          .getElementById(`${sort} filter button`)
          .classList.toggle("btn-outline-primary");
      });
    }
  }

  render() {
    const sortArrow = { "-1": "v", 1: "^" };
    if (
      this.state.dates === undefined ||
      this.state.fullAttendanceArray === undefined
    ) {
      return (
        <div
          className="trends page container shadow-lg p-3 mb-5 bg-white rounded"
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "10%",
            height: "65vh",
            alignItems: "center",
          }}
        >
          <h1 className={"m-5"}>
            An error occurred while retrieving your data.{" "}
          </h1>
          <button
            style={{ width: "50%" }}
            className="btn btn-primary btn-lg m-2"
            onClick={() => (window.location.href = "/")}
          >
            Home
          </button>
        </div>
      );
    } else {
      //calculate date to start graph from
      let filterDate = new Date();
      filterDate.setMonth(filterDate.getMonth() - this.state.graphPeriod);

      let filteredCount = [];
      let filteredData = [];
      //filter dates and counts for graphing purposes
      const filteredDates = this.state.dates.filter((date, i) => {
        // filterDate = new Date("07/20/21");
        let classDate = new Date(date);
        if (classDate >= filterDate) {
          filteredCount.push(this.state.counts[i]);
          filteredData.push({ date: classDate, count: this.state.counts[i] });
        }
        return classDate >= filterDate;
      });
      return (
        <div
          className="trends page container shadow-lg p-3 mb-5 bg-white rounded"
          style={{
            display: "flex",
            flexDirection: "row",
            marginTop: "10%",
            height: "65vh",
          }}
        >
          <div
            className="left panel"
            style={{
              minHeight: "45vh",
              width: "25%",
              overflowY: "hidden",
            }}
          >
            <h2
              className="school name header"
              style={{
                textAlign: "center",
                cursor: "pointer",
                paddingBottom: "5%",
                borderBottom: "2px black dashed",
              }}
              onClick={() => (window.location.href = "/")}
            >
              {this.props.school.name}
            </h2>
            <div
              className="buttons container"
              style={{
                display: "flex",
                flexDirection: "column",
                textAlign: "center",
                alignItems: "left",
                width: "12vw",
                padding: 0,
              }}
            >
              <div
                className="filters panel"
                style={{
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <button
                  id="students filter button"
                  className="btn btn-sm btn-primary m-1 button-half"
                  onClick={() => {
                    this.filterButtonHandler("students");
                    this.setState({
                      display: "Students",
                      sortLabel: "Name",
                      sortMethod: "Date",
                    });
                  }}
                >
                  Students
                </button>
                <button
                  id="classes filter button"
                  className="btn btn-sm btn-outline-primary button-half m-1"
                  onClick={() => {
                    this.filterButtonHandler("classes");
                    this.setState({
                      display: "Classes",
                      sortLabel: "Date",
                      sortMethod: "Date",
                    });
                  }}
                >
                  Classes
                </button>
              </div>
              <div
                className="sort panel mb-2"
                style={{
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <button
                  id="name filter button"
                  className="btn btn-sm btn-primary m-1 button-half"
                  onClick={() => {
                    this.filterButtonHandler("name");
                    if (this.state.display === "Students") {
                      this.setState(
                        { sortMethod: "Name", sortLabel: "Name" },
                        () => this.sortStudents()
                      );
                    } else {
                      this.setState(
                        { sortMethod: "Date", sortLabel: "Date" },
                        () => this.sortStudents()
                      );
                    }
                  }}
                >
                  {this.state.sortLabel} {sortArrow[this.state.sortDirection]}
                </button>
                <button
                  id="attendance filter button"
                  className="btn btn-sm btn-outline-primary m-1 button-half"
                  onClick={() => {
                    this.filterButtonHandler("attendance");
                    this.setState({ sortMethod: "Attendance" }, () =>
                      this.sortStudents()
                    );
                  }}
                >
                  Attendance {sortArrow[this.state.sortDirection]}
                </button>
              </div>
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
              sort={this.state.sort}
            />
          </div>
          <div
            className="right panel"
            style={{ width: "75%", height: "75vh", textAlign: "center" }}
          >
            <h2>Attendance over past {this.state.graphPeriod} months</h2>
            <ClassAttendanceGraph
              filteredData={filteredData.reverse()}
              dates={filteredDates.reverse()}
              counts={filteredCount.reverse()}
            />
            <div className="controls panel">
              <button
                id="1 month button"
                className="btn btn-outline-success btn-lg m-2"
                onClick={() => this.setGraphPeriod(1)}
              >
                1 Month
              </button>
              <button
                id="3 month button"
                className="btn btn-outline-success btn-lg m-2"
                onClick={() => {
                  this.setGraphPeriod(3);
                }}
              >
                3 Months
              </button>
              <button
                id="6 month button"
                className="btn btn-outline-success btn-lg m-2"
                onClick={() => this.setGraphPeriod(6)}
              >
                6 Months
              </button>
              <button
                id="12 month button"
                className="btn btn-success btn-lg m-2"
                onClick={() => this.setGraphPeriod(12)}
              >
                12 Months
              </button>
              <button
                className="btn btn-secondary btn-lg m-2"
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
