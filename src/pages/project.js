import React from 'React';
import ReactDOM from 'ReactDOM';
import { Layout, LocaleProvider, notification } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import SiderMenu from '../components/SiderMenu/SiderMenu';
import GlobalHeader from '../components/GlobalHeader/GlobalHeader';
import ProjectList from '../components/List/ProjectList';
import * as service from '../services/commonServices';

import storeSider from '../stores/Sider';

const { Header, Content, Footer } = Layout;

/**
 * 项目配置
 */
class Project extends React.Component {
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
    service.getProjectList({
      payload: {},
    }).then((res) => {
      this.setState({
        loading: false,
        data: res.list,
      });
    });
  };

  saveData = (values) => {
    this.setState({ loading: true });
    service.saveProject({
      payload: {
        'id': values.id,
        'name': values.name,
        'description': values.description,
        'localPath': values.localPath,
        'remotePath': values.remotePath,
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

  packageProject = (values) => {
    this.setState({ loading: true });
    service.packageProject({
      payload: {
        'id': values.id,
      },
    }).then((res) => {
      this.getData();
      if (res.result.status === 1) {
        notification.success({
          message: '启动打包成功',
          description: `打包 ${values.name} 需要花费一些时间，请耐心等待`,
        });
      } else {
        notification.error({
          message: `启动打包失败：${res.result.errMsg}`,
          description: values.name,
        });
      }
    });
  };

  publishProject = (values) => {
    this.setState({ loading: true });
    service.publishProject({
      payload: {
        'projectId': values.projectId,
        'serverId': values.serverId,
      },
    }).then((res) => {
      this.getData();
      if (res.result.status === 1) {
        notification.success({
          message: '启动发布成功',
          description: `发布 ${values.name} 需要花费一些时间，请耐心等待`,
        });
      } else {
        notification.error({
          message: `启动发布失败：${res.result.errMsg}`,
          description: values.name,
        });
      }
    });
  };

  deleteProject = (values) => {
    this.setState({ loading: true });
    service.deleteProject({
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
              <ProjectList
                onCreateItem={this.saveData}
                onEditItem={this.saveData}
                onPackageItem={this.packageProject}
                onPublishItem={this.publishProject}
                onDeleteItem={this.deleteProject}
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
  <Project />,
  document.getElementById('app')
);
