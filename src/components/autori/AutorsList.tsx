import React, { Component } from 'react';
import { List, Avatar, Input } from 'antd';



interface Props {

}

interface State {
}

const data = [
    {
        title: 'Ant Design Title 1',
    },
    {
        title: 'Ant Design Title 2',
    },
    {
        title: 'Ant Design Title 3',
    },
    {
        title: 'Ant Design Title 4',
    },
];

const { Search } = Input;

class AutorsList extends Component<Props, State>  {

    constructor(props: Props) {
        super(props);

    }
    render() {

        return (
            <React.Fragment>
                <Search
                    style={{ width: "50%", float: "right", margin: "2em 2em 1em 0" }}
                    placeholder="Hledat autora"
                    onSearch={value => console.log(value)}
                    enterButton />
                <div
                    style={{ clear: "both" }}
                ></div>
                <List
                    itemLayout="horizontal"
                    dataSource={data}
                    style={{ marginLeft: "2em", marginRight: "2em" }}
                    renderItem={item => (
                        <List.Item
                        >
                            <List.Item.Meta
                                avatar={
                                    <Avatar
                                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToQm7Fmwn_-iIa7TuITtJ4adTBzQDYN9JJisDWvJ0oKPo47ogy"
                                        size={92}
                                    />}
                                // title={<a href="https://ant.design">{item.title}</a>}
                                title={item.title}
                                description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                            />
                        </List.Item>
                    )}
                />
            </React.Fragment>
        );
    }
}

export default AutorsList;