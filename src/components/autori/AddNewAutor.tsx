import React, { Component } from 'react';
import axios from 'axios';
import { Reducer } from '../../utils/generalTypes';
import { connect } from 'react-redux';
import { Select, Input, Form, Row, Button, Col, DatePicker, InputNumber } from 'antd';

interface Props {
    form: any
    history: any
    reducer?: Reducer
    dispatch?: Function
}

interface State {

}

const { Option } = Select;
const { TextArea } = Input;

class AddNewAutor extends Component<Props, State> {

    constructor(props: Props) {
        super(props);

    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const config = {
            beforeUpload: () => false
        };
        return (
            <React.Fragment>
                <Row style={{ width: "90%", margin: "0 auto" }}>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item label="Jméno autora">
                            {getFieldDecorator('jmenoAutora', {
                                rules: [{ required: true, message: "Zadejte jméno autora" }],
                            })(
                                <Input placeholder="Jméno autora" />
                            )}
                        </Form.Item>
                        <Form.Item label="Popis autora">
                            {getFieldDecorator('description', {
                                rules: [{ required: true, message: "Zadejte popis autora" }],
                            })(
                                <Input placeholder="Popis autora"/>
                            )}
                        </Form.Item>
                        <Form.Item label="Born" style={{width:"50%"}}>
                            {getFieldDecorator('born', {
                                rules: [{ required: true, message: "Zadejte rok narození" }],
                            })(
                                <InputNumber min={1} max={2020} placeholder="Narození" style={{ width: "50%" }} />
                            )}
                        </Form.Item>
                        <Form.Item label="Rip" style={{width:"50%"}}>
                            {getFieldDecorator('rip', {
                                rules: [{ required: false, message: "" }],
                            })(
                                <InputNumber min={1} max={2020} placeholder="Úmrtí" style={{ width: "50%" }} />
                            )}
                        </Form.Item>
                        <Form.Item label="Zařazení">
                            {getFieldDecorator('zarazeni', {
                                rules: [{ required: true, message: "Zadejte zařazení autora" }],
                            })(
                                <TextArea
                                    placeholder="Zařazení autora"
                                    autoSize={{ minRows: 4, maxRows: 8 }}
                                />
                            )}
                        </Form.Item>
                        <Form.Item label="Život">
                            {getFieldDecorator('zivot', {
                                rules: [{ required: true, message: "Zadejte život autora" }],
                            })(
                                <TextArea
                                    placeholder="Život autora"
                                    autoSize={{ minRows: 4, maxRows: 8 }}
                                />
                            )}
                        </Form.Item>
                        <Form.Item label="Díla">
                            {getFieldDecorator('dila', {
                                rules: [{ required: true, message: "Zadejte díla" }],
                            })(
                                <TextArea
                                    placeholder="Díla autora"
                                    autoSize={{ minRows: 4, maxRows: 8 }}
                                />
                            )}
                        </Form.Item>


                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Přidat autora
                    </Button>
                    </Form>
                </Row>
            </React.Fragment >
        );
    }

    private handleSubmit = (e: any) => {
        e.preventDefault();
        this.props.form.validateFields((err: any, values: any) => {
            if (!err) {
                console.log(values);
            }
        });
    };
}

export default connect(reducer => reducer)(Form.create({ name: 'addNewAutor' })(AddNewAutor));