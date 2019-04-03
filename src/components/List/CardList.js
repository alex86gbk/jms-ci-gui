import React, { PureComponent } from 'react';
import { Card, Button, Icon, List } from 'antd';
import PageHeaderLayout from '../Layout/PageHeaderLayout';

import styles from './CardList.less';

/**
 * 卡片列表
 */
export default class CardList extends PureComponent {
  /**
   * 组件装载
   */
  componentDidMount() {
  }

  /**
   * 渲染
   * @return {XML}
   */
  render() {
    const {
      title,
      list,
      loading,
      contentTitle,
      contentLink,
      extraImg,
    } = this.props;

    const content = (
      <div className={styles.pageHeaderContent}>
        {contentTitle}
        <div className={styles.contentLink}>
          {contentLink}
        </div>
      </div>
    );

    const extraContent = (
      <div className={styles.extraImg}>
        <img
          alt={title}
          src={extraImg}
        />
      </div>
    );

    return (
      <PageHeaderLayout title={title} content={content} extraContent={extraContent}>
        <div className={styles.cardList}>
          <List
            rowKey="id"
            loading={loading}
            grid={{ gutter: 24, lg: 3, md: 2, sm: 1, xs: 1 }}
            dataSource={['', ...list]}
            renderItem={item =>
              item ? (
                <List.Item key={item.id}>
                  <Card hoverable className={styles.card} actions={[<a>打包</a>, <a>发布</a>]}>
                    <Card.Meta
                      avatar={<img alt="" className={styles.cardAvatar} src={item.avatar} />}
                      title={<a href="#">{item.title}</a>}
                      description={item.description}
                    />
                  </Card>
                </List.Item>
              ) : (
                <List.Item>
                  <Button type="dashed" className={styles.newButton}>
                    <Icon type="plus" /> 新增项目
                  </Button>
                </List.Item>
              )
            }
          />
        </div>
      </PageHeaderLayout>
    );
  }
}
