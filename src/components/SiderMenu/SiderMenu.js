import React from 'react';
import { Layout, Menu, Icon } from 'antd';
import styles from './SiderMenu.less';
import logo from '../../assets/images/jms-ci.png';

const { Sider } = Layout;

/**
 * 侧边栏菜单
 */
export default class SiderMenu extends React.Component {
  /**
   * 渲染
   * @return {XML}
   */
  render() {
    return (
      <Sider className={styles.sider}>
        <div className={styles.logo}>
          <span className={styles.container}>
            <img src={logo} alt="logo" />
          </span>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          style={{ padding: '16px 0', width: '100%' }}
          defaultSelectedKeys={['4']}
        >
          <Menu.Item key="1">
            <Icon type="schedule" />
            <span className="nav-text">项目配置</span>
          </Menu.Item>
          <Menu.Item key="2">
            <Icon type="cloud" />
            <span className="nav-text">服务器管理</span>
          </Menu.Item>
        </Menu>
      </Sider>
    );
  }
}
