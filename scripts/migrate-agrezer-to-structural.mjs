/**
 * Migrate Agrezer-branded blocks to structural mk/* blocks.
 *
 * Strategy:
 * - Copy existing src/agrezer-* directories into src/deprecated/<agrezer-dir>/ (keeps old block names working).
 * - In-place refactor original src/agrezer-* blocks:
 *   - Update block.json name/title/description/keywords/parent references
 *   - Update allowedBlocks + InnerBlocks templates + example.innerBlocks
 *   - Update editor-only selectors that reference old data-type block names
 *
 * Notes:
 * - This script intentionally does NOT attempt to rename folders; it keeps paths stable.
 * - Legacy copies preserve old markup/classes/styles for validation/back-compat.
 */

import fs from 'node:fs';
import path from 'node:path';

const repoRoot = path.resolve(process.cwd());
const srcDir = path.join(repoRoot, 'src');
const deprecatedRoot = path.join(srcDir, 'deprecated');

/** @type {Record<string,string>} */
const nameMap = {
	'mk/agrezer-about-feature-item': 'mk/feature-item',
	'mk/agrezer-about-features-grid': 'mk/features-grid',
	'mk/agrezer-about-image-card': 'mk/image-card',
	'mk/agrezer-about-images-grid': 'mk/images-grid',
	'mk/agrezer-about-intro-feature': 'mk/intro-feature',
	'mk/agrezer-about-intro-section': 'mk/intro-section',
	'mk/agrezer-about-section': 'mk/info-section',
	'mk/agrezer-blog-section': 'mk/posts-grid',
	'mk/agrezer-contact-card-item': 'mk/contact-card',
	'mk/agrezer-contact-cards': 'mk/contact-cards',
	'mk/agrezer-contact-map': 'mk/contact-map',
	'mk/agrezer-greener-card-item': 'mk/image-link-card',
	'mk/agrezer-greener-cards-row': 'mk/cards-row',
	'mk/agrezer-greener-section': 'mk/highlights-section',
	'mk/agrezer-greener-stat-item': 'mk/stat-item',
	'mk/agrezer-greener-stats-row': 'mk/stats-row',
	'mk/agrezer-hero-feature-item': 'mk/hero-feature',
	'mk/agrezer-hero-section': 'mk/hero-section',
	'mk/agrezer-page-header-section': 'mk/page-header',
	'mk/agrezer-partners-item': 'mk/partner-item',
	'mk/agrezer-partners-section': 'mk/partners',
	'mk/agrezer-process-center': 'mk/process-center',
	'mk/agrezer-process-section': 'mk/process',
	'mk/agrezer-process-step': 'mk/process-step',
	'mk/agrezer-shop-grid-section': 'mk/products-grid',
	'mk/agrezer-stats-card': 'mk/stat-card',
	'mk/agrezer-stats-column': 'mk/stats-column',
	'mk/agrezer-stats-cta': 'mk/cta-block',
	'mk/agrezer-stats-section': 'mk/stats-section',
	'mk/agrezer-team-card': 'mk/team-member',
	'mk/agrezer-team-section': 'mk/team-section',
	'mk/agrezer-testimonial-slide': 'mk/testimonial',
	'mk/agrezer-testimonials-section': 'mk/testimonials',
	'mk/agrezer-third-section': 'mk/cta-cards-section',
	'mk/agrezer-third-section-card': 'mk/stat-image-card',
	'mk/agrezer-voices-slide': 'mk/voice',
	'mk/agrezer-voices-section': 'mk/voices',
	'mk/agrezer-why-choose-point-item': 'mk/benefit-point',
	'mk/agrezer-why-choose-section': 'mk/benefits-section',
};

/** @type {Record<string,{title:string,description:string,keywords?:string[]}>} */
const meta = {
	'mk/feature-item': {
		title: 'Feature Item',
		description: 'Single feature column with icon, title, and description.',
	},
	'mk/features-grid': {
		title: 'Features Grid',
		description: 'Grid container for feature items.',
	},
	'mk/image-card': {
		title: 'Image Card',
		description: 'Image card with overlay text and optional button.',
	},
	'mk/images-grid': {
		title: 'Images Grid',
		description: 'Grid container for image cards.',
	},
	'mk/intro-feature': {
		title: 'Intro Feature',
		description: 'Small feature label (intro list item).',
	},
	'mk/intro-section': {
		title: 'Intro Section',
		description: 'Intro section with media and feature list.',
	},
	'mk/info-section': {
		title: 'Info Section',
		description: 'Section with heading and nested content blocks.',
	},
	'mk/posts-grid': {
		title: 'Posts Grid',
		description: 'Dynamic posts grid (server-rendered).',
	},
	'mk/contact-card': {
		title: 'Contact Card',
		description: 'Single contact card item.',
	},
	'mk/contact-cards': {
		title: 'Contact Cards',
		description: 'Grid of contact card items.',
	},
	'mk/contact-map': {
		title: 'Contact Map',
		description: 'Contact map / embed section.',
	},
	'mk/image-link-card': {
		title: 'Image Link Card',
		description: 'Image card with title and link.',
	},
	'mk/cards-row': {
		title: 'Cards Row',
		description: 'Row/grid container for card items.',
	},
	'mk/highlights-section': {
		title: 'Highlights Section',
		description: 'Highlights section with stats row and cards row.',
	},
	'mk/stat-item': {
		title: 'Stat Item',
		description: 'Single stat item with icon, title and description.',
	},
	'mk/stats-row': {
		title: 'Stats Row',
		description: 'Row/grid container for stat items.',
	},
	'mk/hero-feature': {
		title: 'Hero Feature',
		description: 'Hero feature item.',
	},
	'mk/hero-section': {
		title: 'Hero Section',
		description: 'Hero section with background and feature items.',
	},
	'mk/page-header': {
		title: 'Page Header',
		description: 'Page header with title, background, and breadcrumb.',
	},
	'mk/partner-item': {
		title: 'Partner Item',
		description: 'Single partner/logo item.',
	},
	'mk/partners': {
		title: 'Partners',
		description: 'Partners marquee/row section.',
	},
	'mk/process-center': {
		title: 'Process Center',
		description: 'Center element in a process timeline/steps layout.',
	},
	'mk/process': {
		title: 'Process',
		description: 'Process section with steps and center element.',
	},
	'mk/process-step': {
		title: 'Process Step',
		description: 'Process step item.',
	},
	'mk/products-grid': {
		title: 'Products Grid',
		description: 'Dynamic products grid (server-rendered).',
	},
	'mk/stat-card': {
		title: 'Stat Card',
		description: 'Statistic image card.',
	},
	'mk/stats-column': {
		title: 'Stats Column',
		description: 'Column container for stats cards/CTA.',
	},
	'mk/cta-block': {
		title: 'CTA Block',
		description: 'Call-to-action block.',
	},
	'mk/stats-section': {
		title: 'Stats Section',
		description: 'Stats section with columns.',
	},
	'mk/team-member': {
		title: 'Team Member',
		description: 'Team member card.',
	},
	'mk/team-section': {
		title: 'Team Section',
		description: 'Team section with team member blocks.',
	},
	'mk/testimonial': {
		title: 'Testimonial',
		description: 'Single testimonial slide/card.',
	},
	'mk/testimonials': {
		title: 'Testimonials',
		description: 'Testimonials section/slider.',
	},
	'mk/cta-cards-section': {
		title: 'CTA + Cards Section',
		description: 'Intro row with optional CTA and stat-image cards.',
	},
	'mk/stat-image-card': {
		title: 'Stat Image Card',
		description: 'Image card with stat and label overlay.',
	},
	'mk/voice': {
		title: 'Voice',
		description: 'Single voice/testimonial slide.',
	},
	'mk/voices': {
		title: 'Voices',
		description: 'Voices/testimonials section.',
	},
	'mk/benefit-point': {
		title: 'Benefit Point',
		description: 'Numbered point item positioned on a stage.',
	},
	'mk/benefits-section': {
		title: 'Benefits Section',
		description: 'Hero stage with positioned benefit points.',
	},
};

function ensureDir(p) {
	fs.mkdirSync(p, { recursive: true });
}

function copyDir(src, dest) {
	ensureDir(dest);
	for (const ent of fs.readdirSync(src, { withFileTypes: true })) {
		const from = path.join(src, ent.name);
		const to = path.join(dest, ent.name);
		if (ent.isDirectory()) copyDir(from, to);
		else fs.copyFileSync(from, to);
	}
}

function readText(p) {
	return fs.readFileSync(p, 'utf8');
}

function writeText(p, txt) {
	fs.writeFileSync(p, txt);
}

function replaceAll(str, replacements) {
	let out = str;
	for (const [from, to] of replacements) {
		out = out.split(from).join(to);
	}
	return out;
}

function isAgrezerDirName(name) {
	return name.startsWith('agrezer-');
}

function listAgrezerDirs() {
	return fs
		.readdirSync(srcDir, { withFileTypes: true })
		.filter((d) => d.isDirectory() && isAgrezerDirName(d.name))
		.map((d) => d.name)
		.sort();
}

function updateBlockJson(blockJsonPath) {
	const raw = readText(blockJsonPath);
	/** @type {any} */
	const json = JSON.parse(raw);

	const oldName = json.name;
	const newName = nameMap[oldName];
	if (!newName) return;

	json.name = newName;
	json.title = meta[newName]?.title ?? json.title;
	json.description = meta[newName]?.description ?? json.description;
	json.textdomain = 'mk-builder';
	if (Array.isArray(json.keywords)) {
		json.keywords = json.keywords.filter((k) => !String(k).includes('agrezer'));
	}

	if (Array.isArray(json.parent)) {
		json.parent = json.parent.map((p) => nameMap[p] ?? p);
	}

	// example.innerBlocks references
	if (json.example && Array.isArray(json.example.innerBlocks)) {
		for (const b of json.example.innerBlocks) {
			if (b && typeof b === 'object' && typeof b.name === 'string') {
				b.name = nameMap[b.name] ?? b.name;
			}
		}
	}

	writeText(blockJsonPath, JSON.stringify(json, null, '\t') + '\n');
}

function updateSourceFile(filePath) {
	let txt = readText(filePath);
	// Update block names in JS/SCSS/JSON-ish strings
	for (const [oldName, newName] of Object.entries(nameMap)) {
		txt = txt.split(oldName).join(newName);
	}
	writeText(filePath, txt);
}

function main() {
	ensureDir(deprecatedRoot);

	const agrezerDirs = listAgrezerDirs();
	console.log(`Found ${agrezerDirs.length} agrezer block dirs.`);

	// 1) Copy to deprecated (legacy)
	for (const dir of agrezerDirs) {
		const src = path.join(srcDir, dir);
		const dest = path.join(deprecatedRoot, dir);
		if (!fs.existsSync(dest)) {
			copyDir(src, dest);
		}
	}

	// 2) Update originals
	for (const dir of agrezerDirs) {
		const base = path.join(srcDir, dir);
		const blockJson = path.join(base, 'block.json');
		if (fs.existsSync(blockJson)) updateBlockJson(blockJson);

		for (const name of fs.readdirSync(base)) {
			const fp = path.join(base, name);
			if (!fs.statSync(fp).isFile()) continue;
			if (/\.(js|scss|json)$/.test(name)) updateSourceFile(fp);
		}
	}

	// 3) Update cross-references across src (templates/allowedBlocks/data-type selectors)
	for (const rel of fs.readdirSync(srcDir)) {
		const p = path.join(srcDir, rel);
		if (!fs.statSync(p).isDirectory()) continue;
		// skip legacy copies
		if (rel === 'deprecated') continue;
		// update any JS/SCSS in other dirs that referenced agrezer block names
		for (const ent of fs.readdirSync(p)) {
			const fp = path.join(p, ent);
			if (!fs.existsSync(fp) || !fs.statSync(fp).isFile()) continue;
			if (/\.(js|scss|json)$/.test(ent)) {
				updateSourceFile(fp);
			}
		}
	}

	console.log('Done. Legacy blocks copied to src/deprecated/.');
}

main();

