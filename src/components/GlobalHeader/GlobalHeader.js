import React from 'react';
import { observer } from 'mobx-react';
import { Menu, Icon, Dropdown, Avatar, message } from 'antd';
import * as service from '../../services/commonServices';
import styles from './GlobalHeader.less';

import avatar from '../../assets/images/avatar_24px.png';

/**
 * 头部导航
 */
@observer
class GlobalHeader extends React.Component {
  toggle = () => {
    const { store } = this.props;
    store.onCollapse(store.collapsed);
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
        <Menu.Item key="triggerError">
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
