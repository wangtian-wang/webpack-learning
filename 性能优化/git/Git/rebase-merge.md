## 1: resbase 的前提：

* Fast-merge

* 1  dev 分支上有最新的 master 分支上的内容
* 同步 mater 分支上的最新 commit，将 Dev 分支上的 commit 历史重写

## 缺点：

* ​        Dev 分支 在rebase 之前，已经将 commit   push 到了远程仓库，在 rebase操作之后，再去 push 到远程仓库就会出错。【 可以强制 push】
* ​       Dev 分支 在rebase 之前，已经将 commit   push 到了远程仓库，并且远程分支被A拉取了下来，并且 A 正在基于次分支开发， 此时时候执行了 rebase 操作，强制 push，  A 的代码就不能提交上去。因为这个历史会被重写 。

### 适用范围： 

* 某个分支上只有你一个在开发

##### ### ``在 master 分支上不能使用rebase``

```
git rebase master
```



## 2：merge

* Three way merge
* 有主分支和 Dev 分支上的历史记录

#### 没有冲突

#### 有冲突



## 3： 共同点

* 都是为了合并代码
* 

