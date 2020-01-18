import React, { Component } from 'react';
import { Collapse, Icon, Descriptions, Spin, Popconfirm, Button, notification } from 'antd';
import { connect } from 'react-redux';
import axios from 'axios';
import { Reducer } from '../../utils/generalTypes';
import marked from "marked";
import { withRouter } from 'react-router';

interface Props {
    match: any
    location: any
    history: any
    reducer?: Reducer
    dispatch?: Function
}

interface State {
    dilo: any
    loading: boolean
    obsahDila: any
    postavy: any
    obsahDilaPath: any
    postavyPath: any
    editDilo: boolean
}

const { Panel } = Collapse;
const customPanelStyle = {
    background: '#f7f7f7',
    borderRadius: 4,
    marginBottom: 0,
    border: 0,
    overflow: 'hidden',
};

class DiloDetail extends Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            dilo: {},
            loading: false,
            obsahDila: null,
            postavy: null,
            obsahDilaPath: null,
            postavyPath: null,
            editDilo: false
        }
    }

    componentDidMount() {
        this.getDiloDetail();
    }

    render() {
        const dilo: any = this.state.dilo;

        return (
            <React.Fragment>
                {this.state.loading ?
                    <div
                        style={{
                            position: "fixed",
                            zIndex: 1501,
                            background: "#000000",
                            height: "100vh",
                            opacity: 0.5,
                            width: "100%",

                        }}>>
                        <Spin tip="Načítání díla..." size="large" style={{
                            fontSize: '1.5em',
                            position: 'absolute',
                            left: '50%',
                            top: '45%',
                            "transform": "translate(-50%, -50%)"
                        }}></Spin>
                    </div> :
                    <div>
                        {
                            (this.props.reducer && this.props.reducer.user && this.props.reducer.user.admin === true) ?
                                <div>
                                    <Popconfirm
                                        title="Opravdu chcete smazat toto dílo?"
                                        onConfirm={(event) => this.confirm(event)}
                                        onCancel={(event) => this.cancel(event)}
                                        okText="Ano"
                                        cancelText="Ne"
                                    >
                                        <Button type="danger" style={{
                                            margin: "2em 0 0 2em"
                                        }}>Smazat dílo</Button>

                                    </Popconfirm>
                                    <Button type="primary"
                                        style={{
                                            margin: "2em 0 0 2em",
                                            background: "#ffc53d",
                                            borderColor: "#faad14"
                                        }}
                                        onClick = {() => this.editDilo()}
                                        >Upravit dílo</Button>
                                </div>

                                : ""
                        }
                        <h1 style={{
                            textTransform: "uppercase",
                            padding: "1em",
                            fontSize: "2em"
                        }}
                        >{dilo.nazev}</h1>
                        <Descriptions title="" bordered>
                            <Descriptions.Item label="Autor" span={3}>
                                {
                                    dilo.Autors !== undefined ?
                                        dilo.Autors.map((value: any, key: any) => {
                                            return <a onClick={() => this.autorDetail(value.id)} ><li>{value.name}</li></a>
                                        }) : ""
                                }
                            </Descriptions.Item>
                            <Descriptions.Item label="Literární druh" span={1}>{dilo.lit_druh}</Descriptions.Item>
                            <Descriptions.Item label="Literární žánr" span={1}>{dilo.lit_zanr}</Descriptions.Item>
                            <Descriptions.Item label="Konkrétní literární útvar" span={1}>{dilo.konkretni_utvar}</Descriptions.Item>
                            <Descriptions.Item label="Místo a doba děje" span={3}>

                                {
                                    dilo.mistoDeje !== null ? <li>{dilo.mistoDeje}</li> : ""
                                }
                                {
                                    dilo.dobaDeje !== null ? <li>{dilo.dobaDeje}</li> : ""
                                }
                            </Descriptions.Item>
                            <Descriptions.Item label="Téma díla" span={3}>{dilo.tema_dila}</Descriptions.Item>
                            <Descriptions.Item label="Hlavní postavy" span={3}>
                                <div dangerouslySetInnerHTML={{ __html: this.state.postavy }}></div>
                            </Descriptions.Item>
                            <Descriptions.Item label="Vypraveč">
                                {
                                    dilo.Vypravecs !== undefined ?
                                        dilo.Vypravecs.map((value: any, key: any) => {
                                            return <li>{value.name}</li>
                                        }) : ""
                                }
                            </Descriptions.Item>
                            <Descriptions.Item label="Typy promluv postav">
                                {
                                    dilo.Typ_Promluvy_Postavs !== undefined ?
                                        dilo.Typ_Promluvy_Postavs.map((value: any, key: any) => {
                                            return <li>{value.nazev}</li>
                                        }) : ""
                                }
                            </Descriptions.Item>

                            {
                                dilo.Versova_vystavbas !== undefined ?

                                    <Descriptions.Item label="Veršová výstavba">
                                        {
                                            dilo.Versova_vystavbas !== "" ?
                                                dilo.Versova_vystavbas.map((value: any, key: any) => {
                                                    return <li>{value.nazev}</li>
                                                }) : "Nemá"
                                        }

                                    </Descriptions.Item>
                                    : ""
                            }
                            <Descriptions.Item label="Jazykové prostředky">{dilo.jazykove_prostredky}</Descriptions.Item>
                        </Descriptions>
                        <Collapse
                            bordered={false}
                            expandIcon={({ isActive }) => <Icon type="caret-right" rotate={isActive ? 90 : 0} />}
                        >
                            <Panel header="Obsah díla" key="1" style={customPanelStyle}>
                                <div dangerouslySetInnerHTML={{ __html: this.state.obsahDila }}></div>
                            </Panel>
                        </Collapse>
                    </div>
                }
            </React.Fragment >

        );
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
                        postavy: marked(res.data.postavy),
                        obsahDila: marked(res.data.obsahDila),
                        loading: false
                    });
                }
            ).catch(err => {
                this.setState({
                    loading: false
                });
            })
    }

    private autorDetail(id: number) {
        this.props.history.push('../autor/' + id);
    }

    private confirm(e: any) {
        const id: number = parseInt(this.props.match.params.id, 10);
        axios({
            method: 'delete',
            url: '/deleteDilo/' + id,
            withCredentials: true,
            headers: { 'Authorization': 'Bearer ' + this.props.reducer!.user!.accessToken },
        })
            .then(
                res => {
                    if (res.data === "deleted") {
                        this.props.history.push('/dila');
                        this.openNotificationDeleted();
                    }
                }
            ).catch(err => err)
    }

    private cancel(e: any) {

    }

    private editDilo(){
        const id: number = parseInt(this.props.match.params.id, 10);
        this.props.history.push('/editDilo/' + id);
    }

    private openNotificationDeleted = () => {
        notification.open({
            message: 'Notifikace',
            description:
                'Dílo bylo smazaný!',
            onClick: () => {
                console.log('Notification Clicked!');
            },
        });
    };
}

export default withRouter((connect(reducer => reducer)(DiloDetail)));