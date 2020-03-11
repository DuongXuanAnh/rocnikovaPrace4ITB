import React, { Component } from 'react';
import { Row, Col, Spin, Button } from 'antd';
import axios from 'axios';
import { connect } from 'react-redux';
import { Reducer } from '../../utils/generalTypes';
import marked from "marked";

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
    zarazeni: any
    zivot: any
    dila: any
    autorZarazeniPath: any
    autorZivotPath: any
    autorDilaPath: any
}

class AutoriDetail extends Component<Props, State>{
    constructor(props: Props) {
        super(props);
        this.state = {
            autor: {},
            loading: false,
            zarazeni: null,
            zivot: null,
            dila: null,
            autorZarazeniPath: null,
            autorZivotPath: null,
            autorDilaPath: null

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
                            "transform": "translate(-50%, -50%)"
                        }}></Spin>
                    </div>
                    :
                    <div>
                        <Row>
                            {
                                (this.props.reducer && this.props.reducer.user && this.props.reducer.user.admin === true) ?
                                    <div>
                                        <Button type="primary"
                                            style={{
                                                margin: "2em 0 0 2em",
                                                background: "#ffc53d",
                                                borderColor: "#faad14"
                                            }}
                                            onClick={() => this.editAutora()}
                                        >Upravit Autora</Button>
                                    </div>
                                    : ""
                            }
                        </Row>
                        <Row>
                            <Col span={8}>
                                <img
                                    style={{
                                        height: "auto",
                                        width: "100%",
                                        padding: "2em",
                                        borderRadius: "4em"
                                    }}
                                    alt="logo" src={this.state.autor.imgB64} />
                            </Col>
                            <Col span={16}>
                                <div style={{ padding: "2em" }}>
                                    <h1 style={{ fontSize: "2em" }}>{this.state.autor.name} <span>({this.state.autor.born} - {this.state.autor.rip})</span></h1>
                                </div>
                                <Row>
                                    <Col span={8} style={{ paddingRight: "1em" }}>
                                        <h3>Zařazení:</h3>
                                        <div dangerouslySetInnerHTML={{ __html: this.state.zarazeni }}></div>
                                    </Col>
                                    <Col span={8} style={{ paddingRight: "1em" }}>
                                        <h3>Život:</h3>
                                        <div dangerouslySetInnerHTML={{ __html: this.state.zivot }}></div>
                                    </Col>
                                    <Col span={8} style={{ paddingRight: "1em" }}>
                                        <h3>Díla:</h3>
                                        <div dangerouslySetInnerHTML={{ __html: this.state.dila }}></div>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </div>

                }
            </React.Fragment>
        );
    }

    private getAutorDetail() {
        this.setState({
            loading: true
        });
        const id: number = parseInt(this.props.match.params.id, 10);
        axios({
            method: 'get',
            url: '/autor/' + id,
            withCredentials: true,
        })
            .then(

                res => {
                    this.setState({
                        autor: res.data,
                        loading: false,
                        zarazeni: marked(res.data.zarazeniContent),
                        zivot: marked(res.data.zivotContent),
                        dila: marked(res.data.dilaContent),
                    });
                }
            ).catch(err => err)
    }

    private editAutora(){
        const id: number = parseInt(this.props.match.params.id, 10);
        this.props.history.push('/editAutora/' + id);
    }
}

export default (connect(reducer => reducer)(AutoriDetail));