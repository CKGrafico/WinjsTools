// Para obtener una introducción a la plantilla En blanco, consulte la siguiente documentación:
// http://go.microsoft.com/fwlink/?LinkId=232509
(function () {
    "use strict";

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;

    app.onactivated = function (args) {
        if (args.detail.kind === activation.ActivationKind.launch) {
            if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {

                var $doc = $(document);

                // alert
                $doc.on('click', '#1', function () {
                    WinjsTools.alert('testing');
                });

                // confirm
                $doc.on('click', '#2', function () {
                    WinjsTools.confirm({
                        text: 'testing',
                        onAccept: function () { $('#2-extra').text('Accepted'); },
                        onCancel: function () { $('#2-extra').text('Cancelled'); }
                    });
                });

                // alertOptions
                $doc.on('click', '#3', function () {
                    WinjsTools.alertThree({
                        text: 'testing',
                        options: [
                            {
                                button: 'Option 1',
                                callback: function () { $('#3-extra').text('Option 1'); }
                            },
                            {
                                button: 'Option 2',
                                callback: function () { $('#3-extra').text('Option 2'); }
                            },
                            {
                                button: 'Option 3',
                                callback: function () { $('#3-extra').text('Option 3'); }
                            },
                            { // only can three
                                button: 'Option 4',
                                callback: function () { $('#3-extra').text('Option 4'); }
                            }
                        ]
                    });
                });
                
                // alert
                $doc.on('click', '#4', function () {
                    WinjsTools.onlineAction(function () { $('#4-extra').text('Online'); }, 'Connect to internet');
                });




            }
            args.setPromise(WinJS.UI.processAll());
        }
    };

    app.oncheckpoint = function (args) {

    };

    app.start();
})();
