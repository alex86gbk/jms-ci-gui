import React from 'react';
import { Modal, Form, Input, Upload, message, Button, Icon, Radio } from 'antd';
import * as service from '../../services/commonServices';

const FormItem = Form.Item;
const { TextArea } = Input;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

/**
 * 新建服务器
 */
const EditServerForm = Form.create()(
  class extends React.Component {
    state = {
      auth: 'password',
      fileList: [],
    };

    /**
     * 组件更新
     */
    componentDidUpdate(prevProps) {
      const { data, visible } = this.props;
      if (visible !== prevProps.visible) {
        this.initState(data);
      }
    }

    initState = (data) => {
      this.setState({
        auth: data.auth,
      });
      if (data.secretKey) {
        this.setState({
          fileList: [{
            uid: data.fileId,
            name: data.secretKey,
            status: 'done',
          }],
        });
      }
    };

    onAuthChange = (event) => {
      this.setState({
        auth: event.target.value,
      });
    };

    resetForm = () => {
      const { form } = this.props;
      form.resetFields();
      this.setState({
        auth: 'password',
        fileList: [],
      });
    };

    /**
     * 渲染
     * @return {XML}
     */
    render() {
      const that = this;
      const { auth, fileList } = this.state;
      const { visible, onCancel, onEdit, form, data } = this.props;
      const { getFieldDecorator } = form;

      const formItemLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
      };
      const uploadProps = {
        name: 'file',
        action: service.uploadFile(),
        headers: {
          authorization: 'authorization-text',
        },
        fileList,
        onChange(info) {
          if (info.file.status === 'done') {
            message.success(`${info.file.name} 文件上传成功`);
            form.setFieldsValue({ 'fileId': info.file.response.result.fileId });
            that.setState({
              fileList: info.fileList,
            });
          } else if (info.file.status === 'error') {
            message.error(`${info.file.name} 文件上传失败`);
          }
          that.setState({ fileList: info.fileList });
        },
        onRemove() {
          return new Promise((resolve) => {
            that.setState({
              fileList: [],
            }, () => {
              resolve([]);
            });
          });
        },
      };

      return (
        <Modal
          visible={visible}
          centered
          style={{ top: 10 }}
          title="编辑服务器"
          okText="保存"
          cancelText="取消"
          width={500}
          onCancel={onCancel}
          onOk={onEdit}
          afterClose={this.resetForm}
        >
          <Form layout="horizontal">
            <FormItem style={{ display: 'none' }}>
              {getFieldDecorator('id', {
                initialValue: data.id,
              })}
            </FormItem>
            <FormItem style={{ display: 'none' }}>
              {getFieldDecorator('fileId', {
                initialValue: data.fileId,
              })}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="服务器名称"
            >
              {getFieldDecorator('name', {
                rules: [{ required: true, message: '服务器名称不能为空!' }],
                initialValue: data.name,
              })(
                <Input
                  placeholder="服务器名称"
                  style={{ width: 250 }}
                />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="域名（或 IP）"
            >
              {getFieldDecorator('host', {
                rules: [{ required: true, message: '服务器IP/域名不能为空!' }],
                initialValue: data.host,
              })(
                <Input
                  placeholder="服务器域名/IP"
                  style={{ width: 250 }}
                />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="服务器描述"
            >
              {getFieldDecorator('description', {
                initialValue: data.description,
              })(
                <TextArea
                  placeholder="服务器描述"
                  rows={2}
                  style={{ width: 250 }}
                />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="平台类型"
            >
              {getFieldDecorator('platform', {
                rules: [{ required: true, message: '请选择平台类型!' }],
                initialValue: data.platform,
              })(
                <RadioGroup>
                  <RadioButton value="windows">Windows</RadioButton>
                  <RadioButton value="linux">Linux</RadioButton>
                  <RadioButton value="unix">Unix</RadioButton>
                  <RadioButton value="mac">Mac</RadioButton>
                </RadioGroup>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="用户名"
            >
              {getFieldDecorator('username', {
                rules: [{ required: true, message: '用户名不能为空!' }],
                initialValue: data.username,
              })(
                <Input
                  style={{ width: 250 }}
                  placeholder="用户名"
                />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="认证方式"
            >
              {getFieldDecorator('auth', {
                rules: [{ required: true, message: '请选择认证方式!' }],
                initialValue: data.auth,
              })(
                <RadioGroup onChange={this.onAuthChange}>
                  <RadioButton value="password">密码</RadioButton>
                  <RadioButton value="key">秘钥</RadioButton>
                </RadioGroup>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="密码"
              style={{ display: auth === 'password' ? 'block' : 'none' }}
            >
              {getFieldDecorator('password', {
                rules: [{ required: auth === 'password', message: '密码不能为空!' }],
                initialValue: data.password,
              })(
                <Input
                  style={{ width: 250 }}
                  placeholder="密码"
                />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="秘钥"
              style={{ display: auth === 'key' ? 'block' : 'none' }}
            >
              {getFieldDecorator('key', {
                rules: [{ required: auth === 'key', message: '请上传秘钥!' }],
                initialValue: data.key,
              })(
                <Upload
                  {...uploadProps}
                >
                  {
                    fileList.length >= 1
                      ? null
                      : (
                        <Button>
                          <Icon type="upload" />
                          点击上传
                        </Button>
                      )
                  }
                </Upload>
              )}
            </FormItem>
          </Form>
        </Modal>
      );
    }
  }
);

export default EditServerForm;
