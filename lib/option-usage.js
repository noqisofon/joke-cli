const _        = require( 'lodash' );
const chalk    = require( 'chalk' );

module.exports.showVersion = function (pkg) {
    console.log( `${pkg.name} ${pkg.version}` );
}

module.exports.showHelp = function (pkg, aOptionDefine) {
    console.log( chalk.bold( 'Usage' ) + ':' );
    console.log( `    ${pkg.name} [<options>] [<tasks>]` );
    console.log( '' );

    const maxLength = _
          .chain( _.keys( aOptionDefine ) )
          .map( name => name.length )
          .max()
          .value();

    console.log( chalk.bold( 'Options' ) + ':' );
    for ( let  [name, opts] of aOptionDefine ) {
        process.stdout.write( '  ' );

        if ( opts.alias === undefined ) {
            process.stdout.write( '   ' );
        } else {
            process.stdout.write( `-${opts.alias},` );
        }

        process.stdout.write( ` --${name}` );
        process.stdout.write( _.repeat( ' ', ( maxLength - name.length ) + 2 ) );
        process.stdout.write( opts.description );
        process.stdout.write( '\n' );
    }
}
