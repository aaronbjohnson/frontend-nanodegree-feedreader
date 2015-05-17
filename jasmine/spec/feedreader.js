/**
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against the application.
 */

/**
 * We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {

    /**
     * This suite is all about the RSS feeds definitions, the allFeeds variable
     * in our application.
     */
    describe('RSS Feeds', function() {

        /** 
         * A test to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /**
         * A test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('each URL is defined', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url).not.toBeFalsy();
            });
         });

        /**
         * A test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('each name is defined', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBeFalsy();
            });
         });
    });

    describe('The menu', function() {

        /**
         * A test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
         it('element is hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
         });

         /**
          * A test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
          it('changes visibility when the menu icon is clicked', function() {
            var menuElement = $('.menu-icon-link');

            // Do we need .trigger here?
            menuElement.trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(false);

            menuElement.trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(true);
          });

    });

    describe('Initial Entries', function() {

        /**
         * A test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
         beforeEach(function(done) {
            loadFeed(0, done);
         });

         it('has at least one .entry element', function(done) {
            var feeds = $('.feed a').children('.entry');
            expect(feeds.length).toBeGreaterThan(0);
            done();
         });
    });

    describe('New Feed Selection', function() {
        var initialState;
        var finalState;

        /**
         * A test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
         beforeEach(function(done) {
            initialState = $('.feed a').children('.entry');
            loadFeed(0, done);
         });

         it('content actually changes', function(done) {
            finalState = $('.feed a').children('.entry');
            expect(initialState).not.toBe(finalState);
            done();
         });
    });
}());
