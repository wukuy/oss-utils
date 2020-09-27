#! /usr/bin/env node

const { program } = require('commander');
const OSS = require('./oss')

program.version(require('../package.json').version)

program
    .command('upload')
    .description('上传文件夹')
    .option('-f, --from <from>', '本地文件目录')
    .option('-t, --targe <targe>', '远程oss文件目录')
    .option('-c, --config <config>', `oss配置参数 {
        "region":"oss-cn-beijing",
        "accessKeyId":"xxxxxxxxx",
        "accessKeySecret":"xxxxxxxxx",
        "bucket":"SVR_NEW_DESIGNER_WEB"
    }`)
    .action(function (options) {
        let config = JSON.parse(options.config || '{}')
        let targe = options.targe
        let from = options.from

        let oss = new OSS(config)
        oss.puts(from, targe)
    });

program.parse(process.argv);