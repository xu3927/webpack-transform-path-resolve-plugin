import { Resolver } from 'enhanced-resolve'
type transform = (path: string) => string

class TransformPathPlugin {
    constructor(config: { pathReg: RegExp, transform: transform }) {
        const defaultConfig = {
            transform(file: string) {
                return file
            }
        }
        const { transform, pathReg } = Object.assign({}, defaultConfig, config);
        this.transform = transform;
        this.pathReg = pathReg;
    }
    pathReg: RegExp
    transform: transform
    apply(resolver: Resolver) {
        resolver
            .getHook('resolve')
            .tapAsync('TransformPathPlugin', (request, resolveContext, callback) => {
                if (request.request && this.pathReg.test(request.request)) {
                    const newPath = this.transform(request.request);
                    resolver.doResolve(resolver.ensureHook('resolve'), { ...request, request: newPath }, `path transform from ${request.request} to ${newPath}`, resolveContext, callback);
                } else {
                    callback();
                }
            });
    }
}

export = TransformPathPlugin;
