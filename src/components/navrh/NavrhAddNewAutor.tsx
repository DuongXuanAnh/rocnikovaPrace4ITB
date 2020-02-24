import React, { Component } from 'react';
import axios from 'axios';
import { Reducer } from '../../utils/generalTypes';
import { connect } from 'react-redux';
import { Select, Input, Form, Row, Button, Col, InputNumber, Upload, Icon, notification } from 'antd';

interface Props {
    form: any
    history: any
    match: any
    reducer?: Reducer
    dispatch?: Function
}

interface State {
    data: any,
    autor: any
    originJmenoAutora: string
    originZarazeni: string
    originZivot: string
    originDila: string
}

const { Option } = Select;
const { TextArea } = Input;

class NavrhAddNewAutor extends Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            data: {},
            autor: {},
            originJmenoAutora: "",
            originZarazeni: "",
            originZivot: "",
            originDila: "",
        }
    }

    componentDidMount() {
        this.getNavrhAutora();
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
                            <Input
                                placeholder="Jméno autora"
                                value={this.state.originJmenoAutora}
                                onChange={(event: any) => this.handleChangeJmenoAutora(event)}
                            />
                        </Form.Item>
                        <Form.Item label="Popis autora">
                            {getFieldDecorator('description', {
                                rules: [{ required: true, message: "Zadejte popis autora" }],
                            })(
                                <Input placeholder="Popis autora" />
                            )}
                        </Form.Item>
                        <Form.Item label="Born" style={{ width: "50%" }}>
                            {getFieldDecorator('born', {
                                rules: [{ required: true, message: "Zadejte rok narození" }],
                            })(
                                <InputNumber min={1} max={2020} placeholder="Narození" style={{ width: "50%" }} />
                            )}
                        </Form.Item>
                        <Form.Item label="Rip" style={{ width: "50%" }}>
                            {getFieldDecorator('rip', {
                                rules: [{ required: false, message: "" }],
                            })(
                                <InputNumber min={1} max={2020} placeholder="Úmrtí" style={{ width: "50%" }} />
                            )}
                        </Form.Item>
                        <Form.Item label="Zařazení">
                            <TextArea
                                placeholder="Zařazení autora"
                                autoSize={{ minRows: 4, maxRows: 8 }}
                                value={this.state.originZarazeni}
                                onChange={(event: any) => this.handleChangeZarazeni(event)}
                            />
                        </Form.Item>
                        <Form.Item label="Život">
                            <TextArea
                                placeholder="Život autora"
                                autoSize={{ minRows: 4, maxRows: 8 }}
                                value={this.state.originZivot}
                                onChange={(event: any) => this.handleChangeZivot(event)}

                            />
                        </Form.Item>
                        <Form.Item label="Díla">
                            <TextArea
                                placeholder="Díla autora"
                                autoSize={{ minRows: 4, maxRows: 8 }}
                                value={this.state.originDila}
                                onChange={(event: any) => this.handleChangeDilo(event)}

                            />
                        </Form.Item>
                        <Form.Item label="Velká fotka">
                            {getFieldDecorator('image', {
                                rules: [{ required: true, message: "Vyberte si fotku" }],
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
                                rules: [{ required: true, message: "Vyberte si fotku" }],
                            })(
                                <Upload {...config}>
                                    <Button>
                                        <Icon type="upload" /> Nahrajte malou fotku
                                </Button>
                                </Upload>
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
                let formData = new FormData();
                formData.append('image', values.image.file);
                formData.append('smallImage', values.smallImage.file);

                values = { ...values, imgName: values.image.file.name, smallImageName: values.smallImage.file.name,jmenoAutora: this.state.originJmenoAutora, zarazeni:this.state.originZarazeni,zivot:this.state.originZivot, dila: this.state.originDila }

                for (var key in values) {
                    formData.append(key, values[key]);
                }
                axios.post('/addNovyAutor', formData, {
                    withCredentials: true,
                    headers: {
                        'Authorization': 'Bearer ' + this.props.reducer!.user!.accessToken,
                        "content-type": 'multipart/form-data'
                    },
                })
                    .then(
                        res => {
                            if (res.data === "success") {
                                this.props.history.push('/navrhDetail/'+ parseInt(this.props.match.params.id, 10));
                                this.openNotificationSuccess();
                            } else {
                                console.log("Khong dc");
                            }
                        }
                    ).catch(err => err)
            }
        });
    };

    private openNotificationSuccess = () => {
        notification.open({
            message: 'Notifikace',
            description:
                'Autor je úspěšně přidán!',
            onClick: () => {
                console.log('Notification Clicked!');
            },
        });
    };

    private getNavrhAutora = () => {
        const id: number = parseInt(this.props.match.params.id, 10);
        axios({
            method: 'get',
            url: '/navrhAutora',
            withCredentials: true,
            params: {
                id: id
            }
        })
            .then(
                res => {
                    let autor = {jmenoAutora: res.data[0].autorNavrh, zarazeni:res.data[0].zarazeniNavrh,zivot:res.data[0].zivotNavrh, dila: res.data[0].diloNavrh}
                    this.setState({
                        data: res.data[0],
                        originJmenoAutora: res.data[0].autorNavrh,
                        originZarazeni: res.data[0].zarazeniNavrh,
                        originZivot: res.data[0].zivotNavrh,
                        originDila: res.data[0].diloNavrh,
                        autor: autor
                    });
                }
            ).catch(err => err)
    }

    private handleChangeJmenoAutora = (e: any) => {
        this.setState({
            originJmenoAutora: e.target.value,
            autor: { ...this.state.autor, jmenoAutora: this.state.originJmenoAutora },
        });
    }

    private handleChangeZarazeni = (e: any) => {
        this.setState({
            autor: { ...this.state.autor, zarazeni: e.target.value },
            originZarazeni: e.target.value
        });
    }

    private handleChangeZivot = (e: any) => {
        this.setState({
            autor: { ...this.state.autor, zivot: e.target.value },
            originZivot: e.target.value
        });
    }

    private handleChangeDilo = (e: any) => {
        this.setState({
            autor: { ...this.state.autor, dila: e.target.value },
            originDila: e.target.value
        });
    }
}

export default connect(reducer => reducer)(Form.create({ name: 'NavrhAddNewAutor' })(NavrhAddNewAutor));