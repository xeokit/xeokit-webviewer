import {DefaultTheme, DefaultThemeRenderContext, JSX, Options, PageEvent, Reflection} from 'typedoc';

export class GitHubThemeContext extends DefaultThemeRenderContext {

    constructor(theme: DefaultTheme, page: PageEvent<Reflection>, options: Options) {

        super(theme, page, options);

        //const oldToolbar = this.toolbar;

        this.toolbar = (/*pageEvent: PageEvent<Reflection>*/) => {
            return (
                <>
                    <span></span>
                </>
            );
        };

        this.footer = (/*pageEvent: PageEvent<Reflection>*/) => {
            return (
                <>
                    <span></span>
                </>
            );
        };
    }
}
