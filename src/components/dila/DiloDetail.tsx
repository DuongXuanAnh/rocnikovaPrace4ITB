import React, { Component } from 'react';
import { Collapse, Icon, Descriptions, Badge } from 'antd';
import { connect } from 'react-redux';
import axios from 'axios';
import { Reducer } from '../../utils/generalTypes';
import marked from "marked";

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
        }
    }

    componentDidMount() {
        this.getDiloDetail();
    }


    render() {

        const dilo: any = this.state.dilo;

        return (
            <React.Fragment>
                <h1 style={{ textTransform: "uppercase" }}>Krysař - Viktor dyk</h1>

                <Descriptions title="" bordered>
                    <Descriptions.Item label="Literární druh">{dilo.lit_druh}</Descriptions.Item>
                    <Descriptions.Item label="Literární žánr">{dilo.lit_zanr}</Descriptions.Item>
                    <Descriptions.Item label="Konkrétní literární útvar">{dilo.konkretni_utvar}</Descriptions.Item>
                    <Descriptions.Item label="Místo a doba děje" span={3}>

                        {
                            dilo.mistoDeje !== "" ? <li>{dilo.mistoDeje}</li> : ""
                        }
                        {
                            dilo.dobaDeje !== "" ? <li>{dilo.dobaDeje}</li> : ""
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
                                dilo.Versova_vystavbas === "" ?
                                 dilo.Versova_vystavbas.map((value: any, key: any) => {
                                     return <li>{value.nazev}</li>
                                 }) : "Nejedná se o verše"
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
            </React.Fragment>
        );
    }

    private getDiloDetail() {
        this.setState({
            loading: true
        });
        const id: number = parseInt(this.props.match.params.id, 10);;
        axios({
            method: 'get',
            url: '/dilo/' + id,
            withCredentials: true,
        })
            .then(
                res => {
                    let normalized: any = { ...res.data[0], lit_druh: res.data[0].Lit_druh.nazev, lit_zanr: res.data[0].Lit_zanr.nazev, konkretni_utvar: res.data[0].Konkretni_utvar.nazev }

                    this.setState({
                        dilo: normalized,
                        postavy: normalized.postavy,
                        obsahDila: normalized.obsahDila
                    });
        
                    this.showPostavy();
                    this.showObsahDila();

                }
            ).catch(err => err)
    }

    private showPostavy = () => {
        let zarazeniPath = require("./../../dila/postavy/"+this.state.postavy);
        fetch(zarazeniPath)
            .then(response => {
                return response.text()
            })
            .then(text => {
                this.setState({
                    postavy: marked(text)
                })
              
            })
    }

    private showObsahDila = () => {
        let zarazeniPath = require("./../../dila/obsah/"+this.state.obsahDila);
        fetch(zarazeniPath)
            .then(response => {
                return response.text()
            })
            .then(text => {
                this.setState({
                    obsahDila: marked(text)
                })
            })
    }
}

export default (connect(reducer => reducer)(DiloDetail));