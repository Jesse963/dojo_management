import React, { Component } from "react";
import NavBar from "./components/navbar";
import StartPage from "./components/StartPage/StartPage";
import LoginPanel from "./components/loginPanel/loginPanel";

class App extends Component {
  state = {
    school: {},
    students: [],
  };

  componentDidMount = async () => {
    this.getSchool();
    this.fetchStudents();
    this.resetPassword();
  };

  resetPassword = async () => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    console.log(token);
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: token }),
    };
    if (token) {
      await fetch("/api/resetPassword", options);
      this.setState({ display: "Password" });
    }
  };

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

      let finalSchool = await school.json();
      finalSchool = finalSchool.result[0];

      return this.setState({ school: finalSchool });
    }
  };

  generateContent = async () => {
    switch (
      this.state.display
      //switch content based on display value, return JSX for the components
      //in render(), return all base content (navbar etc) + call this function to determine content
    ) {
    }
  };

  render() {
    if (document.cookie.length === 0) {
      if (this.state.display === "Password") {
        return (
          <React.Fragment>
            <NavBar />
            <main className="container">
              <LoginPanel display={"Password"} />
            </main>
          </React.Fragment>
        );
      }
      console.log("no cookie exists");
      return (
        <React.Fragment>
          <NavBar />
          <main className="login container">
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
