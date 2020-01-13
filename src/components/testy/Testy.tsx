import React, { Component } from 'react';
import { Button, Slider, Row, Col, InputNumber } from 'antd';
import { Reducer } from '../../utils/generalTypes';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as actions from './../../redux/actions';

interface Props {
    match: any
    location: any
    history: any
    reducer?: Reducer
    dispatch?: Function
}

interface State {
    testSZ?: boolean
    testIY?: boolean
    testU?: boolean
    testVyj?: boolean
    testBEBJE?: boolean
    inputValue: number
    btnDisable: boolean
}

class Testy extends Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.state = {
            testSZ: false,
            testIY: false,
            testU: false,
            testVyj: false,
            testBEBJE: false,
            inputValue: 4,
            btnDisable: true
        }
    }

    onChange = (value: any) => {
        this.setState({
            inputValue: value,
        });
    };

    componentDidUpdate(prevProps: Props, prevState: State) {
        if( prevState.testSZ !== this.state.testSZ || prevState.testIY !== this.state.testIY || prevState.testU !== this.state.testU || prevState.testVyj !== this.state.testVyj || prevState.testBEBJE !== this.state.testBEBJE){
            this.enableBtn();
        }
    }

    render() {
        return (
            <React.Fragment>
                <Row>
                    <Col span={6}>
                        <Button type="primary" style={{ height: "3em", width: "100%", margin: "2em" }} disabled={this.state.btnDisable} onClick={() => this.startTest()}>
                            ZAČÍT TEST
                        </Button>
                    </Col>
                    <Col span={18}>
                        <Col span={18}>
                            <Slider
                                min={4}
                                max={40}
                                onChange={this.onChange}
                                value={typeof this.state.inputValue === 'number' ? this.state.inputValue : 0}
                                step={4}

                                style={{ marginLeft: "5em", marginTop: "3em" }}
                            />
                        </Col>
                        <Col span={6}>
                            <h3 style={{ marginLeft: "3em", marginTop: "1em" }}>Počet příkladů</h3>
                            <InputNumber
                                min={4}
                                max={40}
                                style={{ marginLeft: "3em" }}
                                value={this.state.inputValue}
                                onChange={this.onChange}
                                step={4}

                            />
                        </Col>
                    </Col>
                </Row>
                
                <h1 style={{ fontSize: "2em", textAlign: "center" }}>Vytoř si svůj test</h1>
                <Row style={{width: "35%", margin: "0 auto"}}>
                    <Col>
                    {this.state.testSZ ?
                    <Button
                        type="primary"
                        shape="circle"
                        style={{
                            width: "5em",
                            height: "5em",
                            fontSize: "2em",
                            background: "#00474f",
                            borderColor: "#002329"
                        }}
                        onClick={() => this.testSZ()}
                    >S/Z</Button> :
                    <Button
                        type="default"
                        shape="circle"
                        style={{
                            width: "5em",
                            height: "5em",
                            fontSize: "2em",
                        }}
                        onClick={() => this.testSZ()}
                    >S/Z</Button>
                }

                {this.state.testIY ?
                    <Button
                        type="primary"
                        shape="circle"
                        style={{
                            width: "6em",
                            height: "6em",
                            fontSize: "2em",
                            background: "#00474f",
                            borderColor: "#002329"
                        }}
                        onClick={() => this.testIY()}
                    >I/Y koncov.</Button> :
                    <Button
                        type="default"
                        shape="circle"
                        style={{
                            width: "6em",
                            height: "6em",
                            fontSize: "2em",
                        }}
                        onClick={() => this.testIY()}
                    >I/Y koncov.</Button>
                }

                {this.state.testU ?
                    <Button
                        type="primary"
                        shape="circle"
                        style={{
                            width: "4.5em",
                            height: "4.5em",
                            fontSize: "2em",
                            background: "#00474f",
                            borderColor: "#002329"
                        }}
                        onClick={() => this.testU()}
                    >Ů/Ú</Button> :
                    <Button
                        type="default"
                        shape="circle"
                        style={{
                            width: "4.5em",
                            height: "4.5em",
                            fontSize: "2em",
                        }}
                        onClick={() => this.testU()}
                    >Ů/Ú</Button>
                }

                {this.state.testVyj ?
                    <Button
                        type="primary"
                        shape="circle"
                        style={{
                            width: "7em",
                            height: "7em",
                            fontSize: "2em",
                            background: "#00474f",
                            borderColor: "#002329"
                        }}
                        onClick={() => this.testVyj()}
                    >Vyjmen. slova</Button> :
                    <Button
                        type="default"
                        shape="circle"
                        style={{
                            width: "7em",
                            height: "7em",
                            fontSize: "2em",
                        }}
                        onClick={() => this.testVyj()}
                    >Vyjmen. slova</Button>
                }

                {this.state.testBEBJE ?
                    <Button
                        type="primary"
                        shape="circle"
                        style={{
                            width: "7em",
                            height: "7em",
                            fontSize: "2em",
                            background: "#00474f",
                            borderColor: "#002329"
                        }}
                        onClick={() => this.testBEBJE()}
                    >
                        <div>bě/bje</div>
                        <div>mě/mně</div>
                        <div>vě/vje</div>
                    </Button> :
                    <Button
                        type="default"
                        shape="circle"
                        style={{
                            width: "7em",
                            height: "7em",
                            fontSize: "2em",
                        }}
                        onClick={() => this.testBEBJE()}
                    >
                        <div>bě/bje</div>
                        <div>mě/mně</div>
                        <div>vě/vje</div>
                    </Button>
                }
                    </Col>
                </Row>
            
            </React.Fragment>
        );
    }

    private testSZ = () => {
        this.setState({
            testSZ: !this.state.testSZ
        });
        this.enableBtn();
    }

    private testIY = () => {
        this.setState({
            testIY: !this.state.testIY
        });
        this.enableBtn();
    }

    private testU = () => {
        this.setState({
            testU: !this.state.testU
        });
        this.enableBtn();
    }

    private testVyj = () => {
        this.setState({
            testVyj: !this.state.testVyj
        });
        this.enableBtn();
    }

    private testBEBJE = () => {
        this.setState({
            testBEBJE: !this.state.testBEBJE
        });
        this.enableBtn();
    }

    private enableBtn = () => {
        if (this.state.testSZ || this.state.testU || this.state.testVyj || this.state.testBEBJE || this.state.testIY) {
            this.setState({
                btnDisable: false
            });
        } else {
            this.setState({
                btnDisable: true
            });
        }
    }

    private startTest = () => {

        const test = {
            countQuestions: this.state.inputValue,
            testSZ: this.state.testSZ,
            testIY: this.state.testIY,
            testU: this.state.testU,
            testVyj: this.state.testVyj,
            testBEBJE: this.state.testBEBJE,
        }

        if (this.props.dispatch) {
            this.props.dispatch(actions.createTest(test));
            this.props.history.push('/testDashboard');
        }
    }

}

export default withRouter((connect(reducer => reducer)(Testy)));