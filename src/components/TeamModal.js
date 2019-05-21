import React from 'react';
import theme from '../theme/styledTheme';
import styled from 'styled-components';

export default class TeamModal extends React.Component {

    onClose = (e) => {
        this.props.onClose && this.props.onClose(e);
    }
    render() {
        if (!this.props.show) {
            return null;
        }
        return (
            <div>
                <input type="button" onClick={this.showModal} value="User Roles" />
                <div>
                <button onClick={(e) => { this.onClose(e)}}>
                    Close
                </button>
            </div>
        </div>
        )
    }
}


const backdropStyle
