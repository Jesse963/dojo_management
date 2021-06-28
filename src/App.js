import React, { Component } from 'react';
import NavBar from './components/navbar';
import StartPage from './components/StartPage/StartPage';

const testSchool = {
    name:"Mushin Goju Ryu Karate Academy",
    id: "0",
    grades:{
        system:["Dan", "Kyu"],
        rank:[1,2,3,4,5,6,7,8,9,10]
    },
    classTypes:["Beginner", "Intermediate", "Advanced"],
    // students:[
    //     {name: "Jesse Jenkins",grade: "2 Dan", id: 1},
    //     {name: "Michael Thomakos",grade: "3 Dan", id: 2},
    //     {name: "Stefan Roubas",grade: "8 Dan", id: 3},
    //     {name: "Jayson Cook",grade: "6 Dan", id: 4},
    //     {name: "Jason Spata",grade: "1 Kyu", id: 5},
    //     {name: "Seyon Umapathy",grade: "4 Kyu", id: 6},
    // ]
}

// async function fetchStudents(){
//     let test;    
//     let res = await fetch("/api/getStudents")
//     let response = await res.json()
//     console.log(response)
//     return response.result
// }

class App extends Component {
    state = {
        school:testSchool,
        students: []
    };
    componentDidMount(){
        this.fetchStudents()
    }
    fetchStudents(){
        fetch("/api/getStudents").then(async res => {
            const response = await res.json()
            return this.setState({students:response.result})
        }).catch(err => console.log(err))
    }

    render() { 
        console.log(this.state.students)
        return ( 
            <React.Fragment>
                <NavBar/>
                <main className ="container">
                    <StartPage school = {this.state.school}
                    students = {this.state.students}/>
                </main>
            </React.Fragment >
         );
    }
}
 
export default App;