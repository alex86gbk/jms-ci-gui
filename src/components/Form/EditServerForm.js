import React from 'react';
import { Modal, Form, Input, Upload, message, Button, Icon, Radio } from 'antd';

const FormItem = Form.Item;
const { TextArea } = Input;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

const uploadProps = {
  name: 'file',
  action: '//jsonplaceholder.typicode.com/posts/',
  headers: {
    authorization: 'authorization-text',
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

/**
 * 新建服务器
 */
const EditServerForm = Form.create()(
  class extends React.Component {
    state = {
      auth: 'password',
    };

    /**
     * 组件更新
     */
    componentDidUpdate(prevProps) {
      const { data, visible } = this.props;
      if (visible !== prevProps.visible) {
        this.renderAuth(data);
      }
    }

    renderAuth = (data) => {
      this.setState({
        auth: data.auth,
      });
    };

    onAuthChange = (event) => {
      this.setState({
        auth: event.target.value,
      });
    };

    resetForm = () => {
      const { data, form } = this.props;
      form.resetFields();
      this.setState({
        auth: data.auth,
      });
    };

    /**
     * 渲染
     * @return {XML}
     */
    render() {
      const { auth } = this.state;
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
              label="域名（IP）"
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
              {getFieldDecorator('localPath', {
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
              {getFieldDecorator('remotePath', {
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
              {getFieldDecorator('fileId', {
                rules: [{ required: auth === 'key', message: '请上传秘钥!' }],
                initialValue: data.key,
              })(
                <Upload {...uploadProps}>
                  <Button>
                    <Icon type="upload" />
                    点击上传
                  </Button>
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
