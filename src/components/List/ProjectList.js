import React, { PureComponent, Fragment } from 'react';
import { Card, Button, Icon, List, Popconfirm } from 'antd';
import PageHeaderLayout from '../Layout/PageHeaderLayout';
import CreateProjectForm from '../Form/CreateProjectForm';
import EditProjectForm from '../Form/EditProjectForm';
import SelectServerForm from '../Form/SelectServerForm';

import styles from './CardList.less';

import extraImg from '../../assets/images/project.png';
import quickStart from '../../assets/images/quick-start.svg';
import defaultIcon from '../../assets/images/default.png';

/**
 * 项目列表
 */
export default class ProjectList extends PureComponent {
  state = {
    visibleCreateItem: false,
    visibleEditItem: false,
    visibleSelectServer: false,
    record: {},
  };

  /**
   * 组件装载
   */
  componentDidMount() {
  }

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

  handlePublishProject = () => {
    const { onPublishItem } = this.props;
    const { form } = this.selectServerFormRef.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      this.setState({ visibleSelectServer: false });
      onPublishItem(values);
    });
  };

  handlePackageProject = (item) => {
    const { onPackageItem } = this.props;
    onPackageItem(item);
  };

  showSelectServer = (record) => {
    this.setState({
      visibleSelectServer: true,
      record,
    });
  };

  cancelSelectServer = () => {
    this.setState({
      visibleSelectServer: false,
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

  saveSelectServerFormRef = (formRef) => {
    this.selectServerFormRef = formRef;
  };

  /**
   * 渲染
   * @return {XML}
   */
  render() {
    const {
      visibleCreateItem,
      visibleEditItem,
      visibleSelectServer,
      record,
    } = this.state;
    const {
      list,
      loading,
    } = this.props;

    const content = (
      <div className={styles.pageHeaderContent}>
        <p>
          在这里添加，配置项目。包括名称，图标，介绍，本地项目路径，远程发布路径。
        </p>
        <div className={styles.contentLink}>
          <a>
            <img alt="" src={quickStart} />
            快速开始
          </a>
        </div>
      </div>
    );

    const extraContent = (
      <div className={styles.extraImg}>
        <img
          alt=""
          src={extraImg}
        />
      </div>
    );

    /**
     * 扩展操作
     * @return {XML}
     */
    const extraOperation = (item) => {
      return (
        <Fragment>
          <Icon
            type="edit"
            theme="twoTone"
            style={{ fontSize: '16px', marginRight: '15px' }}
            onClick={() => this.showEditItem(item)}
          />
          <Popconfirm
            title="确定删除该项目？"
            onConfirm={() => this.confirmDeleteItem(item)}
            okText="确定"
            cancelText="取消"
          >
            <Icon
              type="delete"
              theme="twoTone"
              twoToneColor="#f5222d"
              style={{ fontSize: '16px' }}
            />
          </Popconfirm>
        </Fragment>
      );
    };

    /**
     * 操作
     */
    const actions = (item) => {
      if (!item.isPackaging && !item.isPublishing) {
        return [
          <a onClick={() => this.handlePackageProject(item)}>打包</a>,
          <a onClick={() => this.showSelectServer(item)}>发布</a>,
        ];
      } else if (item.isPackaging && !item.isPublishing) {
        return [
          <span className={styles.disabled}>打包中 ...</span>,
          <span className={styles.disabled}>发布</span>,
        ];
      } else if (!item.isPackaging && item.isPublishing) {
        return [
          <span className={styles.disabled}>打包</span>,
          <span className={styles.disabled}>发布中 ...</span>,
        ];
      }
    };

    return (
      <PageHeaderLayout
        title="项目配置"
        content={content}
        extraContent={extraContent}
      >
        <CreateProjectForm
          wrappedComponentRef={this.saveCreateItemFormRef}
          visible={visibleCreateItem}
          onCreate={this.handleCreateItem}
          onCancel={this.cancelCreateItem}
        />
        <EditProjectForm
          wrappedComponentRef={this.saveEditItemFormRef}
          data={record}
          visible={visibleEditItem}
          onCreate={this.handleEditItem}
          onCancel={this.cancelEditItem}
        />
        <SelectServerForm
          wrappedComponentRef={this.saveSelectServerFormRef}
          data={record}
          visible={visibleSelectServer}
          onSelect={this.handlePublishProject}
          onCancel={this.cancelSelectServer}
        />
        <div className={styles.cardList}>
          <List
            rowKey="id"
            loading={loading}
            grid={{ gutter: 24, lg: 3, md: 2, sm: 1, xs: 1 }}
            dataSource={['', ...list]}
            renderItem={(item) => {
              return item ? (
                <List.Item key={item.id}>
                  <Card
                    hoverable
                    title={<a href={item.previewUrl} target="_blank" rel="noopener noreferrer">{item.name}</a>}
                    extra={extraOperation(item)}
                    className={styles.card}
                    actions={actions(item)}
                  >
                    <Card.Meta
                      avatar={<img alt="" className={styles.cardAvatar} src={item.icon ? item.icon : defaultIcon} />}
                      title={item.description}
                      description={item.localPath}
                    />
                  </Card>
                </List.Item>
              ) : (
                <List.Item>
                  <Button
                    type="dashed"
                    className={styles.newButton}
                    onClick={this.showCreateItem}
                  >
                    <Icon type="plus" />
                    新增项目
                  </Button>
                </List.Item>
              );
            }
            }
          />
        </div>
      </PageHeaderLayout>
    );
  }
}
