module.exports = {
  presets: [
    '@vue/app'
  ],
  plugins: [
    //import store module all for one time
    './babel-plugin/import.js'
  ]
}