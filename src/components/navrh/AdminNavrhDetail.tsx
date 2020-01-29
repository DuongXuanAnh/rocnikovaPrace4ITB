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
        this.getAutori();
        this.getLitDruh();
        this.getLitZanr();
        this.getKonkretniUtvar();
        this.getVypravec();
        this.getTypPromluvyPostav();
        this.getVersovaVystavba();
        console.log(this.state.navrh);
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
                        <Row style={{ marginLeft: "2em", overflow: "scroll", height: "100vh" }}>
                          }
                            <h3>Autor:</h3>
                            {this.state.navrh.autor}
                            <h3>Vypraveč:</h3>
                            {/* {this.state.navrh.autor} */}
                            <h3>Jazykové prostředky:</h3>
                            {/* {this.state.navrh.autor} */}
                            <h3>Připomínka:</h3>
                            {this.state.navrh.pripominka}

                        </Row>
                    </Col>
                    <Col span={12}>
                        <Row
                            style={{
                                width: "90%",
                                margin: "0 auto",
                                overflow: "scroll",
                                height: "100vh"
                            }}>
                            <Form onSubmit={this.handleSubmit} className="login-form">

                                <Form.Item label="Název díla">
                                    <Input placeholder="Název díla" value={this.state.navrh.nazev} onChange={(event: any) => this.handleChangeNazevDila(event)} />
                                </Form.Item>
                                <Form.Item label="Popis díla">
                                        <Input placeholder="Description" value={this.state.navrh.description} onChange={(event: any) => this.handleChangeDescription(event)} />
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
                                    <Select
                                        style={{ width: '100%' }}
                                        value={this.state.navrh.lit_druh} onChange={(event: any) => this.handleChangeLitDruh(event)}
                                    >
                                        {this.state.lit_druh}
                                    </Select>
                                </Form.Item>

                                <Form.Item label="Literární žánr">
                                    <Select
                                        style={{ width: '100%' }}
                                        value={this.state.navrh.lit_druh} onChange={(event: any) => this.handleChangeLitZanr(event)}
                                    >
                                        {this.state.lit_zanr}
                                    </Select>
                                </Form.Item>
                                <Form.Item label="Konkrétní literární útvar">
                                        <Select style={{ width: '100%' }} value={this.state.navrh.konkretni_utvar} onChange={(event: any) => this.handleChangeKonkretniUtvar(event)}>
                                            {this.state.konkretni_utvar}
                                        </Select>
                                </Form.Item>
                                <Form.Item label="Doba děje">
                                    <Input placeholder="Doba děje" value={this.state.navrh.dobaDeje} onChange={(event: any) => this.handleChangeDobaDeje(event)} />
                                </Form.Item>
                                <Form.Item label="Místo děje"> 
                                        <Input placeholder="Místo děje" value={this.state.navrh.mistoDeje} onChange={(event: any) => this.handleChangeMistoDeje(event)}/>
                                </Form.Item>
                                <Form.Item label="Postavy">
                                 
                                        <TextArea
                                            placeholder="- **Jméno postavy: ** popis postavy."
                                            autoSize={{ minRows: 3, maxRows: 5 }}
                                            value={this.state.navrh.postavy} onChange={(event: any) => this.handleChangePostavy(event)}
                                        />
                                    
                                </Form.Item>
                                <Form.Item label="Téma díla">
                                  
                                        <Input placeholder="Téma díla" value={this.state.navrh.temaDila} onChange={(event: any) => this.handleChangeTemaDila(event)}/>
                                
                                </Form.Item>
                                <Form.Item label="Vypraveč">
                                        <Select
                                            mode="multiple"
                                            style={{ width: '100%' }}
                                            placeholder="Vypraveč"
                                        >
                                            {this.state.vypravec}
                                        </Select>
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
                                    <TextArea
                                        placeholder="Obsah díla"
                                        autoSize={{ minRows: 4, maxRows: 8 }}
                                        value={this.state.navrh.obsahDila} onChange={(event: any) => this.handleChangeObsahDila(event)}
                                    />
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
                        lit_druh.push(<Option value={value.id} key={value.id}>{value.nazev}</Option>);
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
                        lit_zanr.push(<Option value={value.id} key={value.id}>{value.nazev}</Option>);
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
                        konkretni_utvar.push(<Option value={value.id} key={value.id}>{value.nazev}</Option>);
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

    private handleChangeNazevDila = (e: any) => {
        this.setState({
            navrh: { ...this.state.navrh, nazev: e.target.value }
        });
    }
    private handleChangeDescription = (e: any) => {
        this.setState({
            navrh: { ...this.state.navrh, description: e.target.value }
        });
    }
    private handleChangeLitDruh = (e: any) => {
        this.setState({
            navrh: { ...this.state.navrh, lit_druh: e }
        });
    }
    private handleChangeLitZanr = (e: any) => {
        this.setState({
            navrh: { ...this.state.navrh, lit_zanr: e }
        });
    }
    private handleChangeKonkretniUtvar = (e: any) => {
        this.setState({
            navrh: { ...this.state.navrh, konkretni_utvar: e }
        });
    }
    private handleChangePostavy = (e: any) => {
        this.setState({
            navrh: { ...this.state.navrh, postavy: e.target.value }
        });
    }
    private handleChangeObsahDila = (e: any) => {
        this.setState({
            navrh: { ...this.state.navrh, obsahDila: e.target.value }
        });
    }
    private handleChangeDobaDeje = (e: any) => {
        this.setState({
            navrh: { ...this.state.navrh, dobaDeje: e.target.value }
        });
    }
    private handleChangeMistoDeje = (e: any) => {
        this.setState({
            navrh: { ...this.state.navrh, mistoDeje: e.target.value }
        });
    }
    private handleChangeTemaDila = (e: any) => {
        this.setState({
            navrh: { ...this.state.navrh, temaDila: e.target.value }
        });
    }

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
                    console.log(res.data[0]);
                    this.setState({
                        navrh: res.data[0]
                    });
                }
            ).catch(err => err)
    }
}

export default connect(reducer => reducer)(Form.create({ name: 'addNewDilo' })(AdminNavrhDetail));