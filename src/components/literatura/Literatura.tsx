import React, { Component, Fragment } from 'react';
import marked from "marked";
import axios from 'axios';
import { Reducer } from '../../utils/generalTypes';
import { connect } from 'react-redux';

interface Props {
    match: any
    location: any
    history: any
    reducer?: Reducer
    dispatch?: Function
}

interface State {
    data: string
}

class Literatura extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            data: ""
        }
    }

    componentDidMount() {
        this.getContainer();
    }


    render() {
        return (
            <React.Fragment>
                <div style={{padding: "2em"}} dangerouslySetInnerHTML={{ __html: marked(this.state.data) }}></div>
            </React.Fragment>
        );
    }

    private getContainer = () => {
        const link: string = this.props.match.params.link;
        axios({
            method: 'get',
            url: '/literatura',
            withCredentials: true,
            params:{
                link: link
            }
        })
            .then(
                res => {
                    this.setState({
                        data: marked(res.data)
                    });
                }
            ).catch(err => err)
    }
}

export default (connect(reducer => reducer)(Literatura));