/*
	Collection of tools for WinJS
	author: @CKGrafico
	version: 0.3
*/


(function (g, _) {

	'use strict';

	var networkInfo = Windows.Networking.Connectivity.NetworkInformation;
	var networkConnectivityInfo = Windows.Networking.Connectivity.NetworkConnectivityLevel;
	var currentApp = Windows.ApplicationModel.Store.CurrentApp;
	var currentAppSimulator = Windows.ApplicationModel.Store.CurrentAppSimulator;
	var licenseInformation = currentApp.licenseInformation;
	var applicationData = Windows.Storage.ApplicationData.current;
	var roamingSettings = applicationData.roamingSettings;


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

			// Roaming data
			roaming: function (key, data) {
				if(data) {
					roamingSettings.values[key] = data;
				}else{
					return roamingSettings.values[key];
				}
			},

			// In-App purchases
			purchase: function(options) {

				var dafaults = {
					id: '',
					debugMode: false,
					onDone: function () { console.log('Done purchase ' + dafaults.id); },
					onFail: function (results) { console.log('FAIL purchase ' + dafaults.id); }
				};

				_.extend(dafaults, options);

				var app;
				if(dafaults.debugMode) {
					app = currentAppSimulator;
					console.log('You\'re in debug mode for purchase with id: ' + dafaults.id);
				}else{
					app = currentApp;
				}

				app.requestProductPurchaseAsync(dafaults.id).done(
					function (results) {
						if (licenseInformation.productLicenses.lookup(dafaults.id).isActive){
							dafaults.onDone(results);
						} else {
							dafaults.onFail(results);
						}
					});
			},

			// Add action to charm
			charm: function(id, text, callback){
				WinJS.Application.onsettings = function (e) {
					var vector = e.detail.e.request.applicationCommands;
					var cmd1 = new Windows.UI.ApplicationSettings.SettingsCommand(id, text, callback);
					vector.append(cmd1);
				};
			},

			// Add link to charm
			charmLink: function(id, text, link){
				this.charm(id, text, function () {
					window.open(link);
				});
			}
		}
	);

	// Export
	g.WinjsTools = new Tools();

})(this, _);