import React, { Component } from 'react';
import { Row, Col } from 'antd';

interface Props {

}

interface State {
}

class AutoriDetail extends Component<Props, State>{
    constructor(props: Props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <React.Fragment>
                <Row>
                    <Col span={8}>

                        <img
                            style={{
                                height: "auto",
                                width: "100%",
                                padding: "2em",
                                borderRadius: "4em"
                            }}
                            alt="logo" src="https://www.kniznice.cz/media/k2/items/cache/461011bcaf5b5e723e897c33f049f169_XL.jpg" />

                    </Col>
                    <Col span={16}>
                        <div style={{ padding: "2em" }}>
                             <h1 style={{ fontSize: "2em" }}>Viktor Dyk <span>(1877 - 1931)</span></h1> 
                        </div>
                        <Row>
                            <Col span={8} style={{ paddingRight:"1em" }}>
                                <h3>Zařazení:</h3>
                                <li>Český autor 1. poloviny 20. století.</li>
                                <li>Před 1. světovou válkou patřil k anarchistickým buřičům.</li>
                                <li>Básník, prozaik a dramatik.</li>
                                <li>Věnoval se i publicistice a zapojoval se aktivně do politickýho a veřejného života.</li>
                                <li>V anarchistickým obdobý psal hlavně poezie-básně vyjadřující jeho nesouhlas sestavem české společností (Satira a ironie).</li>
                                <li>Později převažuje próza - častý motiv - vlastenectví a národní hrdost (Zdůrazňoval právo národa na samostatnost).</li>
                               
                            </Col>
                            <Col span={8} style={{ paddingRight:"1em" }}>
                                <h3>Život:</h3>
                                <li>Narozen v roku 1877.</li>
                                <li>Pocházel z venkova (vesnice Pšovka u Mělníka).</li>
                                <li>Vystudoval gymnázium a právnickou fakultu v Praze.</li>
                                <li>Jediný z anarchistických buřiců, který dokončil studia na universitě.</li>
                                <li>Po ukončení studií - publicistická práce a politické aktivity.</li>
                                <li>Za 1. světový války za politický nízory byl vězněn.</li>
                                <li>Po válce pokračoval v literárni a publicistické činnosti i v politických aktivitách (Člen Narodné demokratické strany).</li>
                                <li>Tragicky zahynul roku 1931 na dovolené v Jugoslávii (utopil se).</li>
                            </Col>
                            <Col span={8} style={{ paddingRight:"1em" }}>
                                <h3>Díla:</h3>
                                    I. Próza
                                     <li></li>
                                
                            </Col>
                        </Row>
                    </Col>
                </Row>

            </React.Fragment>
        );
    }
}

export default AutoriDetail;