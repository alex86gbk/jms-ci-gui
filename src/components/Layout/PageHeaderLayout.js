import React from 'react';
import PageHeader from '../PageHeader';
import styles from './PageHeaderLayout.less';

export default ({ children, wrapperClassName, top, ...restProps }) => (
  <div style={{ margin: '-24px -24px 0' }} className={wrapperClassName}>
    {top}
    <PageHeader key="pageheader" {...restProps} />
    {children ? <div className={styles.content}>{children}</div> : null}
  </div>
);
