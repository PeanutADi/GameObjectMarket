# 项目运行图

![成品图.png](https://i.loli.net/2018/12/29/5c2745559cd53.png)

# 项目准备

项目准备：
1. 安装Node.JS环境。下载我的源码。
2. 安装Truffle,并且solidity的编译器版本在0.5.0以下。
3. 在默认的浏览器中安装MetaMask，并使用Truffle提供的助记词（candy maple cake sugar pudding cream honey rich smooth crumble sweet treat）生成的账号。


# 使用说明

1. 本项目需要运行在windows环境，及Solidity版本需要在0.5.0版本以下。

2. 下载源代码后，删除已有的编译文件build文件夹。

3. 打开cmd，进入项目目录，输入truffle develop进入项目控制台。输入compile编译。输入migrate部署。

4. 新开cmd，进入项目目录，输入npm run dev，打开lite-server，在浏览器中打开项目。

5. 在项目的可视化窗口中，文件的选择窗口是用来选择物品的图片。在输入完物品的价格、名称后，点击submit将商品提交到市场中。

6. 对于市场中的商品，单击Buy进行购买，在经过钱包的确认后购买成功。