import type { Application } from 'typedoc';
import { GitHubTheme } from './GitHubTheme.js';

/**
 * Called by TypeDoc when loading this theme as a plugin
 */
export function load(app: Application) {

	app.renderer.defineTheme('xeokit-theme', GitHubTheme);

	app.on('bootstrapEnd', () => {

		if (app.options.isSet('theme') && app.options.getValue('theme') !== 'xeokit-theme') {
			return app.logger.warn(
				`The theme 'xeokit-theme' is not used because another theme (${app.options.getValue('theme')}) was specified!`
			);
		}

		app.options.setValue('theme', 'xeokit-theme');
	});
}
