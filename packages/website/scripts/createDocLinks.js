function createDocLinks(text, wordMap) {
    function capitalizeFirstLetter(str) {
        if (!str) return str;
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    Object.keys(wordMap).forEach(function (key) {
        const expr = `doc:${key}`;
        const regex = new RegExp(`\\b${expr}?\\b`, 'g');
        text = text.replace(regex, (match) => {
            const entry = wordMap[key];
            const path = entry.path || "";
            return `<a class="doc-link" data-template="${key}_template"  href="${path}" target="_parent">${key}</a>
            <template id="${key}_template">
                <p style="font-weight: lighter; color: grey;  font-size: smaller; padding-top:0">@xeokit/sdk / ${entry.namespace} / ${key} </p>
                <p style="font-weight: bold; font-size: larger; margin: 0; padding-top:0">${capitalizeFirstLetter(entry.kind)} ${key}</p>
                <p style="font-weight: normal; margin-top: 5px; margin-bottom: 0; padding-top:0; padding-bottom: 0;">${entry.summary}</p>
            </template>`;
        });
    });
    return text;
}


module.exports = {createDocLinks};
