import React, { Component } from 'react';
import { List, Avatar, Input, Icon, Spin } from 'antd';
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
    loading: boolean
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
            searchKey: "",
            loading: false
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
                {this.state.loading ?
                    <div
                        style={{
                            position: "fixed",
                            zIndex: 1501,
                            background: "#000000",
                            height: "100vh",
                            opacity: 0.5,
                            width: "100%",

                        }}>>
                        <Spin tip="Načítání autorů..." size="large" style={{
                            fontSize: '1.5em',
                            position: 'absolute',
                            left: '50%',
                            top: '45%',
                            "transform": "translate(-50%, -50%)"
                        }}></Spin>
                    </div>
                    :
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
                }
            </React.Fragment>

        );
    }

    private getAutori = () => {
        this.setState({
            loading: true
        });
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
                        autori: res.data,
                        loading: false
                    });
                    console.log("---------------------");
                    console.log(this.state.autori);
                    console.log("---------------------");
                }
            ).catch(err => {
                this.setState({
                    loading: false
                });
            })
    }

    private autorDetail(id: number) {
        this.props.history.push('autor/' + id);
    }
}

export default withRouter((connect(reducer => reducer)(AutorsList)));