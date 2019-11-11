import React, { Component } from 'react';
import { Collapse, Icon } from 'antd';

interface Props {

}

interface State {
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

        }
    }

    render() {
        return (
            <React.Fragment>
                <h1 style={{textTransform: "uppercase"}}>Krysař</h1>
                <h1 style={{textTransform: "uppercase"}}>Viktor dyk</h1>

                <Collapse
                    bordered={false}
                    expandIcon={({ isActive }) => <Icon type="caret-right" rotate={isActive ? 90 : 0} />}
                >
                    <Panel header="Literární druh" key="1" style={customPanelStyle}>
                        <p>Próza</p>
                    </Panel>
                    <Panel header="Literární žánr" key="2" style={customPanelStyle}>
                        <p>Epika</p>
                    </Panel>
                    <Panel header="Konkrétní literární útvar" key="3" style={customPanelStyle}>
                        <p>Novela</p>
                    </Panel>
                    <Panel header="Místo a doba děje" key="4" style={customPanelStyle}>
                        <p>V městě Hammeln</p>
                    </Panel>
                    <Panel header="Téma díla" key="5" style={customPanelStyle}>
                        <p>Láska a pomsta</p>
                    </Panel>
                    <Panel header="Hlavní postavy" key="6" style={customPanelStyle}>
                        <p>Láska a pomsta</p>
                    </Panel>
                    <Panel header="Vypraveč" key="7" style={customPanelStyle}>
                        <p>Er forma - 3. osoba</p>
                    </Panel>
                    <Panel header="Typy promluv postav" key="8" style={customPanelStyle}>
                        <p>Dialog, monolog, přímá řeč</p>
                    </Panel>
                    <Panel header="Veršévá výstavba" key="9" style={customPanelStyle}>
                        <p></p>
                    </Panel>
                    <Panel header="Jazykové prostředky" key="10" style={customPanelStyle}>
                        <p>Dílo je napsáno výhradně spisovnou češtinou</p>
                    </Panel>
                    <Panel header="Obsah díla" key="11" style={customPanelStyle}>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi doloribus quod ipsa? Quae magnam eius repudiandae asperiores deserunt rerum sunt, quidem natus laboriosam amet obcaecati atque fugiat aspernatur facere ullam.
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi doloribus quod ipsa? Quae magnam eius repudiandae asperiores deserunt rerum sunt, quidem natus laboriosam amet obcaecati atque fugiat aspernatur facere ullam.Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi doloribus quod ipsa? Quae magnam eius repudiandae asperiores deserunt rerum sunt, quidem natus laboriosam amet obcaecati atque fugiat aspernatur facere ullam.Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi doloribus quod ipsa? Quae magnam eius repudiandae asperiores deserunt rerum sunt, quidem natus laboriosam amet obcaecati atque fugiat aspernatur facere ullam.Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi doloribus quod ipsa? Quae magnam eius repudiandae asperiores deserunt rerum sunt, quidem natus laboriosam amet obcaecati atque fugiat aspernatur facere ullam.Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi doloribus quod ipsa? Quae magnam eius repudiandae asperiores deserunt rerum sunt, quidem natus laboriosam amet obcaecati atque fugiat aspernatur facere ullam.Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi doloribus quod ipsa? Quae magnam eius repudiandae asperiores deserunt rerum sunt, quidem natus laboriosam amet obcaecati atque fugiat aspernatur facere ullam.Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi doloribus quod ipsa? Quae magnam eius repudiandae asperiores deserunt rerum sunt, quidem natus laboriosam amet obcaecati atque fugiat aspernatur facere ullam.Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi doloribus quod ipsa? Quae magnam eius repudiandae asperiores deserunt rerum sunt, quidem natus laboriosam amet obcaecati atque fugiat aspernatur facere ullam.Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi doloribus quod ipsa? Quae magnam eius repudiandae asperiores deserunt rerum sunt, quidem natus laboriosam amet obcaecati atque fugiat aspernatur facere ullam.Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi doloribus quod ipsa? Quae magnam eius repudiandae asperiores deserunt rerum sunt, quidem natus laboriosam amet obcaecati atque fugiat aspernatur facere ullam.Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi doloribus quod ipsa? Quae magnam eius repudiandae asperiores deserunt rerum sunt, quidem natus laboriosam amet obcaecati atque fugiat aspernatur facere ullam.
                        </p>
                    </Panel>
                </Collapse>
            </React.Fragment>
        );
    }
}

export default DiloDetail;