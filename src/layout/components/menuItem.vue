<script>
export default {
  name: "MenuItem",
  functional: true,
  props: {
    icon: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: ""
    }
  },
  render(h, context) {
    const { icon, title } = context.props;
    const vnodes = [];

    if (icon) {
      vnodes.push(<i class={icon}></i>);
    }

    if (title) {
      vnodes.push(
        <span slot="title" class="menu-item-text">
          {title}
        </span>
      );
    }
    return vnodes;
  }
};
</script>
