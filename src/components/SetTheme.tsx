import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Reducer } from '../utils/generalTypes';
import { connect } from 'react-redux';
import * as actions from './../redux/actions';

interface Props {
    match: any
    location: any
    history: any
    reducer?: Reducer;
    dispatch?: Function;
}

interface State {
    theme: number
}

class SetTheme extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            theme: 1
        }
    }
    
    render() {
        return (
            <div>
                 <button 
                 style={{
                    "width": "98%",
                    "height": "4em",
                    "margin": "1em"
                 }}
                 id="themeButton">
                     Change theme mode</button>
                     <button 
                 style={{
                    "width": "98%",
                    "height": "4em",
                    "margin": "1em"
                 }}
                 id="menuThemeButton"
                 onClick={() => this.changeMenuTheme()}
                 >
                     Change menu</button>
            </div>
        );
    }


    private changeMenuTheme = () => {
        this.setState({
            theme: this.state.theme === 0 ? 1 : 0,
        });

        if (this.props.dispatch) {
             this.props.dispatch(actions.zmenitmenuTheme(this.state.theme))
        }
    }
}

export default withRouter((connect(reducer => reducer)(SetTheme)));