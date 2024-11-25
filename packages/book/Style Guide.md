# Gitbook Style Guide

- Four spaces for indents. No tab characters. Period. This applies doubly for any sample code, but also for our own documentation here. Exceptions can be made for lining up text within a markdown list such as this one.

- Any sample HTML/PHP code with html, head, and body tags must also include a proper doctype.

- Links to external sources should be formatted as links with human readable language.

    Correct:

    - More information on floats can be found on the [Mozilla Developer Network](https://developer.mozilla.org/en-US/docs/Web/CSS/float).

    Incorrect:

    - https://developer.mozilla.org/en-US/docs/Web/CSS/float
    - [https://developer.mozilla.org/en-US/docs/Web/CSS/float](https://developer.mozilla.org/en-US/docs/Web/CSS/float)
    - To read more, click [here](https://developer.mozilla.org/en-US/docs/Web/CSS/float)

    Avoid "More Info" or "Source" links if possible, but they are acceptable.

- Sample code blocks should have syntax type hinting.

    Examples:

    ```php
    echo "hello world";
    ```

    ```json
    { "hello": "world" }
    ```

    ```bash
    ansible-playbook ansible/create-vagrant-site.yml
    ```

    ```js
    console.log("hello world");
    ```

- Use block indentation for sample output, rather than triple backticks.

- Images should be hosted locally under the img directory.

- Large blocks of example code intended for the students to use (not just read/reference) should be in external files under the examples directory and linked to from the curriculum.

- One page sections do not need to be put in subdirectories.

- If a section has an intro, use that as the landing page for the section, not an empty README.

- Use `index.md` for section landing pages so that URLs on rendered site are cleaner, rather than `README.md` or `intro.md`. (Note: This will probably change with Gitbook 2.0 as it can [I think] map `README.md` -> `index.html`)

- Correctly capitalize and camel case names. When in doubt, refer to [Wikipedia's](http://en.wikipedia.org/wiki/Main_Page) formatting.

    Correct:

    - Codeup
    - Ajax (yes it is an acronym, but standard has moved towards treating it as a word)
    - API
    - CSS
    - GitHub
    - Google Maps
    - JavaScript
    - jQuery (even for titles)
    - JSON
    - PHP

    Incorrect:

    - CodeUp
    - api
    - css
    - Github
    - google maps
    - Javascript
    - JQuery

    Exceptions are for file and directory names, source code, and syntax type hinting, where lower case is strongly preferred.

- Avoid contractions at all costs.

- The main content area of GitBook is 770 pixels wide. Use that width for embedded videos to maximize seamlessness (the corresponding height is usually 578 pixels).

- Four. Spaces. Per. Indent.
