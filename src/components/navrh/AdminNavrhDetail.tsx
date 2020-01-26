import React, { Component } from 'react';
import axios from 'axios';
import { Select, Button, Input, Form, Row, Upload, Icon, notification, Col } from 'antd';
import { Reducer } from '../../utils/generalTypes';
import { connect } from 'react-redux';

interface Props {
    form: any
    match: any
    location: any
    history: any
    reducer?: Reducer
    dispatch?: Function
}

interface State {
    autori?: any
    lit_druh?: any
    lit_zanr?: any
    konkretni_utvar?: any
    vypravec?: any
    typPromluvyPostav?: any
    versovaVystavba?: any

    navrh: any
}

const { Option } = Select;
const { TextArea } = Input;

class AdminNavrhDetail extends Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            autori: [],
            lit_druh: [],
            lit_zanr: [],
            konkretni_utvar: [],
            vypravec: [],
            typPromluvyPostav: [],
            versovaVystavba: [],
            navrh: {}
        }
    }

    componentDidMount() {
        this.getNavrhDilaDetail();
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const config = {
            beforeUpload: () => false
        };
        return (
            <React.Fragment>
                <Row>
                    <Col span={12}>
                    {this.state.navrh.nazev}
                    </Col>
                    <Col span={12}>
                        <Row
                            style={{
                                width: "90%",
                                margin: "0 auto",
                            }}>
                            <Form onSubmit={this.handleSubmit} className="login-form">

                                <Form.Item label="Název díla">
                                    {getFieldDecorator('nazev', {
                                        rules: [{ required: true, message: "Zadejte název díla" }],
                                    })(
                                        <Input placeholder="Název díla" />
                                    )}
                                </Form.Item>
                                <Form.Item label="Popis díla">
                                    {getFieldDecorator('description', {
                                        rules: [{ required: true, message: "Zadejte popis díla" }],
                                    })(
                                        <Input placeholder="Description" />
                                    )}
                                </Form.Item>
                                <Form.Item label="Autor">
                                    {getFieldDecorator('autor', {
                                        rules: [{ required: true, message: "Vyberte si autora" }],
                                    })(
                                        <Select
                                            mode="multiple"
                                            style={{ width: '100%' }}
                                            placeholder="Vyberte si autora"
                                        >
                                            {this.state.autori}
                                        </Select>
                                    )}
                                </Form.Item>

                                <Form.Item label="Literární druh">
                                    {getFieldDecorator('lit_druh', {
                                        rules: [{ required: true, message: "Vyberte si literární druh" }],
                                    })(
                                        <Select style={{ width: '100%' }} >
                                            {this.state.lit_druh}
                                        </Select>

                                    )}
                                </Form.Item>

                                <Form.Item label="Literární zanr">
                                    {getFieldDecorator('lit_zanr', {
                                        rules: [{ required: true, message: "Vyberte si literární žánr" }],
                                    })(
                                        <Select style={{ width: '100%' }} >
                                            {this.state.lit_zanr}
                                        </Select>
                                    )}
                                </Form.Item>
                                <Form.Item label="Konkrétní literární útvar">
                                    {getFieldDecorator('konkretni_utvar', {
                                        rules: [{ required: true, message: "Vyberte si literární útvar" }],
                                    })(
                                        <Select style={{ width: '100%' }} >
                                            {this.state.konkretni_utvar}
                                        </Select>
                                    )}
                                </Form.Item>

                                <Form.Item label="Doba děje">
                                    {getFieldDecorator('dobaDeje', {
                                        rules: [{ required: true, message: " " }],
                                    })(
                                        <Input placeholder="Doba děje" />
                                    )}
                                </Form.Item>
                                <Form.Item label="Místo děje">
                                    {getFieldDecorator('mistoDeje', {
                                        rules: [{ required: true, message: " " }],
                                    })(
                                        <Input placeholder="Místo děje" />
                                    )}
                                </Form.Item>
                                <Form.Item label="Postavy">
                                    {getFieldDecorator('postavy', {
                                        rules: [{ required: true, message: " " }],
                                    })(
                                        <TextArea
                                            placeholder="- **Jméno postavy: ** popis postavy."
                                            autoSize={{ minRows: 3, maxRows: 5 }}
                                        />
                                    )}
                                </Form.Item>
                                <Form.Item label="Téma díla">
                                    {getFieldDecorator('tema_dila', {
                                        rules: [{ required: true, message: " " }],
                                    })(
                                        <Input placeholder="Téma díla" />
                                    )}
                                </Form.Item>
                                <Form.Item label="Vypraveč">
                                    {getFieldDecorator('vypravec', {
                                        rules: [{ required: true, message: "Vyberte si vypravěče" }],
                                    })(
                                        <Select
                                            mode="multiple"
                                            style={{ width: '100%' }}
                                            placeholder="Vypraveč"
                                        >
                                            {this.state.vypravec}
                                        </Select>
                                    )}
                                </Form.Item>
                                <Form.Item label="Typy promluv postav">
                                    {getFieldDecorator('typPromluvyPostav', {
                                        rules: [{ required: true, message: " " }],
                                    })(
                                        <Select
                                            mode="multiple"
                                            style={{ width: '100%' }}
                                            placeholder="Typy promluv postav"
                                        >
                                            {this.state.typPromluvyPostav}
                                        </Select>
                                    )}
                                </Form.Item>
                                <Form.Item label="Veršová výstavba">
                                    {getFieldDecorator('versovaVystavba', {
                                        rules: [{ required: false, message: " " }],
                                    })(
                                        <Select
                                            mode="multiple"
                                            style={{ width: '100%' }}
                                            placeholder="Veršová výstavba"
                                        >
                                            {this.state.versovaVystavba}
                                        </Select>
                                    )}
                                </Form.Item>
                                <Form.Item label="Jazykové prostředky">
                                    {getFieldDecorator('jazykoveProstredky', {
                                        rules: [{ required: true, message: " " }],
                                    })(
                                        <Input placeholder="Jazykové prostředky" />
                                    )}
                                </Form.Item>
                                <Form.Item label="Obsah díla">
                                    {getFieldDecorator('obsahDila', {
                                        rules: [{ required: true, message: " " }],
                                    })(
                                        <TextArea
                                            placeholder="Obsah díla"
                                            autoSize={{ minRows: 4, maxRows: 8 }}
                                        />
                                    )}
                                </Form.Item>
                                <Form.Item label="Fotka">
                                    {getFieldDecorator('image', {
                                        rules: [{ required: true, message: "Vyberte si fotku" }],
                                    })(
                                        <Upload {...config}>
                                            <Button>
                                                <Icon type="upload" /> Click to Upload
                                </Button>
                                        </Upload>
                                    )}
                                </Form.Item>
                                <Button type="primary" htmlType="submit" className="login-form-button">
                                    Přidat dílo
                    </Button>
                            </Form>
                        </Row>
                    </Col>
                </Row>
            </React.Fragment>
        );
    }

    private handleSubmit = (e: any) => {
        e.preventDefault();
        this.props.form.validateFields((err: any, values: any) => {
            if (!err) {
                let formData = new FormData();
                formData.append('file', values.image.file);

                values = { ...values, imgName: values.image.file.name }

                for (var key in values) {
                    formData.append(key, values[key]);
                }
                axios.post('/addNovyDilo', formData, {
                    withCredentials: true,
                    headers: {
                        'Authorization': 'Bearer ' + this.props.reducer!.user!.accessToken,
                        "content-type": 'multipart/form-data'
                    },
                })
                    .then(
                        res => {
                            console.log(res);
                            if (res.data) {
                                this.props.history.push('/dila');
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
                'Dílo je úspěšně přidáno!',
            onClick: () => {
                console.log('Notification Clicked!');
            },
        });
    };

    // -------------------------------------------------------------------------

    private getNavrhDilaDetail = () => {
        const id: number = parseInt(this.props.match.params.id, 10);
        axios({
            method: 'get',
            url: '/navrhDilaDetail',
            withCredentials: true,
            params: {
                id: id
            }
        })
            .then(
                res => {
                    console.log(res.data[0].nazev);
                    this.setState({
                        navrh: res.data[0]
                    });
                }
            ).catch(err => err)
    }
}

export default connect(reducer => reducer)(Form.create({ name: 'addNewDilo' })(AdminNavrhDetail));