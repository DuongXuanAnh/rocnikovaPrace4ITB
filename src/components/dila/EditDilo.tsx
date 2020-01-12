import React, { Component } from 'react';
import axios from 'axios';
import { Reducer } from '../../utils/generalTypes';
import { connect } from 'react-redux';
import { Form } from 'antd';

interface Props {
    form: any
    history: any
    reducer?: Reducer
    dispatch?: Function
}

interface State {

}

class EditDilo extends Component<Props, State> {
    render() {
        return (
            <React.Fragment>

            </React.Fragment>
        );
    }
}

export default connect(reducer => reducer)(Form.create({ name: 'addNewDilo' })(EditDilo));