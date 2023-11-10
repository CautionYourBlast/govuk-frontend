/* global document, window */

'use strict';

import temporaryFocus from "../../base/tools/temporary-focus/temporary-focus";

export class SkipLink extends GOVUKFrontendComponent{
    init() {
        [].slice.call(document.querySelectorAll('.ds_skip-links__link')).forEach(link => {
            link.addEventListener('click', () => {
                const linkTarget = document.querySelector(link.getAttribute('href'));
                if (linkTarget) {
                    temporaryFocus(linkTarget);
                }
            });
        });
    }
};
