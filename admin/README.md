# Po blog 后台管理系统

## hooks
> 子模块可以通过 hooks 方法注入到主程序中

| name | type   | description                          |
| ---- | ------ | ------------------------------------ |
| init | action | theme/plugins 加载之后，Vue 实例之前 |

 #### `type 区别:`  
 ##### filter: 有 1 个或多个参数，并且必须把处理完后的结果返回  
 ##### action: 有 0 个或多个参数，并且无结果返回

<br>
<br>
<br>

### `开发注意事项:` 
1、修改 scripts 中的 PROXYAPI_URL(serve) 和 BASE_URL(build/generate) api访问地址
2、fork-ts-checker-webpack-plugin 与 @vue/cli-plugin-typescript 中的版本有冲突，如果把 core 加到 monorepo 时添加引用到 devDependencies 或者设置 nohoist 解决冲突问题

