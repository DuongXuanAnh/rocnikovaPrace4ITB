import React, { Component } from 'react';
import { Progress, Row, Col, Button } from 'antd';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Reducer } from '../../utils/generalTypes';
import * as actions from './../../redux/actions';

interface Props {
    match: any
    location: any
    history: any
    reducer?: Reducer;
    dispatch?: Function;
}

interface State {

}

class Hodnoceni extends Component<Props, State> {

    componentDidMount() {
        // if(this.props.reducer!.vysledekTestu!.length === 0){
        //     this.props.history.push('/testy');
        // }
    }

    render() {
        return (
            <React.Fragment>
               Hello World
            </React.Fragment>
        );
    }
}

export default withRouter((connect(reducer => reducer)(Hodnoceni)));