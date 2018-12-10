import * as dialogsModule from "ui/dialogs";

export default function alert(message) {
    return dialogsModule.alert({
        title: "Rich Bitch",
        okButtonText: "OK",
        message: message
    });
}