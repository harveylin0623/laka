export const directiveVisible = {
  updated(el, binding) {
    el.type = binding.value ? 'text' : 'password'
  },
  mounted(el, binding) {
    el.type = binding.value ? 'text' : 'password'
  },
}