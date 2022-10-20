### 1. 文件说明

![image-20220317112343440](C:\Users\GunKing\AppData\Roaming\Typora\typora-user-images\image-20220317112343440.png)

一直以来，我们在提交请求时经常会遇到这样的情况，就是提交的参数与后台所需的不一致。这样一来，就浪费了一次请求，会导致糟糕的用户体验。

### 2. 使用

#### 2.1 API 请求

```js
// api
import service from 'path/service';
import {
    validate
} from 'path/validator';

// 单个请求参数校验
function anyRequest(id){
    //
    return service.get({
        url: `path/${id}`
    },{
        fileds: {
            id: '需要校验的参数名'
        },
        rules: {
            id: [validate.isRequest],
        }
    });
}

// 多个请求参数校验
function anyRequest(id, obj){
    // 
    return service.post({
        url: `path/${id}`,
        data: {
            name: 'Echi',
            age: '26'
        }
    },{
        fileds: {
            id: '需要校验的参数名',
            obj: '这是一个对象'
        },
        rules: {
            id: [validate.isRequired],
            obj: {
                ...validate.isObject,
                fileds: {
                    name: [validate.isRequired],
                    age: [validate.isRequired],
                }
            }
        }
    });
}
```



#### 2.2 校验方法及参数设置

```js
// validator
import AsyncValidator from 'async-validator'

/**
 * 校验请求参数规则
 * @desc 用于表单校验,通过异步校验,当校验出错时会抛出异常
 * @export
 * @param [Object] [fileds={key: value}] 需要校验的字段
 * @param [Object] [rules={key: validator}]  // 校验规则
 * @returns void
 */

export default function requestValidator(files = {},rules ={}) {
    return new Promise((resolve, reject) => {
        const validator = new AsyncValidator(rules);
        validator.validate(fileds,{
            firstFileds: true
        },(errors, data) => {
            const status = !errors ? 'success' : 'error';
            const message = errors ? errors[0].message : '';
            if (status === 'success') {
                resolve({
                    status,
                    message,
                    data
                });
            } else {
                console.warn(`当前参数校验不通过,错误信息: ${message}`);
                reject({
                    status,
                    message,
                    data,
                    isValid: true
                });
            }
        });
    });
}

// 校验规则
// 字段扩展请看 https://github.com/yiminghe/async-validator
export const validate = {
    // 必填项
    isRequired: {
        required: true
    },
    // 字符串校验
    isString: {
        type: 'string'
    },
    // 对象校验
    isObject: {
        type: 'object'
    },
    // 数组校验
    isArray: {
        type: 'array'
    },
    // 数值校验
    isNumber: {
        type: 'number'
    }
}
```

#### 2.3 封装axios请求

```js
// service
import axios from './config';
import requestValidator from '../validator';

// HTTP工具类
export default class Http {
    public static async request(params: any, descriptor ?: any){
        // 添加请求拦截校验
        if (descriptor !== undefined) {
            let filed = descriptor.fileds || {};
            let rules = descriptor.rules || {};
            await requestValidator(fileds, rules);
        }
        return await axios(params);
    }
    /**
     * get
     * @param [url] 地址
     * @param [data] 数据
     * @returns Promise
     */
    public static get(req: any, descriptor ?: any): any {
        return this.request({
            method: 'GET',
            url: `/${req.url}`,
            params: req.data,
        }, descriptor);
    }
	/**
     * put
     * @param [url] 地址
     * @param [data] 数据
     * @returns Promise
     */
	public static put(req: any, descriptor ?: any): any {
        return this.request({
            method: 'PUT',
            url: `/${req.url}`,
            data: req.data,
        }, descriptor);
    }
	/**
     * post
     * @param [url] 地址
     * @param [data] 数据
     * @returns Promise
     */
	 public static post(req: any, descriptor ?: any): any {
        return this.request({
            method: 'post',
            url: `/${req.url}`,
            data: req.data,
        }, descriptor);
    }
	/**
     * delete
     * @param [url] 地址
     * @param [data] 数据
     * @returns Promise
     */
	public static delete(req: any, descriptor ?: any): any {
        return this.request({
            method: 'DELETE',
            url: `/${req.url}`,
            params: req.data,
            }, descriptor);
        }
    }
}
```

