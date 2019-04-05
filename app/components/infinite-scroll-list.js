import Component from '@ember/component';
import $ from 'jquery';
import { logger } from '../utils/global-utilities';
import { computed } from '@ember/object';


/*
    params:
    list [array] (required)                         list of records to be displayed;
    paginationInfo [object] (required)              dictionary of pagination informations;
    loadMore [action] (required)                    action handler to fire when loadMore event occurs;
    pageSize [number] (optional)                    number of records to load at time; default 20;
    componentId [string] (optional)                 used to bind scroll event handlers; useful if many instances are active at the same time;
                                                    default to 'infiniteScroll';
    triggeringOffset [string] (optional)            offset used to calculate loadMore action triggering when load-more placeholder come into viewport
                                                    positive number triggers loadMore action [n]px before it come into view; default 500;
*/
export default Component.extend({
    classNames: ['infinite-scroll-wrapper'],
    canLoadMore: computed('paginationInfo', 'isEmpty', function() {
        if (this.isEmpty || (this.paginationInfo && (this.paginationInfo.number === this.paginationInfo.totalPages))) {
            logger('Loaded all records', 'success');
            return false;
        }

        return true;
    }),
    isEmpty: computed('list.[]', 'isLoading', function() {
        if (this.isLoading) {
            return false;
        }
        if (this.list.length === 0) {
            return true;
        }
        return false;
    }),


    init() {
        this._super(...arguments);

        if (!this.page) {
            this.page = 1;
        }

        if (!this.pageSize) {
            this.pageSize = 20;
        }

        if (this.list && this.list.length < this.pageSize) {
            logger('Already loaded all records...', 'success');
            this.set('canLoadMore', false);
        }
    },

    didInsertElement() {
        let componentId = this.componentId || 'infiniteScroll';
        let handleLoadMore = () => {
            if (this.isLoading || !this.canLoadMore) {
                return false;
            }

            let $loadMore = this.$('.load-more');
            let triggeringOffset = this.triggeringOffset || 500;
            let pageTop = $(window).scrollTop();
            let pageBottom = pageTop + $(window).height() + triggeringOffset;
            let elementTop = $loadMore.offset().top;

            if (elementTop <= pageBottom) {
                this.loadMore(this.page);
                this.incrementProperty('page');
            }
        }

        handleLoadMore();

        // bind scroll event to handle auto-fire of loadMore event
        $(window).on(`scroll.${componentId}`, () => {
            handleLoadMore()
        });
    },

    willDestroyElement() {
        // unbind scroll event when component is destroyed
        let componentId = this.componentId || 'infiniteScroll';

        $(window).off(`scroll.${componentId}`);
    }
});
