import React, { Component } from 'react';
import { Form, Icon, Input, Button, Row, Col } from 'antd';
import axios from 'axios';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Link } from "react-router-dom";
import { Reducer, User } from '../utils/generalTypes';
import * as actions from '../redux/actions';

interface Props {
    form: any;
    match: any
    location: any
    history: any
    reducer?: Reducer;
    dispatch?: Function;
}

interface State {
    user?: User,
    token: string;
}

class Login extends Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            user: undefined,
            token: ""
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
                                    <Link to="/register">Vytvořit nový účet !</Link>
                                </Form.Item>
                            </Form>
                        </Col>
                        <Col xs={1} lg={8}></Col>
                    </Row>
                    <Button type="primary" onClick={() => this.test()}>Test</Button>
                </React.Fragment>
            </Router>
        );
    }

    private handleSubmit = (e: any) => {
        e.preventDefault();
        this.props.form.validateFields((err: any, values: any) => {
            if (!err) {
                axios({
                    method: 'post',
                    url: '/login',
                    withCredentials: true,
                    data: { email: values.email, password: values.password }
                }).then(
                    res => {
                        console.log(res.data);
                        this.setState({
                            user: res.data.user,
                            token: res.data.accessToken
                        });
                        localStorage.setItem('token', res.data.accessToken);
                        if (this.props.dispatch) {
                            this.props.dispatch(actions.login(res.data));
                        }
                        this.props.history.push('/dila');
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
        axios({
            method: 'get',
            url: '/logged-user',
            withCredentials: true
        })
            .then(
                res => {
                    // if (this.props.dispatch) {
                    //     this.props.dispatch(actions.login(res.data));
                    // }
                    console.log(res.data);

                }
            ).catch(err => err)
    }

    private test = () => {
        axios({
            method: 'get',
            url: '/home',
            headers: { 'Authorization': 'Bearer ' + this.state.token },
            withCredentials: true
        })
            .then(
                res => {
                    console.log(res.data);
                }
            ).catch(err => err)
    }
}

export default connect(reducer => reducer)(Form.create({ name: 'normal_login' })(Login));
