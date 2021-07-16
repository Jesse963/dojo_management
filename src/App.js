import React, { Component } from "react";
import NavBar from "./components/navbar";
import StartPage from "./components/StartPage/StartPage";
import LoginPanel from "./components/loginPanel/loginPanel";

class App extends Component {
  state = {
    school: {},
    students: [],
  };

  componentDidMount() {
    this.getSchool();
    this.fetchStudents();
  }

  fetchStudents() {
    fetch("/api/getStudents")
      .then(async (res) => {
        const response = await res.json();
        return this.setState({ students: response.result });
      })
      .catch((err) => console.log(err));
  }

  getSchool = async () => {
    console.log("getting school");
    let school_id;
    if (document.cookie.length == 0) {
      console.log("cookie length = 0");
      return;
    } else {
      school_id = document.cookie.split("school_id=")[1].split("=")[0];
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ school_id: school_id }),
      };

      const school = await fetch("/api/getSchool", options);
      console.log("heres a fuckign log", school);

      let finalSchool = await school.json();
      finalSchool = finalSchool.result[0];
      console.log("another dfucking log", finalSchool);

      return this.setState({ school: finalSchool });
    }
  };

  render() {
    if (document.cookie.length === 0) {
      console.log("no cookie exists");
      return (
        <React.Fragment>
          <NavBar />
          <main className="container">
            <LoginPanel />
          </main>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <NavBar />
          <main className="container">
            <StartPage
              school={this.state.school}
              students={this.state.students}
            />
          </main>
        </React.Fragment>
      );
    }
  }
}

export default App;
