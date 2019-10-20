import React, { Component } from 'react';
import { Icon, List, Input } from 'antd';

interface Props {

}

interface State {
}

const listData: any = [];
for (let i = 0; i < 7; i++) {
  listData.push({
    href: 'http://ant.design',
    title: `Romeo a Julie ${i}`,
    description: 'William Shakespeare',
    content: 'To to je content',
  });
}

const IconText = ({ type, text }: { type: any, text: string }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);
const { Search } = Input;
class DilaList extends Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <React.Fragment>
        <Search
          style={{ width: "50%", float: "right", margin: "1em 2em 0 0"}}
          placeholder="Hledat dílo"
          onSearch={value => console.log(value)}
          enterButton />
          <div
          style={{ clear: "both"}}
          ></div>
        <List
          itemLayout="vertical"
          size="large"
          pagination={{
            onChange: (page) => {
              console.log(page);
            },
            pageSize: 3,
          }}
          style={{ margin: "0 2em 0 3em" }}
          dataSource={listData}
          footer={<div></div>}
          renderItem={(item: any) => (
            <List.Item
              key={item.title}
              actions={[<IconText type="like-o" text="156" />]}
              extra={
                  <img 
                  style={{ height: "12em", width: "auto"}}
                  alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" />
            }
            >
              <List.Item.Meta
                title={<a href={item.href}>{item.title}</a>}
                description={item.description}
              />
              {item.content}
            </List.Item>
          )}
        />
      </React.Fragment>
    );
  }
}

export default DilaList;