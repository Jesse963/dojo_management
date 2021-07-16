import React, { Component } from "react";
import { Bar } from "react-chartjs-2";

class ClassAttendanceGraph extends Component {
  componentDidMount() {}

  state = {
    datasets: [
      {
        backgroundColor: "#007bff",
        borderColor: "rgba(0,0,0,1)",
        data: this.props.counts,
      },
    ],
    labels: [],
  };

  render() {
    //Nicely format dates before passing them to state for graphing
    if (this.state.labels.length === 0) {
      let formattedDates = [];
      this.props.dates.forEach((date) => {
        date =
          date.getDate() +
          "/" +
          (date.getMonth() + 1) +
          "/" +
          date.getFullYear();
        formattedDates.push(date);
      });
      this.setState({ labels: formattedDates });
    }

    return (
      <div>
        <Bar
          data={this.state}
          style={{
            background: "white",
            margin: "3%",
          }}
          options={{
            plugins: {
              legend: { display: false },
            },
          }}
        />
      </div>
    );
  }
}
export default ClassAttendanceGraph;
