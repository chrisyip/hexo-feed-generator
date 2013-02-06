# Feed generator plugin for [Hexo]

This plugin can generate Atom 1.0.

It's a fork of `hexo-generator-feed` in [hexo-plugins](https://github.com/tommy351/hexo-plugins) package.

It allows you to:

- Output categories and tags as catetory section in feed, original package only contain tags;
- Customize standard post and [linklog](http://en.wikipedia.org/wiki/Linklog) style.

## Usage

### Install

```
npm install git://github.com/ChrisYip/hexo-feed-generator.git
```

### Enable

Add `hexo-feed-generator` to `plugins` in `_config.yml`.

``` yaml
plugins:
- hexo-feed-generator
```

### Configuration

Add the following options to __global__ `config.yml`:

``` yaml
permalink_label_feed: "&infin; Permalink"
linklog_marker: "&rarr;&nbsp;"
linklog_marker_position_feed:
standard_post_marker:
standard_post_marker_position_feed:
```

Notes:

- Position aceept `before` and `after`, if not set as `after`, will  use `before`;
- By default, linklog marker is `→`, permanlink label is `∞`.

Preview:

![Linklog Preview](http://f.cl.ly/items/2R3G3Y3F3Q042r2p0r1z/hexo-feed-generator.png)

### Disable

Remove `hexo-feed-generator` from `plugins` in `_config.yml`.

``` yaml
plugins:
- hexo-feed-generator
```

### Update

Execute the following command.

```
npm update
```

### Uninstall

Execute the following command. Don't forget to disable the plugin before uninstalling.

```
npm uninstall hexo-feed-generator
```

[Hexo]: http://zespia.tw/hexo
