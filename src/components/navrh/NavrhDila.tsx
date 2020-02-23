import React, { Component } from 'react';
import { Row, Button, Select, Input, Form, Col } from 'antd';
import { connect } from 'react-redux';
import axios from 'axios';

interface Props {
    form: any
}

interface State {
    autori?: any
    dilo: any
    lit_druh?: any
    lit_zanr?: any
    konkretni_utvar?: any
    vypravec?: any
    typPromluvyPostav?: any
    versovaVystavba?: any
    vybranyLitDruh: number
    vybranyLitZanr: number
    vybranykonkretniUtvar: number
    pridatAutoraMode: boolean
}

const { Option } = Select;
const { TextArea } = Input;

class NavrhDila extends Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            dilo: {
                nazev: "",
                description: "",
                autor: "",
                doba: "",
                misto: "",
                konkretniUtvar: "",
                temaDila: "",
                postavy: "",
                jazykoveProstredky: "",
                obsahDila: "",
                pripominka: ""
            },
            autori: [],
            lit_druh: [],
            lit_zanr: [],
            konkretni_utvar: [],
            vypravec: [],
            typPromluvyPostav: [],
            versovaVystavba: [],
            vybranyLitDruh: 0,
            vybranyLitZanr: 0,
            vybranykonkretniUtvar: 0,
            pridatAutoraMode: false
        }
    }

    componentDidMount() {
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
        return (
            <React.Fragment>

                <Row
                    style={{
                        width: "90%",
                        margin: "0 auto",
                    }}>
                    <Form onSubmit={this.handleSubmit}>
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
                                rules: [{ required: !this.state.pridatAutoraMode, message: "Vyberte si autora" }],
                            })(
                                <Select
                                    mode="multiple"
                                    style={{ width: '100%' }}
                                    placeholder="Vyberte si autora"
                                    disabled={this.state.pridatAutoraMode ? true : false}
                                >
                                    {this.state.autori}
                                </Select>
                            )}
                            {this.state.pridatAutoraMode ?
                                <a onClick={() => this.pridatAutora()} >Zavřít</a>
                                :
                                <a onClick={() => this.pridatAutora()} >Autor není vevýběru</a>
                            }
                        </Form.Item>
                        {this.state.pridatAutoraMode ?
                            <Form.Item label="Jméno autora">
                                {getFieldDecorator('jmenoAutora', {
                                    rules: [{ required: true, message: "Zadejte jmeno autora" }],
                                })(
                                    <Input placeholder="Jméno autora" />
                                )}
                            </Form.Item> : <div></div>
                        }
                        {this.state.pridatAutoraMode ?
                            <Form.Item label="Zarazeni autora">
                                {getFieldDecorator('zarazeni', {
                                    rules: [{ required: true, message: "Vyplňte zařazení" }],
                                })(
                                    <TextArea
                                        placeholder="Zarazeni"
                                        autoSize={{ minRows: 6, maxRows: 10 }}
                                    />
                                )}
                            </Form.Item> : <div></div>
                        }
                        {this.state.pridatAutoraMode ?
                            <Form.Item label="Zivot autora">
                                {getFieldDecorator('zivot', {
                                    rules: [{ required: true, message: "Vyplňte zařazení" }],
                                })(
                                    <TextArea
                                        placeholder="Zivot"
                                        autoSize={{ minRows: 6, maxRows: 10 }}
                                    />
                                )}
                            </Form.Item> : <div></div>
                        }
                        {this.state.pridatAutoraMode ?
                            <Form.Item label="Dila autora">
                                {getFieldDecorator('dilo', {
                                    rules: [{ required: true, message: "Vyplňte zařazení" }],
                                })(
                                    <TextArea
                                        placeholder="Díla"
                                        autoSize={{ minRows: 6, maxRows: 10 }}
                                    />
                                )}
                            </Form.Item> : <div></div>
                        }
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
                        <Form.Item label="Připomínka">
                            {getFieldDecorator('pripominka', {
                                rules: [{ required: false, message: " " }],
                            })(
                                <TextArea
                                    placeholder="Připomínka"
                                    autoSize={{ minRows: 4, maxRows: 8 }}
                                />
                            )}
                        </Form.Item>

                        <Button type="primary" htmlType="submit">
                            Navrhnout dílo
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
                // const dilo: any = { ...this.state.dilo, litDruh: this.state.vybranyLitDruh, litZanr: this.state.vybranyLitZanr, vybranykonkretniUtvar: this.state.vybranykonkretniUtvar, user: localStorage.getItem('id') }
                console.log(values);

                const dilo = { ...values, user: localStorage.getItem('id') };
                console.log(dilo);
                axios({
                    method: 'post',
                    url: '/navrhnoutDilo',
                    data: {
                        dilo: dilo
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

    private pridatAutora = () => {
        this.setState({
            pridatAutoraMode: !this.state.pridatAutoraMode
        });
    }

}

export default connect(reducer => reducer)(Form.create({ name: 'navrhDila' })(NavrhDila));