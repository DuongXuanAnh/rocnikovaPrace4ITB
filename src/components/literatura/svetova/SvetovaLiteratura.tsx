import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Reducer } from '../../../utils/generalTypes';

interface Props {
    match: any
    location: any
    history: any
    reducer?: Reducer
    dispatch?: Function
}

interface State {
    data: any
}



class SvetovaLiteratura extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        this.getSvetovouLit();
    }
    
    render() {
        return (
            <React.Fragment>
               {this.state.data.map((value:any, key:any) => (
                   <div>
                        <a  onClick={() => this.titleClick(value.link)}>{key + 1}. {value.nazev}</a>
                   </div>
               ))}
            </React.Fragment>
        );
    }

    private getSvetovouLit = () => {
        axios({
            method: 'get',
            url: '/literaturu',
            withCredentials: true,
            params: {
                cz: false
            }
        })
            .then(
                res => {
                    this.setState({
                        data: res.data,
                    });
                }
            ).catch(err => err)
    }

    private titleClick = (link:string) => {
        this.props.history.push('/svetovaLiteratura/' + link);
    }
}

export default (connect(reducer => reducer)(SvetovaLiteratura));