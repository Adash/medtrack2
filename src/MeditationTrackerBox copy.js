import React, { Component } from 'react';

class MeditationTrackerBox extends Component {
    constructor(props) {
        super(props);

        this.state = {
            newRepValue: 0
        }

        this.handleNewValueChange = this.handleNewValueChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onKeyPress = this.onKeyPress.bind(this);

    }


    handleNewValueChange = (event) => {
        const value = event.target.value;

        this.setState({
            newRepValue: value
        });
    }

    handleSubmit(){
        const newValue = parseInt(this.state.newRepValue, 10);

        this.props.addNewValue(newValue);
    }

    onKeyPress(event){
        if (event.key === 'Enter') {
            this.handleSubmit();
        }
    }
    
    render() {
        const meditations = [];
        const{ meditationName, meditationType, repetitions, } = this.props.meditations.sixteenthKarmapa;
        const newValue = parseInt(this.state.newRepValue, 10);

    // loop through meditation object and return jsx object for each 
    // use the example from the tic tac toe game
    // think about what should be returned and passed as variable and what
    // should be written already in the template below
        meditations = Object.keys(this.props.meditations).forEach(
            (key)=> {
                return (
                    <div className='meditationBlock'>
                    
                    </div>
                )
            }            
        );

        return (
            <div className='meditationBlock'>
                <label> { meditationName} </label>
                <p> { meditationType } </p>
                <p> { repetitions } </p>
                <input
                    name='newRepetitions'
                    type='text'
                    value={ this.state.newRepValue }
                    onChange= { this.handleNewValueChange }
                    onKeyPress= { this.onKeyPress }
                ></input>
                <button
                    onClick={ ()=> this.props.addNewValue(newValue) }
                > add mantras </button>
                <button
                    onClick={ this.handleSubmit }
                > test </button>
            </div>
        )
    }
}

export default MeditationTrackerBox;