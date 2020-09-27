方便对oss操作

### 安装
```bash
npm i oss-utils -g
```

### 使用

```bash
oss-utils upload -f './' -t SVR_NEW_DESIGNER_WEB -c '{
        "region":"oss-cn-beijing",
        "accessKeyId":"xxxxx",
        "accessKeySecret":"xxxxx",
        "bucket":"xxxxx"
    }'
```