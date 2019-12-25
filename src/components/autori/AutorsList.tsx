import React, { Component } from 'react';
import { List, Avatar, Input, Icon } from 'antd';
import axios from 'axios';
import { Reducer } from '../../utils/generalTypes';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

interface Props {
    match: any
    location: any
    history: any
    reducer?: Reducer;
    dispatch?: Function;
}

interface State {
    autori?: any
    searchKey?: string
}

const IconText = ({ type, text }: { type: any, text: string }) => (
    <span>
      <Icon type={type} style={{ marginRight: 8 }} />
      {text}
    </span>
  );
const { Search } = Input;

class AutorsList extends Component<Props, State>  {

    constructor(props: Props) {
        super(props);
        this.state = {
            autori: [],
            searchKey: ""
        }
    }

    componentDidMount() {
        this.getAutori();
    }

    componentDidUpdate(prevProps: Props, prevState: State) {
        if (prevState.searchKey !== this.state.searchKey) {
            this.getAutori();
        }
    }

    render() {
        return (
            <React.Fragment>
                <Search
                    style={{ width: "50%", float: "right", margin: "2em 2em 1em 0" }}
                    placeholder="Hledat autora"
                    onSearch={value => { this.setState({ searchKey: value }); }}
                    onChange={value => { this.setState({ searchKey: value.target.value }); }}
                    enterButton />
                <div
                    style={{ clear: "both" }}
                ></div>
                <List
                    itemLayout="horizontal"
                    dataSource={this.state.autori}
                    pagination={{
                        simple: true,
                        pageSize: 3,
                        style: {
                            position: "fixed",
                            left: "50%",
                            margin: "0 auto",
                            bottom: "1.5em",
                        }
                    }}
                    style={{ marginLeft: "2em", marginRight: "2em" }}
                    renderItem={(item: any) => (
                        <List.Item
                            key={item.id}
                            onDoubleClick={() => this.autorDetail(item.id)}
                        >
                            <List.Item.Meta
                                avatar={
                                    <Avatar
                                        src={item.smallImg}
                                        size={145}
                                    />}
                                title={<h1 style={{ "fontSize": "2em" }}>{item.name}</h1>}
                                description={item.description}
                            />
                        </List.Item>
                    )}
                />
            </React.Fragment>
        );
    }

    private getAutori = () => {
        axios({
            method: 'get',
            url: '/autori',
            withCredentials: true,
            params: {
                searchKey: this.state.searchKey!.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
            }
        })
            .then(
                res => {
                    this.setState({
                        autori: res.data
                    });
                }
            ).catch(err => err)
    }

    private autorDetail(id: number) {
        this.props.history.push('autor/' + id);
    }
}

export default withRouter((connect(reducer => reducer)(AutorsList)));