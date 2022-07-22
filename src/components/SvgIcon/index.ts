import svgicon from "./index.vue";

/**
 * 自动导入 @/assets/svgicon 下svg文件
 */
export function importWhole(): void {
  try {
    const requireContext: __WebpackModuleApi.RequireContext = require.context(
      "../../assets/svgicon",
      false,
      /\.svg$/
    );
    requireContext.keys().forEach(requireContext);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
}

export default svgicon;
