const optionDefine = {
    help: {
        type: 'boolean',
        alias: 'h',
        default: false,
        description: 'display this help'
    },
    list: {
        type: 'boolean',
        alias: 'l',
        default: false,
        description: 'display tasks'
    },
    silent: {
        type: 'boolean',
        default: false,
        description: 'log errors only'
    },
    debug: {
        type: 'boolean',
        default: false,
        description: ''
    },
    version: {
        type: 'boolean',
        alias: 'v',
        default: false,
        description: 'display version'
    }    
};

optionDefine[Symbol.iterator] = function* () {
    for ( let key in this ) {
        yield [ key, this[key] ];
    }
};

module.exports.getOptionDefine = function () {
    return optionDefine;
};

module.exports.getMinimistOptionDefine = function () {
    const minimistLikeOptionDefine = {};

    for ( let [name, opts] of optionDefine ) {
        if ( minimistLikeOptionDefine[opts.type] === undefined ) {
            minimistLikeOptionDefine[opts.type] = [];
        }
        minimistLikeOptionDefine[opts.type].push( name );

        if ( opts.alias !== undefined ) {
            if ( minimistLikeOptionDefine.alias === undefined ) {
                minimistLikeOptionDefine.alias = {};
            }

            minimistLikeOptionDefine.alias[opts.alias] = name;
        }

        if ( opts.default !== undefined ) {
            if ( minimistLikeOptionDefine.default === undefined ) {
                minimistLikeOptionDefine.default = {};
            }

            minimistLikeOptionDefine.default[name] = opts.default;
        }
    }
    return minimistLikeOptionDefine;
};
