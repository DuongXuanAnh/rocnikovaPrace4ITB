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
        return (
            <React.Fragment>
                <h1 style={{ textTransform: "uppercase" }}>Krysař - Viktor dyk</h1>

                <Descriptions title="" bordered>
                    <Descriptions.Item label="Literární druh">Próza</Descriptions.Item>
                    <Descriptions.Item label="Literární žánr">Epika</Descriptions.Item>
                    <Descriptions.Item label="Konkrétní literární útvar">Novela</Descriptions.Item>
                    <Descriptions.Item label="Místo a doba děje" span={3}>V městě Hammeln</Descriptions.Item>
                    <Descriptions.Item label="Téma díla" span={3}>
                        Láska a pomsta
                    </Descriptions.Item>
                    <Descriptions.Item label="Hlavní postavy" span={3}>
                    </Descriptions.Item>
                    <Descriptions.Item label="Vypraveč">Er forma - 3. osoba</Descriptions.Item>
                    <Descriptions.Item label="Typy promluv postav">Dialog, monolog, přímá řeč</Descriptions.Item>
                    <Descriptions.Item label="Veršévá výstavba">Jedna se pouze o poezii</Descriptions.Item>
                    <Descriptions.Item label="Jazykové prostředky">Dílo je napsáno výhradně spisovnou češtinou</Descriptions.Item>

                </Descriptions>
                <Collapse
                    bordered={false}
                    expandIcon={({ isActive }) => <Icon type="caret-right" rotate={isActive ? 90 : 0} />}
                >
                    <Panel header="Obsah díla" key="1" style={customPanelStyle}>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi doloribus quod ipsa? Quae magnam eius repudiandae asperiores deserunt rerum sunt, quidem natus laboriosam amet obcaecati atque fugiat aspernatur facere ullam.
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi doloribus quod ipsa? Quae magnam eius repudiandae asperiores deserunt rerum sunt, quidem natus laboriosam amet obcaecati atque fugiat aspernatur facere ullam.Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi doloribus quod ipsa? Quae magnam eius repudiandae asperiores deserunt rerum sunt, quidem natus laboriosam amet obcaecati atque fugiat aspernatur facere ullam.Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi doloribus quod ipsa? Quae magnam eius repudiandae asperiores deserunt rerum sunt, quidem natus laboriosam amet obcaecati atque fugiat aspernatur facere ullam.Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi doloribus quod ipsa? Quae magnam eius repudiandae asperiores deserunt rerum sunt, quidem natus laboriosam amet obcaecati atque fugiat aspernatur facere ullam.Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi doloribus quod ipsa? Quae magnam eius repudiandae asperiores deserunt rerum sunt, quidem natus laboriosam amet obcaecati atque fugiat aspernatur facere ullam.Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi doloribus quod ipsa? Quae magnam eius repudiandae asperiores deserunt rerum sunt, quidem natus laboriosam amet obcaecati atque fugiat aspernatur facere ullam.Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi doloribus quod ipsa? Quae magnam eius repudiandae asperiores deserunt rerum sunt, quidem natus laboriosam amet obcaecati atque fugiat aspernatur facere ullam.Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi doloribus quod ipsa? Quae magnam eius repudiandae asperiores deserunt rerum sunt, quidem natus laboriosam amet obcaecati atque fugiat aspernatur facere ullam.Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi doloribus quod ipsa? Quae magnam eius repudiandae asperiores deserunt rerum sunt, quidem natus laboriosam amet obcaecati atque fugiat aspernatur facere ullam.Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi doloribus quod ipsa? Quae magnam eius repudiandae asperiores deserunt rerum sunt, quidem natus laboriosam amet obcaecati atque fugiat aspernatur facere ullam.Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi doloribus quod ipsa? Quae magnam eius repudiandae asperiores deserunt rerum sunt, quidem natus laboriosam amet obcaecati atque fugiat aspernatur facere ullam.
                        </p>
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
                   
                  this.setState({
                        dilo: res.data[0],
                  });

                  console.log(this.state.dilo);
                }
            ).catch(err => err)
    }
}

export default (connect(reducer => reducer)(DiloDetail));