import React from 'react';
export default class TeamModal extends React.Component {
    
    
    render() {
        if (this.props.show) {
            return null;
        }
        return(
            <div>
                <h3>User Descriptions</h3>
            </div>
        )
    }
}