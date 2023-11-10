'use strict';

class scotGovCheckboxes {
    constructor(scotGovCheckboxes) {
        this.scotGovCheckboxes = [].slice.call(scotGovCheckboxes.querySelectorAll('.ds_checkbox__input'));
    }

    init() {
        this.scotGovCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                switch(checkbox.dataset.behaviour) {
                    case 'exclusive':
                        this.scotGovCheckboxes.filter(item => item !== checkbox).forEach(item => item.checked = false);
                        break;
                    default:
                        this.scotGovCheckboxes.filter(item => item.dataset.behaviour === 'exclusive').forEach(item => item.checked = false);
                        break;
                }
            });
        });
    }
}

export default scotGovCheckboxes;
