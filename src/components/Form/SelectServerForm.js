import React from 'react';
import { Modal, Form, Select } from 'antd';
import * as service from '../../services/commonServices';

const FormItem = Form.Item;
const { Option } = Select;

/**
 * 选择服务器
 */
const SelectServerForm = Form.create()(
  class extends React.Component {
    state = {
      serverList: [],
      loading: false,
    };

    /**
     * 组件装载
     */
    componentDidMount() {
    }

    /**
     * 获取服务器列表
     */
    getServerData = () => {
      this.setState({
        loading: true,
      });
      service.getServerList({
        payload: {
          'TypeFlag': 2,
        },
      }).then((res) => {
        const serverList = [];
        res.list.forEach((item) => {
          serverList.push(<Option value={item.id}>{item.name}</Option>);
        });
        this.setState({
          serverList,
          loading: false,
        });
      });
    };

    resetForm = () => {
      const { form } = this.props;
      form.resetFields();
      this.setState({
        serverList: [],
      });
    };

    /**
     * 渲染
     * @return {XML}
     */
    render() {
      const { serverList, loading } = this.state;
      const { visible, onCancel, onSelect, form } = this.props;
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
          title="选择服务器"
          okText="发布"
          cancelText="取消"
          width={400}
          onCancel={onCancel}
          onOk={onSelect}
          afterClose={this.resetForm}
        >
          <Form layout="horizontal">
            <FormItem
              {...formItemLayout}
              label="选择服务器"
            >
              {getFieldDecorator('id', {
                rules: [{ required: true, message: '服务器不能为空!' }],
              })(
                <Select
                  showSearch
                  style={{ width: 200 }}
                  placeholder="请选择服务器"
                  optionFilterProp="children"
                  loading={loading}
                >
                  {serverList}
                </Select>
              )}
            </FormItem>
          </Form>
        </Modal>
      );
    }
  }
);

export default SelectServerForm;
