import { get } from "@ember/object";
import { inject as service } from "@ember/service";
import { t } from "ember-intl";
import FormButtonComponent from "../form-button/component";
import HotkeyMixin from "ui/components/-mixins/hotkey";


export default FormButtonComponent.extend( HotkeyMixin, {
	/** @type {IntlService} */
	intl: service(),
	chat: service(),

	classNames: [ "btn-hint" ],
	icon: "fa-comments",
	_title: t( "components.open-chat.title" ),
	iconanim: true,

	hotkeysNamespace: "openchatbutton",
	hotkeys: {
		default() {
			this.click();
		}
	},

	action() {
		const channel = get( this, "channel" );
		const chat = get( this, "chat" );

		return chat.openChat( channel );
	}
});
