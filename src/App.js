import React, { Component } from 'react';
import './App.css';
import MeditationTrackerBox from './MeditationTrackerBox';
import DisplayHistory from './DisplayHistory';
import FormElement from './FormElement';
import inData from './inData';

class App extends Component {
  constructor(props) {
    super(props);

    this.addNewValue = this.addNewValue.bind(this);
    this.handleNewValueChange = this.handleNewValueChange.bind(this);
    this.removeHistoryItem = this.removeHistoryItem.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.toggleForm = this.toggleForm.bind(this);
  }

  state = {
    meditations: inData,
    history: [],
  }


  addNewValue(medKey) {
    const medClone = Object.assign({}, this.state.meditations);
    const newValue = parseInt(this.state.meditations[medKey].newRepValue, 10);;
    const history = this.state.history;
    const date = new Date();
    const time = date.toDateString();
    const medName = this.state.meditations[medKey].meditationName;
    
    medClone[medKey].repetitions += newValue;  

    this.setState({
        meditations: medClone,
        history: history.concat([
          {
            name: medName,
            repetitions: newValue,
            date: time,
          }])
    });
  }

  handleNewValueChange = (event, medName) => {
    const value = event.target.value;
    if ( isNaN(value) === false ) {
      const medClone = Object.assign({}, this.state.meditations);
      medClone[medName].newRepValue = value;   

      this.setState({
          meditations: medClone, 
          showForm: false,
      });
    }  
  }

  removeHistoryItem(entryNo) {
    const newHistory = this.state.history.filter(
      (value, index)=> index !== entryNo
    );
    console.log(newHistory);
    this.setState({
      history: newHistory
    });
  }

  handleFormSubmit(input) {
    const repetitions = parseInt(input.repetitions, 10)
    const newMeditation = {
      meditationName: input.name,
      meditationType: input.type,
      repetitions: repetitions,
      newRepValue: 0,
    }

    let medKey = input.name.replace(/\s+/g, '').toLowerCase();
    if ( !(isNaN(medKey.charAt(0))) ) { medKey = 'a' + medKey };
    console.log(this.state.meditations[medKey]);
    const medClone = Object.assign({ [medKey]:{} }, this.state.meditations);
    medClone[medKey] = newMeditation;   

    this.setState({
      meditations: medClone,
    }); 
  }

  toggleForm() {
    this.setState({
      showForm: !this.state.showForm
    })
  }


  render() {
    const { meditations } = this.state;
    const { history } = this.state

    return (
      <div className="App container">
        <header className="header">
        <h2 className="logo">MedTrack</h2>
        <button 
          type="button" 
          className="btn btn-outline-light btn-sm navbutton"
          onClick={ this.toggleForm }  
        >
          { this.state.showForm ? "Hide": "Show" } Form
        </button>
        </header>        
        <MeditationTrackerBox 
          meditations= { meditations }  
          addNewValue= { this.addNewValue }
          handleKeyPress= { this.handleKeyPress }
          handleNewValueChange= {this.handleNewValueChange}
        />
        <DisplayHistory
          history={ history }
          removeLine={ this.removeHistoryItem }
          test={this.handleFormSubmit}
        />
        { this.state.showForm ?
          <FormElement
            handleFormSubmit={ this.handleFormSubmit }
          />
          : null
        }
        <footer className="footer"> Footer  </footer>
      </div>
    );
  }
}

export default App;
