"use strict";
class TransformPathPlugin {
    constructor(config) {
        const defaultConfig = {
            transform(file) {
                return file;
            }
        };
        const { transform, pathReg } = Object.assign({}, defaultConfig, config);
        this.transform = transform;
        this.pathReg = pathReg;
    }
    apply(resolver) {
        resolver
            .getHook('resolve')
            .tapAsync('TransformPathPlugin', (request, resolveContext, callback) => {
            if (request.request && this.pathReg.test(request.request)) {
                const newPath = this.transform(request.request);
                resolver.doResolve(resolver.ensureHook('resolve'), Object.assign(Object.assign({}, request), { request: newPath }), `path transform from ${request.request} to ${newPath}`, resolveContext, callback);
            }
            else {
                callback();
            }
        });
    }
}
module.exports = TransformPathPlugin;
