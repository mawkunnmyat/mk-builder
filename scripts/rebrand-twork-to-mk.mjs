#!/usr/bin/env node
/**
 * One-time rebrand: Twork → MK across the plugin codebase.
 * Preserves tworksystem.com (does not replace bare "twork" substring).
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname( fileURLToPath( import.meta.url ) );
const ROOT = path.resolve( __dirname, '..' );

const SKIP_DIRS = new Set( [
	'node_modules',
	'.git',
	'build',
	'dist',
	'.cursor',
] );

const SKIP_FILES = new Set( [
	'package-lock.json',
	'rebrand-twork-to-mk.mjs',
] );

const TEXT_EXTENSIONS = new Set( [
	'.php',
	'.js',
	'.jsx',
	'.ts',
	'.tsx',
	'.json',
	'.scss',
	'.css',
	'.md',
	'.html',
	'.sh',
	'.mjs',
	'.txt',
	'.cursorrules',
] );

/** Ordered replacements (most specific first). */
const LINE_REPLACEMENTS = [
	[
		'https://www.tworksystem.com/twork-builder',
		'https://www.tworksystem.com/mk-builder',
	],
	[
		'github.com/tworksystem/twork-builder',
		'github.com/tworksystem/mk-builder',
	],
	[
		'github.com/mawkunnmyat/twork-builder',
		'github.com/mawkunnmyat/mk-builder',
	],
	[ '@twork-builder/editor-utils', '@mk-builder/editor-utils' ],
	[ 'TWORK_BUILDER_', 'MK_BUILDER_' ],
	[ 'TWORK_', 'MK_' ],
	[ 'TworkBuilder', 'MkBuilder' ],
	[ 'Twork Builder', 'MK Builder' ],
	[ 'Twork Ecosystem', 'MK Ecosystem' ],
	[ 'window.Twork', 'window.Mk' ],
	[ 'wp-block-twork-', 'wp-block-mk-' ],
	[ '--twork-', '--mk-' ],
	[ '.twork-', '.mk-' ],
	[ 'twork-builder', 'mk-builder' ],
	[ 'twork_builder', 'mk_builder' ],
	[ 'twork_', 'mk_' ],
	[ 'twork/', 'mk/' ],
	[ 'twork-', 'mk-' ],
	[ 'Twork', 'Mk' ],
];

function applyContentReplacements( content ) {
	let next = content;
	for ( const [ from, to ] of LINE_REPLACEMENTS ) {
		next = next.split( from ).join( to );
	}
	// camelCase identifiers: tworkHeaderInit → mkHeaderInit
	next = next.replace( /twork(?=[A-Z])/g, 'mk' );
	// block.json keyword "twork"
	next = next.replace( /"twork"/g, '"mk"' );
	return next;
}

function shouldProcessFile( filePath ) {
	const base = path.basename( filePath );
	if ( SKIP_FILES.has( base ) ) {
		return false;
	}
	const ext = path.extname( filePath );
	if ( ! ext && base !== '.cursorrules' ) {
		return false;
	}
	if ( ext && ! TEXT_EXTENSIONS.has( ext ) && base !== '.cursorrules' ) {
		return false;
	}
	return true;
}

function walk( dir, files = [] ) {
	for ( const entry of fs.readdirSync( dir, { withFileTypes: true } ) ) {
		if ( entry.name.startsWith( '.' ) && entry.name !== '.cursorrules' ) {
			if ( entry.isDirectory() && entry.name === '.git' ) {
				continue;
			}
			if ( entry.isFile() && entry.name === '.cursorrules' ) {
				files.push( path.join( dir, entry.name ) );
			}
			continue;
		}
		const full = path.join( dir, entry.name );
		if ( entry.isDirectory() ) {
			if ( SKIP_DIRS.has( entry.name ) ) {
				continue;
			}
			walk( full, files );
		} else if ( shouldProcessFile( full ) ) {
			files.push( full );
		}
	}
	return files;
}

function renamePath( oldPath, newPath ) {
	if ( ! fs.existsSync( oldPath ) ) {
		return false;
	}
	if ( fs.existsSync( newPath ) ) {
		throw new Error( `Rename target already exists: ${ newPath }` );
	}
	fs.renameSync( oldPath, newPath );
	return true;
}

function renameIfContainsTwork( dir ) {
	if ( ! fs.existsSync( dir ) ) {
		return;
	}
	const entries = fs.readdirSync( dir, { withFileTypes: true } );
	for ( const entry of entries ) {
		const full = path.join( dir, entry.name );
		if ( entry.isDirectory() ) {
			renameIfContainsTwork( full );
			const newName = entry.name
				.replace( /twork-builder/g, 'mk-builder' )
				.replace( /twork-/g, 'mk-' )
				.replace( /^twork$/g, 'mk' );
			if ( newName !== entry.name ) {
				renamePath( full, path.join( dir, newName ) );
			}
		} else {
			const newName = entry.name
				.replace( /twork-builder/g, 'mk-builder' )
				.replace( /class-twork-/g, 'class-mk-' )
				.replace( /twork-/g, 'mk-' );
			if ( newName !== entry.name ) {
				renamePath( full, path.join( dir, newName ) );
			}
		}
	}
}

let changedFiles = 0;

const allFiles = walk( ROOT );
for ( const filePath of allFiles ) {
	const original = fs.readFileSync( filePath, 'utf8' );
	const updated = applyContentReplacements( original );
	if ( updated !== original ) {
		fs.writeFileSync( filePath, updated, 'utf8' );
		changedFiles++;
	}
}

console.log( `Updated content in ${ changedFiles } file(s).` );

// Rename root plugin file
renamePath(
	path.join( ROOT, 'twork-builder.php' ),
	path.join( ROOT, 'mk-builder.php' )
);

// Rename includes PHP classes
const includesDir = path.join( ROOT, 'includes' );
if ( fs.existsSync( includesDir ) ) {
	for ( const name of fs.readdirSync( includesDir ) ) {
		if ( name.startsWith( 'class-twork-' ) ) {
			renamePath(
				path.join( includesDir, name ),
				path.join( includesDir, name.replace( 'class-twork-', 'class-mk-' ) )
			);
		}
	}
}

// Rename src directories (deepest first handled by single pass on known paths)
const dirRenames = [
	[ 'src/twork-header', 'src/mk-header' ],
	[ 'src/twork-nav-item', 'src/mk-nav-item' ],
	[ 'src/twork-shared', 'src/mk-shared' ],
];

for ( const [ from, to ] of dirRenames ) {
	renamePath( path.join( ROOT, from ), path.join( ROOT, to ) );
}

console.log( 'File and directory renames complete.' );
