import React, { Component, Fragment } from 'react';
import { Reducer } from '../../utils/generalTypes';
import axios from 'axios';
import { connect } from 'react-redux';
import { Input, Form, Row, Upload, Button, Icon, InputNumber, Popconfirm } from 'antd';

interface Props {
    form: any
    history: any
    match: any
    reducer?: Reducer
    dispatch?: Function
}

interface State {
    autor: any
    loading: boolean

}

const { TextArea } = Input;

class EditAutora extends Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            autor: {},
            loading: false,
        }
    }

    componentDidMount() {
        this.getAutorDetail();
    }


    render() {
        const { getFieldDecorator } = this.props.form;
        const config = {
            beforeUpload: () => false
        };
        return (
            <Fragment>
                <Row style={{ width: "90%", margin: "0 auto" }}>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item label="Jméno autora">
                            <Input
                                placeholder="Jméno autora"
                                value={this.state.autor.name}
                                onChange={(event) => this.changeNameAutora(event)}
                            />
                        </Form.Item>
                        <Form.Item label="Popis autora">
                            <TextArea
                                placeholder="Popis autora"
                                autoSize={{ minRows: 2, maxRows: 4 }}
                                value={this.state.autor.description}
                                onChange={(event) => this.changePopisAutora(event)}
                            />
                        </Form.Item>
                        <Form.Item label="Born" style={{ width: "50%" }}>
                            <InputNumber
                                min={1} max={2020}
                                placeholder="Narození"
                                style={{ width: "50%" }}
                                value={this.state.autor.born}
                                onChange={(event) => this.changeBornAutora(event)}
                            />
                        </Form.Item>
                        <Form.Item label="Rip" style={{ width: "50%" }}>

                            <InputNumber
                                min={1} max={2020}
                                placeholder="Úmrtí"
                                style={{ width: "50%" }}
                                value={this.state.autor.rip}
                                onChange={(event) => this.changeRipAutora(event)}
                            />
                        </Form.Item>
                        <Form.Item label="Zařazení">
                            <TextArea
                                placeholder="Zařazení autora"
                                autoSize={{ minRows: 4, maxRows: 8 }}
                                value={this.state.autor.zarazeniContent}
                                onChange={(event) => this.changeZarazeniAutora(event)}
                            />
                        </Form.Item>
                        <Form.Item label="Život">

                            <TextArea
                                placeholder="Život autora"
                                autoSize={{ minRows: 4, maxRows: 8 }}
                                value={this.state.autor.zivotContent}
                                onChange={(event) => this.changeZivotAutora(event)}
                            />
                        </Form.Item>
                        <Form.Item label="Díla">

                            <TextArea
                                placeholder="Díla autora"
                                autoSize={{ minRows: 4, maxRows: 8 }}
                                value={this.state.autor.dilaContent}
                                onChange={(event) => this.changeDiloAutora(event)}
                            />
                        </Form.Item>
                        <Form.Item label="Velká fotka">
                            {getFieldDecorator('image', {
                                rules: [{ required: false, message: "Vyberte si fotku" }],
                            })(
                                <Upload {...config}>
                                    <Button>
                                        <Icon type="upload" /> Nahrajte velkou fotku
                                </Button>
                                </Upload>
                            )}
                        </Form.Item>
                        <Form.Item label="Malá fotka">
                            {getFieldDecorator('smallImage', {
                                rules: [{ required: false, message: "Vyberte si fotku" }],
                            })(
                                <Upload {...config}>
                                    <Button>
                                        <Icon type="upload" /> Nahrajte malou fotku
                                </Button>
                                </Upload>
                            )}
                        </Form.Item>

                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Upravit autora
                    </Button>
                    </Form>
                </Row>
            </Fragment>
        );
    }

    private handleSubmit = (e: any) => {
        // console.log(this.state.autor);
        e.preventDefault();
        this.props.form.validateFields((err: any, values: any) => {
            if (!err) {
                let formData = new FormData();
                formData.append('image', values.image.file);
                formData.append('smallImage', values.smallImage.file);

                values = { ...this.state.autor, imgName: values.image.file.name, smallImageName: values.smallImage.file.name }

                for (var key in values) {
                    formData.append(key, values[key]);
                }
                axios.post('/editAutora', formData, {
                    withCredentials: true,
                },
                )
                    .then(
                        res => {
                            const id: number = parseInt(this.props.match.params.id, 10);
                            if (res.data === "editSuccess") {
                                this.props.history.push('/autor/' + id);
                            }
                        }
                    ).catch(err => err)
            }
        });
    };

    private getAutorDetail() {
        this.setState({
            loading: true
        });
        const id: number = parseInt(this.props.match.params.id, 10);
        axios({
            method: 'get',
            url: '/autor/' + id,
            withCredentials: true,
        })
            .then(

                res => {

                    this.setState({
                        autor: { ...res.data, imgB64: "" },
                        loading: false,
                    });
                    console.log(this.state.autor);
                }
            ).catch(err => err)
    }

    private changeNameAutora = (e: any) => {
        this.setState({
            autor: { ...this.state.autor, name: e.target.value }
        });
    }

    private changePopisAutora = (e: any) => {
        this.setState({
            autor: { ...this.state.autor, description: e.target.value }
        });
    }
    private changeBornAutora = (e: any) => {
        this.setState({
            autor: { ...this.state.autor, born: e }
        });
    }
    private changeRipAutora = (e: any) => {
        this.setState({
            autor: { ...this.state.autor, rip: e }
        });
    }
    private changeZarazeniAutora = (e: any) => {
        this.setState({
            autor: { ...this.state.autor, zarazeniContent: e.target.value }
        });
    }
    private changeZivotAutora = (e: any) => {
        this.setState({
            autor: { ...this.state.autor, zivotContent: e.target.value }
        });
    }
    private changeDiloAutora = (e: any) => {
        this.setState({
            autor: { ...this.state.autor, dilaContent: e.target.value }
        });
    }

  

}

export default connect(reducer => reducer)(Form.create({ name: 'editAutora' })(EditAutora));
