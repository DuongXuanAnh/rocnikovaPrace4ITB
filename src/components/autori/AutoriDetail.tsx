import React, { Component } from 'react';
import { Row, Col, Spin } from 'antd';
import axios from 'axios';
import { connect } from 'react-redux';
import { Reducer } from '../../utils/generalTypes';

interface Props {
    match: any
    location: any
    history: any
    reducer?: Reducer
    dispatch?: Function
}

interface State {
    autor: any
    loading: boolean
}

class AutoriDetail extends Component<Props, State>{
    constructor(props: Props) {
        super(props);
        this.state = {
            autor: {},
            loading: false

        }
    }

    componentDidMount() {
        this.getAutorDetail();
    }

    render() {
        return (
            <React.Fragment>
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
                        <Spin tip="Načítání autora..." size="large" style={{
                            fontSize: '1.5em', 
                            position: 'absolute',
                            left: '50%',
                            top: '45%',
                            "transform":"translate(-50%, -50%)"
                        }}></Spin>
                    </div>
                    :
                    <Row>
                        <Col span={8}>
                            <img
                                style={{
                                    height: "auto",
                                    width: "100%",
                                    padding: "2em",
                                    borderRadius: "4em"
                                }}
                                alt="logo" src={this.state.autor.img} />

                        </Col>
                        <Col span={16}>
                            <div style={{ padding: "2em" }}>
                                <h1 style={{ fontSize: "2em" }}>{this.state.autor.name} <span>({this.state.autor.born} - {this.state.autor.rip})</span></h1>
                            </div>
                            <Row>
                                <Col span={8} style={{ paddingRight: "1em" }}>
                                    <h3>Zařazení:</h3>
                                    {this.state.autor.zarazeni !== undefined ?
                                        this.state.autor.zarazeni.map((value: string, key: number) => <li>{value}</li>)
                                        :
                                        <div></div>
                                    }
                                </Col>
                                <Col span={8} style={{ paddingRight: "1em" }}>
                                    <h3>Život:</h3>
                                    {this.state.autor.zivot !== undefined ?
                                        this.state.autor.zivot.map((value: string, key: number) => <li>{value}</li>)
                                        :
                                        <div></div>
                                    }
                                </Col>
                                <Col span={8} style={{ paddingRight: "1em" }}>
                                    <h3>Díla:</h3>
                                    {this.state.autor.druhDila !== undefined ?
                                        this.state.autor.druhDila.map(
                                            (value: string, key: number) =>
                                                <div>
                                                    {value}
                                                </div>
                                        )
                                        :
                                        <div></div>
                                    }
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                }
            </React.Fragment>
        );
    }

    private getAutorDetail() {
        this.setState({
            loading: true
        });
        const id: number = parseInt(this.props.match.params.id, 10);;
        axios({
            method: 'get',
            url: '/autor/' + id,
            withCredentials: true,
        })
            .then(
                res => {

                    this.setState({
                        autor: res.data[0],
                        loading: false
                    });

                }
            ).catch(err => err)
    }
}

export default (connect(reducer => reducer)(AutoriDetail));