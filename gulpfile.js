const elixir     = require('laravel-elixir');
const rupture = require('rupture');
const postStylus = require('poststylus');

elixir.config.publicPath = 'entrega1';
elixir.config.sourcemaps = false;

// require('laravel-elixir-vue');

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */

elixir(mix => {

        mix.stylus('app.styl', elixir.config.publicPath+'/css/app.css', {
            use: [postStylus(['lost']), rupture()]
        })

        .browserSync({

            proxy: 'grafica.dev',
            files: [
                'entrega2/**/*.js',
                'entrega2/**/*.html'
            ]

        });
});
