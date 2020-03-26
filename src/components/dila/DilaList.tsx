import React, { Component } from 'react';
import { Icon, List, Input, Spin } from 'antd';
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
  loading: boolean
}

const { Search } = Input;
class DilaList extends Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      dila: [],
      searchKey: "",
      loading: false
    }
  }

  componentDidMount() {
    this.getDila();
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    if (prevState.searchKey !== this.state.searchKey) {
      this.getDila();
    }
  }

  render() {
    return (
      <React.Fragment>
        <Search
          style={{ width: "50%", float: "right", margin: "1em 2em 0 0" }}
          placeholder="Hledat dílo"
          onSearch={value => { this.setState({ searchKey: value }); }}
          onChange={value => { this.setState({ searchKey: value.target.value }); }}
          enterButton />
        <div
          style={{ clear: "both" }}
        ></div>
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
          </div>
          :
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
                extra={
                  <img
                    style={{ height: "11.5em", width: "auto" }}
                    alt="logo"
                    src={item.img}
                  />
                }
                onDoubleClick={() => this.diloDetail(item.id)}
              >
                <List.Item.Meta
                  style={{color:'var(--text-color)'}}
                  title={<p style={{color:'var(--text-color)'}}>{item.nazev}</p>}
                  description={<p style={{color:'var(--text-color)'}}>{item.description}</p>}
                />
                {item.content}
              </List.Item>

            )}
          />
        }
      </React.Fragment>
    );
  }

  private getDila = () => {
    this.setState({
      loading: true
    });
    axios({
      method: 'get',
      url: '/dila',
      withCredentials: true,
      params: {
        searchKey: this.state.searchKey!.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      }
    })
      .then(
        res => {
          this.setState({
            dila: res.data,
            loading: false
          });
        }
      ).catch(err => {
        this.setState({
          loading:false
        });
      })
  }

  private diloDetail = (id: number) => {
    this.props.history.push('dilo/' + id);
  }
}

export default withRouter((connect(reducer => reducer)(DilaList)));