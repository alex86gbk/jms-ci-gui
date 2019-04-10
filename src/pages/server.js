import React from 'React';
import ReactDOM from 'ReactDOM';
import { Layout, LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import SiderMenu from '../components/SiderMenu/SiderMenu';
import GlobalHeader from '../components/GlobalHeader/GlobalHeader';
import ServerList from '../components/List/ServerList';
import * as service from '../services/commonServices';

import storeSider from '../stores/Sider';

const { Header, Content, Footer } = Layout;

/**
 * 服务器管理
 */
class Server extends React.Component {
  state = {
    data: [],
    loading: false,
  };

  /**
   * 组件装载
   */
  componentDidMount() {
    this.getData();
  }

  /**
   * 获取项目列表
   */
  getData = () => {
    this.setState({ loading: true });
    service.getServerList({
      payload: {},
    }).then((res) => {
      this.setState({
        loading: false,
        data: res.list.map((item) => {
          Object.defineProperty(item, 'key', {
            value: item.id,
            writable: false,
          });
          return item;
        }),
      });
    });
  };

  createProject = () => {};

  /**
   * 渲染
   * @return {XML}
   */
  render() {
    const { loading, data } = this.state;

    return (
      <Layout>
        <SiderMenu
          store={storeSider}
        />
        <Layout>
          <Header style={{ padding: 0 }}>
            <GlobalHeader
              store={storeSider}
            />
          </Header>
          <Content style={{ margin: '24px 24px 0', height: '100%' }}>
            <LocaleProvider locale={zhCN}>
              <ServerList
                onCreateItem={this.createProject}
                loading={loading}
                list={data}
              />
            </LocaleProvider>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            JMS CI ©2019 Created by Alex
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

ReactDOM.render(
  <Server />,
  document.getElementById('app')
);
