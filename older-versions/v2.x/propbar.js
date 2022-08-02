// Solonet.in :: PropBar - Javascript Library
// Version :: 3.0.0 - MIT License

// For detailed information visit :: https://www.solonet.in/propbar

// Essential modules
// jScript Library :: https://www.solonet.in/jscript

var __propbar__custom__event__;

(function() {
  if ( !window.jScript ) return delete __propbar__custom__event__, console.log( '%c\'PropBar\' needs \'jScript Library\' to run.\nGet from https://www.solonet.in/jscript\nOr get \'PropBar Vanilla\' from https://www.solonet.in/propbar/vanilla' , 'font-weight: 500' );
  Js.styleSheet({
    'propbar-container' : {
      zIndex : '999998 !important',
    },
    'propbar-container, propbar-container *' : {
      wordWrap: 'break-word',
      boxSizing: 'border-box',
      WebkitTextSizeAdjust: '100%',
      WebkitFontSmoothing: 'antialiased',
      WebkitTapHighlightColor: 'transparent',
    },
    'propbar-container button' : {
      outline : 'none !important',
      border : 'none',
      background : 'inherit',
    },
    '.propbar-fx3dw' : {
      zIndex : '999999 !important',
      fontSize : '15px',
      position : 'fixed !important',
      maxWidth : 'calc(100vw - 10vw)',
      fontWeight : '400',
      background : 'none',
      fontFamily : 'inherit',
      transitionDuration : '.2s',
      transitionProperty : 'top, bottom, transform, opacity',
      transitionTimingFunction : 'ease',
    },

    '.propbar-fx3dw, .propbar-fx3dw[data-theme=light]' : {
      '--prop-bar-color' : '#121212',
      '--prop-bar-bg' : '#fff',
      '--prop-bar-border' : '0,0,0,.1',
      '--prop-bar-shadow-color' : '0,0,0,.4',
      '--prop-bar-shadow' : '0px 2px 8px 0px rgb(var(--prop-bar-shadow-color))',
      '--prop-bar-hover' : '0,0,0,.2',
      '--prop-bar-active' : '0,0,0,.1',
    },
    '.propbar-fx3dw[data-theme="dark"]' : {
      '--prop-bar-color' : '#d0d7de',
      '--prop-bar-bg' : '#232323',
      '--prop-bar-border' : '255,255,255,.1',
      '--prop-bar-shadow-color' : '0 0 0 / 60%',
      '--prop-bar-hover' : '255,255,255,.2',
      '--prop-bar-active' : '255,255,255,.1',
    },
    '.propbar-fx3dw[data-align="left"]' : {
      left : '5vw',
    },
    '.propbar-fx3dw[data-align="center"]' : {
      left : '50%',
      transform : 'translateX(-50%)',
    },
    '.propbar-fx3dw[data-align="right"]' : {
      right : '5vw',
    },
    ':root.mobile-device .propbar-fx3dw, :root.mobile-device-ratio .propbar-fx3dw' : {
      maxWidth : 'calc(100vw - 20px)',
      width: 'calc(100vw - 20px)',
      left : '10px',
      right : '10px',
      transform : 'none',
    },
    '.propbar-tg5yh' : {
      background : 'var(--prop-bar-bg)',
      color : 'var(--prop-bar-color)',
      borderRadius : '5px',
      border : '1px solid rgba(var(--prop-bar-border))',
      boxShadow : 'var(--prop-bar-shadow)',
      transition: 'all .2s ease',
    },
    '.propbar-fx3dw[data-clickable="true"] .propbar-tg5yh' : {
      cursor : 'pointer !important',
      userSelect : 'none !important',
    },
    '.propbar-hi3dn > .propbar-tg5yh' : {
      transform : 'scale(.7)',
      opacity : '0',
    },
    '.propbar-gt6iu' : {
      display : 'flex',
      flexDirection : 'row-reverse',
      alignItems : 'center',
    },
    '.propbar-lr7zf' : {
      display : 'inline-flex',
    },
    '.propbar-bj2wh' : {
      display : 'inline-flex',
      flex : '1',
      padding : '5px',
    },
    '.propbar-ef8ub' : {
      overflow : 'auto',
      maxHeight : '30vh',
      padding : '10px',
    },
    '.propbar-th2wq' : {
      display : 'inline-flex',
      flexWrap : 'wrap',
    },
    '.propbar-ef8ub::-webkit-scrollbar' : {
      width : '12px',
      height : '12px',
      cursor : 'default',
    },
    '.propbar-ef8ub::-webkit-scrollbar-thumb' : {
      background : '#7777',
      backgroundClip : 'padding-box',
      border : '4px solid transparent',
      minHeight : '28px',
      minWidth : '28px',
      cursor : 'default',
      WebkitBorderRadius : '8px',
      borderRadius : '8px',
      WebkitBoxShadow : 'none',
      boxShadow : 'none',
    },
    '.propbar-ef8ub::-webkit-scrollbar-track' : {
      background: 'none',
      border: 'none',
    },
    '.propbar-ef8ub::-webkit-scrollbar-corner' : {
      background : 'none',
    },
    '.propbar-ef8ub::-webkit-scrollbar-thumb:active' : {
      borderWidth : '3px',
      borderRadius : '0',
    },
    '.propbar-nm0oq' : {
      width : '30px',
      height : '30px',
      maxWidth : '30px',
      maxHeight : '30px',
      display : 'inline-flex',
      borderRadius : '4px',
      justifyContent : 'center',
      alignItems : 'center',
      flexWrap : 'nowrap',
      overflow : 'hidden',
      transition : '.2s',
      margin : '10px',
    },
    '.propbar-nm0oq:hover' : {
      cursor : 'pointer',
      background : '#4285f4',
    },
    '.propbar-nm0oq:active' : {
      background : '#6b9df0',
    },
    '.propbar-nm0oq svg' : {
      width : '25px',
      height : '25px',
      fill : 'var(--prop-bar-color)',
      transform : 'scale(.7)',
    },
    '.propbar-gt8il' : {
      color : 'inherit',
      margin : '4px 0 4px 8px',
      padding : '8px 20px',
      fontSize : '14px',
      borderRadius : '4px',
      justifyContent : 'center',
      alignItems : 'center',
      background : 'rgb(66 133 244 / 10%)',
      border : '1px solid rgb(66 133 244 / 60%)',
      transition : 'background .2s ease',
    },
    '.propbar-gt8il:hover' : {
      cursor : 'pointer',
      background : 'rgb(66 133 244 / 50%)',
    },
    '.propbar-gt8il:active' : {
      background : 'rgb(66 133 244 / 30%)',
    },
  }, 'head' , '[propbar-style]' );

  __propbar__custom__event__ = function() {
    var bottom = 20;
    var top = bottom;
    Js( '.propbar' ).reverse().each(function( item , i ) {
      if ( item.data( 'placement' ) === 'top' ) item.css( 'top' , top + 'px' ).css( 'bottom' , '' ) , top += item.height() + 10; else item.css( 'bottom' , bottom + 'px' ).css( 'top' , '' ) , bottom += item.height() + 10;
    });
  };

  Js( window ).resize( __propbar__custom__event__ );
}());


class PropBar {

  constructor( options ) {
    if ( !window.jScript ) return;
    var defaults = {
      align : [ 'left' , 'center' , 'right' ],
      allowHTML : [ false , true ],
      clickable : [ false , true ],
      closeButton : [ false , true ],
      placement : [ 'bottom' , 'top' ],
      theme : [ 'light' , 'dark' ],
    };
    var root = function( text , options , timeout ) {
      if ( !Js.ce( 'div' ).html( text ?? '' ).text() ) throw new Error( 'Failed to construct \'PropBar\'.\nText argument in not defined.' );
      if ( parseInt( options ) || options === null ) timeout = options , options = {};
      return new class {
        onclose = null;
        ontimeout = null;
        timedelay = null;
        timeevent = null;
        constructor() {
          var bar = this;
          bar.placeholder = text;
          bar.options = (function() {
            options = Is.object( options ) ? options : {};
            function varCheck( variant , inset ) {
              var globe = options[ variant ] ?? root.options[ variant ];
              if ( defaults[ variant ] && !defaults[ variant ].includes( globe ) ) globe = defaults[ variant ][ 0 ];
              return globe;
            };
            return {
              addClass : options.addClass ?? root.options.addClass,
              align : varCheck( 'align' ),
              allowHTML : varCheck( 'allowHTML' ),
              buttons : options.buttons ?? root.options.buttons,
              clickable : varCheck( 'clickable' ),
              closeButton : varCheck( 'closeButton' ),
              onclose : options.onclose ?? root.options.onclose,
              ontimeout : options.ontimeout ?? root.options.ontimeout,
              placement : varCheck( 'placement' ),
              theme : varCheck( 'theme' ),
              timeout : parseInt( timeout ) || parseInt( options.timeout ) || parseInt( root.options.timeout ) || null,
            };
          }());
          bar.elements = {};
          bar.inherits = root.options;
          bar.elements.outer = Js.ce( '.propbar.propbar-fx3dw.propbar-hi3dn' ).appendTo( Js.cm( 'propbar-container' , 'body' ) );
          bar.elements.inner = Js.ce( '.propbar-tg5yh' ).appendTo( bar.elements.outer );
          bar.elements.wrap = Js.ce( '.propbar-gt6iu' ).appendTo( bar.elements.inner );
          bar.elements.close = Js.ce( 'span.propbar-lr7zf' ).appendTo( bar.elements.wrap );
          bar.elements.content = Js.ce( 'span.propbar-bj2wh' ).appendTo( bar.elements.wrap );
          bar.elements.holder = Js.ce( 'div.propbar-ef8ub' ).appendTo( bar.elements.content );
          bar.elements.text = Js.ce( 'span.propbar-qs9kg' ).appendTo( bar.elements.holder );
          bar.elements.button = Js.ce( 'span.propbar-th2wq' ).appendTo( bar.elements.holder );

          if ( bar.options.allowHTML ) bar.elements.text.html( bar.placeholder ); else bar.elements.text.text( bar.placeholder );
          bar.elements.outer.data({
            align : bar.options.align,
            clickable : bar.options.clickable,
            placement : bar.options.placement,
            theme : bar.options.theme,
          });
          (function resetClickable() {
            if ( bar && bar.elements ) {
              bar.elements.inner.click(function() {
                if ( bar && bar.options &&  bar.options.clickable ) {
                  bar.close();
                } else {
                  resetClickable();
                }
              }, { once : true });
            }
          }());
          bar.elements.inner.addClass( bar.options.addClass );

          bar.closeButton( bar.options.closeButton );
          bar.buttons( bar.options.buttons );

          if ( bar.options.onclose ) bar.onclose = bar.options.onclose;
          if ( bar.options.ontimeout ) bar.ontimeout = bar.options.ontimeout;

          bar.elements.outer.proto( '_propbar' , bar );

          Js.timeout(function() {
            bar.elements.outer.removeClass( 'propbar-hi3dn' );
          }, 200);
          bar.timeout( bar.options.timeout );

          __propbar__custom__event__();
        }
        align( align ) {
          if ( !( this && this.options && this.elements ) ) return this;
          if ( defaults[ 'align' ].includes( align ) ) {
            this.options.align = align;
            this.elements.outer.data( 'align' , this.options.align );
            __propbar__custom__event__();
          }
          return this;
        }
        buttons( buttons ) {
          if ( !( this && this.options && this.elements ) ) return this;
          var bar = this;
          function setButtons( param ) {
            if ( Is.array( param ) ) return param.forEach(( item ) => { setButtons( item ); });
            var name = '';
            var click = null;
            if ( Is.object( param ) ) {
              name = param.name || param.text || param.html;
              click = param.click || param.onclick;
            } else {
              name = param;
            }
            if ( name && Is.string( name ) ) {
              Js.ce( 'button.propbar-gt8il[tabindex=-1]' , name ).appendTo( bar.elements.button ).click(function( eve ) {
                eve.preventDefault();
                eve.stopPropagation();
                bar.close( click );
              }, { once : true });
            }
          };
          bar.elements.button.empty();
          setButtons( buttons );
          bar.options.setButtons = buttons || null;
          __propbar__custom__event__();
          return this;
        }
        clickable( clickable ) {
          if ( !( this && this.options && this.elements ) ) return this;
          this.options.clickable = !!clickable;
          this.elements.outer.data( 'clickable' , this.options.clickable );
          return this;
        }
        close( ...callback ) {
          if ( !( this && this.options && this.elements ) ) return this;
          var bar = this;
          var outer = bar.elements.outer;
          if ( outer && outer.contained() ) {
            outer.addClass( 'propbar-hi3dn' );
            Js.timeout(function () {
              outer.remove();
              __propbar__custom__event__();
            }, 200);
            __propbar__custom__event__();
          }
          callback.forEach(( call ) => {
            if ( Is.function( callback ) ) callback();
          });
          for (var variable in bar) {
            if (bar.hasOwnProperty(variable)) {
              delete bar[ variable ];
            }
          }
          return bar;
        }
        closeButton( closeButton ) {
          if ( !( this && this.options && this.elements ) ) return this;
          var bar = this;
          bar.elements.close.empty();
          bar.options.closeButton = !!closeButton;
          if ( bar.options.closeButton ) {
            Js.ce( 'button.propbar-nm0oq[tabindex=-1]' , '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z"/></svg>' ).appendTo( bar.elements.close ).click(function( eve ) {
              eve.preventDefault();
              eve.stopPropagation();
              bar.close( closeButton );
            }, { once : true });
          }

          __propbar__custom__event__();
          return bar;
        }
        placement( placement ) {
          if ( !( this && this.options && this.elements ) ) return this;
          if ( defaults[ 'placement' ].includes( placement ) ) {
            this.options.placement = placement;
            this.elements.outer.data( 'placement' , this.options.placement );
            __propbar__custom__event__();
          }
          return this;
        }
        setTimeout( timeout ) {
          return this.timeout( timeout );
        }
        text( text ) {
          if ( !( this && this.options && this.elements ) ) return this;
          if ( !!Js.ce( 'div' ).html( text ?? '' ).text() ) {
            this.placeholder = text;
            if ( this.options.allowHTML ) this.elements.text.html( this.placeholder ); else this.elements.text.text( this.placeholder );
            __propbar__custom__event__();
          }
          return this;
        }
        theme( theme ) {
          if ( !( this && this.options && this.elements ) ) return this;
          if ( defaults[ 'theme' ].includes( theme ) ) {
            this.options.theme = theme;
            this.elements.outer.data( 'theme' , this.options.theme );
            __propbar__custom__event__();
          }
          return this;
        }
        timeout( timeout ) {
          if ( !( this && this.options && this.elements ) ) return this;
          var bar = this;
          if ( parseInt( timeout ) ) {
            clearTimeout( bar.timeevent );
            bar.timedelay = parseInt( timeout );
            bar.timeevent = setTimeout(function () {
              bar.close( bar.ontimeout );
            }, bar.timedelay );
          } else if ( timeout === null ) {
            clearTimeout( bar.timeevent );
            bar.timeevent = null;
            bar.timedelay = null;
          } else if ( timeout === undefined ) {
            timeout = Is.function( timeout ) ? timeout : null;
            bar.close( bar.ontimeout , timeout );
          }
          return this;
        }
        update( text ) {
          return this.text( text );
        }
      }( text , options , timeout );
    };
    root.options = {
      addClass : null,
      align : 'left',
      allowHTML : false,
      buttons : null,
      clickable : false,
      closeButton : false,
      onclose : null,
      ontimeout : null,
      placement : 'bottom',
      theme : 'light',
      timeout : null,
    };
    root.setDefault = function( option , value ) {
      var options = Js.arrObj.valToObj( option , value );
      for (var variable in options) {
        if (options.hasOwnProperty(variable)) {
          if( defaults[ variable ] ) {
            if ( defaults[ variable ].includes( options[ variable ] ) ) {
              this.options[ variable ] = options[ variable ];
            }
          } else {
            this.options[ variable ] = options[ variable ];
          }
        }
      }
      return root.options;
    };
    root.setDefault( options );
    root.get = function( element ) {
      return root.getElements().match( element ).proto( '_propbar' ) || null;
    };
    root.getAll = function() {
      var result = [];
      root.getElements().each(function( item ) {
        result.push( item.proto( '_propbar' ) || {} );
      });
      return result;
    };
    root.getElements = function() {
      return Js( '.propbar' );
    };
    return root;
  }
};
const Propbar = new PropBar();
