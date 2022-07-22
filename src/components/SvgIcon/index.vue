<template>
  <svg class="svg-icon" aria-hidden="true">
    <use :xlink:href="`#${type}`" />
  </svg>
</template>
<script lang="ts">
/**
 * 自定义 svg icon
 * 使用说明：
 *   1、下载或制作svg文件，存放到/src/assets/svgicon目录下
 *   2、项目根据/src/assets/svgicon/svgo.yml配置自动压缩精简svg，也可以独立运行 npm run svgo 压缩精简svg
 *   3、使用Demo：
 *      import SvgIcon from '@/components/SvgIcon';
 *      import { defineComponent } from "vue";
 *      export default defineComponent({
 *          components: {
 *              SvgIcon
 *          }
 *      })
 *      <SvgIcon type="svg文件名" class="" style=""/>
 */
import { defineComponent } from "vue";
export default defineComponent({
  name: "SvgIcon",
  props: {
    type: {
      type: String,
      required: true
    }
  }
});
</script>
<style lang="scss" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
