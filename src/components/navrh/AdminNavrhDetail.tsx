import React, { Component } from 'react';
import axios from 'axios';
import { Select, Button, Input, Form, Row, Upload, Icon, notification, Col, Popconfirm } from 'antd';
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
    originAutor: any
    originVypravec: any
    originTypPromluvyPostav: any
    originVersovaVystavba: any
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
            navrh: {},
            originAutor: [],
            originVypravec: [],
            originTypPromluvyPostav: [],
            originVersovaVystavba: [],
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
        this.getOriginAutor();
        this.getOriginVypravecNavrh();
        this.getOriginTypPromluvyPostavNavrh();
        this.getOriginVersovaVystavbaNavrh();
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const config = {
            beforeUpload: () => false
        };
        return (
            <React.Fragment>
                <Row>
                <Popconfirm
                    title="Opravdu chcete smazat toto dílo?"
                    onConfirm={() => this.odstranitDiloZNavrhu()}
                    onCancel={(event) => this.cancel(event)}
                    okText="Ano"
                    cancelText="Ne"
                >
                    <Button type="danger" style={{
                        margin: "2em 0 0 2em"
                    }}>Smazat tento návrh</Button>

                </Popconfirm>
                
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
                                    <Select
                                        mode="multiple"
                                        style={{ width: '100%' }}
                                        placeholder="Vyberte si autora"
                                        value={this.state.originAutor}
                                        onChange={(event: any) => this.handleChangeAutora(event)}
                                    >
                                        {this.state.autori}
                                    </Select>
                                    <a onClick={() => {this.props.history.push('/addNewAutor/' + parseInt(this.props.match.params.id, 10))}}>Přidat autora</a>
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
                                        value={this.state.navrh.lit_zanr} onChange={(event: any) => this.handleChangeLitZanr(event)}
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
                                    <Input placeholder="Místo děje" value={this.state.navrh.mistoDeje} onChange={(event: any) => this.handleChangeMistoDeje(event)} />
                                </Form.Item>
                                <Form.Item label="Postavy">
                                    <TextArea
                                        placeholder="- **Jméno postavy: ** popis postavy."
                                        autoSize={{ minRows: 3, maxRows: 5 }}
                                        value={this.state.navrh.postavy} onChange={(event: any) => this.handleChangePostavy(event)}
                                    />
                                </Form.Item>
                                <Form.Item label="Téma díla">

                                    <Input placeholder="Téma díla" value={this.state.navrh.temaDila} onChange={(event: any) => this.handleChangeTemaDila(event)} />

                                </Form.Item>
                                <Form.Item label="Vypraveč">
                                    <Select
                                        mode="multiple"
                                        style={{ width: '100%' }}
                                        placeholder="Vypraveč"
                                        value={this.state.originVypravec}
                                        onChange={(event: any) => this.handleChangeVypravec(event)}

                                    >
                                        {this.state.vypravec}
                                    </Select>
                                </Form.Item>
                                <Form.Item label="Typy promluv postav">
                                    <Select
                                        mode="multiple"
                                        style={{ width: '100%' }}
                                        placeholder="Typy promluv postav"
                                        value={this.state.originTypPromluvyPostav}
                                        onChange={(event: any) => this.handleChangeTypPromluvyPostav(event)}

                                    >
                                        {this.state.typPromluvyPostav}
                                    </Select>
                                </Form.Item>
                                <Form.Item label="Veršová výstavba">
                                    <Select
                                        mode="multiple"
                                        style={{ width: '100%' }}
                                        placeholder="Veršová výstavba"
                                        value={this.state.originVersovaVystavba}
                                        onChange={(event: any) => this.handleChangeVersovaVystavba(event)}
                                    >
                                        {this.state.versovaVystavba}
                                    </Select>
                                </Form.Item>
                                <Form.Item label="Jazykové prostředky">
                                    <Input placeholder="Jazykové prostředky" value={this.state.navrh.jazykove_prostredky} onChange={(event: any) => this.handleChangeJazykoveProstredky(event)} />
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
                    <Col span={12}>
                        <Row style={{ marginLeft: "2em", overflow: "scroll", height: "100vh" }}>
                            <h3>Připomínka:</h3>
                            {this.state.navrh.pripominka}
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

                        values = { ...this.state.navrh, imgName: values.image.file.name }

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
                                    if (res.data) {
                                        this.props.history.push('/dila');
                                        this.smazatDiloZNavrhu();
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

    private handleChangeAutora = (value: any) => {
        this.setState({
            originAutor: value,
            navrh: { ...this.state.navrh, autor: value }
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
            navrh: { ...this.state.navrh, tema_dila: e.target.value }
        });
    }

    private handleChangeJazykoveProstredky = (e: any) => {
        this.setState({
            navrh: { ...this.state.navrh, jazykove_prostredky: e.target.value }
        });
    }

    private handleChangeVypravec = (value: any) => {
        this.setState({
            originVypravec: value,
            navrh: { ...this.state.navrh, vypravec: value }
        });
    }

    private handleChangeTypPromluvyPostav = (value: any) => {
        this.setState({
            originTypPromluvyPostav: value,
            navrh: { ...this.state.navrh, typPromluvyPostav: value }
        });
    }

    private handleChangeVersovaVystavba = (value: any) => {
        this.setState({
            originVersovaVystavba: value,
            navrh: { ...this.state.navrh, versovaVystavba: value }
        });
    }

    private getOriginAutor = () => {
        const id: number = parseInt(this.props.match.params.id, 10);
        axios({
            method: 'get',
            url: '/getOriginAutorNavrh',
            withCredentials: true,
            params: {
                idDila: id
            }
        })
            .then(
                res => {
                    const originAutor: any = [];
                    res.data.map((value: any, key: any) => {
                        originAutor.push(value.id_autor.toString())
                    })
                    this.setState({
                        originAutor: originAutor,
                        navrh: { ...this.state.navrh, autor: originAutor }
                    });
                }
            ).catch(err => err)
    }

    private getOriginVypravecNavrh = () => {
        const id: number = parseInt(this.props.match.params.id, 10);
        axios({
            method: 'get',
            url: '/getOriginVypravecNavrh',
            withCredentials: true,
            params: {
                idDila: id
            }
        })
            .then(
                res => {
                    const originVypravec: any = [];
                    res.data.map((value: any, key: any) => {
                        originVypravec.push(value.id_vypravec.toString())
                    })
                    this.setState({
                        originVypravec: originVypravec,
                        navrh: { ...this.state.navrh, vypravec: originVypravec }
                    });
                }
            ).catch(err => err)
    }

    private getOriginTypPromluvyPostavNavrh = () => {
        const id: number = parseInt(this.props.match.params.id, 10);
        axios({
            method: 'get',
            url: '/getOriginTypPromluvyPostavNavrh',
            withCredentials: true,
            params: {
                idDila: id
            }
        })
            .then(
                res => {
                    const originTypPromluvyPostav: any = [];
                    res.data.map((value: any, key: any) => {
                        originTypPromluvyPostav.push(value.id_typPromluvyPostav.toString())
                    })
                    this.setState({
                        originTypPromluvyPostav: originTypPromluvyPostav,
                        navrh: { ...this.state.navrh, typPromluvyPostav: originTypPromluvyPostav }
                    });
                }
            ).catch(err => err)
    }
    private getOriginVersovaVystavbaNavrh = () => {
        const id: number = parseInt(this.props.match.params.id, 10);
        axios({
            method: 'get',
            url: '/getOriginVersovaVystavbaNavrh',
            withCredentials: true,
            params: {
                idDila: id
            }
        })
            .then(
                res => {
                    const originVersovaVystavba: any = [];
                    res.data.map((value: any, key: any) => {
                        originVersovaVystavba.push(value.id_versovaVystavba.toString())
                    })
                    this.setState({
                        originVersovaVystavba: originVersovaVystavba,
                        navrh: { ...this.state.navrh, versovaVystavba: originVersovaVystavba }
                    });
                }
            ).catch(err => err)
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
                    this.setState({
                        navrh: res.data[0]
                    });
                }
            ).catch(err => err)
    }

    private smazatDiloZNavrhu = () => {
        const id: number = parseInt(this.props.match.params.id, 10);
        axios({
            method: 'delete',
            url: '/smazatNavrh/' + id,
            withCredentials: true,
            headers: { 'Authorization': 'Bearer ' + this.props.reducer!.user!.accessToken },
        })
            .then(
                res => {
                    console.log("ok");

                }
            ).catch(err => err)
    }

    private odstranitDiloZNavrhu = () => {
        const id: number = parseInt(this.props.match.params.id, 10);
        axios({
            method: 'delete',
            url: '/smazatNavrh/' + id,
            withCredentials: true,
            headers: { 'Authorization': 'Bearer ' + this.props.reducer!.user!.accessToken },
        })
            .then(
                res => {
                    console.log("ok");
                    this.props.history.push('/zadostONavrhu');
                    notification.open({
                        message: 'Notifikace',
                        description:
                            'Návrh byl úspěšně smazán!',
                        onClick: () => {
                            console.log('Notification Clicked!');
                        },
                    });
                }
            ).catch(err => err)
    }

    private cancel(e: any) {

    }
}

export default connect(reducer => reducer)(Form.create({ name: 'AdminNavrhDetail' })(AdminNavrhDetail));