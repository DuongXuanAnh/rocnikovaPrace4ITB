import React, { Component, Fragment } from 'react';
import { Reducer } from '../../utils/generalTypes';
import axios from 'axios';
import { connect } from 'react-redux';
import { Input, Form, Row, Upload, Button, Icon, InputNumber } from 'antd';

interface Props {
    form: any
    history: any
    match: any
    reducer?: Reducer
    dispatch?: Function
}

interface State {
    autor: any
    loading: boolean

}

const { TextArea } = Input;

class EditAutora extends Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            autor: {},
            loading: false,
        }
    }

    componentDidMount() {
        this.getAutorDetail();
    }


    render() {
        const { getFieldDecorator } = this.props.form;
        const config = {
            beforeUpload: () => false
        };
        return (
            <Fragment>
                  <Row style={{ width: "90%", margin: "0 auto" }}>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item label="Jméno autora">
                                <Input placeholder="Jméno autora"/>
                        </Form.Item>
                        <Form.Item label="Popis autora">
                                <Input placeholder="Popis autora" />
                        </Form.Item>
                        <Form.Item label="Born" style={{ width: "50%" }}>
                                <InputNumber min={1} max={2020} placeholder="Narození" style={{ width: "50%" }} />
                        </Form.Item>
                        <Form.Item label="Rip" style={{ width: "50%" }}>
                            
                                <InputNumber min={1} max={2020} placeholder="Úmrtí" style={{ width: "50%" }} />
                        </Form.Item>
                        <Form.Item label="Zařazení">
                                <TextArea
                                    placeholder="Zařazení autora"
                                    autoSize={{ minRows: 4, maxRows: 8 }}
                                />
                        </Form.Item>
                        <Form.Item label="Život">
                           
                                <TextArea
                                    placeholder="Život autora"
                                    autoSize={{ minRows: 4, maxRows: 8 }}
                                />
                        </Form.Item>
                        <Form.Item label="Díla">
                           
                                <TextArea
                                    placeholder="Díla autora"
                                    autoSize={{ minRows: 4, maxRows: 8 }}
                                />
                        </Form.Item>
                        <Form.Item label="Velká fotka">
                            {getFieldDecorator('image', {
                                rules: [{ required: true, message: "Vyberte si fotku" }],
                            })(
                                <Upload {...config}>
                                    <Button>
                                        <Icon type="upload" /> Nahrajte velkou fotku
                                </Button>
                                </Upload>
                            )}
                        </Form.Item>
                        <Form.Item label="Malá fotka">
                            {getFieldDecorator('smallImage', {
                                rules: [{ required: true, message: "Vyberte si fotku" }],
                            })(
                                <Upload {...config}>
                                    <Button>
                                        <Icon type="upload" /> Nahrajte malou fotku
                                </Button>
                                </Upload>
                            )}
                        </Form.Item>

                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Přidat autora
                    </Button>
                    </Form>
                </Row>
            </Fragment>
        );
    }

    private handleSubmit = (e: any) => {
        e.preventDefault();
        this.props.form.validateFields((err: any, values: any) => {
            if (!err) {
            //     let formData = new FormData();
            //     formData.append('image', values.image.file);
            //     formData.append('smallImage', values.smallImage.file);

            //     values = {...values, imgName: values.image.file.name, smallImageName: values.smallImage.file.name}
  
            //     for ( var key in values ) {
            //         formData.append(key, values[key]);
            //     }
            //     axios.post('/editAutora', formData, {
            //         withCredentials: true,
            //         headers: { 'Authorization': 'Bearer ' + this.props.reducer!.user!.accessToken, 
            //         "content-type": 'multipart/form-data'
            //     },
            //     })
            //         .then(
            //             res => {
            //                 console.log(res);
            //                 if(res.data==="success"){
            //                     // this.props.history.push('/autori');
            //                     // this.openNotificationSuccess();
            //                 }else{
            //                     console.log("Khong dc");
            //                 }
            //             }
            //         ).catch(err => err)
            }
        });
    };

    private getAutorDetail() {
        this.setState({
            loading: true
        });
        const id: number = parseInt(this.props.match.params.id, 10);;
        axios({
            method: 'get',
            url: '/autor/' + id,
            withCredentials: true,
        })
            .then(

                res => {
                    console.log(res.data);
                    this.setState({
                        autor: res.data,
                        loading: false,
                    });
                }
            ).catch(err => err)
    }
}

export default connect(reducer => reducer)(Form.create({ name: 'editAutora' })(EditAutora));
