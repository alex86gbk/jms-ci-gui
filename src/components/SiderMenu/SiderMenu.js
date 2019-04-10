import React from 'react';
import { observer } from 'mobx-react';
import { Layout, Menu, Icon } from 'antd';
import styles from './SiderMenu.less';
import logo from '../../assets/images/jms.png';

import projectRC from '../../../.projectrc';

const { Sider } = Layout;

/**
 * 侧边栏菜单
 */
@observer
class SiderMenu extends React.Component {
  state = {
    selectedKeys: '',
  };

  /**
   * 组件装载
   */
  componentDidMount() {
    const page = location.pathname.split('/').pop();
    if (page) {
      this.setState({
        selectedKeys: page.replace(/\.html$/, ''),
      });
    }
  }

  /**
   * 渲染
   * @return {XML}
   */
  render() {
    const { selectedKeys } = this.state;
    const { store, openKeys } = this.props;
    const publicPath = projectRC.publicPath.length ? `/${projectRC.publicPath.join('/')}` : '';

    return (
      <Sider
        breakpoint="lg"
        className={styles.sider}
        collapsed={store.collapsed}
        onBreakpoint={store.onBreakpoint}
      >
        <div className={styles.logo}>
          <img src={logo} alt="logo" />
          <h1>
            JMS-
            <sub>CI</sub>
          </h1>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          className={styles.menu}
          style={{ padding: '16px 0', width: '100%' }}
          defaultSelectedKeys={[openKeys || 'index']}
          selectedKeys={[selectedKeys]}
        >
          <Menu.Item key="project">
            <Icon type="schedule" />
            <span className="nav-text">
              <a href={`${publicPath}/project.html`}>项目配置</a>
            </span>
          </Menu.Item>
          <Menu.Item key="server">
            <Icon type="cloud" />
            <span className="nav-text">
              <a href={`${publicPath}/server.html`}>服务器管理</a>
            </span>
          </Menu.Item>
        </Menu>
      </Sider>
    );
  }
}

export default SiderMenu;
