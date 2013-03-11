var extend = hexo.extend
  , route = hexo.route
  , xml = require( 'jstoxml' )

extend.generator.register( function( locals, render, callback ) {
  var config = hexo.config

  var content = [
    { title: '<![CDATA[' + config.title + ']]>' },
    {
      _name: 'link',
      _attrs: {
        href: config.url + '/atom.xml',
        rel: 'self'
      }
    },
    {
      _name: 'link',
      _attrs: {
        href: config.url
      }
    },
    { updated: new Date().toISOString() },
    { id: config.url + '/' },
    { author:
      {
        name: '<![CDATA[' + config.author + ']]>'
      }
    },
    {
      _name: 'generator',
      _attrs: {
        uri: 'http://zespia.tw/hexo'
      },
      _content: 'Hexo'
    }
  ]

  if ( config.email ) content[ 5 ].author.email = '<![CDATA[' + config.email + ']]>'
  if ( config.subtitle ) content.splice( 1, 0, { subtitle: '<![CDATA[' + config.subtitle + ']]>'} )

  locals.posts.sort( 'date', -1 ).limit( 20 ).each( function( item ) {
    var title = item.title
      , html_content = item.content
      , link = item.permalink
      , entry

    if ( item.link ) {
      if ( config.linklog_marker ) {
        title = config.linklog_marker_position_feed !== 'after' ?
                  config.linklog_marker + title :
                  title + config.linklog_marker
      }

      if ( config.permalink_label_feed ) {
        html_content += [
                      '<p><a href="',
                      item.link,
                      '">',
                      config.permalink_label_feed,
                      '</a>'
                    ].join( '' )
      }

      link = item.link
    } else if ( config.standard_post_marker ) {
      title = config.standard_post_marker_position_feed !== 'after' ?
                config.standard_post_marker + title :
                title + config.standard_post_marker
    }

    entry = [
      {
        _name: 'title',
        _attrs: {
          type: 'html'
        },
        _content: '<![CDATA[' + title + ']]>'
      },
      {
        _name: 'link',
        _attrs: {
          href: link
        }
      },
      { id: item.permalink },
      { published: item.date.toDate().toISOString() },
      { updated: item.updated.toDate().toISOString() },
      {
        _name: 'content',
        _attrs: {
          type: 'html'
        },
        _content: '<![CDATA[' + html_content + ']]>'
      },
    ]

    if ( item.tags || item.categories ){
      var items = [].concat( item.tags.toArray(), item.categories.toArray() )
        , categories = []
        , caseConverter = function(){
          switch ( config.filename_case ) {
            case 'lower':
              return this.toLowerCase();
            case 'upper':
              return this.toUpperCase();
            default:
              return this;
          }
        }

      items.forEach( function( item ) {
        if ( !item ) return
        categories.push( {
          _name: 'category',
          _attrs: {
            scheme: caseConverter.call( item.permalink ),
            term: item.name
          }
        } )
      } )

      entry = [].concat( entry, categories )
    }

    content.push( { entry: entry } )
  } )

  var result = xml.toXML( {
    _name: 'feed',
    _attrs: {
      xmlns: 'http://www.w3.org/2005/Atom'
    },
    _content: content
  }, { header: true, indent: '  '} )

  route.set( 'atom.xml', result )
  callback()
} )
