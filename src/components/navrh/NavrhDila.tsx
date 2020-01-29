import React, { Component } from 'react';
import { Row, Button, Select, Input, Form } from 'antd';
import { connect } from 'react-redux';
import axios from 'axios';

interface Props {
    form: any
}

interface State {
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
                                <Input placeholder="Název díla" onChange={(event: any) => this.handleChangeNazevDila(event)} />
                            )}
                        </Form.Item>
                        <Form.Item label="Popis díla">
                            <Input placeholder="Popis díla" onChange={(event: any) => this.handleChangeDescription(event)} />
                        </Form.Item>
                        <Form.Item label="Autor">
                            {getFieldDecorator('autor', {
                                rules: [{ required: true, message: "Zadejte jméno autora" }],
                            })(
                                <Input placeholder="Jméno autora" onChange={(event: any) => this.handleChangeAutor(event)} />
                            )}
                        </Form.Item>
                        <Form.Item label="Literární druh">
                            <Select style={{ width: '100%' }} onChange={(event: any) => this.handleChangeLitDruh(event)}>
                                {this.state.lit_druh}
                            </Select>
                        </Form.Item>
                        <Form.Item label="Literární zanr">
                            <Select style={{ width: '100%' }} onChange={(event: any) => this.handleChangeLitZanr(event)}>
                                {this.state.lit_zanr}
                            </Select>
                        </Form.Item>
                        <Form.Item label="Konkrétní literární útvar">
                            <Select style={{ width: '100%' }} onChange={(event: any) => this.handleChangeKonkretniUtvar(event)} >
                                {this.state.konkretni_utvar}
                            </Select>
                        </Form.Item>
                        <Form.Item label="Doba děje">
                            <Input placeholder="Doba děje" onChange={(event: any) => this.handleChangeDobaDeje(event)} />
                        </Form.Item>
                        <Form.Item label="Místo děje">
                            <Input placeholder="Místo děje" onChange={(event: any) => this.handleChangeMistoDeje(event)} />
                        </Form.Item>
                        <Form.Item label="Téma díla">
                            <Input placeholder="Téma díla" onChange={(event: any) => this.handleChangeTemaDila(event)} />
                        </Form.Item>
                        <Form.Item label="Postavy">
                            <TextArea
                                placeholder="- **Jméno postavy: ** popis postavy."
                                autoSize={{ minRows: 3, maxRows: 5 }}
                                onChange={(event: any) => this.handleChangePostavy(event)}
                            />
                        </Form.Item>
                        <Form.Item label="Veršová výstavba">
                            <Select
                                mode="multiple"
                                style={{ width: '100%' }}
                                placeholder="Veršová výstavba"
                            >
                                {this.state.versovaVystavba}
                            </Select>
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
                        <Form.Item label="Jazykové prostředky">
                            <Input placeholder="Jazykové prostředky" onChange={(event: any) => this.handleChangeJazykoveProstredky(event)} />
                        </Form.Item>
                        <Form.Item label="Obsah díla">
                            <TextArea
                                placeholder="Obsah díla"
                                autoSize={{ minRows: 4, maxRows: 8 }}
                                onChange={(event: any) => this.handleChangeObsahDila(event)}
                            />
                        </Form.Item>
                        <Form.Item label="Připomínka">
                            <TextArea
                                placeholder="Připomínka"
                                autoSize={{ minRows: 4, maxRows: 8 }}
                                onChange={(event: any) => this.handleChangePripominka(event)}
                            />
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
                const dilo: any = { ...this.state.dilo, litDruh: this.state.vybranyLitDruh, litZanr: this.state.vybranyLitZanr,vybranykonkretniUtvar:this.state.vybranykonkretniUtvar, user: localStorage.getItem('id') }
                // console.log(this.state.dilo);
                // console.log(this.state.vybranyLitDruh);
                // console.log(this.state.vybranyLitZanr);
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