class Mediaqueries {

    constructor() {
        this.afterElement = window.getComputedStyle ? window.getComputedStyle(document.body, ':after') : false;
        this.currentBreakpoint = '';
        this.lastBreakpoint = '';

        this.init();
    }

    init() {
        if (!this.afterElement) {
            return;
        }

        this._resizeListener();
    }

    _resizeListener() {
        ['resize', 'orientationchange', 'load'].forEach((e) => {

            window.addEventListener(e, () => {
                this.currentBreakpoint = this.afterElement.getPropertyValue('content').replace(/"/g, '');

                if (this.currentBreakpoint !== this.lastBreakpoint) {
                    window.dispatchEvent(new CustomEvent('breakpoint-change', { 'detail': { currentBreakpoint: 123 }}));
                    this.lastBreakpoint = this.currentBreakpoint;
                }
            });
        });
    }
}

export default (new Mediaqueries);
