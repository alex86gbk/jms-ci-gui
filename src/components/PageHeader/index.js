import React, { PureComponent } from 'react';
import classNames from 'classnames';
import styles from './index.less';

/**
 * 页头
 */
export default class PageHeader extends PureComponent {
  /**
   * 渲染
   * @return {XML}
   */
  render() {
    const {
      title,
      logo,
      action,
      content,
      extraContent,
      className,
      tabActiveKey,
      tabDefaultActiveKey,
    } = this.props;

    const clsString = classNames(styles.pageHeader, className);
    const activeKeyProps = {};
    if (tabDefaultActiveKey !== undefined) {
      activeKeyProps.defaultActiveKey = tabDefaultActiveKey;
    }
    if (tabActiveKey !== undefined) {
      activeKeyProps.activeKey = tabActiveKey;
    }

    return (
      <div className={clsString}>
        <div className={styles.detail}>
          {logo && <div className={styles.logo}>{logo}</div>}
          <div className={styles.main}>
            <div className={styles.row}>
              {title && <h1 className={styles.title}>{title}</h1>}
              {action && <div className={styles.action}>{action}</div>}
            </div>
            <div className={styles.row}>
              {content && <div className={styles.content}>{content}</div>}
              {extraContent && <div className={styles.extraContent}>{extraContent}</div>}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
