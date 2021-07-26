/**
 * webpackPrefetch : 预加载, 在浏览器空闲的时候加载资源,但是兼容性比较差,对于高级浏览器的兼容好
 * 懒加载 : 用的时候才加载文件
 */

document.getElementById("button").onclick = function () {
  import(/*webpackChunkName: 'test', webpackPrefetch: true*/ "./test.js")
    .then(({ add }) => {
      add(2, 2);
    })
    .catch(() => {});
};
