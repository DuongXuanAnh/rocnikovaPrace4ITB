import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Reducer, Test } from '../../utils/generalTypes';
import { Row, Col, Button, Icon, Spin } from 'antd';
import axios from 'axios';
import * as actions from './../../redux/actions';

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
    answers: any
    rightAnswer?: any
    wrongAnswer?: any
    hide: boolean // Schovat napovedu a honoceni
    btnDisable: boolean
    odpovedelDobre?: boolean
    colorOfButton1: string
    colorOfButton2: string
    actualQuestion: number
    showPreviousBtn: boolean
    loading: boolean
}

class TestDashboard extends Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            questions: [],
            numberOfQuestion: 0,
            actualQuestion: 0,
            answers: [],
            hide: true,
            btnDisable: false,
            colorOfButton1: "#FFFFFF",
            colorOfButton2: "#FFFFFF",
            rightAnswer: [],
            wrongAnswer: [],
            showPreviousBtn: true,
            loading: false,
        }
    }

    componentDidMount() {
        this.getQuestion();
    }

    componentDidUpdate(prevProps: Props, prevState: State) {
        if (prevState.numberOfQuestion !== this.state.numberOfQuestion) {
            this.zpracovaniPredchoziOtazky();
            return;
        }

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
                        {this.props.reducer!.test ?
                            <span>{cisloOtazky}/{this.props.reducer!.test.countQuestions}</span> :
                            this.props.history.push('/testy')
                        }
                    </Col>
                    <Col span={4} style={{
                        background: "#73d13d",
                        height: "100%",
                        fontSize: "2rem",
                        lineHeight: "4.5rem",
                        textAlign: "center",
                    }}>
                        {this.state.rightAnswer.length}
                    </Col >
                    <Col span={4} style={{
                        background: "#f5222d",
                        height: "100%",
                        fontSize: "2rem",
                        lineHeight: "4.5rem",
                        textAlign: "center",
                        "borderRadius": "0 0.5em 0.5em 0"
                    }}>
                        {this.state.wrongAnswer.length}
                    </Col >
                </Row>
                {this.state.loading ?
                    <div
                        style={{
                            position: "fixed",
                            zIndex: 1501,
                            height: "100vh",
                            opacity: 0.5,
                            width: "100%",

                        }}>>
                        <Spin tip="Načítání otázky..." size="large" style={{
                            fontSize: '1.5em',
                            position: 'absolute',
                            left: '50%',
                            top: '45%',
                            "transform": "translate(-50%, -50%)"
                        }}></Spin>
                    </div>
                    :
                    <span>
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
                                    disabled={this.state.btnDisable}
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
                                    disabled={this.state.btnDisable}
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
                        <Row style={{
                            bottom: "3em",
                            position: "absolute",
                        }}>

                            {this.state.numberOfQuestion > 0 && this.state.showPreviousBtn ?
                                <Button type="primary"
                                    style={{
                                        height: "4em",
                                        width: "20em",
                                        marginLeft: "3em"
                                    }}
                                    onClick={() => this.previousQuestion()}
                                >
                                    <Icon type="left" />
                                    PŘEDCHOZÍ PŘÍKLAD
                        </Button>
                                : ""}
                        </Row>
                    </span>
                }
            </React.Fragment >
        );
    }

    private getQuestion = () => {
        this.setState({
            loading: true
        });
        axios({
            method: 'get',
            url: '/test',
            withCredentials: true,
            params: {
                test: (this.props.reducer) ? this.props.reducer.test : 0
            }
        })
            .then(
                res => {
                    const otazkyZamychany = this.shuffle(res.data);
                    let rightAnswer: any = [];
                    let wrongAnswer: any = [];
                    let question: any = [];

                    // Michanni odpovedi
                    otazkyZamychany.map((value: any, key: any) => {
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
                        questions: otazkyZamychany,
                        answers: answer,
                        loading: false
                    });

                }
            ).catch(err => err)
    }

    private hodnotitOdpoved = (e: any) => {

        let rightAnswer: any = this.state.rightAnswer;
        let wrongAnswer: any = this.state.wrongAnswer;

        if (this.state.questions !== undefined) {
            if (this.state.questions[this.state.numberOfQuestion].rightAnswer === e.target.innerText) {
                rightAnswer.push(this.state.questions[this.state.numberOfQuestion]);
                if (e.target.id === "btnAnswer1") {
                    this.setState({
                        hide: false,
                        btnDisable: true,
                        odpovedelDobre: true,
                        colorOfButton1: "#73d13d"
                    });
                } else {
                    this.setState({
                        hide: false,
                        btnDisable: true,
                        odpovedelDobre: true,
                        colorOfButton2: "#73d13d"
                    });
                }
            } else {
                wrongAnswer.push(this.state.questions[this.state.numberOfQuestion]);
                if (e.target.id === "btnAnswer1") {
                    this.setState({
                        hide: false,
                        btnDisable: true,
                        odpovedelDobre: false,
                        colorOfButton1: "#f5222d"
                    });
                } else {
                    this.setState({
                        hide: false,
                        btnDisable: true,
                        odpovedelDobre: false,
                        colorOfButton2: "#f5222d"
                    });
                }
            }
            this.setState({
                rightAnswer: rightAnswer,
                wrongAnswer: wrongAnswer,
                showPreviousBtn: false
            });
        }
    }

    private nextQuestion = () => {
        this.celkoveHodnoceni();

        if (this.state.numberOfQuestion === this.state.actualQuestion) {
            this.setState({
                actualQuestion: this.state.actualQuestion + 1,
            });
        }

        this.setState({
            hide: true,
            btnDisable: false,
            numberOfQuestion: this.state.numberOfQuestion + 1,
            colorOfButton1: "#FFFFFF",
            colorOfButton2: "#FFFFFF",
            showPreviousBtn: true
        });


        if (this.state.numberOfQuestion < this.state.actualQuestion - 1) {
            this.oznacovaniOdpovediNext();
        }


    }

    private previousQuestion = () => {

        this.setState({
            numberOfQuestion: this.state.numberOfQuestion - 1,
        });
        this.oznacovaniOdpovediPrevious();
    }


    private celkoveHodnoceni = () => {

        if (this.state.numberOfQuestion + 1 === this.props.reducer!.test!.countQuestions) {

            const vysledek = [
                { type: 'testSZ', nazev: "s/z", countRight: 0, countWrong: 0 },
                { type: 'testIY', nazev: "i/y koncovkách", countRight: 0, countWrong: 0 },
                { type: 'testBEBJE', nazev: "bě/bje, vě/vje, pě, mě/mně", countRight: 0, countWrong: 0 },
                { type: 'testU', nazev: "ů/ú", countRight: 0, countWrong: 0 },
                { type: 'testVyj', nazev: "vyjmenovaná slova", countRight: 0, countWrong: 0 },
            ]

            this.state.rightAnswer.map((value: any, key: any) => {
                vysledek.map((value1: any, key1: any) => {
                    if (value.type === value1.type) {
                        value1.countRight = value1.countRight + 1
                    }
                })
            })
            this.state.wrongAnswer.map((value: any, key: any) => {
                vysledek.map((value1: any, key1: any) => {
                    if (value.type === value1.type) {
                        value1.countWrong = value1.countWrong + 1
                    }
                })
            })

            if (this.props.dispatch) {

                const procent: number = parseFloat((this.state.rightAnswer.length / (this.state.numberOfQuestion + 1) * 100).toFixed(2));

                this.props.dispatch(actions.vysledekTestu(vysledek));
                this.props.dispatch(actions.procentUspechuTestu(procent));
            }
            this.props.history.push('/honoceniTestu');
        }
    }

    // Michani otazek
    private shuffle = (array: any) => {
        var currentIndex = array.length, temporaryValue, randomIndex;
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    }

    private zpracovaniPredchoziOtazky = () => {
        if (this.state.numberOfQuestion < this.state.actualQuestion) {
            this.setState({
                hide: false,
                btnDisable: true,
            });
        } else {
            this.setState({
                hide: true,
                btnDisable: false,
            });
        }
    }

    private oznacovaniOdpovediPrevious = () => {
        this.setState({
            colorOfButton1: "#FFFFFF",
            colorOfButton2: "#FFFFFF",
        });

        this.state.rightAnswer.map((value: any, key: any) => {
            if (value === this.state.questions[this.state.numberOfQuestion - 1]) {

                if (value.rightAnswer === this.state.answers[this.state.numberOfQuestion - 1].answer1) {
                    this.setState({
                        odpovedelDobre: true,
                        colorOfButton1: "#73d13d"
                    });
                }
                if (value.rightAnswer === this.state.answers[this.state.numberOfQuestion - 1].answer2) {
                    this.setState({
                        odpovedelDobre: true,
                        colorOfButton2: "#73d13d"
                    });
                }

            }
        })
        this.state.wrongAnswer.map((value: any, key: any) => {
            if (value === this.state.questions[this.state.numberOfQuestion - 1]) {
                if (value.wrongAnswer === this.state.answers[this.state.numberOfQuestion - 1].answer1) {
                    this.setState({
                        odpovedelDobre: false,
                        colorOfButton1: "#f5222d"
                    });
                }
                if (value.wrongAnswer === this.state.answers[this.state.numberOfQuestion - 1].answer2) {
                    this.setState({
                        odpovedelDobre: false,
                        colorOfButton2: "#f5222d"
                    });
                }
            }
        })
    }

    private oznacovaniOdpovediNext = () => {
        this.setState({
            colorOfButton1: "#FFFFFF",
            colorOfButton2: "#FFFFFF",
        });
        this.state.rightAnswer.map((value: any, key: any) => {
            if (value === this.state.questions[this.state.numberOfQuestion + 1]) {

                if (value.rightAnswer === this.state.answers[this.state.numberOfQuestion + 1].answer1) {
                    this.setState({
                        odpovedelDobre: true,
                        colorOfButton1: "#73d13d"
                    });
                }
                if (value.rightAnswer === this.state.answers[this.state.numberOfQuestion + 1].answer2) {
                    this.setState({
                        odpovedelDobre: true,
                        colorOfButton2: "#73d13d"
                    });
                }

            }
        })
        this.state.wrongAnswer.map((value: any, key: any) => {
            if (value === this.state.questions[this.state.numberOfQuestion + 1]) {
                if (value.wrongAnswer === this.state.answers[this.state.numberOfQuestion + 1].answer1) {
                    this.setState({
                        odpovedelDobre: false,
                        colorOfButton1: "#f5222d"
                    });
                }
                if (value.wrongAnswer === this.state.answers[this.state.numberOfQuestion + 1].answer2) {
                    this.setState({
                        odpovedelDobre: false,
                        colorOfButton2: "#f5222d"
                    });
                }
            }
        })
    }
}

export default withRouter((connect(reducer => reducer)(TestDashboard)));