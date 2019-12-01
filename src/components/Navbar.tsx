import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import AutorsList from './autori/AutorsList';
import { BrowserRouter as Router, Route, Link, withRouter } from "react-router-dom";
import DilaList from './dila/DilaList';
import CeskaLiteratura from './literatura/ceska/CeskaLiteratura';
import SvetovaLiteratura from './literatura/svetova/SvetovaLiteratura';
import Testy from './testy/Testy';
import Kviz from './kviz/Kviz';
import DiloDetail from './dila/DiloDetail';
import AutoriDetail from './autori/AutoriDetail';
import { connect } from 'react-redux';
import { Reducer } from '../utils/generalTypes';

interface Props {
    match: any
    location: any
    history: any
    reducer?: Reducer
    dispatch?: Function
}


interface State {
    collapsed: boolean // Otevírání a zavírání leftMenu
   
}

const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;

class Navbar extends Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            collapsed: false,
            
        }
    }

    componentDidMount() {
       
      }

    render() {
    
        return (
            <Router>
                <React.Fragment>
                    <Layout style={{ minHeight: '100vh' }}>
                        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
                            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>

                                <Menu.Item key="1">
                                    <Link to="/dila">
                                        <Icon type="book" />
                                        <span>Díla</span>
                                    </Link>
                                </Menu.Item>

                                <Menu.Item key="2">
                                    <Link to="/autori">
                                        <Icon type="user" />
                                        <span>Autoři</span>
                                    </Link>
                                </Menu.Item>
                                <SubMenu
                                    key="sub1"
                                    title={
                                        <span>
                                            <Icon type="read" />
                                            <span>Literatura</span>
                                        </span>
                                    }
                                >
                                    <Menu.Item key="3">
                                        <Link to="/ceskaLiteratura">Česká</Link>
                                    </Menu.Item>

                                    <Menu.Item key="4">
                                        <Link to="/svetovaLiteratura">Světová</Link>
                                    </Menu.Item>

                                </SubMenu>
                                <Menu.Item key="5">
                                    <Link to="/testy">
                                        <Icon type="container" />
                                        <span>Testy</span>
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="6">
                                    <Link to="/kviz">
                                        <Icon type="question-circle" />
                                        <span>Kvíz</span>
                                    </Link>
                                </Menu.Item>
                            </Menu>

                        </Sider>
                        <Layout>
                            <Header style={{ background: '#fff', padding: 0 }}>
                                <Menu mode="horizontal" style={{ "height": "100%" }}>
                                    <Icon
                                        style={{ "marginLeft": "1rem", "fontSize": "1.7rem", "flex": 1, "verticalAlign": "bottom" }}
                                        className="trigger"
                                        type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                                        onClick={this.toggle}
                                    />
                                    <SubMenu
                                        style={{
                                            "float": "right",
                                            // "verticalAlign": "bottom",
                                            "marginRight": "1em",
                                        }}
                                        title={
                                            <span className="submenu-title-wrapper">
                                                <Icon
                                                    style={{ "fontSize": "2rem", "verticalAlign": "bottom" }}
                                                    type="user"
                                                />
                                            </span>
                                        }
                                    >
                                        <Menu.Item key="loginRedirect" onClick={() => this.loginRedirect()}>
                                            <span>Přihlásit se</span>
                                        </Menu.Item>
                                        <Menu.Item key="registerRedirect" onClick={() => this.registerRedirect()}>
                                            <span>Vytvořit nový účet</span>
                                        </Menu.Item>

                                    </SubMenu>
                                </Menu>

                            </Header>

                            <Content>
                                
                                <Route exact path="/dila" component={DilaList} />
                                <Route exact path="/dilo/:id" component={DiloDetail} />
                                <Route exact path="/autori" component={AutorsList} />
                                <Route exact path="/autor/:id" component={AutoriDetail} />
                                <Route exact path="/ceskaLiteratura" component={CeskaLiteratura} />
                                <Route exact path="/svetovaLiteratura" component={SvetovaLiteratura} />
                                <Route exact path="/testy" component={Testy} />
                                <Route exact path="/kviz" component={Kviz} />
                            </Content>
                        </Layout>
                    </Layout>
                </React.Fragment>
            </Router>
        );
    }

    private toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    private loginRedirect = () => {
        this.props.history.push('/login');
    }

    private registerRedirect = () => {
        this.props.history.push('/register');
    }

}

export default withRouter((connect(reducer => reducer)(Navbar)));