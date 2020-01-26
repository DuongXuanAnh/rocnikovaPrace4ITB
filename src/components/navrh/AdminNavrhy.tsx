import React, { Component } from 'react';
import axios from 'axios';
import { List, Card } from 'antd';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { Reducer } from '../../utils/generalTypes';

interface Props {
    match: any
    location: any
    history: any
    reducer?: Reducer;
    dispatch?: Function;
}

interface State {
    data: any
}

class AdminNavrhy extends Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        this.showNavrhy();
    }

    render() {
        return (
            <React.Fragment>
                <List
                    grid={{
                        gutter: 16,
                        xs: 1,
                        sm: 1,
                        md: 2,
                        lg: 3,
                        xl: 3,
                        xxl: 3,
                    }}
                    dataSource={this.state.data}
                    renderItem={(item: any) => (
                        <List.Item>
                            <Card
                                title={item.nazev}
                                style={{ margin: "1em" }}
                                onClick={() => this.showDetailNavrh(item.id)}
                            >
                                {item.autor}
                            </Card>
                        </List.Item>
                    )}
                />
            </React.Fragment>
        );
    }

    private showNavrhy = () => {
        axios({
            method: 'get',
            url: '/navrhDila',
            withCredentials: true,
        })
            .then(
                res => {
                    this.setState({
                        data: res.data
                    });
                }
            ).catch(err => err)
    }

    private showDetailNavrh = (id: number) => {
        this.props.history.push('navrhDetail/' + id);
    }
}

export default withRouter((connect(reducer => reducer)(AdminNavrhy)));
