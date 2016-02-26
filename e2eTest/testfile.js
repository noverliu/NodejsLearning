var webdriver = require('selenuim-webdriver');

var driver = new webdriver.Builder().
    withCapabilities(webdriver.Capabilities.chrome()).
    build();

driver.get('http://www.baidu.com');