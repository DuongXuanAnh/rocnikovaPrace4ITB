import React, { Component } from 'react';
import axios from 'axios';
import { Reducer } from '../../utils/generalTypes';
import { connect } from 'react-redux';
import { Select, Button, Input, Form, Row, Upload, Icon } from 'antd';
import DiloDetail from './DiloDetail';

interface Props {
    form: any
    history: any
    match: any
    reducer?: Reducer
    dispatch?: Function
}

interface State {
    dilo: any
    autori?: any
    lit_druh?: any
    lit_zanr?: any
    konkretni_utvar?: any
    vypravec?: any
    typPromluvyPostav?: any
    versovaVystavba?: any
    originAutor: any
    originVypravec: any
    originTypPromluvyPostav:any
    originVersovaVystavba:any
    loading: boolean
}

const { Option } = Select;
const { TextArea } = Input;


class EditDilo extends Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            dilo: {},
            autori: [],
            lit_druh: [],
            lit_zanr: [],
            konkretni_utvar: [],
            vypravec: [],
            typPromluvyPostav: [],
            versovaVystavba: [],
            originAutor: [],
            originVypravec: [],
            originTypPromluvyPostav: [],
            originVersovaVystavba:[],
            loading: false,
        }
    }

    // componentWillMount() {
    //     this.checkAdminUser();
    //     this.getAutori();
    //     this.getLitDruh();
    //     this.getLitZanr();
    //     this.getKonkretniUtvar();
    //     this.getVypravec();
    //     this.getTypPromluvyPostav();
    //     this.getVersovaVystavba();
    //     this.getOriginAutor();
    // }

    componentDidMount() {
        this.checkAdminUser();
        this.getAutori();
        this.getLitDruh();
        this.getLitZanr();
        this.getKonkretniUtvar();
        this.getVypravec();
        this.getTypPromluvyPostav();
        this.getVersovaVystavba();
        this.getOriginAutor();
        this.getDiloDetail();
        this.getOriginVypravec();
        this.getOriginTypPromluvyPostav();
        this.getOriginVersovaVystavba();
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
                            <Input placeholder="Název díla" value={this.state.dilo.nazev} onChange={(event:any) => this.handleChangeNazevDila(event)}/>
                        </Form.Item>
                        <Form.Item label="Popis díla">
                            <Input placeholder="Popis díla" value={this.state.dilo.description} onChange={(event:any) => this.handleChangeDescription(event)}/>
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
                        </Form.Item>
                        <Form.Item label="Literární druh">
                            <Select style={{ width: '100%' }} value={this.state.dilo.lit_druh} onChange={(event: any) => this.handleChangeLitDruh(event)}>
                                {this.state.lit_druh}
                            </Select>
                        </Form.Item>
                       <Form.Item label="Literární zanr">
                            <Select style={{ width: '100%' }} value={this.state.dilo.lit_zanr} onChange={(event: any) => this.handleChangeLitZanr(event)}>
                                {this.state.lit_zanr}
                            </Select>
                        </Form.Item>
                        <Form.Item label="Konkrétní literární útvar">
                            <Select style={{ width: '100%' }} value={this.state.dilo.konkretni_utvar} onChange={(event: any) => this.handleChangeKonkretniUtvar(event)} >
                                {this.state.konkretni_utvar}
                            </Select>
                        </Form.Item>
                          <Form.Item label="Doba děje">
                            <Input placeholder="Doba děje" value={this.state.dilo.dobaDeje} onChange={(event: any) => this.handleChangeDobaDeje(event)}/>
                        </Form.Item>
                        <Form.Item label="Místo děje">
                            <Input placeholder="Místo děje" value={this.state.dilo.mistoDeje} onChange={(event: any) => this.handleChangeMistoDeje(event)}/>
                        </Form.Item>
                       <Form.Item label="Postavy">
                            <TextArea
                                placeholder="- **Jméno postavy: ** popis postavy."
                                autoSize={{ minRows: 3, maxRows: 5 }}
                                value={this.state.dilo.postavy} onChange={(event: any) => this.handleChangePostavy(event)}
                            />
                        </Form.Item>
                        <Form.Item label="Téma díla">
                            <Input placeholder="Téma díla" value={this.state.dilo.tema_dila} onChange={(event: any) => this.handleChangeTemaDila(event)}/>
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
                            <Input placeholder="Jazykové prostředky" value={this.state.dilo.jazykove_prostredky} onChange={(event: any) => this.handleChangeJazykoveProstredky(event)} />
                        </Form.Item>
                         <Form.Item label="Obsah díla">
                            <TextArea
                                placeholder="Obsah díla"
                                autoSize={{ minRows: 4, maxRows: 8 }}
                                value={this.state.dilo.obsahDila} onChange={(event: any) => this.handleChangeObsahDila(event)}
                            />
                        </Form.Item>
                       {/*  <Form.Item label="Fotka">
                            {getFieldDecorator('image', {
                                rules: [{ required: true, message: "Vyberte si fotku" }],
                            })(
                                <Upload {...config}>
                                    <Button>
                                        <Icon type="upload" /> Click to Upload
                                </Button>
                                </Upload>
                            )}
                        </Form.Item> */}
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Upravit dílo
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
                // console.log(this.state.originAutor);
                // console.log(this.state.originVypravec);
                // console.log(this.state.originTypPromluvyPostav);
                // console.log(this.state.originVersovaVystavba);
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
                    res.data.map((val: any, key: any) => {
                        autori.push(<Option key={val.id}>{val.name}</Option>);
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

    private getOriginAutor = () => {
        const id: number = parseInt(this.props.match.params.id, 10);
        axios({
            method: 'get',
            url: '/getOriginAutor',
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
                        originAutor: originAutor
                    });
                }
            ).catch(err => err)
    }
    private getOriginVypravec = () => {
        const id: number = parseInt(this.props.match.params.id, 10);
        axios({
            method: 'get',
            url: '/getOriginVypravec',
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
                        originVypravec: originVypravec
                    });
                }
            ).catch(err => err)
    }
    private getOriginTypPromluvyPostav = () => {
        const id: number = parseInt(this.props.match.params.id, 10);
        axios({
            method: 'get',
            url: '/getOriginTypPromluvyPostav',
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
                        originTypPromluvyPostav: originTypPromluvyPostav
                    });
                }
            ).catch(err => err)
    }
    private getOriginVersovaVystavba = () => {
        const id: number = parseInt(this.props.match.params.id, 10);
        axios({
            method: 'get',
            url: '/getOriginVersovaVystavba',
            withCredentials: true,
            params: {
                idDila: id
            }
        })
            .then(
                res => {
                    console.log(res.data);
                    const originVersovaVystavba: any = [];
                    res.data.map((value: any, key: any) => {
                        originVersovaVystavba.push(value.id_versovaVystavba.toString())
                    })
                    this.setState({
                        originVersovaVystavba: originVersovaVystavba
                    });
                }
            ).catch(err => err)
    }

    private handleChangeNazevDila = (e:any) => {
        this.setState({
            dilo: {...this.state.dilo, nazev: e.target.value}
        });
    }
    private handleChangeAutora = (value: any) => {
        this.setState({
            originAutor: value
        });
    }
    private handleChangeDescription = (e:any) => {
        this.setState({
            dilo: {...this.state.dilo, description: e.target.value}
        });
    }
    private handleChangeLitDruh = (e:any) => {
        this.setState({
            dilo: {...this.state.dilo, lit_druh: e}
        });
    }
    private handleChangeLitZanr = (e:any) => {
        this.setState({
            dilo: {...this.state.dilo, lit_zanr: e}
        });
    }
    private handleChangeKonkretniUtvar = (e:any) => {
        this.setState({
            dilo: {...this.state.dilo, konkretni_utvar: e}
        });
    }
    private handleChangeDobaDeje = (e:any) => {
        this.setState({
            dilo: {...this.state.dilo, dobaDeje: e.target.value}
        });
    }
    private handleChangeMistoDeje = (e:any) => {
        this.setState({
            dilo: {...this.state.dilo, mistoDeje: e.target.value}
        });
    }
    private handleChangePostavy = (e:any) => {
        this.setState({
            dilo: {...this.state.dilo, postavy: e.target.value}
        });
    }
    private handleChangeTemaDila = (e:any) => {
        this.setState({
            dilo: {...this.state.dilo, tema_dila: e.target.value}
        });
    }
    private handleChangeVypravec = (value:any) => {
        this.setState({
            originVypravec: value
        });
    }
    private handleChangeTypPromluvyPostav = (value:any) => {
        this.setState({
            originTypPromluvyPostav: value
        });
    }
    private handleChangeVersovaVystavba = (value:any) => {
        this.setState({
            originVersovaVystavba: value
        });
    }
    private handleChangeJazykoveProstredky = (e:any) => {
        this.setState({
            dilo: {...this.state.dilo, jazykove_prostredky: e.target.value}
        });
    }
    private handleChangeObsahDila = (e:any) => {
        this.setState({
            dilo: {...this.state.dilo, obsahDila: e.target.value}
        });
    }
    

    private getDiloDetail() {
        this.setState({
            loading: true
        });
        const id: number = parseInt(this.props.match.params.id, 10);
        axios({
            method: 'get',
            url: '/dilo/' + id,
            withCredentials: true,
        })
            .then(
                res => {
                    this.setState({
                        dilo: { ...res.data, lit_druh: res.data.Lit_druh.nazev, lit_zanr: res.data.Lit_zanr.nazev, konkretni_utvar: res.data.Konkretni_utvar.nazev },
                        loading: false
                    });
                    console.log(this.state.dilo);
                }
            ).catch(err => {
                this.setState({
                    loading: false
                });
            })
    }

    private checkAdminUser = () => {
        var accessToken = localStorage.getItem('accessToken');
        var id = Number(localStorage.getItem('id'));
        var email = localStorage.getItem('email');
        var admin = localStorage.getItem('admin');
        // console.log(accessToken, id, email, admin);
        if (id !== 0 && accessToken !== null && email !== null && admin !== "true") {
            this.props.history.push('/');
        }
        else if (id === 0 && accessToken === null && email === null && admin === null) {
            this.props.history.push('/');

        }
    }

}

export default connect(reducer => reducer)(Form.create({ name: 'addNewDilo' })(EditDilo));