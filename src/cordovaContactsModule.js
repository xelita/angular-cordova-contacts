/**
 * Angular Module relying on Apache Cordova Contacts Plugin (cordova plugin add org.apache.cordova.contacts).
 */
var cordovaContactsModule = angular.module('cordovaContactsModule', []);

// Constants

/**
 * Constants service used in the whole module.
 */
cordovaContactsModule.constant('cordovaContactsConstants', {
    apiVersion: '1.0.0',
    cordovaVersion: '>=3.4.0'
});

// Services

/**
 * Main service relying on Apache Cordova Contacts Plugin.
 */
cordovaContactsModule.factory('cordovaContactsService', ['$rootScope', '$log', 'cordovaContactsConstants', function ($rootScope, $log, cordovaContactsConstants) {
    return {
        /**
         * Return the current API version.
         */
        apiVersion: function () {
            $log.debug('cordovaContactsService.apiVersion.');
            return cordovaContactsConstants.apiVersion;
        },

        /**
         * Return the cordova API version.
         */
        cordovaVersion: function () {
            $log.debug('cordovaContactsService.cordovaVersion.');
            return cordovaContactsConstants.cordovaVersion;
        },

        /**
         * Check the Contacts plugin availability.
         * @returns {boolean}
         */
        checkContactsAvailability: function () {
            $log.debug('cordovaContactsService.checkContactsAvailability.');
            if (!navigator.contacts) {
                $log.warn('Contacts API is not available.');
                return false;
            }
            return true;
        },

        /**
         * The navigator.contacts.create method is synchronous, and returns a new Contact object.
         * For more information: https://github.com/apache/cordova-plugin-contacts/blob/dev/doc/index.md#navigatorcontactscreate
         */
        create: function (contactInfo) {
            $log.debug('cordovaContactsService.create.');

            // Checking API availability
            if (!this.checkContactsAvailability()) {
                return null;
            }

            // API call
            return navigator.contacts.create(contactInfo);
        },

        /**
         * The navigator.contacts.find method executes asynchronously, querying the device contacts database and returning an array of Contact objects.
         * For more information: https://github.com/apache/cordova-plugin-contacts/blob/dev/doc/index.md#navigatorcontactsfind
         */
        find: function (fields, successCallback, errorCallback, options) {
            $log.debug('cordovaContactsService.find.');

            // Checking API availability
            if (!this.checkContactsAvailability()) {
                return;
            }

            // API call
            navigator.contacts.find(
                fields,
                function (contacts) {
                    $rootScope.$apply(successCallback(contacts));
                },
                function (error) {
                    $rootScope.$apply(errorCallback(error));
                },
                options
            );
        },

        /**
         * Saves a new contact to the device contacts database, or updates an existing contact if a contact with the same id already exists.
         * For more information: https://github.com/apache/cordova-plugin-contacts/blob/dev/doc/index.md#contact
         */
        save: function (contact, successCallback, errorCallback) {
            $log.debug('cordovaContactsService.save.');

            // Checking API availability
            if (!this.checkContactsAvailability()) {
                return;
            }

            // API call
            contact.save(
                function (contact) {
                    $rootScope.$apply(successCallback(contact));
                },
                function (error) {
                    $rootScope.$apply(errorCallback(error));
                }
            );
        },

        /**
         * Removes the contact from the device contacts database, otherwise executes an error callback with a ContactError object.
         * For more information: https://github.com/apache/cordova-plugin-contacts/blob/dev/doc/index.md#contact
         */
        remove: function (contact, successCallback, errorCallback) {
            $log.debug('cordovaContactsService.remove.');

            // Checking API availability
            if (!this.checkContactsAvailability()) {
                return;
            }

            // API call
            contact.remove(
                function () {
                    $rootScope.$apply(successCallback());
                },
                function (error) {
                    $rootScope.$apply(errorCallback(error));
                }
            );
        },

        /**
         * Returns a new Contact object that is a deep copy of the calling object, with the id property set to null.
         * For more information: https://github.com/apache/cordova-plugin-contacts/blob/dev/doc/index.md#contact
         */
        clone: function (contact) {
            $log.debug('cordovaContactsService.clone.');

            // Checking API availability
            if (!this.checkContactsAvailability()) {
                return null;
            }

            // API call
            return contact.clone();
        }
    };
}]);


