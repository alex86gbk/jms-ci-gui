import React, { PureComponent, Fragment } from 'react';
import moment from 'moment';
import { Card, Button, Table, Divider, Badge, Popconfirm } from 'antd';
import PageHeaderLayout from '../Layout/PageHeaderLayout';
import FilterServerListForm from '../Form/FilterServerListForm';
import CreateServerForm from '../Form/CreateServerForm';
import EditServerForm from '../Form/EditServerForm';

import styles from './TableList.less';

const status = ['关闭', '在线'];
const statusBadgeMap = ['default', 'processing'];
const statusFilterMap = [
  {
    text: '关闭',
    value: 0,
  },
  {
    text: '在线',
    value: 1,
  },
];

/**
 * 服务器列表
 */
export default class ServerList extends PureComponent {
  state = {
    visibleCreateItem: false,
    visibleEditItem: false,
    record: {},
  };

  columns = [
    {
      title: '域名（IP）',
      dataIndex: 'host',
    },
    {
      title: '名称',
      dataIndex: 'name',
    },
    {
      title: '描述',
      dataIndex: 'description',
    },
    {
      title: '发布次数',
      dataIndex: 'callNo',
      sorter: true,
      align: 'right',
    },
    {
      title: '状态',
      dataIndex: 'status',
      filters: statusFilterMap,
      onFilter: (value, record) => record.status.toString() === value,
      render(val) {
        return <Badge status={statusBadgeMap[val]} text={status[val]} />;
      },
    },
    {
      title: '更新时间',
      dataIndex: 'updatedAt',
      sorter: true,
      align: 'right',
      render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.showEditItem(record)}>编辑</a>
          <Divider type="vertical" />
          <Popconfirm
            title="确定删除该项目？"
            onConfirm={() => this.confirmDeleteItem(record)}
            okText="确定"
            cancelText="取消"
          >
            <a>删除</a>
          </Popconfirm>
        </Fragment>
      ),
    },
  ];

  /**
   * 组件装载
   */
  componentDidMount() {
  }

  handleSubmitFilter = (values) => {
    const { onFilterItem } = this.props;
    onFilterItem(values);
  };

  handleCreateItem = () => {
    const { onCreateItem } = this.props;
    const { form } = this.createItemFormRef.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      this.setState({ visibleCreateItem: false });
      onCreateItem(values);
    });
  };

  cancelCreateItem = () => {
    this.setState({
      visibleCreateItem: false,
    });
  };

  handleEditItem = () => {
    const { onEditItem } = this.props;
    const { form } = this.editItemFormRef.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      this.setState({ visibleEditItem: false });
      onEditItem(values);
    });
  };

  cancelEditItem = () => {
    this.setState({
      visibleEditItem: false,
    });
  };

  showCreateItem = () => {
    this.setState({
      visibleCreateItem: true,
    });
  };

  showEditItem = (record) => {
    this.setState({
      visibleEditItem: true,
      record,
    });
  };

  confirmDeleteItem = (item) => {
    const { onDeleteItem } = this.props;
    onDeleteItem(item);
  };

  saveCreateItemFormRef = (formRef) => {
    this.createItemFormRef = formRef;
  };

  saveEditItemFormRef = (formRef) => {
    this.editItemFormRef = formRef;
  };

  /**
   * 渲染
   * @return {XML}
   */
  render() {
    const {
      visibleCreateItem,
      visibleEditItem,
      record,
    } = this.state;
    const {
      list,
      loading,
    } = this.props;

    return (
      <PageHeaderLayout title="服务器管理">
        <CreateServerForm
          wrappedComponentRef={this.saveCreateItemFormRef}
          visible={visibleCreateItem}
          onCreate={this.handleCreateItem}
          onCancel={this.cancelCreateItem}
        />
        <EditServerForm
          wrappedComponentRef={this.saveEditItemFormRef}
          data={record}
          visible={visibleEditItem}
          onEdit={this.handleEditItem}
          onCancel={this.cancelEditItem}
        />
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>
              <FilterServerListForm
                onHandleSubmit={this.handleSubmitFilter}
              />
            </div>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={this.showCreateItem}>
                新建
              </Button>
            </div>
            <Table
              loading={loading}
              dataSource={list}
              columns={this.columns}
            />
          </div>
        </Card>
      </PageHeaderLayout>
    );
  }
}
