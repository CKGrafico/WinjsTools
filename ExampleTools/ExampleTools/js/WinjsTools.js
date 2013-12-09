/*
    Collection of tools for WinJS
    author: @CKGrafico
    version: 0.1
*/


(function (g, _) {

    'use strict';

    var networkInfo = Windows.Networking.Connectivity.NetworkInformation;
    var networkConnectivityInfo = Windows.Networking.Connectivity.NetworkConnectivityLevel;


    //Tools Class
    var Tools = WinJS.Class.define(

        // Constructor
        function () {

        },

        // Instance Members
        {

            // Alert popup
            alert: function (options) {
                // defaults
                var dafaults = {
                    text: '',
                    button: 'Accept',
                    callback: function () { }
                };

                // if only text
                if (typeof options === 'string') {
                    dafaults.text = options;

                } else {
                    // extend options
                    _.extend(dafaults, options);
                }
                
                this.alertThree({
                    text: dafaults.text,
                    options: [
                        {
                            button: dafaults.button,
                            callback: dafaults.callback
                        }
                    ]
                });
            },

            // Confirm popup
            confirm: function (options) {

                // defaults
                var dafaults = {
                    text: '',
                    buttonAccept: 'Accept',
                    onAccept: function () { },
                    buttonCancel: 'Cancel',
                    onCancel: function () { }
                };

                // if only text
                if (typeof options === 'string') {
                    dafaults.text = options;

                } else {
                    // extend options
                    _.extend(dafaults, options);
                }

                this.alertThree({
                    text: dafaults.text,
                    options: [
                        {
                            button: dafaults.buttonAccept,
                            callback: dafaults.onAccept
                        },

                        {
                            button: dafaults.buttonCancel,
                            callback: dafaults.onCancel
                        }
                    ]
                });
            },

            // Show modal window with 'x' options
            alertThree: function (options) {

                // defaults
                var dafaults = {
                    text: '',
                    options: [
                        {
                            button: 'Ok',
                            callback: function () { }
                        }
                    ]
                };

                // if only text
                if (typeof options === 'string') {
                    dafaults.text = options;

                } else {
                    // extend options
                    _.extend(dafaults, options);
                }

                var ShowingMessage;
                if (!ShowingMessage) {
                    ShowingMessage = true;

                    setTimeout(function () {

                        // Create the message dialog and set its content
                        var msg = new Windows.UI.Popups.MessageDialog(dafaults.text);

                        // Add commands and set their command handlers
                        _.each(dafaults.options, function (option, key) {
                            if (key < 3) {
                                msg.commands.append(
                                    new Windows.UI.Popups.UICommand(option.button, option.callback)
                                );
                            }
                        });

                        msg.showAsync().done(function () {
                            ShowingMessage = false;
                        });
                    });
                }
            },

            // Prompt popup
            prompt: function (options) {
                // to do
            },

            // Return true if you have internet
            isOnline: function() {
                var connectionProfile = networkInfo.getInternetConnectionProfile();
                if (connectionProfile === null) {
                    return false;
                }

                var networkConnectivityLevel = connectionProfile.getNetworkConnectivityLevel();
                if (networkConnectivityLevel === networkConnectivityInfo.none
                    || networkConnectivityLevel === networkConnectivityInfo.localAccess
                    || networkConnectivityLevel === networkConnectivityInfo.constrainedInternetAccess) {
                    return false;
                }

                return true;
            },

            // Do an action if you have internet
            onlineAction: function (callback, alertOptions) {
                if(this.isOnline()) {
                    callback();
                }else{
                    this.alert(alertOptions);
                }
            },

            // to do in-app purchases, roaming, etc..
        }
    );

    // Export
    g.WinjsTools = new Tools();

})(this, _);