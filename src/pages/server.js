import React from 'React';
import ReactDOM from 'ReactDOM';
import { Layout, LocaleProvider, notification } from 'antd';
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
    host: '',
    status: '',
    name: '',
    platform: '',
    auth: '',
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
   * 获取服务器列表
   */
  getData = () => {
    const { host, status, name, platform, auth } = this.state;
    this.setState({ loading: true });
    service.getServerList({
      payload: {
        'host': host,
        'status': status,
        'name': name,
        'platform': platform,
        'auth': auth,
      },
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

  handleFilterData = (values) => {
    this.setState({
      host: values.host,
      status: values.status,
      name: values.name,
      platform: values.platform,
      auth: values.auth,
    }, () => {
      this.getData();
    });
  };

  saveData = (values) => {
    this.setState({ loading: true });
    service.saveServer({
      payload: {
        'id': values.id,
        'name': values.name,
        'host': values.host,
        'description': values.description,
        'platform': values.platform,
        'username': values.username,
        'auth': values.auth,
        'password': values.password,
        'fileId': values.fileId,
      },
    }).then((res) => {
      this.getData();
      if (res.result.status === 1) {
        notification.success({
          message: values.id ? '保存成功' : '新增成功',
          description: values.name,
        });
      } else {
        notification.error({
          message: `${(values.id ? '保存失败' : '新增失败')}：${res.result.errMsg}`,
          description: values.name,
        });
      }
    });
  };

  deleteServer = (values) => {
    this.setState({ loading: true });
    service.deleteServer({
      payload: {
        'id': values.id,
      },
    }).then((res) => {
      this.getData();
      if (res.result.status === 1) {
        notification.success({
          message: '删除成功',
          description: values.name,
        });
      } else {
        notification.error({
          message: `删除失败：${res.result.errMsg}`,
          description: values.name,
        });
      }
    });
  };

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
                onFilterItem={this.handleFilterData}
                onCreateItem={this.saveData}
                onEditItem={this.saveData}
                onDeleteItem={this.deleteServer}
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
