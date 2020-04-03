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

    themeMap:any;
    theme:any;
    tmp:any;

    constructor(props: Props) {
        super(props);
        this.state = {
            theme: 1
        }
        this.themeMap = {
            dark: "light",
            light: "gold",
            gold: "silver",
            silver: "dark",
          };

        this.theme = localStorage.getItem('theme')
          || (this.tmp = Object.keys(this.themeMap)[0],
              localStorage.setItem('theme', this.tmp),
              this.tmp);
        const bodyClass:any = document.body.classList;
        bodyClass.add(this.theme);
    }

   
      
     
      
    toggleTheme() {
        const current:any = localStorage.getItem('theme');
        const next = this.themeMap[current];
      
        document.body.classList.replace(current, next);
        localStorage.setItem('theme', next);
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
                 onClick={() => this.toggleTheme()}
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