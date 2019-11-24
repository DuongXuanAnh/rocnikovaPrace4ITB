import React, { Component } from 'react';
import { Timeline, Icon } from 'antd';

interface Props {

}

interface State {
}

class SvetovaLiteratura extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

    }
    render() {
        return (
            <React.Fragment>
                <Timeline mode="alternate">
            <Timeline.Item position="right" color="green" dot={<Icon type="clock-circle-o" style={{ fontSize: "16px" }} />}>
            cca. 16. století
            </Timeline.Item>
            <Timeline.Item position="left">
            Renesance v evropské literatuře
            </Timeline.Item>
            <Timeline.Item position="left">
            Romantismus v evropské literatuře
            </Timeline.Item>

            <Timeline.Item position="right" color="green" dot={<Icon type="clock-circle-o" style={{ fontSize: "16px" }} />}>
            2. poloviny 19. století
            </Timeline.Item>
            <Timeline.Item position="left">
            Kritický realismus v evropské literatuře
            </Timeline.Item>

            <Timeline.Item position="right" color="green" dot={<Icon type="clock-circle-o" style={{ fontSize: "16px" }} />}>
            1. pol. 20. století
            </Timeline.Item>
            <Timeline.Item position="left">
            Světová literatura mezi světovými války.
            </Timeline.Item>
        </Timeline>
            </React.Fragment>
        );
    }
}

export default SvetovaLiteratura;