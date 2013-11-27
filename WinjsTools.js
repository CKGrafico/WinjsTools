/*
    Collection of tools for WinJS
    author: @CKGrafico
    version: 0.1
*/


(function (g) {

    'use strict';

    var networkInfo = Windows.Networking.Connectivity.NetworkInformation;
    var networkConnectivityInfo = Windows.Networking.Connectivity.NetworkConnectivityLevel;

    //Tools Class
    var Tools = WinJS.Class.define(

        // Constructor
        function () {
            var $progress = $('<progress/>').css({ 'position': 'absolute', 'width': '160px', 'height': '160px', 'padding': '40px', 'background': 'rgba(0, 0, 0, 0.8)', 'color': '#FFF', 'margin': '-100px -100px 0 0', 'top': '50%', 'left': '50%', 'z-index': '1000', 'border-radius': '6px' }).addClass('win-ring win-large');
            this.$loading = $('<div/>').css({ 'position': 'absolute', 'top': '0', 'left': '0', 'display': 'none', 'height': '100%', 'width': '100%' }).html($progress);
            $('body').append(this.$loading);
        },

        // Instance Members
        {

            // Alert popup
            alert: function (options) {

            },

            // Confirm popup
            confirm: function (options) {

            },

            // Prompt popup
            prompt: function (options) {

            },

            // Return true if you have internet
            isOnline: function() {
                return false;
            },

            // Do an action if you have internet
            onlineAction: function (callback, failText) {
                if(this.isOnline()) {
                    callback();
                }else{
                    this.alert(failText || '');
                }
            }
        }
    );

    // Export
    g.WinjsTools = new Tools();

})(window);

/*
//Tools Class
    var Tools = WinJS.Class.define(

        // Constructor
        function () {
            var $progress = $('<progress/>').css({ 'position': 'absolute', 'width': '160px', 'height': '160px', 'padding': '40px', 'background': 'rgba(0, 0, 0, 0.8)', 'color': '#FFF', 'margin': '-100px -100px 0 0', 'top': '50%', 'left': '50%', 'z-index': '1000', 'border-radius': '6px' }).addClass('win-ring win-large');
            this.$loading = $('<div/>').css({ 'position': 'absolute', 'top': '0', 'left': '0', 'display': 'none', 'height': '100%', 'width': '100%' }).html($progress);
            $('body').append(this.$loading);
        },

        // Instance Members
        {
            // Funcion para crear alerts
            alert: function (options) {
                // Opciones por defecto
                var opciones = {
                    text: null,
                    btn1: "Accept",
                    btn2: null,
                    callback1: null,
                    callback2: null,
                    time: 100
                };

                // Sobrescribo opciones
                _.extend(opciones, options);
                var ShowingMessage;
                if (!ShowingMessage) {
                    ShowingMessage = true;
                    // Enseño la barra de carga
                    this.toggleLoading('fade');

                    setTimeout(function () {
                        // Create the message dialog and set its content
                        var msg = new Windows.UI.Popups.MessageDialog(opciones.text);
                        // Add commands and set their command handlers
                        msg.commands.append(
                            new Windows.UI.Popups.UICommand(opciones.btn1, opciones.callback1)
                        );
                        if (opciones.btn2) {
                            msg.commands.append(
                                new Windows.UI.Popups.UICommand(opciones.btn2, opciones.callback2)
                            );
                        }

                        // Show the message dialog
                        this.toggleLoading('fade');

                        msg.showAsync().done(function () {
                            ShowingMessage = false;
                        });
                    }, opciones.time);
                }
            },

            // Funcion que comprueba si un usuario tiene conexión
            haveInternet: function () {
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

            // Funcion que muestra un alert hasta que tengas internet
            internetMessage: function () {
                if ($("#nointernet").length === 0) {
                    $("body").prepend("<div id='nointernet' style='position: absolute;width: 100%;height: 100%;background: rgba(255,255,255,0.6);z-index: 100000;font-weight: bold;text-align: center;color: rgba(0,0,0,0.4);font-size: 6em;'>No Internet</div>");
                }

                if (this.haveInternet()) {
                    $("#nointernet").remove();
                }
            },
            //Funcion que espera a tener internet para realizar una accion
            needInternetAction: function (options) {
                // Opciones por defecto
                var opciones = {
                    callback: null,
                    param: null
                };

                // Sobrescribo opciones
                _.extend(opciones, options);
                if (this.haveInternet()) {
                    if (opciones.callback) {
                        if (opciones.param) {
                            opciones.callback(opciones.param);
                        } else {
                            opciones.callback();
                        }
                    }
                } else {
                    this.internetMessage();
                    var self = this;
                    setTimeout(function () { self.needInternetAction(opciones); }, 100);
                }
            },

            toggleLoading: function (extra) {
                if (extra) {
                    this.$loading.fadeToggle();
                }else{
                    this.$loading.toggle();
                }

            }
        }
    );*/