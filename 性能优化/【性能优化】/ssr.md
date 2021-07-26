#### ssr

* 服务端渲染（ php. Jsp）

  ```javascript
  vue   -> json   -> vue-server-render  ->  html
  ```

  

* 

#### 预渲染

*   webpack 将打包好的vue项目，放到无头浏览器里面运行，生成 HTML 文件 ， 将生成的HTML 文件，注入到 index.html 里面，形成静态的 html 页面， 将 index.html 放到 CDN 上面。用户请求直接得到 HTML 文件
  * 缺点：
    * 不能根据不同的用户，生成对应 的 HTML， 
    * 不去请求动态的关于个人喜好的 ajax 请求

#### 同构

* 一套代码， 多端使用(vue, react, nuxt)

  * nuxt

    ```javascript
    vue-server-render
    
    ```

























