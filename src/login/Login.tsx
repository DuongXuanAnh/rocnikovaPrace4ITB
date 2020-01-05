    
import React, { Component } from 'react';
import { Form, Icon, Input, Button, Row, Col, notification } from 'antd';
import axios from 'axios';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Link } from "react-router-dom";
import { Reducer, User } from '../utils/generalTypes';
import * as actions from '../redux/actions';

interface Props {
    form: any
    match: any
    location: any
    history: any
    reducer?: Reducer
    dispatch?: Function
}

interface State {
    user?: User,
    accessToken: string;
}

class Login extends Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            user: undefined,
            accessToken: ""
        }
    }

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
                                className="login-form"
                                style={{
                                    "margin": "0 auto",
                                    "position": "relative",
                                    "top": "35%",
                                    "transform": "translateY(-50%)"
                                }}>
                                <h1>Přihlašování</h1>
                                <Form.Item>
                                    {getFieldDecorator('email', {
                                        rules: [{
                                            type: 'email',
                                            message: 'Nesprávný typ emailu',
                                        }, {
                                            required: true, message: 'Zadejte prosím váš email!'
                                        }],
                                    })(
                                        <Input
                                            prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                            placeholder="Email"
                                            name="email"
                                        />,
                                    )}
                                </Form.Item>
                                <Form.Item>
                                    {getFieldDecorator('password', {
                                        rules: [{ required: true, message: 'Zadejte prosím vaše heslo!' }],
                                    })(
                                        <Input
                                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                            type="password"
                                            placeholder="Password"
                                            name="password"
                                        />,
                                    )}
                                </Form.Item>
                                <Form.Item>
                                    <Button type="primary" htmlType="submit" className="login-form-button" style={{ "width": "100%" }}>
                                        Přihlásit se
                        </Button>
                                    <a onClick={() => { this.props.history.push('/register') }}>Vytvořit nový účet ! </a>
                                </Form.Item>
                            </Form>
                        </Col>
                        <Col xs={1} lg={8}></Col>
                    </Row>
                </React.Fragment>
            </Router>
        );
    }

    private handleSubmit = (e: any) => {
        e.preventDefault();
        let user: User;
        this.props.form.validateFields((err: any, values: any) => {
            if (!err) {
                axios({
                    method: 'post',
                    url: '/login',
                    withCredentials: true,
                    data: { email: values.email, password: values.password }
                }).then(
                    res => {
                       if(res.data === "notExist"){
                        this.openNotification();
                       }else{
                        user = res.data.user;
                        user.accessToken = res.data.accessToken;
                        this.setState({
                            user: user,
                            accessToken: res.data.accessToken
                        });
                        localStorage.setItem('accessToken', res.data.accessToken);
                        localStorage.setItem('id', res.data.user.id);
                        localStorage.setItem('email', res.data.user.email);
                        localStorage.setItem('admin', res.data.user.admin);
                        if (this.props.dispatch) {
                            this.props.dispatch(actions.login(user));
                        }
                        this.props.history.push('/');
                       }
                    }
                ).catch(
                    err => {
                        console.log(err);
                    }
                )
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

private openNotification = () => {
    notification.open({
      message: 'Upozornění',
      description:
        'E-mail nebo heslo není správné!',
      onClick: () => {
        console.log('Notification Clicked!');
      },
    });
  };
}

export default connect(reducer => reducer)(Form.create({ name: 'normal_login' })(Login));