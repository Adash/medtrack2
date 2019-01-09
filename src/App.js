import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MeditationTrackerBox from './MeditationTrackerBox';
import DisplayHistory from './DisplayHistory';
import FormElement from './FormElement';

class App extends Component {
  constructor(props) {
    super(props);

    this.addNewValue = this.addNewValue.bind(this);
    this.handleNewValueChange = this.handleNewValueChange.bind(this);
    this.removeHistoryItem = this.removeHistoryItem.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  state = {
    meditations: {
      sixteenthKarmapa: {
        meditationName: '16th Karmapa',
        meditationType: 'GuruYoga',
        repetitions: 108,
        newRepValue: 3,
      },
      limitlessLight: {
        meditationName: 'Limitless Light',
        meditationType: 'Yidam Practice',
        repetitions: 1080,
        newRepValue: 9,
      },
    },
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

  componentDidMount() {
    document.title = 'Adaś';
  }


  componentDidUpdate() {
    document.title = document.title + '.';
    //console.log(prevProps);
    //console.log(this.state.history);
  }


  render() {
    const { meditations } = this.state;
    const { history } = this.state

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <div className='mainContainer'>
          <MeditationTrackerBox 
            meditations= { meditations }  
            addNewValue= { this.addNewValue }
            handleKeyPress= { this.handleKeyPress }
            handleNewValueChange= {this.handleNewValueChange}
          />
        </div>
          <DisplayHistory
            history={ history }
            removeLine={ this.removeHistoryItem }
            test={this.handleFormSubmit}
          />
          <div className="form section">
            <FormElement
              handleFormSubmit={ this.handleFormSubmit }
            />
          </div>
          <footer className="footer"> ...  </footer>
      </div>
    );
  }
}

export default App;
