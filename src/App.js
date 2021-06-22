import React, { Component } from 'react';
import NavBar from './components/navbar';
import StartPage from './components/StartPage/StartPage';
import Students from './components/NewClassPage/students';

const students = [
    {name: "Jesse Jenkins",grade: "2 Dan", id: 1},
    {name: "Michael Thomakos",grade: "3 Dan", id: 2},
    {name: "Stefan Roubas",grade: "8 Dan", id: 3},
    {name: "Jayson Cook",grade: "6 Dan", id: 4},
    {name: "Jason Spata",grade: "1 Kyu", id: 5},
    {name: "Seyon Umapathy",grade: "4 Kyu", id: 6},
]

class App extends Component {
    state = {
        students: students,
    }
    render() { 
        return ( 
            <React.Fragment>
                <NavBar/>
                <main className ="container">
                    <StartPage/>
                    {/* <Students 
                        students={this.state.students} 
                    /> */}
                </main>
            </React.Fragment >
         );
    }
}
 
export default App;