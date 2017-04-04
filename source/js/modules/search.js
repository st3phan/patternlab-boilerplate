import MQ from './mediaqueries';

class Search {

    constructor(el, options) {
        this.init();
    }

    init() {
        window.addEventListener('breakpoint-change', function(e) {
            console.log(e.detail.currentBreakpoint)
            console.log(MQ.currentBreakpoint);
        });
    }
}

export { Search as Search };
