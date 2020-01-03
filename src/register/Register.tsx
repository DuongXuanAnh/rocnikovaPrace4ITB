import React, { Component } from 'react';
import { Form, Input, Button, Row, Col } from 'antd';
import { BrowserRouter as Router, Link } from "react-router-dom";
import axios from 'axios';
import { connect } from 'react-redux';

interface iState {
    confirmDirty: boolean
    autoCompleteResult: any
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
            callback('Two passwords that you enter is inconsistent!');
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
                                    message: 'The input is not valid E-mail!',
                                },
                                {
                                    required: true,
                                    message: 'Please input your E-mail!',
                                },
                            ],
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item label="Heslo" hasFeedback>
                        {getFieldDecorator('password', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Please input your password!',
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
                                    message: 'Please confirm your password!',
                                },
                                {
                                    validator: this.compareToFirstPassword,
                                },
                            ],
                        })(<Input.Password onBlur={this.handleConfirmBlur} />)}
                    </Form.Item>
                    <Button type="primary" htmlType="submit" style={{ "width": "100%", "marginBottom":"1em"}}>
                        Vytvořit nový účet
          </Button>
             <Link to="/login">Vrátit se na přihlášení !</Link>
                </Form>
              
                </Col>
                <Col xs={1} lg={8}></Col>
                </Row>
            </React.Fragment>
            </Router>
        );
    }

    handleSubmit = (e: any) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err: any, values: any) => {
            if (!err) {
                console.log('Received values of form: ', values.password);
                

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
                            console.log(res);
                        }
                    ).catch(err => err)
            }
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