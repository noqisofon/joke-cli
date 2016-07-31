const chalk    = require( 'chalk' );
const minimist = require( 'minimist' );
const Liftoff  = require( 'liftoff' );

const optionDefine = require( './lib/option-define' );
const optionUsage  = require( './lib/option-usage' );
const package      = require( './package.json' );

const argv = minimist( process.argv.slice( 2 ), optionDefine.getMinimistOptionDefine() );

const  cli = new Liftoff( {
    name: package.name
} );

function run() {
    cli.launch( {
        cwd: process.cwd()
    }, handleCommandLineArguments );
}

module.exports = run;

function handleCommandLineArguments(env) {
    const shouldShowVersion = argv.v || argv.version;
    const shouldShowHelp    = argv.h || argv.help;

    const sholdBeSlient     = argv.silent && !argv.debug;

    const sholdBeDebug      = argv.debug;

    const pkg = { name: 'joke', version: package.version };

    if ( shouldShowVersion ) {
        optionUsage.showVersion( pkg );

        return ;
    }

    if ( shouldShowHelp ) {
        optionUsage.showHelp( pkg, optionDefine.getOptionDefine() );

        return ;
    }
}
