import React from 'React'
import ReactDOM from 'ReactDOM';
import { Layout } from 'antd';
import SiderMenu from '../components/SiderMenu/SiderMenu';
import GlobalHeader from '../components/GlobalHeader/GlobalHeader';
import CardList from '../components/List/CardList';
import * as service from '../services/commonServices';

import extraImg from '../assets/images/project.png';
import quickStart from '../assets/images/quick-start.svg';

const { Header, Content, Footer } = Layout;

/**
 * 项目配置
 */
class Projects extends React.Component {
  state = {
    data: [],
    loading: false,
    collapsed: false,
  };

  /**
   * 组件装载
   */
  componentDidMount() {
    this.getData();
  }

  /**
   * 获取项目列表
   * @param {Number} [pageIndex]
   */
  getData = (pageIndex) => {
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

  onCollapse = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  /**
   * 渲染
   * @return {XML}
   */
  render() {
    const contentTitle = (
      <p>
        在这里添加，配置项目。包括名称，图标，介绍，本地项目路径，远程发布路径。
      </p>
    );

    const contentLink = (
      <div>
        <a>
          <img alt="" src={quickStart} />
          快速开始
        </a>
      </div>
    );

    return (
      <Layout>
        <SiderMenu
          collapsed={this.state.collapsed}
        />
        <Layout>
          <Header style={{ padding: 0 }}>
            <GlobalHeader
              collapsed={this.state.collapsed}
              onCollapse={this.onCollapse}
            />
          </Header>
          <Content style={{ margin: '24px 24px 0', height: '100%' }}>
            <CardList
              title="项目配置"
              contentTitle={contentTitle}
              contentLink={contentLink}
              extraImg={extraImg}
              loading={this.state.loading}
              list={this.state.data}
            />
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
  <Projects />,
  document.getElementById('app')
);
