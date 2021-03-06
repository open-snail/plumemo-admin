<template>
  <div>
    <a-list item-layout="horizontal" :dataSource="data">
      <a-list-item slot="renderItem" slot-scope="item, index" :key="index">
        <a-list-item-meta>
          <a slot="title">{{ item.title }}</a>
          <span slot="description"> {{ item.description }} </span>
        </a-list-item-meta>
        <div slot="actions">
          <a-switch checked-children="暗色" un-checked-children="白色" :checked="defaultChecked" @change="onChange" />
        </div>
      </a-list-item>
    </a-list>
  </div>
</template>

<router>
{
  meta:{
    title: '主题颜色',
  }
}
</router>
<script>
import { optionsApi } from '@/includes/datas';
export default {
  name: 'ThemeColor',
  data() {
    return {
      defaultChecked: true,
      light: {
        primary: '#1976D2',
        secondary: '#424242',
        accent: '#82B1FF',
        anchor: '#393E46',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FB8C00',
      },
      dark: {
        primary: '#41444b',
        secondary: '#424242',
        accent: '#FF4081',
        anchor: '#EEEEEE',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FB8C00',
      },
      data: [
        {
          title: '风格配色',
          description: '主题风格配色设置',
        },
      ],
    };
  },
  created() {
    console.log(this.defaultChecked);
    this.getThemeColor();
  },
  methods: {
    onChange(checked) {
      // {"dark":true,"themes":{"primary":"#e2534d","secondary":"#424242","accent":"#FF4081","anchor":"#EEEEEE","error":"#FF5252","info":"#2196F3","success":"#4CAF50","warning":"#FB8C00"}}
      console.log(checked);
      let configValue = {
        dark: checked,
        themes: checked ? this.dark : this.light,
      };

      optionsApi.update([{ configKey: 'theme_color', configValue: JSON.stringify(configValue) }]).then((res) => {
        this.defaultChecked = !this.defaultChecked;
      });
    },
    getThemeColor() {
      optionsApi.getList(['theme_color']).then((res) => {
        this.defaultChecked = JSON.parse(res.rows[0].configValue).dark;
      });
    },
  },
};
</script>