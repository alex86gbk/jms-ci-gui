import React from 'react';
import { observer } from 'mobx-react';
import { Menu, Icon, Dropdown, Avatar, message, Modal, Spin, Empty } from 'antd';
import * as service from '../../services/commonServices';
import styles from './GlobalHeader.less';

import avatar from '../../assets/images/avatar_24px.png';

/**
 * 头部导航
 */
@observer
class GlobalHeader extends React.Component {
  state = {
    visible: false,
    loading: false,
    log: '',
  };

  toggle = () => {
    const { store } = this.props;
    store.onCollapse(store.collapsed);
  };

  getErrorLog = () => {
    this.setState({
      visible: true,
      loading: true,
    });
    service.getErrorLog({
      payload: {},
    }).then((res) => {
      this.setState({
        loading: false,
        log: res.result.errMsg,
      });
    });
  };

  handleCancal = () => {
    this.setState({ visible: false });
  };

  exit = () => {
    service.exit({
      payload: {},
    }).then((res) => {
      if (res.result.status === 1) {
        message.success('退出成功', 1);
      }
      setTimeout(() => {
        window.opener = null;
        window.open('', '_self');
        window.close();
      }, 1000);
    });
  };

  /**
   * 渲染
   * @return {XML}
   */
  render() {
    const { visible, loading, log } = this.state;
    const { store } = this.props;
    const { collapsed } = store;

    const menu = (
      <Menu className={styles.menu} selectedKeys={[]}>
        <Menu.Item disabled>
          <Icon type="user" />
          个人中心
        </Menu.Item>
        <Menu.Item disabled>
          <Icon type="setting" />
          设置
        </Menu.Item>
        <Menu.Item key="triggerError" onClick={this.getErrorLog}>
          <Icon type="close-circle" />
          错误日志
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="logout" onClick={this.exit}>
          <Icon type="logout" />
          退出
        </Menu.Item>
      </Menu>
    );

    return (
      <div className={styles.header}>
        <Modal
          title="错误日志"
          centered
          visible={visible}
          footer={null}
          onCancel={this.handleCancal}
        >
          {
            loading
              ? <Spin />
              : log
                ? <div style={{ maxHeight: 300, overflow: 'auto' }}>{log}</div>
                : <Empty />
          }
        </Modal>
        <Icon
          className={styles.trigger}
          type={collapsed ? 'menu-unfold' : 'menu-fold'}
          onClick={this.toggle}
        />
        <div className={styles.right}>
          <Dropdown overlay={menu}>
            <span className={`${styles.action} ${styles.account}`}>
              <Avatar size="small" className={styles.avatar} src={avatar} />
              <span className={styles.name}>Dev</span>
            </span>
          </Dropdown>
        </div>
      </div>
    );
  }
}

export default GlobalHeader;
