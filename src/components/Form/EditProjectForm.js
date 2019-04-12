import React from 'react';
import { Modal, Form, Input, Upload, message, Icon } from 'antd';
import * as service from '../../services/commonServices';

const FormItem = Form.Item;
const { TextArea } = Input;

/**
 * 获取文件 base64 内容
 * @param img
 * @param callback
 */
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

/**
 * 上传前检测
 * @param file
 * @return {boolean}
 */
function beforeUpload(file) {
  const isLimitedSize = file.size / 1024 / 1024 < 30;
  if (!isLimitedSize) {
    message.error('文件不能大于 30MB!');
  }
  return isLimitedSize;
}

/**
 * 编辑项目
 */
const CreateProjectForm = Form.create()(
  class extends React.Component {
    state = {
      fileList: [],
      loading: false,
      imageUrl: '',
      previewImage: '',
      previewVisible: false,
    };

    /**
     * 组件更新
     */
    componentDidUpdate(prevProps) {
      const { data, visible } = this.props;
      if (visible !== prevProps.visible) {
        this.renderFileList(data);
      }
    }

    renderFileList = (data) => {
      if (data.icon) {
        this.setState({
          fileList: [{
            uid: data.id,
            name: '图标',
            status: 'done',
            url: data.icon,
          }],
        });
      } else {
        this.setState({
          fileList: [],
        });
      }
    };

    handleCancel = () => this.setState({ previewVisible: false });

    handlePreview = (file) => {
      this.setState({
        previewImage: file.url || file.thumbUrl,
        previewVisible: true,
      });
    };

    onChangeFile = (info) => {
      const { form } = this.props;
      if (info.file.status === 'uploading') {
        this.setState({ loading: true });
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} 文件上传成功`);
        form.setFieldsValue({ 'fileId': info.file.response.result.fileId });
        getBase64(info.file.originFileObj, imageUrl => this.setState({
          imageUrl,
          fileList: info.fileList,
          loading: false,
        }));
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} 文件上传失败`);
      }
      this.setState({ fileList: info.fileList });
    };

    onRemoveFile = () => {
      return new Promise((resolve) => {
        this.setState({
          fileList: [],
        }, () => {
          resolve([]);
        });
      });
    };

    resetForm = () => {
      const { form } = this.props;
      form.resetFields();
    };

    /**
     * 渲染
     * @return {XML}
     */
    render() {
      const { fileList, loading, previewVisible, previewImage } = this.state;
      const { visible, onCancel, onCreate, form, data } = this.props;
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
      const uploadButton = (
        <div>
          <Icon type={loading ? 'loading' : 'plus'} />
          <div className="ant-upload-text">上传</div>
        </div>
      );

      return (
        <Modal
          visible={visible}
          centered
          style={{ top: 10 }}
          title="编辑项目"
          okText="保存"
          cancelText="取消"
          width={500}
          onCancel={onCancel}
          onOk={onCreate}
          afterClose={this.resetForm}
        >
          <Form layout="horizontal">
            <FormItem style={{ display: 'none' }}>
              {getFieldDecorator('id', {
                initialValue: data.id,
              })}
            </FormItem>
            <FormItem style={{ display: 'none' }}>
              {getFieldDecorator('fileId')}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="项目名称"
            >
              {getFieldDecorator('name', {
                rules: [{ required: true, message: '项目名称不能为空!' }],
                initialValue: data.name,
              })(
                <Input
                  placeholder="项目名称"
                  style={{ width: 250 }}
                />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="项目描述"
            >
              {getFieldDecorator('description', {
                initialValue: data.description,
              })(
                <TextArea
                  placeholder="项目描述"
                  rows={2}
                  style={{ width: 250 }}
                />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="项目本地路径"
            >
              {getFieldDecorator('localPath', {
                rules: [{ required: true, message: '本地路径不能为空!' }],
                initialValue: data.localPath,
              })(
                <TextArea
                  placeholder="本地路径"
                  rows={3}
                  style={{ width: 250 }}
                />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="项目远程路径"
            >
              {getFieldDecorator('remotePath', {
                rules: [{ required: true, message: '远程路径不能为空!' }],
                initialValue: data.remotePath,
              })(
                <TextArea
                  placeholder="远程路径"
                  rows={3}
                  style={{ width: 250 }}
                />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="项目图标"
            >
              <div className="clearfix">
                <Upload
                  name="file"
                  withCredentials
                  action={service.uploadFile()}
                  listType="picture-card"
                  beforeUpload={beforeUpload}
                  onChange={this.onChangeFile}
                  onRemove={this.onRemoveFile}
                  onPreview={this.handlePreview}
                  fileList={fileList}
                >
                  {fileList.length >= 1 ? null : uploadButton}
                </Upload>
                <Modal
                  wrapClassName="vertical-center-modal"
                  visible={previewVisible}
                  footer={null}
                  onCancel={this.handleCancel}
                >
                  <img alt="预览" style={{ width: '100%' }} src={previewImage} />
                </Modal>
              </div>
            </FormItem>
          </Form>
        </Modal>
      );
    }
  }
);

export default CreateProjectForm;
