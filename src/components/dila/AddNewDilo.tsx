import React, { Component } from 'react';
import { Descriptions, Select, Button, Input } from 'antd';
import axios from 'axios';

interface Props {

}

interface State {
    dilo: any
    autori?: any,
    lit_druh?: any,
    lit_zanr?: any,
    konkretni_utvar?: any
    vypravec?: any
    typPromluvyPostav?: any
    versovaVystavba?: any
}

const { Option } = Select;

class AddNewDilo extends Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            dilo: {
                nazevDila: "",
                idAutoru: [],
                lit_druh: "",
                lit_zanr: "",
                konkretni_utvar: "",
                dobaDeje: "",
                mistoDeje: "",
                temaDila: "",
                vypravec: [],
                typPromluvyPostav: [],
                versovaVystavba: [],
                jazykoveProstredky: "",
            },
            autori: [],
            lit_druh: [],
            lit_zanr: [],
            konkretni_utvar: [],
            vypravec: [],
            typPromluvyPostav: [],
            versovaVystavba: []
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
        return (
            <React.Fragment>

                <Descriptions title="" bordered>
                    <Descriptions.Item label="Název díl" span={3}>
                        <Input placeholder="Název díla" onChange={(e: any) => { this.setState({ dilo: { ...this.state.dilo, nazevDila: e.target.value } }); }} />
                    </Descriptions.Item>
                    <Descriptions.Item label="Autor" span={3}>
                        <Select
                            mode="multiple"
                            style={{ width: '100%' }}
                            placeholder="Vyberte si autora"
                            onChange={(event: any) => this.sstAutora(event)}
                        >
                            {this.state.autori}
                        </Select>
                    </Descriptions.Item>
                    <Descriptions.Item label="Literární druh" span={1}>
                        <Select style={{ width: '100%' }} onChange={(event: any) => this.sstLitDruh(event)}>
                            {this.state.lit_druh}
                        </Select>
                    </Descriptions.Item>
                    <Descriptions.Item label="Literární žánr" span={1}>
                        <Select style={{ width: '100%' }} onChange={(event: any) => this.sstLitZanr(event)}>
                            {this.state.lit_zanr}
                        </Select>
                    </Descriptions.Item>
                    <Descriptions.Item label="Konkrétní literární útvar" span={1}>
                        <Select style={{ width: '100%' }} onChange={(event: any) => this.sstKonkretniUtvar(event)}>
                            {this.state.konkretni_utvar}
                        </Select>
                    </Descriptions.Item>
                    <Descriptions.Item label="Místo a doba děje" span={1.5}>
                        <Input placeholder="Doba děje" onChange={(e: any) => { this.setState({ dilo: { ...this.state.dilo, dobaDeje: e.target.value } }) }} />
                        <hr></hr>
                        <Input placeholder="Místo děje" onChange={(e: any) => { this.setState({ dilo: { ...this.state.dilo, mistoDeje: e.target.value } }) }} />
                    </Descriptions.Item>
                    <Descriptions.Item label="Téma díla" span={1.5}>
                        <Input placeholder="Téma díla" onChange={(e: any) => { this.setState({ dilo: { ...this.state.dilo, temaDila: e.target.value } }) }}/>
                    </Descriptions.Item>
                    <Descriptions.Item label="Hlavní postavy" span={3}>{}</Descriptions.Item>
                    <Descriptions.Item label="Vypraveč" span={1.5}>
                        <Select
                            mode="multiple"
                            style={{ width: '100%' }}
                            placeholder="Vypraveč"
                            onChange={(event: any) => this.sstVypravec(event)}
                        >
                            {this.state.vypravec}
                        </Select>
                    </Descriptions.Item>
                    <Descriptions.Item label="Typy promluv postav" span={1.5}>
                        <Select
                            mode="multiple"
                            style={{ width: '100%' }}
                            placeholder="Typy promluv postav"
                            onChange={(event: any) => this.sstTypPromluvyPostav(event)}
                        >
                            {this.state.typPromluvyPostav}
                        </Select>
                    </Descriptions.Item>
                    <Descriptions.Item label="Veršová výstavba" span={3}>
                        <Select
                            mode="multiple"
                            style={{ width: '100%' }}
                            placeholder="Veršová výstavba"
                            onChange={(event: any) => this.sstVersovaVystavba(event)}
                        >
                            {this.state.versovaVystavba}
                        </Select>
                    </Descriptions.Item>
                    <Descriptions.Item label="Jazykové prostředky">
                        <Input placeholder="Jazykové prostředky" />
                    </Descriptions.Item>
                </Descriptions>

                <Button type="primary" onClick={() => this.addNewDilo()}>Přidat dílo</Button>
            </React.Fragment>
        );
    }

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

    private sstAutora = (e: any) => {
        this.setState({
            dilo: { ...this.state.dilo, idAutor: e },
        });
    }

    private sstLitDruh = (e: any) => {
        this.setState({
            dilo: { ...this.state.dilo, lit_druh: e }
        });
    }

    private sstLitZanr = (e: any) => {
        this.setState({
            dilo: { ...this.state.dilo, lit_zanr: e }
        });
    }

    private sstKonkretniUtvar = (e: any) => {
        this.setState({
            dilo: { ...this.state.dilo, konkretni_utvar: e }
        });
    }

    private sstVypravec = (e: any) => {
        this.setState({
            dilo: {
                ...this.state.dilo, vypravec: e
            }
        });
    }

    private sstTypPromluvyPostav = (e: any) => {
        this.setState({
            dilo: {
                ...this.state.dilo, typPromluvyPostav: e
            }
        });
    }

    private sstVersovaVystavba = (e: any) => {
        this.setState({
            dilo: {
                ...this.state.dilo, versovaVystavba: e
            }
        });
    }

    private addNewDilo = () => {
        console.log(this.state.dilo);
    }
}

export default AddNewDilo;