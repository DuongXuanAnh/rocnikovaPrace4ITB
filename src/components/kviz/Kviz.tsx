import React, { Component } from 'react';
import { Row, Col, Button, Icon } from 'antd';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import axios from 'axios';
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
    data: any
    numberOfQuestion: number
    questions: any
    wrongAnswers: any
    rightAnswers: any
    answers: any
    countRightAnswer: number
    countWrongAnswer: number
    showNextButton: boolean
    pokus: boolean
    vaseBody: number
    maxBody: number
}

class Kviz extends Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            data: [],
            numberOfQuestion: 0,
            questions: [],
            wrongAnswers: [],
            rightAnswers: [],
            answers: [],
            countRightAnswer: 0,
            countWrongAnswer: 0,
            showNextButton: false,
            pokus: false,
            vaseBody: 0,
            maxBody: 0,
        }
    }

    componentDidUpdate(prevProps: Props, prevState: State) {
        if (prevState.countRightAnswer !== this.state.countRightAnswer || prevState.countWrongAnswer !== this.state.countWrongAnswer) {
            this.zobrazitTlacitkoNaDalsiOtazku();
        }
        if (prevState.numberOfQuestion !== this.state.numberOfQuestion || prevState.numberOfQuestion !== this.state.numberOfQuestion) {
            this.generateAnswers();
        }
    }

    componentDidMount() {
        this.getQuestion();
    }

    render() {
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
                        {this.state.numberOfQuestion + 1}/{this.state.questions.length}
                    </Col>
                    <Col span={4} style={{
                        background: "#e6fffb",
                        height: "100%",
                        fontSize: "2rem",
                        lineHeight: "4.5rem",
                        textAlign: "center",
                    }}>
                        Vaše body: {this.state.vaseBody}
                    </Col >
                    <Col span={4} style={{
                        background: "#e6fffb",
                        height: "100%",
                        fontSize: "2rem",
                        lineHeight: "4.5rem",
                        textAlign: "center",
                        "borderRadius": "0 0.5em 0.5em 0"
                    }}>
                        Maximum: {this.state.maxBody}
                    </Col >
                </Row>
                <Row
                    style={{
                        background: "#FFFFFF",
                        margin: "2em 2em 0 2em",
                        minHeight: "7em",
                        borderRadius: "1em",
                        textAlign: "center"
                    }}>
                    <Col span={24} style={{ height: "100%", fontSize: "2em", lineHeight: "3em" }}>
                        {this.state.questions[this.state.numberOfQuestion]}
                    </Col>
                </Row>
                <Row style={{ textAlign: "center", height: "5em", margin: "2em", borderRadius: "1em", lineHeight: "5em" }}>
                    {this.state.answers ?
                        this.state.answers.map((value: any, key: any) =>
                            <Col span={12} style={{ height: "100%", fontSize: "2em", lineHeight: "3em", marginBottom: "5px" }}>
                                <Button style={{
                                    height: "100%",
                                    width: "99%",
                                    fontSize: "1em",
                                }}
                                    onClick={(event) => this.btnChooseAnswer(event)}
                                    className="btnAnswer"
                                >{value}</Button>
                            </Col>
                        )
                        : ""}
                </Row>

                <Row style={{
                    bottom: "3em",
                    position: "absolute",
                    right: "6em",
                }}>
                    {(this.state.showNextButton) ?
                        <Col span={24}>
                            <Button type="primary"
                                style={{
                                    height: "4em",
                                    width: "20em",
                                }}
                                onClick={() => this.nextQuestion()}
                            >
                                DALŠÍ OTÁZKA
                             <Icon type="right" />
                            </Button>
                        </Col> : ""
                    }

                </Row>
            </React.Fragment >
        );
    }

    private getQuestion = () => {

        let sum: number = 0;

        axios({
            method: 'get',
            url: '/kviz',
            withCredentials: true,
        }).then((res) => {
            // console.log(res.data);
            let question: any = [];
            let wrongAnswers: any = [];
            let rightAnswer: any = [];
            res.data.map((value: any, key: any) => {
                question.push(value.question);
                wrongAnswers.push(value.wrongAnswers);
                rightAnswer.push(value.rightAnswer);
                sum += value.rightAnswer.length;
                // sum += value.wrongAnswers.length
            })
            this.setState({
                data: res.data,
                questions: question,
                wrongAnswers: wrongAnswers,
                rightAnswers: rightAnswer,
                maxBody: sum
            });
            this.generateAnswers();


        }).catch(err => err)
    }

    private generateAnswers = () => {
        let answers: any = [];
        if (this.state.wrongAnswers[this.state.numberOfQuestion]) {
            this.state.wrongAnswers[this.state.numberOfQuestion].map((value: any, key: any) => {
                answers.push(value);
            })
        }
        if (this.state.rightAnswers[this.state.numberOfQuestion]) {
            this.state.rightAnswers[this.state.numberOfQuestion].map((value: any, key: any) => {
                answers.push(value);
            })
        }
        this.setState({
            answers: this.shuffle(answers)
        });

        const buttons: any = document.getElementsByClassName('btnAnswer');

        for (var i = 0; i < buttons.length; i++) {
            buttons[i].style.background = "#FFFFFF";
            buttons[i].disabled = false;
        }
    }

    private shuffle = (array: any) => {
        var currentIndex = array.length, temporaryValue, randomIndex;
        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    }

    private btnChooseAnswer = (e: any) => {
        const odpoved: string = e.target.innerText;

        let pocetBoduZaOtazku: number = this.state.rightAnswers[this.state.numberOfQuestion].length;

        if (this.vyhodnotitOdpoved(odpoved)) {
            e.target.style.background = "#73d13d";
            e.target.disabled = true;
            this.setState({
                countRightAnswer: this.state.countRightAnswer + 1,
                vaseBody: this.state.vaseBody + 1
            });
        } else {
            e.target.style.background = "#f5222d";
            e.target.disabled = true;
            this.setState({
                countWrongAnswer: this.state.countWrongAnswer + 1,
            });

            if (this.state.vaseBody > 0) {
                this.setState({
                    vaseBody: this.state.vaseBody - 1,
                });
            }
        }
    }

    private vyhodnotitOdpoved = (odpoved: string) => {
        return this.state.rightAnswers[this.state.numberOfQuestion].includes(odpoved);
    }

    private zobrazitTlacitkoNaDalsiOtazku = () => {

        const buttons: any = document.getElementsByClassName('btnAnswer');
        if ((this.state.countRightAnswer === this.state.rightAnswers[this.state.numberOfQuestion].length) || this.state.countWrongAnswer === this.state.wrongAnswers[this.state.numberOfQuestion].length) {
            this.setState({
                showNextButton: true
            });
            for (var i = 0; i < buttons.length; i++) {
                buttons[i].disabled = true;
            }
        }
    }

    private nextQuestion = () => {
        if (this.state.numberOfQuestion === this.state.questions.length - 1) {

            if (this.props.dispatch) {

                const procent: number = parseFloat((this.state.vaseBody / (this.state.maxBody) * 100).toFixed(2));

                this.props.dispatch(actions.odpovedNaKviz(this.state.data));
                this.props.dispatch(actions.procentUspechuKvizu(procent));
            }

            this.props.history.push('/honoceniKvizu');

        } else {
            this.setState({
                numberOfQuestion: this.state.numberOfQuestion + 1,
                showNextButton: false,
                countRightAnswer: 0,
                countWrongAnswer: 0,
            });
        }
    }
}

export default withRouter((connect(reducer => reducer)(Kviz)));