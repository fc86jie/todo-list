/**
 * @Author: wangrenjie86@gmail.com
 * @Date: 2022-11-04 10:21:33
 * @LastEditors: wangrenjie86@gmail.com
 * @LastEditTime: 2022-11-04 11:31:41
 * @FilePath: \react\react-learn\todo-list\craco.config.js
 * @Description:
 */

const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@primary-color': '#1890ff' },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
