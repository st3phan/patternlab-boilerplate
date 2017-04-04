import svg4everybody from '../../node_modules/svg4everybody';
svg4everybody();

import * as modules from './modules';

// Find all elements with a [data-module] attribute
document.querySelectorAll('[data-module]').forEach(function (el) {

    // Create array with module names
    // Multiple modules are supported by using a space seperated string
    const dataModules = el.getAttribute('data-module');
    const names = dataModules && dataModules.indexOf(' ') > -1 ? dataModules.split(' ') : [dataModules];

    // Handle options attribute
    const optionsValue = el.getAttribute('data-options');
    var options = null;
    if (optionsValue && typeof optionsValue === 'string' && optionsValue.length > 2 && optionsValue.charAt(0) === '{') {
        try {
            options = JSON.parse(optionsValue);
        } catch (error) {
            throw error;
        }
    }

    // Instantiate classes
    names.forEach(function (name) {
        if (modules[name] && typeof modules[name] === 'function') {
            new modules[name](el, options);
        }
    });
});
