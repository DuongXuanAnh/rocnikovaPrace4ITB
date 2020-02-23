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
        if (this.props.reducer!.odpovedNaKviz!.length === 0) {
            this.props.history.push('/kviz');
        }
    }

    render() {
        return (
            <React.Fragment>
                <Row style={{ background: "#fff", height: "100%" }}>
                    <Col style={{ background: "#fff", height: "100%", textAlign: "center", display: "table" }} span={12}>
                        <div style={{
                            display: "table-cell",
                            verticalAlign: "middle"
                        }}>
                            <Progress
                                type="dashboard"
                                percent={this.props.reducer!.procentUspechuKvizu}
                                width={400}
                                strokeColor="#5cdbd3"
                                status="normal"
                            />
                            <h1>Celková úspěšnost</h1>
                        </div>

                    </Col>
                    <Col style={{ height: "100%", display: "table" }} span={12}>
                        <div style={{
                            display: "table-cell",
                            verticalAlign: "middle",
                        }}>
                            <Row
                                style={{
                                    background: "#f3f3f3",
                                    width: "80%",
                                    margin: "auto",
                                    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
                                }}>
                                <Row style={{ fontSize: "2.5em", textAlign: "center", borderBottom: "1px solid #d8d8d8" }}>Odpovědy na kvíz</Row>
                                {this.props.reducer!.odpovedNaKviz!.map((value: any, key: any) => {
                                    return (
                                        <Row style={{ fontSize: "1.5em", borderBottom: "1px solid #d8d8d8" }} >
                                            <Col span={24} style={{ background: "#f3f3f3", paddingLeft: "1em" }}>
                                                {value.question}
                                            </Col>
                                            <Col span={24} style={{ background: "#f3f3f3", color: "#52c41a", paddingLeft: "1em" }}>
                                                {value.rightAnswer + " "}
                                            </Col>
                                        </Row>
                                    )
                                })}
                            </Row>
                            <Row style={{
                                marginTop: "6em",
                                textAlign: "center",
                            }}>
                                <Col span={12}>
                                    <Button type="primary" style={{width:"14em"}} onClick={() => this.jesteJednou()}>JEŠTĚ JEDNOU</Button>
                                </Col>
                            </Row>
                        </div>
                    </Col>

                </Row>

            </React.Fragment>
        );
    }

    private jesteJednou = () => {
        if (this.props.dispatch) {
            this.props.history.push('/kviz');
        }
    }
}

export default withRouter((connect(reducer => reducer)(Hodnoceni)));