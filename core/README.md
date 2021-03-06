# Po blog 前端核心框架

## hooks
> 子模块可以通过 hooks 方法注入到主程序中

| name                | type   | params                                                       | returns            | description                                          |
| ------------------- | ------ | ------------------------------------------------------------ | ------------------ | ---------------------------------------------------- |
| Http 请求           |        |                                                              |                    |
| pre_request         | filter | (config:AxiosRequestConfig)                                  | AxiosRequestConfig |                                                      |
| request_error       | action | (error:AxiosError)                                           | -                  |                                                      |
| pre_response        | filter | (response:AxiosResponse<T>)                                  | AxiosResponse<T>   |                                                      |
| response_error      | action | (error:AxiosError)                                           | -                  |                                                      |
| 多语言              |        |                                                              |                    |                                                      |
| i18n_message_update | action | (message:VueI18n.LocaleMessageObject,locale: VueI18n.Locale) |                    | 内置语言的 message 修改（内置 en-US,zh-CN）          |
| i18n_messages       | action | (messages:VueI18n.LocaleMessages)                            |                    | 初始化 Vuei18n 之前对 messages 进行修改              |
| i18n_messages-async | action | (locale: VueI18n.Locale, i18n:VueI18n)                       |                    | 不在内置语言中或在 messages 中找不到的情况将会被调用 |
| 页面周期            |        |                                                              |                    |                                                      |
| init                | action | (context:Context)                                            | -                  | theme/plugins 加载之后，Vue 实例之前                 |
| head_title_template | filter | (titleTemplate:Layout:(title:string)=>string)                | string             | (title:string)=> string                              |  |
| layouts             | action | (layouts:Layout, name:string)                                | -                  |                                                      |
| app_created         | action | -                                                            | -                  | root Vue created 生命周期                            |
| app_mounted         | action | -                                                            | -                  | root Vue mounted 生命周期                            |

 > #### `type`区别:  
 > #### `filter`: 有 1 个或多个参数，并且必须把处理完后的结果返回  
 > #### `action`: 有 0 个或多个参数，并且无结果返回  


<br>
<br>
<br>

### `开发注意事项:` 
- 修改 scripts 中的 PROXYAPI_URL(serve) 和 BASE_URL(build/generate) api访问地址
- fork-ts-checker-webpack-plugin 与 @vue/cli-plugin-typescript 中的版本有冲突，如果把 core 加到 monorepo 时添加引用到 devDependencies 或者设置 nohoist 解决冲突问题
