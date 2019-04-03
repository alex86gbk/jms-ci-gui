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
