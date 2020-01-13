import React, { Component } from 'react';
import { Select, Button, Input, Form, Row, Upload, Icon } from 'antd';
import axios from 'axios';
import { Reducer } from '../../utils/generalTypes';
import { connect } from 'react-redux';

interface Props {
    form: any
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
}

const { Option } = Select;
const { TextArea } = Input;

class AddNewDilo extends Component<Props, State> {
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
        }
    }

    componentDidMount() {
        this.checkAdminUser();
        this.getAutori();
        this.getLitDruh();
        this.getLitZanr();
        this.getKonkretniUtvar();
        this.getVypravec();
        this.getTypPromluvyPostav();
        this.getVersovaVystavba();
    }

    render() {

        const { getFieldDecorator } = this.props.form;
        const config = {
            beforeUpload: () => false
        };
        return (
            <React.Fragment>
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

            </React.Fragment>
        );
    }

    private handleSubmit = (e: any) => {
        e.preventDefault();
        this.props.form.validateFields((err: any, values: any) => {
            if (!err) {
                console.log('Received values of form: ', values);
                let formData = new FormData();
                formData.append('file', values.image.file);

                values = {...values, imgName: values.image.file.name}

                for ( var key in values ) {
                    formData.append(key, values[key]);
                }
                axios.post('/addNovyDilo', formData, {
                    withCredentials: true,
                    headers: { 'Authorization': 'Bearer ' + this.props.reducer!.user!.accessToken, 
                    "content-type": 'multipart/form-data'
                },
                })
                    .then(
                        res => {
                            console.log(res);
                            if(res.data){
                                this.props.history.push('/dila');
                            }else{
                                console.log("Khong dc");
                            }
                        }
                    ).catch(err => err)
            }
        });
    };

    private getAutori = () => {
        let autori: any = [];
        axios({
            method: 'get',
            url: '/autori',
            withCredentials: true,
            params: {
                searchKey: ""
            }
        })
            .then(
                res => {

                    res.data.map((value: any, key: any) => {
                        autori.push(<Option key={value.id}>{value.name}</Option>);
                    })
                    this.setState({
                        autori: autori
                    });
                }
            ).catch(err => err)
    }

    private getLitDruh = () => {
        let lit_druh: any = [];
        axios({
            method: 'get',
            url: '/litDruh',
            withCredentials: true,
        })
            .then(
                res => {
                    res.data.map((value: any, key: any) => {
                        lit_druh.push(<Option key={value.id}>{value.nazev}</Option>);
                    })
                    this.setState({
                        lit_druh: lit_druh
                    });
                }
            ).catch(err => err)
    }

    private getLitZanr = () => {
        let lit_zanr: any = [];
        axios({
            method: 'get',
            url: '/litZanr',
            withCredentials: true,
        })
            .then(
                res => {
                    res.data.map((value: any, key: any) => {
                        lit_zanr.push(<Option key={value.id}>{value.nazev}</Option>);
                    })
                    this.setState({
                        lit_zanr: lit_zanr
                    });
                }
            ).catch(err => err)
    }

    private getKonkretniUtvar = () => {
        let konkretni_utvar: any = [];
        axios({
            method: 'get',
            url: '/konkretniUtvar',
            withCredentials: true,
        })
            .then(
                res => {
                    res.data.map((value: any, key: any) => {
                        konkretni_utvar.push(<Option key={value.id}>{value.nazev}</Option>);
                    })
                    this.setState({
                        konkretni_utvar: konkretni_utvar
                    });
                }
            ).catch(err => err)
    }

    private getVypravec = () => {
        let vypravec: any = [];
        axios({
            method: 'get',
            url: '/vypravec',
            withCredentials: true,
        })
            .then(
                res => {
                    res.data.map((value: any, key: any) => {
                        vypravec.push(<Option key={value.id}>{value.name}</Option>);
                    })
                    this.setState({
                        vypravec: vypravec
                    });
                }
            ).catch(err => err)
    }

    private getTypPromluvyPostav = () => {
        let typPromluvyPostav: any = [];
        axios({
            method: 'get',
            url: '/typPromluvyPostav',
            withCredentials: true,
        })
            .then(
                res => {
                    res.data.map((value: any, key: any) => {
                        typPromluvyPostav.push(<Option key={value.id}>{value.nazev}</Option>);
                    })
                    this.setState({
                        typPromluvyPostav: typPromluvyPostav
                    });
                }
            ).catch(err => err)
    }

    private getVersovaVystavba = () => {
        let versovaVystavba: any = [];
        axios({
            method: 'get',
            url: '/versovaVystavba',
            withCredentials: true,
        })
            .then(
                res => {
                    res.data.map((value: any, key: any) => {
                        versovaVystavba.push(<Option key={value.id}>{value.nazev}</Option>);
                    })
                    this.setState({
                        versovaVystavba: versovaVystavba
                    });
                }
            ).catch(err => err)
    }

    private checkAdminUser = () => {
        var accessToken = localStorage.getItem('accessToken');
        var id = Number(localStorage.getItem('id'));
        var email = localStorage.getItem('email');
        var admin = localStorage.getItem('admin');

        console.log(accessToken, id, email, admin);

        if (id !== 0 && accessToken !== null && email !== null && admin !== "true") {
            this.props.history.push('/');
        }
        else if (id === 0 && accessToken === null && email === null && admin === null){
            this.props.history.push('/');

        }
    }

}

export default connect(reducer => reducer)(Form.create({ name: 'addNewDilo' })(AddNewDilo));