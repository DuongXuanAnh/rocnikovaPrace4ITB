import React, { Component } from 'react';
import { Icon, List, Input, Pagination } from 'antd';
import axios from 'axios';
import { Reducer } from '../../utils/generalTypes';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

interface Props {
  match: any
  location: any
  history: any
  reducer?: Reducer;
  dispatch?: Function;

}

interface State {
  dila?: any
  searchKey?: string
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
      dila: [],
      searchKey:""
    }
  }

  componentDidMount() {
    this.getDila();
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
      if( prevState.searchKey !== this.state.searchKey){
          this.getDila();
      }
  }
  

  render() {
    return (
      <React.Fragment>
        <Search
          style={{ width: "50%", float: "right", margin: "1em 2em 0 0" }}
          placeholder="Hledat dílo"
          onSearch={value => {this.setState({searchKey: value});}}
          onChange={value => {this.setState({searchKey: value.target.value});}}
          enterButton />
        <div
          style={{ clear: "both" }}
        ></div>
        <List
          itemLayout="vertical"
          size="large"

          pagination={{
            simple: true,
            pageSize: 3,
            style: {
              position: "fixed",
              left: "50%",
              margin: "0 auto",
              bottom: "1.5em",
            }
          }}

          style={{ margin: "0 2em 0 3em" }}
          dataSource={this.state.dila}
          footer={<div></div>}
          renderItem={(item: any) => (
            <List.Item
              key={item.id}
              actions={[<IconText type="like-o" text={item.like} />, <IconText type="dislike-o" text={item.dislike} />]}
              extra={
                <img
                  style={{ height: "11.5em", width: "auto" }}
                  alt="logo" src={item.img} />
              }
              onDoubleClick={() => this.diloDetail(item.id)}
            >
              <List.Item.Meta
                title={item.nazev}
                description={item.description}
              />
              {item.content}
            </List.Item>

          )}
        />

      </React.Fragment>
    );
  }

  private getDila = () => {
    axios({
      method: 'get',
      url: '/dila',
      withCredentials: true,
      params: {
        searchKey: this.state.searchKey
      }
    })
      .then(
        res => {
          this.setState({
            dila: res.data
          });
        }
      ).catch(err => err)
  }

  private diloDetail = (id: number) => {
    this.props.history.push('dilo/' + id);
  }


}

export default withRouter((connect(reducer => reducer)(DilaList)));