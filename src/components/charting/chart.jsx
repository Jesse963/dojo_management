import React, { Component } from "react";
import { Bar, Line } from "react-chartjs-2";

class Chart extends React.Component {
  componentDidMount() {
    console.log(this.props);
  }

  state = {
    datasets: [
      {
        backgroundColor: "#007bff",
        borderColor: "rgba(0,0,0,1)",
        data: [this.props.student, this.props.average],
      },
    ],
    labels: ["Student", "Average"],
  };

  render() {
    console.log(this.props.student);

    return (
      <div>
        <Bar
          data={this.state}
          style={{
            background: "white",
            maxHeight: "25vh",
            maxWidth: "80%",
            marginLeft: "10%",
          }}
          options={{
            plugins: {
              title: {
                display: true,
                text: "Student Attendance vs Average",
                fontSize: 20,
              },
            },
          }}
        />
      </div>
    );
  }
}
export default Chart;
