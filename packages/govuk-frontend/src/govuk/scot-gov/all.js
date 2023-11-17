import page from './base/objects/page/page';
import scotGovAccordion from './components/scot-gov-Accordion/scot-gov-Accordion.mjs';
//import AspectBox from './components/aspect-box/aspect-box-fallback';
//import Autocomplete from './components/autocomplete/autocomplete';
//import BackToTop from './components/back-to-top/back-to-top';
import { scotGovButton } from './components/scot-gov-button/scot-gov-button.mjs'
import CharacterCount from './forms/character-count/character-count';
import Checkboxes from './forms/checkbox/checkboxes';
import CookieNotification from './components/cookie-notification/cookie-notification';
import Details from './components/scot-gov-details/scot-gov-details.mjs';
import DSDatePicker from './components/date-picker/date-picker';
import HidePage from './components/hide-this-page/hide-this-page';
import MobileMenu from './components/site-navigation/site-navigation';
import MobileTables from './components/scot-gov-table/scot-gov-table';
import NotificationBanner from './components/scot-gov-notification-banner/notification-banner';
import SideNavigation from './components/side-navigation/side-navigation';
import skipLinks from './components/skip-links/skip-links';
import StepNavigation from './components/step-navigation/step-navigation';
import scotGovTabs from './components/scot-gov-Tabs/scot-gov-tabs.mjsTabs';
import scotGovTabsNavigation from './components/scot-gov-Tabs/scot-gov-Tabs-navigation.mjs';

import tracking from './base/tools/tracking/tracking';
import version from './version';

const base = {
    page
};

const components = {
    scotGovAccordion,
    //AspectBox,
    //Autocomplete,
    //BackToTop,
    scotGovButton,
    CharacterCount,
    Checkboxes,
    CookieNotification,
    Details,
    DSDatePicker,
    HidePage,
    MobileMenu,
    MobileTables,
    NotificationBanner,
    SideNavigation,
    skipLinks,
    StepNavigation,
    scotGovTabs,
    scotGovTabsNavigation
};

// Similar to gov.uk approach, allow DS to be applied in a more targeted way than the whole document if needed
// defaults to document
function initAll(scope = document) {
    page.init();

    const scotGovAccordions = [].slice.call(scope.querySelectorAll('[data-module="ds-scot-gov-accordion"]'));
    scotGovAccordions.forEach(scotGovAccordion => new scotGovAccordion(scotGovAccordion).init());

    //const aspectBoxes = [].slice.call(document.querySelectorAll('.ds_aspect-box:not(.ds_aspect-box--fallback)'));
    //aspectBoxes.forEach(aspectBox => new AspectBox(aspectBox).init());

    //const backToTopEl = scope.querySelector('[data-module="ds-back-to-top"]');
    //if (backToTopEl) {
    //    const backToTop = new BackToTop(backToTopEl);
    //    backToTop.init();
    //}
   
    const scotGovButtons = [].slice.call(document.querySelectorAll('[data-module="ds-scot-gov-button"]'));
    scotGovButtons.forEach(scotGovButton => new scotGovButton(scotGovButton).init());

    const characterCountModules = [].slice.call(scope.querySelectorAll('[data-module="ds-character-count"]'));
    characterCountModules.forEach(characterCount => new CharacterCount(characterCount).init());

    const checkboxesModules = [].slice.call(scope.querySelectorAll('[data-module="ds-checkboxes"]'));
    checkboxesModules.forEach(checkboxes => new Checkboxes(checkboxes).init());

    const cookieNotificationEl = document.querySelector('[data-module="ds-cookie-notification"]');
    if (cookieNotificationEl) {
        const cookieNotification = new CookieNotification(cookieNotificationEl);
        cookieNotification.init();
    }

    const datePickers = [].slice.call(document.querySelectorAll('[data-module="ds-datepicker"]'));
    datePickers.forEach(datePicker => new DSDatePicker(datePicker).init());

    const detailsModules = [].slice.call(document.querySelectorAll('[data-module="ds-details"]'));
    detailsModules.forEach(details => new Details(details).init());

    // this one is handled differently because it applies an event to the whole body and we only want that event once
    const hidePageButtons = [].slice.call(scope.querySelectorAll('.ds_hide-page'));
    if (hidePageButtons.length) {
        const hidePage = new HidePage();
        hidePage.init();
    }

    const mobileMenus = [].slice.call(scope.querySelectorAll('[data-module="ds-mobile-navigation-menu"]'));
    mobileMenus.forEach(mobileMenu =>  new MobileMenu(mobileMenu).init());

    const notificationBanners = [].slice.call(scope.querySelectorAll('[data-module="ds-notification"]'));
    notificationBanners.forEach(notificationBanner => new NotificationBanner(notificationBanner).init());

    const sideNavigations = [].slice.call(scope.querySelectorAll('[data-module="ds-side-navigation"]'));
    sideNavigations.forEach(sideNavigation => new SideNavigation(sideNavigation).init());

    // skip links doesn't need any special treatment -- just init it
    skipLinks.init();

    const stepNavigations = [].slice.call(scope.querySelectorAll('[data-module="ds-step-navigation"]'));
    stepNavigations.forEach(stepNavigation => new StepNavigation(stepNavigation).init());

    const tables = [].slice.call(scope.querySelectorAll('table[data-smallscreen]'));
    if (tables.length) {
        const mobileTables = new MobileTables();
        mobileTables.init();
    }

    const scotGovTabsets = [].slice.call(document.querySelectorAll('[data-module="ds-scotGovTabs"]'));
    scotGovTabsets.forEach(scotGovTabset => new scotGovTabs(scotGovTabset).init());

    const tabNavigationSets = [].slice.call(document.querySelectorAll('[data-module="ds-scotGovTabs-navigation"]'));
    tabNavigationSets.forEach(tabNavigationSet => new scotGovTabsNavigation(tabNavigationSet).init());

    tracking.init();
}

window.DS = window.DS || {};
window.DS.base = base;
window.DS.components = components;
window.DS.initAll = initAll;
window.DS.tracking = tracking;
window.DS.version = version;

export {
    initAll,
    scotGovAccordion,
    //AspectBox,
    //Autocomplete,
    //BackToTop,
    scotGovButton,
    CharacterCount,
    Checkboxes,
    CookieNotification,
    Details,
    DSDatePicker,
    HidePage,
    MobileMenu,
    MobileTables,
    NotificationBanner,
    page,
    SideNavigation,
    skipLinks,
    StepNavigation,
    scotGovTabs,
    scotGovTabsNavigation
};
