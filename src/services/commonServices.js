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
 * 新增，保存项目
 * @param params
 * @return {Promise.<Object>}
 */
export async function saveProject(params) {
  return request({
    url: '/common/saveProject',
    method: 'POST',
    data: params.payload,
  });
}

/**
 * 打包项目
 * @param params
 * @return {Promise.<Object>}
 */
export async function packageProject(params) {
  return request({
    url: '/common/packageProject',
    method: 'POST',
    data: params.payload,
  });
}

/**
 * 发布项目
 * @param params
 * @return {Promise.<Object>}
 */
export async function publishProject(params) {
  return request({
    url: '/common/publishProject',
    method: 'POST',
    data: params.payload,
  });
}

/**
 * 删除项目
 * @param params
 * @return {Promise.<Object>}
 */
export async function deleteProject(params) {
  return request({
    url: '/common/deleteProject',
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

/**
 * 获取服务器下拉列表
 * @param params
 * @return {Promise.<Object>}
 */
export async function getServerSelectList(params) {
  return request({
    url: '/common/getServerSelectList',
    method: 'POST',
    data: params.payload,
  });
}

/**
 * 新增，保存服务器
 * @param params
 * @return {Promise.<Object>}
 */
export async function saveServer(params) {
  return request({
    url: '/common/saveServer',
    method: 'POST',
    data: params.payload,
  });
}

/**
 * 删除服务器
 * @param params
 * @return {Promise.<Object>}
 */
export async function deleteServer(params) {
  return request({
    url: '/common/deleteServer',
    method: 'POST',
    data: params.payload,
  });
}

/**
 * 检查服务器状态
 * @param params
 * @return {Promise.<Object>}
 */
export async function checkServerStatus(params) {
  return request({
    url: '/common/checkServerStatus',
    method: 'POST',
    data: params.payload,
  });
}

/**
 * 上传文件
 * @return {string}
 */
export function uploadFile() {
  return request({
    url: '/common/uploadFile',
    method: 'POST',
    sync: true,
  });
}

/**
 * 获取错误日志
 * @param params
 * @return {Promise.<Object>}
 */
export function getErrorLog(params) {
  return request({
    url: '/common/getErrorLog',
    method: 'POST',
    data: params.payload,
  });
}

/**
 * 退出
 * @param params
 * @return {Promise.<Object>}
 */
export function exit(params) {
  return request({
    url: '/common/exit',
    method: 'POST',
    data: params.payload,
  });
}
