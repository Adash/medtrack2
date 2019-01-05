import React, { Component } from 'react';

class FormElement extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            type: '',
            repetitions: '',
        }

    }

    handleNewValueChange = (event) => {
        const value = event.target.value;
        const fieldName = event.target.name;
        if ( fieldName === 'repetitions' && isNaN(value) ) { return }
        this.setState({
            [fieldName]: value
        });
        // if ( isNaN(value) === false ) {
        // this.setState({
        //     name: name,
        //     type: type,
        //     repetitions: repetitions 
        // }); 
    }

    handleSubmit = () => {
        this.props.handleFormSubmit(this.state);
    }

    render() {
        const { name, type, repetitions } = this.state; 

        return (
            <div className="col-6" >
                <form>
                    <div className="form-group">
                        <label>Meditation Name</label>
                        <input 
                            type="text" 
                            className="form-control"
                            name="name" 
                            value={name} 
                            onChange={this.handleNewValueChange} 
                        />
                    </div>
                    <div className="form-group">
                        <label>Meditation Type</label>
                        <input 
                            type="text" 
                            name="type" 
                            className="form-control"
                            value={type} 
                            onChange={this.handleNewValueChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Repetitions Completed</label>
                        <input 
                            type="text" 
                            name="repetitions" 
                            className="form-control"
                            value={repetitions} 
                            onChange={this.handleNewValueChange}
                        />
                    </div>
                    <button className='btn btn-success'
                        onClick={ this.handleSubmit }
                    > Add Meditation </button>
                </form>
            </div>    
        );
    }
}

export default FormElement;

//onClick={ ()=>this.props.handleFormSubmit(name, type, repetitions) }