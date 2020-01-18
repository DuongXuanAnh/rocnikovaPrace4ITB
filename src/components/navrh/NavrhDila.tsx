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
    vypravec?: any
    typPromluvyPostav?: any
    versovaVystavba?: any
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
                doba:"",
                misto:"",
                temaDila: "",
                postavy: "",
                jazykoveProstredky: "",
                obsahDila:""
            },
            lit_druh: [],
            lit_zanr: [],
            vypravec: [],
            typPromluvyPostav: [],
            versovaVystavba: [],
        }
    }

    componentDidMount() {
        this.getLitDruh();
        this.getLitZanr();
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
                                <Input placeholder="Název díla" onChange={(event: any) => this.handleChangeNazevDila(event)} />
                            )}
                        </Form.Item>
                        <Form.Item label="Popis díla">
                            <Input placeholder="Popis díla" onChange={(event: any) => this.handleChangeDescription(event)} />
                        </Form.Item>
                        <Form.Item label="Autor">
                            {getFieldDecorator('autor', {
                                rules: [{ required: false, message: "Zadejte jméno autora" }],
                            })(
                                <Input placeholder="Jméno autora" onChange={(event: any) => this.handleChangeAutor(event)} />
                            )}
                        </Form.Item>
                        <Form.Item label="Literární druh">
                            <Select style={{ width: '100%' }} >
                                {this.state.lit_druh}
                            </Select>
                        </Form.Item>
                        <Form.Item label="Literární zanr">
                            <Select style={{ width: '100%' }} >
                                {this.state.lit_zanr}
                            </Select>
                        </Form.Item>
                        <Form.Item label="Konkrétní literární útvar">
                            <Input placeholder="Konkrétní literární útvar" onChange={(event: any) => this.handleChangeLitUtvar(event)}/>
                        </Form.Item>
                        <Form.Item label="Doba děje">
                                <Input placeholder="Doba děje" onChange={(event: any) => this.handleChangeDobaDeje(event)}/>
                        </Form.Item>
                        <Form.Item label="Místo děje">
                                <Input placeholder="Místo děje" onChange={(event: any) => this.handleChangeMistoDeje(event)}/>
                        </Form.Item>
                        <Form.Item label="Téma díla">
                                <Input placeholder="Téma díla" onChange={(event: any) => this.handleChangeTemaDila(event)}/>
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
                                <Input placeholder="Jazykové prostředky" onChange={(event: any) => this.handleChangeJazykoveProstredky(event)}/>
                        </Form.Item>
                        <Form.Item label="Obsah díla">
                                <TextArea
                                    placeholder="Obsah díla"
                                    autoSize={{ minRows: 4, maxRows: 8 }}
                                    onChange={(event: any) => this.handleChangeObsahDila(event)}
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
                console.log(this.state.dilo);
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
    private handleChangeLitUtvar = (e: any) => {
        this.setState({
            dilo: { ...this.state.dilo, lit_utvar: e.target.value }
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
    

}

export default connect(reducer => reducer)(Form.create({ name: 'navrhDila' })(NavrhDila));