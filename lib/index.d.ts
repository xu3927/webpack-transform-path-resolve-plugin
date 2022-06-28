import { Resolver } from 'enhanced-resolve';
declare type transform = (path: string) => string;
declare class TransformPathPlugin {
    constructor(config: {
        pathReg: RegExp;
        transform: transform;
    });
    pathReg: RegExp;
    transform: transform;
    apply(resolver: Resolver): void;
}
export = TransformPathPlugin;
//# sourceMappingURL=index.d.ts.map