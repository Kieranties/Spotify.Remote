/**
 * Artist
 *
 * @module      :: Model
 * @description :: Represents a blocked Artist
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {
  	uri: {
        type: 'string',
        required: true,
        regex: /spotify:artist:[0-9a-zA-Z]{22}/
    },
    name: {
        type: 'string',
        required: true,
        notNull: true,
        notEmpty: true
    }
  }

    // on save GET image from https://embed.spotify.com/oembed/?url=$$uri$$ response.thumbnail_url

};
