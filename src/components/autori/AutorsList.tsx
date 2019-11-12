import React, { Component } from 'react';
import { List, Avatar, Input } from 'antd';
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
}

const { Search } = Input;

class AutorsList extends Component<Props, State>  {

    constructor(props: Props) {
        super(props);
        this.state = {
            autori: []
        }
    }

    componentDidMount() {
        this.getAutori();
    }
    

    render() {
        return (
            <React.Fragment>
                <Search
                    style={{ width: "50%", float: "right", margin: "2em 2em 1em 0" }}
                    placeholder="Hledat autora"
                    onSearch={value => console.log(value)}
                    enterButton />
                <div
                    style={{ clear: "both" }}
                ></div>
                <List
                    itemLayout="horizontal"
                    dataSource={this.state.autori}
                    style={{ marginLeft: "2em", marginRight: "2em" }}
                    renderItem={(item: any) => (
                        <List.Item
                            onDoubleClick = {() => this.autorDetail(item.id)}
                        >
                            <List.Item.Meta
                                avatar={
                                    <Avatar
                                        src={item.img}
                                        size={92}
                                    />}
                                title={item.name}
                                description={item.zarazeni[0] +" "+ item.zarazeni[1] + "..."}
 
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
        })
            .then(
                res => {
                   this.setState({
                    autori: res.data
                   });

                   console.log(this.state.autori);
                }
            ).catch(err => err)
    }

    private autorDetail(id:number){
        this.props.history.push('autor/' + id);
   }
}

export default withRouter((connect(reducer => reducer)(AutorsList)));