## git fetch  + git merge origin/master == git pull

* Someone pushed a new commit A to repositry, then the master will pointer to the new commit A;
* in your local computer , the origin/master and master will also the same with before;
* Use git fetch to sync  origin/ master
* use git merge origin/master to sync you local master 【  同步本地 master 和origin/ master 指向同一个分支】

git diff origin/master 查看本地 master 和远程 master 的区别

* 可以查看--代表的索引区域的文件，和++ 代表的工作区的文件的区别
* git cat file -p + 文件的哈希值【8 位】 可以查看当前的文件内容.
* git diff --cached 查看当前索引区域和代码仓库的区别

git branch -vv 可以看到当前分支的一些详细情况

直接 pull 有时候会发生冲突， 最好先 fetch 一下，运行 git diff 看看本地和远程仓库的差别，再做提交