//我们这里使用CommonJS的风格
function generateText() {
  console.log('test');
}

module.exports = {
  'generateText': generateText
};
