import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE_TITLE, SITE_DESCRIPTION } from '../consts';
import { marked } from 'marked';

export async function GET(context) {
	const posts = await getCollection('post');
	return rss({
		xmlns: {
			atom: 'http://www.w3.org/2005/Atom',
			itunes: 'http://www.itunes.com/dtds/podcast-1.0.dtd',
			media: 'http://search.yahoo.com/mrss/',
			dc: 'http://purl.org/dc/elements/1.1/',
			content: 'http://purl.org/rss/1.0/modules/content/'
		},
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		items: posts.map((post) => {
			const content = marked(post.body);
			return ({
				title: `${post.slug}. ${post.data.title}`,
				link: post.slug,
				pubDate: post.data.pubDate,
				customData:
					`
						<description>
						${content}
						</description>
					`,
				enclosure: {
					url: context.site + post.data.audioSource.substring(1),
					length: post.data.audioSize,
					type: 'audio/mpeg',
				}
			})
		}),
		customData:
			`
				<language>ja</language>
				<generator>Astro</generator>
				<atom:link href="${context.site}feed.xml" rel="self" type="application/rss+xml" />
				<itunes:new-feed-url>${context.site}feed.xml</itunes:new-feed-url>
				<media:thumbnail url="${context.site}240icon.png" />
				<media:keywords>game,esports,anime,manga,otaku,pc</media:keywords>
				<media:category scheme="http://www.itunes.com/dtds/podcast-1.0.dtd">Leisure</media:category>
				<itunes:author>putcut</itunes:author>
				<itunes:explicit>false</itunes:explicit>
				<itunes:image href="${context.site}artwork.jpg" />
				<itunes:keywords>game,esports,anime,manga,otaku,pc</itunes:keywords>
				<itunes:subtitle>A Podcast from Japan. Talking about VideoGame, Esports, Anime, Manga.</itunes:subtitle>
				<itunes:summary>ゲーム(esports)のことを中心に好きなことを話すPodcastです。</itunes:summary>
				<itunes:category text="Leisure">
					<itunes:category text="Video Games" />
					<itunes:category text="Animation & Manga" />
				</itunes:category>
				<itunes:owner>
					<itunes:name>putcut</itunes:name>
					<itunes:email>putcutpoint@gmail.com</itunes:email>
				</itunes:owner>
			`,
	});
}
