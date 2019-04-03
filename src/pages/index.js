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
        data: res.list,
      });
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
      <CardList
        title="项目配置"
        contentTitle={contentTitle}
        contentLink={contentLink}
        extraImg={extraImg}
        list={this.state.data}
      />
    );
  }
}

ReactDOM.render(
  <Layout>
    <SiderMenu />
    <Layout style={{ marginLeft: 200 }}>
      <Header style={{ padding: 0 }}>
        <GlobalHeader />
      </Header>
      <Content style={{ margin: '24px 24px 0', height: '100%' }}>
        <Projects />
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        JMS CI ©2019 Created by Alex
      </Footer>
    </Layout>
  </Layout>,
  document.getElementById('app')
);
