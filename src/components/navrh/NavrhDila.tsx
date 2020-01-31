import React, { Component } from 'react';
import { Row, Button, Select, Input, Form } from 'antd';
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
                                rules: [{ required: false, message: "Zadejte název díla" }],
                            })(
                                <Input placeholder="Název díla" />
                            )}
                        </Form.Item>
                        <Form.Item label="Popis díla">
                            {getFieldDecorator('description', {
                                rules: [{ required: false, message: "Zadejte popis díla" }],
                            })(
                                <Input placeholder="Description" />
                            )}
                        </Form.Item>
                        <Form.Item label="Autor">
                            {getFieldDecorator('autor', {
                                rules: [{ required: false, message: "Vyberte si autora" }],
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
                                rules: [{ required: false, message: "Vyberte si literární druh" }],
                            })(
                                <Select style={{ width: '100%' }} >
                                    {this.state.lit_druh}
                                </Select>

                            )}
                        </Form.Item>

                        <Form.Item label="Literární zanr">
                            {getFieldDecorator('lit_zanr', {
                                rules: [{ required: false, message: "Vyberte si literární žánr" }],
                            })(
                                <Select style={{ width: '100%' }} >
                                    {this.state.lit_zanr}
                                </Select>
                            )}
                        </Form.Item>
                        <Form.Item label="Konkrétní literární útvar">
                            {getFieldDecorator('konkretni_utvar', {
                                rules: [{ required: false, message: "Vyberte si literární útvar" }],
                            })(
                                <Select style={{ width: '100%' }} >
                                    {this.state.konkretni_utvar}
                                </Select>
                            )}
                        </Form.Item>

                        <Form.Item label="Doba děje">
                            {getFieldDecorator('dobaDeje', {
                                rules: [{ required: false, message: " " }],
                            })(
                                <Input placeholder="Doba děje" />
                            )}
                        </Form.Item>
                        <Form.Item label="Místo děje">
                            {getFieldDecorator('mistoDeje', {
                                rules: [{ required: false, message: " " }],
                            })(
                                <Input placeholder="Místo děje" />
                            )}
                        </Form.Item>
                        <Form.Item label="Postavy">
                            {getFieldDecorator('postavy', {
                                rules: [{ required: false, message: " " }],
                            })(
                                <TextArea
                                    placeholder="- **Jméno postavy: ** popis postavy."
                                    autoSize={{ minRows: 3, maxRows: 5 }}
                                />
                            )}
                        </Form.Item>
                        <Form.Item label="Téma díla">
                            {getFieldDecorator('tema_dila', {
                                rules: [{ required: false, message: " " }],
                            })(
                                <Input placeholder="Téma díla" />
                            )}
                        </Form.Item>
                        <Form.Item label="Vypraveč">
                            {getFieldDecorator('vypravec', {
                                rules: [{ required: false, message: "Vyberte si vypravěče" }],
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
                                rules: [{ required: false, message: " " }],
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
                                rules: [{ required: false, message: " " }],
                            })(
                                <Input placeholder="Jazykové prostředky" />
                            )}
                        </Form.Item>
                        <Form.Item label="Obsah díla">
                            {getFieldDecorator('obsahDila', {
                                rules: [{ required: false, message: " " }],
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
                                    onChange={(event: any) => this.handleChangePripominka(event)}
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
                // console.log(this.state.dilo);
               
                const dilo = {...values, user: localStorage.getItem('id') };
                console.log(dilo);
                axios({
                    method: 'post',
                    url: '/navrhnoutDilo',
                    // withCredentials: true,
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

    private handleChangeNazevDila = (e: any) => {
        this.setState({
            dilo: { ...this.state.dilo, nazev: e.target.value }
        });
    }
    private handleChangeDescription = (e: any) => {
        this.setState({
            dilo: { ...this.state.dilo, description: e.target.value }
        });
    }
    private handleChangeAutor = (e: any) => {
        this.setState({
            dilo: { ...this.state.dilo, autor: e.target.value }
        });
    }
    private handleChangeMistoDeje = (e: any) => {
        this.setState({
            dilo: { ...this.state.dilo, misto: e.target.value }
        });
    }
    private handleChangeDobaDeje = (e: any) => {
        this.setState({
            dilo: { ...this.state.dilo, doba: e.target.value }
        });
    }
    private handleChangeTemaDila = (e: any) => {
        this.setState({
            dilo: { ...this.state.dilo, temaDila: e.target.value }
        });
    }
    private handleChangePostavy = (e: any) => {
        this.setState({
            dilo: { ...this.state.dilo, postavy: e.target.value }
        });
    }
    private handleChangeJazykoveProstredky = (e: any) => {
        this.setState({
            dilo: { ...this.state.dilo, jazykoveProstredky: e.target.value }
        });
    }
    private handleChangeObsahDila = (e: any) => {
        this.setState({
            dilo: { ...this.state.dilo, obsahDila: e.target.value }
        });
    }
    private handleChangePripominka = (e: any) => {
        this.setState({
            dilo: { ...this.state.dilo, pripominka: e.target.value }
        });
    }
    private handleChangeLitDruh = (e: any) => {
        this.setState({
            vybranyLitDruh: e
        });
    }
    private handleChangeLitZanr = (e: any) => {
        this.setState({
            vybranyLitZanr: e
        });
    }
    private handleChangeKonkretniUtvar = (e: any) => {
        this.setState({
            vybranykonkretniUtvar: e
        });
    }

}

export default connect(reducer => reducer)(Form.create({ name: 'navrhDila' })(NavrhDila));