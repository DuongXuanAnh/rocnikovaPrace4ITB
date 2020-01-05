import React, { Component } from 'react';
import { Form, Input, Button, Row, Col, notification, Spin } from 'antd';
import { BrowserRouter as Router, Link } from "react-router-dom";
import axios from 'axios';
import { connect } from 'react-redux';

interface iState {
    confirmDirty: boolean
    autoCompleteResult: any
    loading: boolean
}

interface iProps {
    form: any
    history: any
}

class Register extends Component<iProps, iState> {

    constructor(props: iProps) {
        super(props);
        this.state = {
            confirmDirty: false,
            autoCompleteResult: [],
            loading: false,
        }
    }

    validateToNextPassword = (rule: any, value: any, callback: any) => {
        const { form } = this.props;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    };

    handleConfirmBlur = (e: any) => {
        const { value } = e.target;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };

    compareToFirstPassword = (rule: any, value: any, callback: any) => {
        const { form } = this.props;
        if (value && value !== form.getFieldValue('password')) {
            callback('Heslo a potrzovací heslo nejsou stejné!');
        } else {
            callback();
        }
    };

    componentDidMount() {
        this.checkLoggedUser();
    }


    render() {
        const { getFieldDecorator } = this.props.form;

        return (

            <Router>

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
                        <Spin tip="Probíhá se registrace..." size="large" style={{
                                fontSize: '1.5em',
                                position: 'absolute',
                                left: '50%',
                                top: '45%',
                                "transform": "translate(-50%, -50%)"
                            }}></Spin>
                        </div>
                        :
                        <Row>
                            <Col xs={1} lg={8}></Col>
                            <Col
                                xs={22}
                                lg={8}
                                style={{
                                    "height": "100vh",
                                }}>
                                <Form
                                    onSubmit={this.handleSubmit}
                                    style={{
                                        "margin": "0 auto",
                                        "position": "relative",
                                        "top": "40%",
                                        "transform": "translateY(-50%)"
                                    }}>
                                    <h1>Registrace</h1>
                                    <Form.Item label="E-mail">
                                        {getFieldDecorator('email', {
                                            rules: [
                                                {
                                                    type: 'email',
                                                    message: 'Zadejte správný formát E-mailu',
                                                },
                                                {
                                                    required: true,
                                                    message: 'Zadejte E-mail!',
                                                },
                                            ],
                                        })(<Input />)}
                                    </Form.Item>
                                    <Form.Item label="Heslo" hasFeedback>
                                        {getFieldDecorator('password', {
                                            rules: [
                                                {
                                                    required: true,
                                                    message: 'Zadejte heslo!',
                                                },                                                
                                                {
                                                    min: 6,
                                                    message: "Minimálně 6 znaků"
                                                },
                                                {
                                                    validator: this.validateToNextPassword,
                                                },
                                            ],
                                        })(<Input.Password />)}
                                    </Form.Item>
                                    <Form.Item label="Potrvdit heslo" hasFeedback>
                                        {getFieldDecorator('confirm', {
                                            rules: [
                                                {
                                                    required: true,
                                                    message: 'Potrvdte vaše heslo!',
                                                },
                                                {
                                                    validator: this.compareToFirstPassword,
                                                },
                                            ],
                                        })(<Input.Password onBlur={this.handleConfirmBlur} />)}
                                    </Form.Item>
                                    <Button type="primary" htmlType="submit" style={{ "width": "100%", "marginBottom": "1em" }}>
                                        Vytvořit nový účet
                             </Button>
                                    <a onClick={() => { this.props.history.push('/login') }}>Vrátit se na přihlášení !</a>
                                </Form>

                            </Col>
                            <Col xs={1} lg={8}></Col>
                        </Row>
                    }
                </React.Fragment>
            </Router>
        );
    }

    handleSubmit = (e: any) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err: any, values: any) => {
            if (!err) {
                console.log('Received values of form: ', values.password);

                this.setState({
                    loading: true
                });
                axios({
                    method: 'post',
                    url: '/addNewUser',
                    // withCredentials: true,
                    data: {
                        email: values.email,
                        password: values.password,
                    }
                })
                    .then(
                        res => {
                            this.setState({
                                loading: false
                            });
                            if (res.data === "existuje") {
                                this.openNotification();
                            }
                            if (res.data === "success") {
                                this.props.history.push('/login');
                            }
                        }
                    ).catch(err => err)
            }
        });
    };

    private openNotification = () => {
        notification.open({
            message: 'Upozornění',
            description:
                'Tento E-mail je už zaregistrovaný. Prosím, vyberte si jiný.',
            onClick: () => {
                console.log('Notification Clicked!');
            },
        });
    };

    private checkLoggedUser = () => {
        var accessToken = localStorage.getItem('accessToken');
        var id = Number(localStorage.getItem('id'));
        var email = localStorage.getItem('email');
        var admin = localStorage.getItem('admin');
        if (id !== 0 && accessToken !== null && email !== null && admin !== null) {
            this.props.history.push('/');
        }
    }


}

export default connect(reducer => reducer)(Form.create({ name: 'register' })(Register));