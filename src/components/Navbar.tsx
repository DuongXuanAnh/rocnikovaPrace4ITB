import React, { Component } from 'react';
import { Layout, Menu, Icon, Badge } from 'antd';
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
import TestDashboard from './testy/TestDashboard';
import Hodnoceni from './testy/Hodnoceni';
import HodnoceniKvizu from './kviz/Hodnoceni';
import AddNewDilo from './dila/AddNewDilo';
import EditDilo from './dila/EditDilo';
import NavrhDila from './navrh/NavrhDila';
import NavrhAutora from './navrh/NavrhAutora';
import AdminNavrhy from './navrh/AdminNavrhy';
import axios from 'axios';
import AdminNavrhDetail from './navrh/AdminNavrhDetail';
import AddNewAutor from './autori/AddNewAutor';
import NavrhAddNewAutor from './navrh/NavrhAddNewAutor';

interface Props {
    match: any
    location: any
    history: any
    reducer?: Reducer
    dispatch?: Function
}


interface State {
    collapsed: boolean // Otevírání a zavírání leftMenu
    countNavrhDila: number
}

const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;

class Navbar extends Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            collapsed: false,
            countNavrhDila: 0
        }
    }

    componentDidMount() {
        this.countNavrhy();
    }

    render() {
        const email = localStorage.getItem('email');
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
                                {(this.props.reducer && this.props.reducer.user && this.props.reducer.user.admin) ?
                                    <Menu.Item key="7">
                                        <Link to="/addNewDilo">
                                            <Icon type="file-add" />
                                            <span>Přidat dílo</span>
                                        </Link>

                                    </Menu.Item>
                                    :
                                    ""
                                }
                                {(this.props.reducer && this.props.reducer.user && this.props.reducer.user.admin) ?
                                    <Menu.Item key="8">
                                        <Link to="/addNewAutor">
                                            <Icon type="user-add" />
                                            <span>Přidat autora</span>
                                        </Link>

                                    </Menu.Item>
                                    :
                                    ""
                                }
                                {(this.props.reducer && this.props.reducer.user && this.props.reducer.user.admin === false) ?
                                    <Menu.Item key="9">
                                        <Link to="/navrhDila">
                                            <Icon type="plus" />
                                            <span>Navrhnout dílo</span>
                                        </Link>
                                    </Menu.Item>
                                    :
                                    ""
                                }
                                {(this.props.reducer && this.props.reducer.user && this.props.reducer.user.admin === true) ?
                                    <Menu.Item key="10">
                                        <Link to="/zadostONavrhu">
                                            <Icon type="profile" />
                                            <span>Žádost o díla</span>
                                            <Badge count={this.state.countNavrhDila} style={{ marginLeft: "2.8em" }} />
                                        </Link>
                                    </Menu.Item>
                                    :
                                    ""
                                }
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
                                    {email !== null ?
                                        <SubMenu
                                            style={{
                                                "float": "right",
                                                "marginRight": "1em",
                                            }}
                                            title={
                                                <span className="submenu-title-wrapper">
                                                    <span style={{ fontSize: "1.5em", lineHeight: "3em" }}>{email}</span>
                                                </span>
                                            }
                                        >
                                            <Menu.Item key="logout" onClick={() => this.logOut()} >
                                                <span>Odhlásit se</span>
                                            </Menu.Item>
                                        </SubMenu>
                                        :
                                        <SubMenu
                                            style={{
                                                "float": "right",
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
                                    }
                                </Menu>
                            </Header>

                            <Content>
                                <Route exact path="/dila" component={DilaList} />
                                <Route exact path="/dilo/:id" component={DiloDetail} />
                                <Route exact path="/addNewDilo" component={AddNewDilo} />
                                <Route exact path="/editDilo/:id" component={EditDilo} />
                                <Route exact path="/autori" component={AutorsList} />
                                <Route exact path="/addNewAutor" component={AddNewAutor} />
                                <Route exact path="/addNewAutor/:id" component={NavrhAddNewAutor} />
                                <Route exact path="/autor/:id" component={AutoriDetail} />
                                <Route exact path="/ceskaLiteratura" component={CeskaLiteratura} />
                                <Route exact path="/svetovaLiteratura" component={SvetovaLiteratura} />
                                <Route exact path="/testy" component={Testy} />
                                <Route exact path="/testDashboard" component={TestDashboard} />
                                <Route exact path="/honoceniTestu" component={Hodnoceni} />
                                <Route exact path="/kviz" component={Kviz} />
                                <Route exact path="/honoceniKvizu" component={HodnoceniKvizu} />
                                <Route exact path="/navrhDila" component={NavrhDila} />
                                <Route exact path="/navrhAutora" component={NavrhAutora} />
                                <Route exact path="/zadostONavrhu" component={AdminNavrhy} />
                                <Route exact path="/navrhDetail/:id" component={AdminNavrhDetail} />
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

    private logOut = () => {
        localStorage.clear();
        window.location.reload();
    }

    private countNavrhy = () => {
        axios({
            method: 'get',
            url: '/navrhDila',
            withCredentials: true,
        })
            .then(
                res => {
                    this.setState({
                        countNavrhDila: res.data.length
                    });
                }
            ).catch(err => err)
    }

}

export default withRouter((connect(reducer => reducer)(Navbar)));