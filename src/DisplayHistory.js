import React, { Component } from 'react';

class DisplayHistory extends Component {
    

    render() {
        const history = this.props.history.map((value, entryNo) => {
            const repetitions = value.repetitions;
            const meditationName = value.name; 
            const date = value.date;

            return (
                <tr key={ entryNo }>
                    <td>{ repetitions }</td> 
                    <td>{ meditationName }</td>
                    <td>{ date }</td>
                    <td><button 
                          className='btn btn-danger'
                          onClick={ ()=> this.props.removeLine( entryNo ) }
                        > remove 
                        </button>
                    </td>
                </tr>
            );
        });

        return (
            <div>
                <table className='table' >
                    <thead>
                        <tr>
                            <th scope='col'>Repetitions</th>
                            <th scope='col'>Meditation</th>
                            <th scope='col'>Completed On</th>
                        </tr>
                    </thead>
                    <tbody>{ history }</tbody>
                </table>
            </div>
        )
    }
}

export default DisplayHistory;