import request from '../utils/request';

/**
 * 获取项目列表
 * @param params
 * @return {Promise.<Object>}
 */
export async function getProjectList(params) {
  return request({
    url: '/common/getProjectList',
    method: 'POST',
    data: params.payload,
  });
}

/**
 * 获取服务器列表
 * @param params
 * @return {Promise.<Object>}
 */
export async function getServerList(params) {
  return request({
    url: '/common/getServerList',
    method: 'POST',
    data: params.payload,
  });
}
