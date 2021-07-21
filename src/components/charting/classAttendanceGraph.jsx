import React, { Component } from "react";
import { Bar } from "react-chartjs-2";

class ClassAttendanceGraph extends Component {
  componentDidMount() {
    // this.setState({
    //   datasets: [
    //     {
    //       backgroundColor: "#007bff",
    //       borderColor: "rgba(0,0,0,1)",
    //       // data: this.props.counts,
    //     },
    //   ],
    // });
  }

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
    let counts = [];
    let formattedDates = [];
    if (this.state.labels.length !== this.props.filteredData.length) {
      this.props.filteredData.forEach((Class) => {
        //Format date into dd/mm/yy
        const date =
          Class.date.getDate() +
          "/" +
          (Class.date.getMonth() + 1) +
          "/" +
          Class.date.getFullYear();
        formattedDates.push(date);

        this.props.filteredData.forEach((Class) => {
          counts.push(Class.count);
        });
      });
      //store counts from each class in an array for use in the graph

      this.setState({
        labels: formattedDates,
        datasets: [
          {
            backgroundColor: "#007bff",
            borderColor: "rgba(0,0,0,1)",
            data: counts,
          },
        ],
      });
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
