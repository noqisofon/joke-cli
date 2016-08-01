const path     = require( 'path' );

const chalk    = require( 'chalk' );
const tildify  = require( 'tildify' );
const minimist = require( 'minimist' );
const Liftoff  = require( 'liftoff' );

const package      = require( './package.json' );
const exit         = require( './lib/exit' );
const execute      = require( './lib/execute' );
const optionDefine = require( './lib/option-define' );
const optionUsage  = require( './lib/option-usage' );

const argv = minimist( process.argv.slice( 2 ), optionDefine.getMinimistOptionDefine() );

const  cli = new Liftoff( {
    name: 'joke',
    processTitle: 'joke',
    moduleName: 'joke-cli',
    configName: 'jokefile'
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

    if ( shouldShowVersion ) {
        optionUsage.showVersion( package );

        exit( 0 );
    }

    if ( shouldShowHelp ) {
        optionUsage.showHelp( package, optionDefine.getOptionDefine() );

        exit( 0 );
    }

    if ( !env.configPath ) {
        console.error( chalk.magenta( 'no jokefile found' ) );

        exit( 1 );
    }

    execute( env, opts );
}
