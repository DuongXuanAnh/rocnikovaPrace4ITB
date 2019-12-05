import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Reducer, Test } from '../../utils/generalTypes';
import { Row, Col, Button, Icon } from 'antd';
import axios from 'axios';

interface Props {
    match: any
    location: any
    history: any
    reducer?: Reducer;
    dispatch?: Function;
}

interface State {
    questions: Test[]
    numberOfQuestion: number
    countWrong: number
    countRight: number
    answers: any
    rightAnswer?: string[]
    wrongAnswer?: string[]
    hide: boolean // Schovat napovedu a honoceni
    odpovedelDobre?: boolean
    colorOfButton1: string
    colorOfButton2: string
}

class TestDashboard extends Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            questions: [],
            numberOfQuestion: 0,
            countWrong: 0,
            countRight: 0,
            answers: [],
            hide: true,
            colorOfButton1: "#FFFFFF",
            colorOfButton2: "#FFFFFF",
        }
    }

    componentDidMount() {
        this.getQuestion();
    }

    render() {

        const cisloOtazky: number = this.state.numberOfQuestion + 1

        return (
            <React.Fragment>
                <Row style={{
                    background: "#FFFFFF",
                    margin: "2em",
                    height: "5em",
                    borderRadius: "1em",
                }}>
                    <Col span={16} style={{
                        height: "100%",
                        fontSize: "2rem",
                        lineHeight: "4.5rem",
                        paddingLeft: "1rem",
                    }}>
                        <span>{cisloOtazky}/{this.props.reducer!.test!.countQuestions}</span>
                    </Col>
                    <Col span={4} style={{
                        background: "#73d13d",
                        height: "100%",
                        fontSize: "2rem",
                        lineHeight: "4.5rem",
                        textAlign: "center",
                    }}>
                        {this.state.countRight}
                    </Col >
                    <Col span={4} style={{
                        background: "#f5222d",
                        height: "100%",
                        fontSize: "2rem",
                        lineHeight: "4.5rem",
                        textAlign: "center",
                        "borderRadius": "0 0.5em 0.5em 0"
                    }}>
                        {this.state.countWrong}
                    </Col >
                </Row>
                <Row style={{
                    background: "#FFFFFF",
                    margin: "2em",
                    height: "7em",
                    borderRadius: "1em",
                    textAlign: "center"
                }}>
                    <Col span={24} style={{ height: "100%", fontSize: "2.5em", lineHeight: "3em" }}>
                        {
                            this.state.questions[this.state.numberOfQuestion] !== undefined ? this.state.questions[this.state.numberOfQuestion].question : ""
                        }

                    </Col>
                </Row>
                <Row style={{ textAlign: "center", height: "5em", margin: "2em", borderRadius: "1em", lineHeight: "5em" }}>
                    <Col span={12} style={{ height: "100%" }} >
                        <Button
                            style={{
                                height: "100%",
                                width: "100%",
                                fontSize: "2.5em",
                                background: this.state.colorOfButton1,
                            }}
                            disabled={!this.state.hide}
                            id="btnAnswer1"
                            onClick={(event) => this.hodnotitOdpoved(event)}
                        >
                            {this.state.answers[this.state.numberOfQuestion] !== undefined ? this.state.answers[this.state.numberOfQuestion].answer1 : ""}
                        </Button>
                    </Col>
                    <Col span={12} style={{ height: "100%" }}>
                        <Button
                            style={{
                                height: "100%",
                                width: "100%",
                                fontSize: "2.5em",
                                background: this.state.colorOfButton2,
                            }}
                            disabled={!this.state.hide}
                            id="btnAnswer2"
                            onClick={(event) => this.hodnotitOdpoved(event)}
                        >
                            {this.state.answers[this.state.numberOfQuestion] !== undefined ? this.state.answers[this.state.numberOfQuestion].answer2 : ""}
                        </Button>
                    </Col>
                </Row>
                {(this.state.hide !== true) ?
                    <div>
                        <Row style={{ textAlign: "center", fontSize: "2em" }} >
                            {this.state.odpovedelDobre ?
                                <Col
                                    style={{ color: "#73d13d" }}
                                >SPRÁVNÁ ODPOVĚĎ</Col> :
                                <Col
                                    style={{ color: "#ff4d4f" }}
                                >ŠPATNÁ ODPOVĚĎ</Col>
                            }
                        </Row>
                        <Row style={{ textAlign: "center" }}>
                            <Col style={{ marginTop: "1em", fontSize: "1.1em" }}>
                                {
                                    this.state.questions[this.state.numberOfQuestion] !== undefined ? this.state.questions[this.state.numberOfQuestion].napoveda : ""
                                }
                            </Col>
                        </Row>
                        <Row style={{
                            bottom: "3em",
                            position: "absolute",
                            right: "6em",
                        }}>
                            <Button type="primary"
                                style={{
                                    height: "4em",
                                    width: "20em",
                                }}
                                onClick={() => this.nextQuestion()}
                            >
                                DALŠÍ PŘÍKLAD
                             <Icon type="right" />
                            </Button>
                        </Row>
                    </div> : ""
                }

            </React.Fragment >
        );
    }

    private getQuestion = () => {
        axios({
            method: 'get',
            url: '/test',
            withCredentials: true,

        })
            .then(
                res => {

                    let rightAnswer: any = [];
                    let wrongAnswer: any = [];

                    let question: any = [];

                    // Michanni odpovedi
                    res.data.map((value: any, key: any) => {
                        let rand: number = Math.floor(Math.random() * 2) + 1;
                        rightAnswer.push(value.rightAnswer)
                        wrongAnswer.push(value.wrongAnswer)

                        if (rand === 1) {
                            question.push({
                                answer1: value.rightAnswer,
                                answer2: value.wrongAnswer,
                            })
                        } else if (rand === 2) {
                            question.push({
                                answer1: value.wrongAnswer,
                                answer2: value.rightAnswer,
                            })
                        }

                    })

                    let answer: any = question;

                    this.setState({
                        questions: res.data,
                        answers: answer
                    });

                }
            ).catch(err => err)
    }

    private hodnotitOdpoved = (e: any) => {

        if (this.state.questions !== undefined) {
            if (this.state.questions[this.state.numberOfQuestion].rightAnswer === e.target.innerText) {
                if (e.target.id === "btnAnswer1") {
                    this.setState({
                        hide: false,
                        countRight: this.state.countRight + 1,
                        odpovedelDobre: true,
                        colorOfButton1: "#73d13d"
                    });
                } else {
                    this.setState({
                        hide: false,
                        countRight: this.state.countRight + 1,
                        odpovedelDobre: true,
                        colorOfButton2: "#73d13d"
                    });
                }
            } else {
                if (e.target.id === "btnAnswer1") {
                    this.setState({
                        hide: false,
                        countWrong: this.state.countWrong + 1,
                        odpovedelDobre: false,
                        colorOfButton1: "#f5222d"
                    });
                } else {
                    this.setState({
                        hide: false,
                        countWrong: this.state.countWrong + 1,
                        odpovedelDobre: false,
                        colorOfButton2: "#f5222d"
                    });
                }
            }
        }
    }

    private nextQuestion = () => {
        this.celkoveHodnoceni();
        this.setState({
            hide: true,
            numberOfQuestion: this.state.numberOfQuestion + 1,
            colorOfButton1: "#FFFFFF",
            colorOfButton2: "#FFFFFF",
        });

    }

    private celkoveHodnoceni = () => {
        if (this.state.numberOfQuestion + 1 === this.props.reducer!.test!.countQuestions) {
            // this.props.history.push('/honoceniTestu');
        }
    }
}

export default withRouter((connect(reducer => reducer)(TestDashboard)));