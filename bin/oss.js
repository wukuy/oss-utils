#! /usr/bin/env node
const OSS = require('ali-oss');
const path = require('path')
const glob = require('glob');

/*
    from: 编译后目录
    targe: 上传OSS目标目录
    // oss配置参数
    config: {
        "region":"oss-cn-beijing",
        "accessKeyId":"LTAIqrmlEAqxt8EY",
        "accessKeySecret":"xxxxxxxxx",
        "bucket":"SVR_NEW_DESIGNER_WEB"
    }
*/

module.exports = class OSSOperate {
    constructor({ region, accessKeyId, accessKeySecret, bucket }) {
        let fields = { region, accessKeyId, accessKeySecret, bucket }

        Object.keys(fields).map(key => {
            if ((fields[key] || '').trim() === '') {
                throw new Error(`oss error: 缺少参数${key}`)
            }
        })

        this.client = new OSS({
            region,
            accessKeyId,
            accessKeySecret,
            bucket
        });
    }

    getFiles(dir) {
        return new Promise((resolve, reject) => {
            glob(path.join(dir, '**/**.**'), (error, files) => {
                if (error) {
                    reject(error)
                } else {
                    resolve(files)
                }
            })
        })
    }
    
    async put(baseDir = '', fileName, filePath) {
        return await this.client.put(path.join(baseDir, fileName), filePath);
    }
    
    async puts(from, targe) {
        const formDir = path.join(process.cwd(), from)
        let files = await this.getFiles(formDir)
        
        try {
            for (let idx = 0; idx < files.length; idx++) {
                let file = files[idx]
                let result = await this.put(targe, file.replace(formDir, ''), file)
                console.log(`copy ${decodeURIComponent(result.res.requestUrls)}`)
            }
        } catch (error) {
            throw new Error(error)
        }
    }
}
