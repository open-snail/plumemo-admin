<template>
  <div class="app-container">
    <a-card :bordered="false">
      <a-radio-group v-model="value" @change="onChange">
        <a-radio :style="radioStyle" :value="1">
          <a-row type="flex" justify="space-between">
            <a-col :span="4">
              <div style="width: 50px; height: 25px; background-color: #e2534d; line-height: 30px; ">primary</div>
            </a-col>
            <!-- <a-col :span="4">
              <a-card style="width: 50px; height: 25px; background-color: #424242"> secondary </a-card>
            </a-col>
            <a-col :span="4">
              <a-card style="width: 50px; height: 25px; background-color: #ff4081"> accent </a-card>
            </a-col>
            <a-col :span="4">
              <a-card style="width: 50px; height: 25px; background-color: #eeeeee"> anchor </a-card>
            </a-col>
            <a-col :span="4">
              <a-card style="width: 50px; height: 25px; background-color: #2196F3"> info </a-card>
            </a-col>
            <a-col :span="4">
              <a-card style="width: 50px; height: 25px; background-color: #4CAF50"> success </a-card>
            </a-col>
            <a-col :span="4">
              <a-card style="width: 50px; height: 25px; background-color: #FB8C00"> warning </a-card>
            </a-col> -->
          </a-row>
        </a-radio>
        <!-- <a-radio :style="radioStyle" :value="2"> Option B </a-radio>
        <a-radio :style="radioStyle" :value="3"> Option C </a-radio>
        <a-radio :style="radioStyle" :value="4">
          More...
          <a-input v-if="value === 4" :style="{ width: 100, marginLeft: 10 }" />
        </a-radio> -->
      </a-radio-group>
    </a-card>
  </div>
</template>

<router>
{
  meta:{
    title: 'Theme Color',
  }
}
</router>

<script>
// {"dark":true,"themes":{"primary":"#e2534d","secondary":"#424242","accent":"#FF4081","anchor":"#EEEEEE","error":"#FF5252","info":"#2196F3","success":"#4CAF50","warning":"#FB8C00"}}
export default {
  name: 'ThemeColor',
  data() {
    return {
      value: 1,
      radioStyle: {
        display: 'flex',
        height: '30px',
        lineHeight: '30px'
      },
    };
  },
  methods: {
    onChange(e) {
      console.log('radio checked', e.target.value);
    },
  },
};
</script>
<style>
 .a{
   line-height: 30px;
 }
</style>
