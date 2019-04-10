import React from 'react';
import { Row, Col, Form, Button, Select, Input, Icon } from 'antd';

import styles from '../List/TableList.less';

const FormItem = Form.Item;
const { Option } = Select;

/**
 * 查询服务器列表
 */
const FilterServerListForm = Form.create()(
  class extends React.Component {
    state = {
      expandForm: false,
    };

    handleSubmit = (e) => {
      const { form, onHandleSubmit } = this.props;
      e.preventDefault();
      form.validateFields((err, values) => {
        if (!err) {
          onHandleSubmit(values);
        }
      });
    };

    handleFormReset = () => {
      const { form } = this.props;
      form.resetFields();
    };

    toggleForm = () => {
      const { expandForm } = this.state;
      this.setState({
        expandForm: !expandForm,
      });
    };

    /**
     * 渲染简单表单
     * @return {XML}
     */
    renderSimpleForm() {
      const { form } = this.props;
      const { getFieldDecorator } = form;

      return (
        <Form onSubmit={this.handleSubmit} layout="inline">
          <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            <Col md={8} sm={24}>
              <FormItem label="域名（IP）">
                {getFieldDecorator('host')(<Input placeholder="请输入" />)}
              </FormItem>
            </Col>
            <Col md={8} sm={24}>
              <FormItem label="使用状态">
                {getFieldDecorator('status')(
                  <Select placeholder="请选择" style={{ width: '100%' }}>
                    <Option value="0">关闭</Option>
                    <Option value="1">运行中</Option>
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col md={8} sm={24}>
              <span className={styles.submitButtons}>
                <Button type="primary" htmlType="submit">
                  查询
                </Button>
                <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                  重置
                </Button>
                <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
                  展开&nbsp;
                  <Icon type="down" />
                </a>
              </span>
            </Col>
          </Row>
        </Form>
      );
    }

    /**
     * 渲染高级表单
     * @return {XML}
     */
    renderAdvancedForm() {
      const { form, onSubmitFilter } = this.props;
      const { getFieldDecorator } = form;

      return (
        <Form onSubmit={onSubmitFilter} layout="inline">
          <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            <Col md={8} sm={24}>
              <FormItem label="域名（IP）">
                {getFieldDecorator('host')(<Input placeholder="请输入" />)}
              </FormItem>
            </Col>
            <Col md={8} sm={24}>
              <FormItem label="使用状态">
                {getFieldDecorator('status')(
                  <Select placeholder="请选择" style={{ width: '100%' }}>
                    <Option value="0">关闭</Option>
                    <Option value="1">运行中</Option>
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col md={8} sm={24}>
              <FormItem label="服务器名称">
                {getFieldDecorator('name')(<Input placeholder="请输入" />)}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            <Col md={8} sm={24}>
              <FormItem label="平台类型">
                {getFieldDecorator('platform')(
                  <Select placeholder="请选择" style={{ width: '100%' }}>
                    <Option value="windows">Windows</Option>
                    <Option value="linux">Linux</Option>
                    <Option value="unix">Unix</Option>
                    <Option value="mac">Mac</Option>
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col md={8} sm={24}>
              <FormItem label="认证方式">
                {getFieldDecorator('auth')(
                  <Select placeholder="请选择" style={{ width: '100%' }}>
                    <Option value="password">密码</Option>
                    <Option value="key">秘钥</Option>
                  </Select>
                )}
              </FormItem>
            </Col>
          </Row>
          <div style={{ overflow: 'hidden' }}>
            <span style={{ float: 'right', marginBottom: 24 }}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                重置
              </Button>
              <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
                收起&nbsp;
                <Icon type="up" />
              </a>
            </span>
          </div>
        </Form>
      );
    }

    /**
     * 渲染查询表单
     * @return {*}
     */
    renderForm() {
      const { expandForm } = this.state;
      return expandForm ? this.renderAdvancedForm() : this.renderSimpleForm();
    }

    /**
     * 渲染
     * @return {XML}
     */
    render() {
      return this.renderForm();
    }
  }
);

export default FilterServerListForm;
