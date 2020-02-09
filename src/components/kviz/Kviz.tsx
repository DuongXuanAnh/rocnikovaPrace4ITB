import React, { Component } from 'react';
import { Row, Col, Button } from 'antd';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import axios from 'axios';

interface Props {

}

interface State {
    numberOfQuestion: number
    questions: any
    wrongAnswers: any
    rightAnswers: any
    answers: any
}

class Kviz extends Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            numberOfQuestion: 2,
            questions: [],
            wrongAnswers: [],
            rightAnswers: [],
            answers: [],
        }
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
                                    fontSize: "1em"
                                }}>{value}</Button>
                            </Col>
                        )
                        : ""}
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
            let question: any = [];
            let wrongAnswers: any = [];
            let rightAnswer: any = [];


            res.data.map((value: any, key: any) => {
                question.push(value.question);
                wrongAnswers.push(value.wrongAnswers);
                rightAnswer.push(value.rightAnswer);
            })

            this.setState({
                questions: question,
                wrongAnswers: wrongAnswers,
                rightAnswers: rightAnswer
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
}

export default withRouter((connect(reducer => reducer)(Kviz)));