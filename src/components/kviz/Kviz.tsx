import React, { Component } from 'react';
import { Row, Col, Button } from 'antd';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import axios from 'axios';

interface Props {

}

interface State {

}

class Kviz extends Component<Props, State> {

    constructor(props: Props) {
        super(props);

    }

    componentDidMount() {
        this.getQuestion();
    }
    

    render() {
        return (
            <React.Fragment>
                <Row
                    style={{
                        background: "#FFFFFF",
                        margin: "2em 2em 0 2em",
                        minHeight: "7em",
                        borderRadius: "1em",
                        textAlign: "center"
                    }}>
                    <Col span={24} style={{ height: "100%", fontSize: "2em", lineHeight: "3em" }}>
                        Kdy se narodil Karel Capek?
                    </Col>
                </Row>
                <Row style={{ textAlign: "center", height: "5em", margin: "2em", borderRadius: "1em", lineHeight: "5em" }}>

                    <Col span={12} style={{ height: "100%", fontSize: "2em", lineHeight: "3em", marginBottom: "5px" }}>
                        <Button style={{
                            height: "100%",
                            width: "99%",
                            fontSize: "1em"
                        }}>1890</Button>
                    </Col>
                    <Col span={12} style={{ height: "100%", fontSize: "2em", lineHeight: "3em", marginBottom: "5px" }}>
                        <Button style={{
                            height: "100%",
                            width: "99%",
                            fontSize: "1em"
                        }}>1890</Button>
                    </Col>
                    <Col span={12} style={{ height: "100%", fontSize: "2em", lineHeight: "3em" }}>
                        <Button style={{
                            height: "100%",
                            width: "99%",
                            fontSize: "1em"
                        }}>1890</Button>
                    </Col>
                    <Col span={12} style={{ height: "100%", fontSize: "2em", lineHeight: "3em" }}>
                        <Button style={{
                            height: "100%",
                            width: "99%",
                            fontSize: "1em"
                        }}>1890</Button>
                    </Col>
                </Row>
            </React.Fragment >
        );
    }

    private getQuestion = () => {
        axios({
            method: 'get',
            url: '/kviz',
            withCredentials: true,
        }).then((res) => {
            console.log(res.data);
        }).catch(err => err)
    }
}

export default withRouter((connect(reducer => reducer)(Kviz)));