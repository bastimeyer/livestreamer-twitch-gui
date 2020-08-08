import Route from "@ember/routing/route";
import RefreshRouteMixin from "ui/routes/-mixins/routes/refresh";
import preload from "utils/preload";


export default class ChannelRoute extends Route.extend( RefreshRouteMixin ) {
	async model({ channel: id }) {
		/** @type {TwitchStream} */
		let stream;
		/** @type {TwitchChannel} */
		let channel;

		if ( !/^\d+$/.test( id ) ) {
			/** @type {TwitchUser} */
			const user = await this.store.queryRecord( "twitch-user", id );
			try {
				stream = await user.loadStream();
				channel = stream.channel;
			} catch ( e ) {
				channel = await user.loadChannel();
			}

		} else {
			try {
				stream = await this.store.findRecord( "twitch-stream", id, { reload: true } );
				channel = stream.channel;
			} catch ( e ) {
				// if the channel is not online, just find and return the channel record
				channel = await this.store.findRecord( "twitch-channel", id, { reload: true } );
			}
		}

		const model = { stream, channel };
		await preload( model, [
			"stream.preview.largeLatest",
			"channel.logo",
			"channel.video_banner"
		]);

		return model;
	}
}
