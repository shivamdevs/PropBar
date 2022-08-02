// Solonet.in :: PropBar - Javascript Library
// Version :: 3.1.0 - MIT License
// Compilation :: 13-07-2022

// For detailed information visit :: https://www.solonet.in/propbar

// NOTE: Conflict:: Change the second argument 'Propbar' at the end of the script to desired value if any conflict arises.
(function( context , name ) {
    context = context || window;
    name = name || 'Propbar';
    var Settings = {// Make changes here for positioning reference
        preSpace : 20,// space between first element at top/bottom position from screen corner
        interSpace : 10,// space between two elements, to overlap previous one change to null
    };

    (function() {// load styles
        var doc = context.document;
        var style = doc.createElement( 'style' );
        style.setAttribute( 'propbar' , '' );

        // Don't change any css property here
        style.innerHTML = 'propbar-container{z-index:999998!important}propbar-container,propbar-container *{word-wrap:break-word;box-sizing:border-box;-webkit-text-size-adjust:100%;-webkit-font-smoothing:antialiased;-webkit-tap-highlight-color:transparent}[propbar]{max-width:90vw!important}[propbar],[propbar][data-align=""],[propbar][data-align=left]{left:5vw!important;right:auto!important}[propbar][data-align=center]{left:50%!important;right:auto!important;transform:translateX(-50%)!important}[propbar][data-align=right]{left:auto!important;right:5vw!important}propbar-container[ar]>[propbar],propbar-container[m]>[propbar]{max-width:calc(100vw - 20px)!important;width:calc(100vw - 20px)!important;left:10px!important;right:10px!important;transform:none!important}.propbar{font-size:15px;font-weight:400;border-radius:5px;padding:8px 16px}.propbar[data-clickable=true]{cursor:pointer!important;user-select:none!important}.propbar button{background:rgb(66 133 244/10%);border-radius:4px;border:1px solid rgb(66 133 244/60%)}.propbar button:hover{background:rgb(66 133 244/50%)}.propbar button:active{background:rgb(66 133 244/30%)}.propbar [data-type=close] button{background:0 0;border:0}.propbar [data-type=close] button:hover{background:#4285f4}.propbar [data-type=close] button:active{background:#6b9df0}.propbar,.propbar[data-animation=""],.propbar[data-animation=scale]{opacity:0;transform:scale(.5)}.propbar[data-animation=""][is],.propbar[data-animation=scale][is],.propbar[is]{opacity:1;transform:scale(1)}.propbar[data-animation=slide-down]{opacity:0;transform:translate3d(0,-50px,0)}.propbar[data-animation=slide-left]{opacity:0;transform:translate3d(50px,0,0)}.propbar[data-animation=slide-up]{opacity:0;transform:translate3d(0,50px,0)}.propbar[data-animation=slide-right]{opacity:0;transform:translate3d(-50px,0,0)}.propbar[data-animation^=slide-][is]{opacity:1;transform:translate3d(0,0,0)}.propbar,.propbar[data-theme=""],.propbar[data-theme=light]{background:#fff;color:#111;box-shadow:0 0 0 1px rgba(0 0 0/10%),0 2px 8px 0 rgb(0 0 0/40%)}.propbar[data-theme=dark]{background:#232323;color:#d0d7de;box-shadow:0 0 0 1px rgba(255 255 255/10%),0 2px 8px 0 rgb(0 0 0/80%)}';

        // Append before first style or script tag
        var firstTag = doc.head.querySelector( 'style' );
        if ( !firstTag ) {
            firstTag = doc.head.querySelector( 'script' );
        }
        if ( firstTag ) {
            doc.head.insertBefore( style , firstTag );
        } else {
            doc.head.prepend( style );
        }
    }());

    //
    var Functions = {// Function used frequently
        sortObject : function( data , value ) {
            var result = {};
            if ( typeof data === 'object' && data instanceof Object ) {
              for (var variable in data) {
                if (data.hasOwnProperty(variable)) {
                  result[ variable ] = data[ variable ] ?? null;
                }
              }
          } else if ( typeof data === 'string' ) {
              result[ data ] = value ?? null;
            }
            return result;
        },
        getContainer : function() {
            var main = context.document.querySelectorAll( 'propbar-container' );
            if ( main.length > 1 ) {
                main.forEach(( item ) => {
                    if ( !item.children.length ) {
                        item.parentNode.removeChild( item );
                    }
                });
            }
            if ( !main.length ) {
                main = [ context.document.createElement( 'propbar-container' ) ];
                context.document.body.appendChild( main[ 0 ] );
            }
            return main[ 0 ];
        },
        resetPosition : function() {
            var nodes = document.querySelectorAll( 'div[propbar]' );
            var bot = Settings.preSpace;
            var top = Settings.preSpace;
            for (var i = nodes.length - 1; i >=  0; i--) {
                if ( nodes[i].dataset.placement === 'top' ) {
                    nodes[i].style.setProperty( 'bottom' , 'auto' , 'important' );
                    nodes[i].style.setProperty( 'top' , top + 'px' , 'important' );
                    top = Settings.interSpace === null ? Settings.preSpace : top + nodes[i].clientHeight + Settings.interSpace;
                } else {
                    nodes[i].style.setProperty( 'top' , 'auto' , 'important' );
                    nodes[i].style.setProperty( 'bottom' , bot + 'px' , 'important' );
                    bot = Settings.interSpace === null ? Settings.preSpace : bot + nodes[i].clientHeight + Settings.interSpace;
                }
            };
            document.querySelectorAll( 'propbar-container' ).forEach(( item ) => {
                if ( !item.children.length ) return item.parentNode.removeChild( item );
                if ( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test( ( context || window ).navigator.userAgent ) ) {
                    item.setAttribute( 'm' , '' );
                } else {
                    item.removeAttribute( 'm' );
                }
                if ( ( context || window ).innerWidth <= 425 ) {
                    item.setAttribute( 'ar' , '' );
                } else {
                    item.removeAttribute( 'ar' );
                }
            });
        },
        timeout : function( callback , delay ) {
            if ( !callback ) { callback = ()=>{}; }
            if ( typeof delay !== 'number' ) delay = 0;
            if ( context.scheduler ) scheduler.postTask( callback , { delay : delay } ); else return context.setTimeout( callback , delay );
        },
        optionDefault : function() {
            var result = {};
            var options = PropbarDefault.allOptions;
            for (var i = 0; i < options.length; i++) {
                var select = PropbarDefault.selectibles[ options[i] ];
                result[ options[i] ] = select ? select[0] : PropbarDefault.eventOptions.includes( options[i] ) ? new PropBarEvent( options[i] ) : null;
            }
            return result;
        },
        optionAdd : function( option , object , callback = null ) {
            if ( !callback ) { callback = ()=>{}; }
            for (var key in object) {
                if (object.hasOwnProperty(key) && PropbarDefault.allOptions.includes(key)) {
                    if ( PropbarDefault.selectibles[ key ] ) {
                        option[ key ] = PropbarDefault.selectibles[ key ].includes( object[ key ] ) ? object[ key ] : PropbarDefault.selectibles[ key ][ 0 ];
                        callback( key , option[ key ] , object[ key ] );
                    } else if ( PropbarDefault.eventOptions.includes( key ) ) {
                        option[ key ].add( object[ key ] );
                        callback( key , option[ key ] , object[ key ] );
                    } else if ( object[ key ] !== undefined ) {
                        option[ key ] = object[ key ];
                        callback( key , option[ key ] , object[ key ] );
                    }
                }
            }
            return option;
        },
        optionMerge : function( defer , root , options , timeout ) {
            for (var key in defer) {
                if (defer.hasOwnProperty(key)) {
                    if ( PropbarDefault.selectibles[ key ] ) {
                        var val = options[ key ] ?? root[ key ];
                        defer[ key ] = PropbarDefault.selectibles[ key ].includes( val ) ? val : PropbarDefault.selectibles[ key ][ 0 ];
                    } else if ( PropbarDefault.eventOptions.includes( key ) ) {
                        defer[ key ] = root[ key ].add( options[ key ] );
                    } else if ( key === 'timeout' ) {
                        defer[ key ] = ( timeout === null ? null : timeout ?? ( options[ key ] === null ? null : options[ key ] ?? ( root[ key ] === null ? null : root[ key ] ) ) );
                    } else {
                        var val = options[ key ] ?? root[ key ];
                        if ( val !== undefined ) {
                            defer[ key ] = val;
                        }
                    }
                }
            }
            return defer;
        },
    };

    (function() {// on window resize look for position
        ( context || window ).addEventListener( 'resize' , Functions.resetPosition );
    }());

    // Event manager for all on* events
    class PropBarEvent {
        constructor( name ) {
            this.type = name;
            this.length = 0;
        }
        add( callback ) {
            var main = this;
            function push( call ) {
                if ( call ) {
                    main[ main.length++ ] = call;
                }
            };
            if ( Array.isArray( callback ) ) {
                for (var i = 0; i < callback.length; i++) {
                    push( callback[i] );
                }
            } else if ( callback && typeof callback === 'object' && callback.hasOwnProperty( 'length' ) && typeof callback.length === 'number' ) {
                if ( callback.type && callback.type === this.type && callback !== this ) {
                    var temp = callback;
                    var length = temp.length;
                    for (var i = 0; i < length; i++) {
                        push( temp[i] );
                    }
                }
            } else {
                push( callback );
            }
            return this;
        }
        call( instance , data ) {
            var length = this.length;
            for (var i = 0; i < length; i++) {
                if ( this[i] ) {
                    var call = this[i], back = null;
                    try {
                        back = call( instance , data );
                    } catch (e) {
                        console.error( 'TypeError: ' + call + ' is not a function' );
                    } finally {
                        if ( back === false ) {
                            return false;
                        }
                    }
                }
            }
            return true;
        }
    }

    // Propbar manager :: not accessible from outside
    class PropBarElementManager {
        constructor( root ) {
            this.propbar = PropbarIndex();
            this.root = root;
            this.root.propbar = this.propbar;
        }
        is() {
            return ( this.root && this.root.content !== undefined && this.root.options !== undefined && this.root && context.document.contains( this.root.target ) );
        }
        align( place ) {
            if ( this.is() ) {
                this.root.target.dataset.align = place;
                Functions.resetPosition();
            }
            return this.root;
        }
        anime( anime ) {
            if ( this.is() && anime !== undefined ) {
                this.root.target.querySelector( '.propbar' ).dataset.animation = anime;
            }
            return this.root;
        }
        buttons( chart ) {

            var root = this.root;
            function set( param ) {
                var element = root.target.querySelector( '[data-type=buttons]' );
                if ( Array.isArray( param ) ) {
                    param.forEach(( item ) => {
                        set( item );
                    });
                    return;
                }
                var name = '', click = null;
                if ( typeof param === 'object' && param instanceof Object) {
                    name = param.name ?? param.text ?? param.html;
                    click = param.click ?? param.onclick ?? param.onClick;
                } else {
                    name = param;
                }
                if ( name !== undefined && name !== null ) {
                    click = new PropBarEvent( click );
                    var btn = context.document.createElement( 'button' );
                    btn.setAttribute( 'tabindex' , -1 );
                    root.options.allowHTML ? ( btn.innerHTML = name ) : ( btn.innerText = name );
                    btn.style.cssText = 'margin:5px 0 5px 10px!important;color:inherit!important;padding:8px 20px!important;font-size:inherit!important;font-weight:inherit!important;transition:all .35s ease 0s!important;cursor:pointer!important';
                    btn.addEventListener( 'click' , function( eve ) {
                        if ( click.call( root , eve ) !== false ) {
                            root.close();
                        }
                    } , { once : true } );
                    element.appendChild( btn );
                }
            }
            if ( this.is() ) {
                root.target.querySelector( '[data-type=buttons]' ).innerHTML = '';
                set( chart );
                Functions.resetPosition();
            }
            return this.root;
        }
        class( name ) {
            if ( this.is() ) {
                this.root.target.querySelector( '.propbar' ).classList.add( name );
                Functions.resetPosition();
            }
            return this.root;
        }
        click( bool ) {
            if ( this.is() ) {
                this.root.target.querySelector( '.propbar' ).dataset.clickable = bool;
                Functions.resetPosition();
            }
            return this.root;
        }
        close( bool ) {
            if ( this.is() ) {
                var root = this.root;
                var element = root.target.querySelector( '[data-type=close]' );
                element.innerHTML = '';
                if ( bool ) {
                    var btn = document.createElement( 'button' );
                    btn.setAttribute( 'tabindex' , -1 );
                    btn.style.cssText = 'width:30px!important;height:30px!important;margin:0 0 0 15px!important;color:inherit!important;padding:0!important;font-size:2em!important;font-weight:inherit!important;transition:all .35s ease 0s!important;cursor:pointer!important;line-height:1.1em!important';
                    btn.innerHTML = '&times;';
                    btn.addEventListener( 'click' , function( eve ) {
                        if ( root.options.onClose.call( root , eve ) !== false ) {
                            root.close();
                        }
                    } , { once : true } );
                    element.appendChild( btn );
                }
                Functions.resetPosition();
            }
            return this.root;
        }
        content( content ) {
            content = content ?? '';
            if ( this.is() ) {
                this.root.content = content;
                var target = this.root.target.querySelector( '[data-type=content]' );
                this.root.options.allowHTML ? ( target.innerHTML = content ) : ( target.innerText = content );
                Functions.resetPosition();
            }
            return this.root;
        }
        destroy() {
            if ( this.is() ) {
                var element = this.root.target;
                element.parentNode.removeChild( element );
                Functions.resetPosition();
                for (var keys in this.root) {
                    if (this.root.hasOwnProperty(keys)) {
                        delete this.root[ keys ];
                    }
                }
            }
            return this.root;
        }
        event( name , call ) {
            if ( this.is() && PropbarDefault.eventOptions.includes( name ) && call ) {
                this.root.options[ name ].add( call );
            }
            return this.root;
        }
        html() {
            if ( this.is() ) {
                this.content( this.root.content );
                this.buttons( this.root.options.buttons );
            }
            return this.root;
        }
        hide() {
            if ( this.is() ) {
                var element = this.root.target;
                var hidden = this.root.options.onHidden;
                var destroy = this.root.options.onDestroy;
                if ( context.document.contains( element ) && this.root.options.onHide.call( this.root ) !== false ) {
                    element.querySelector( '.propbar' ).removeAttribute( 'is' );
                    Functions.timeout(function() {
                        if ( context.document.contains( element ) && hidden.call() ) {
                            element.parentNode.removeChild( element );
                            destroy.call();
                            Functions.resetPosition();
                        }
                    },350);
                    for (var keys in this.root) {
                        if (this.root.hasOwnProperty(keys)) {
                            delete this.root[ keys ];
                        }
                    }
                }
            }
            return this.root;
        }
        option( args ) {
            var options = args[0], value = args[1], offplace = args[2], reset = args[3];
            if ( this.is() ) {
                if ( offplace && offplace === 'offplace' && reset && reset === 'reset' ) {
                    this.root.options = Functions.optionMerge( Functions.optionDefault() , Functions.sortObject( options , value ) , this.baseopts , this.basetime );
                    this.shuffle();
                } else {
                    Functions.optionAdd( this.root.options , Functions.sortObject( options , value ) , ( name , value ) => {
                        switch ( name ) {
                            case 'addClass':this.class( value );break;
                            case 'align':this.align( value );break;
                            case 'allowHTML':this.html( value );break;
                            case 'animation':this.anime( value );break;
                            case 'buttons':this.buttons( value );break;
                            case 'clickable':this.click( value );break;
                            case 'closeButton':this.close( value );break;
                            case 'placement':this.place( value );break;
                            case 'theme':this.theme( value );break;
                            case 'timeout':this.time( value );break;
                            default: this.event( name , value );
                        }
                    });
                }
            }
            return this.root;
        }
        place( place ) {
            if ( this.is() ) {
                this.root.target.dataset.placement = place;
                Functions.resetPosition();
            }
            return this.root;
        }
        shuffle() {
            this.class( this.root.options.addClass );
            this.align( this.root.options.align );
            this.html( this.root.options.allowHTML );
            this.anime( this.root.options.animation );
            this.click( this.root.options.clickable );
            this.close( this.root.options.closeButton );
            this.place( this.root.options.placement );
            this.theme( this.root.options.theme );
            this.time( this.root.options.timeout );
            return this.root;
        }
        theme( theme ) {
            if ( this.is() && theme !== undefined ) {
                this.root.target.querySelector( '.propbar' ).dataset.theme = theme;
            }
            return this.root;
        }
        time( time ) {
            if ( this.is() ) {
                clearTimeout( this.root.timeoutEvent );
                if ( time === null ) {
                    return this.root.timeoutEvent = null,this.root;
                }
                time = parseInt( time ) ?? 0;
                var root = this;
                if ( this.is() && time > 0 ) {
                    this.root.timeoutEvent = setTimeout(function () {
                        if ( root.is() && root.root.options.onTimeout.call( root.root ) === false ) {
                            return root.root;
                        }
                        root.root.close();
                    }, time);
                }
            }
            return this.root;
        }
    }

    // Creates new Propbar element
    function createElement( base , content , options , timeout ) {
        var Manager;
        class PropBarElement {
            base = base;
            content = content;
            options = Functions.optionMerge( Functions.optionDefault() , base.options , options , timeout );
            propbar = 0;
            target = null;
            timeoutEvent = null;

            constructor( base , content , options , timeout ) {
                var o = this.options;
                var d = context.document;
                var c = function( name ) {
                    return d.createElement( name );
                };
                Manager = new PropBarElementManager( this );
                this.target = c( 'div' );
                var e = this.target;
                e._propbar = this;

                Manager.baseopts = options;
                Manager.basetime = timeout;

                var a = c( 'div' );
                var b = c( 'div' );
                var f = c( 'span' );
                var g = c( 'span' );
                var i = c( 'span' );
                var j = c( 'span' );

                (function() {// Outer element

                    e.setAttribute( 'propbar' , Manager.propbar );
                    e.style.cssText = 'position:fixed!important;z-index:999999!important;transition-property:top,bottom,transform,opacity!important;transition-duration:.35s!important;transition-timing-function:ease!important;font-family:inherit!important;top:auto!important;bottom:20px!important';
                    Functions.getContainer().appendChild( e );
                    Manager.align( o.align );
                    Manager.place( o.placement );
                }());
                (function() {// Base element

                    a.dataset.animation = o.animation;
                    a.className = 'propbar';
                    a.style.cssText = 'border:0!important;transition:all .35s ease 0s!important';
                    e.appendChild( a );
                    Manager.anime( o.animation );
                    Manager.class( o.addClass );
                    Manager.click( o.clickable );
                    Manager.theme( o.theme );
                }());
                (function() {// Flex element

                    b.style.cssText = 'flex-flow:row-reverse nowrap!important;display:flex!important;align-items:center!important';
                    a.appendChild(b);
                }());
                (function() {// Wrap element

                    f.style.cssText = 'display:flex!important;align-items:center!important';
                    f.dataset.type = 'close';
                    b.appendChild(f);
                    g.style.cssText = 'flex:1 1 0%;display:flex!important;align-items:center!important;flex-flow:wrap!important;width:-webkit-fill-available!important;overflow:auto!important;max-height:400px!important;justify-content:space-between!important';
                    b.appendChild(g);
                    Manager.close( o.closeButton );
                }());
                (function() {// Main content elements

                    i.dataset.type = 'content';
                    i.style.cssText = 'max-width:100%;min-height:16px!important;padding:10px!important';
                    g.appendChild(i);
                    j.dataset.type = 'buttons';
                    j.style.cssText = 'max-width:100%;display:inline-flex!important;flex-flow:wrap!important;justify-content:center!important';
                    g.appendChild(j);
                    Manager.content( content );
                    Manager.buttons( o.buttons );
                }());

                if ( o.onCreate.call( this ) === false ) {
                    return Manager.destroy();
                }

                (function resetClickable( ctx ) {
                    if ( Manager.is() ) {
                        ctx.target.querySelector( '.propbar' ).addEventListener( 'click' , function( eve ) {
                          if ( Manager.is() && ctx.options.clickable && ctx.options.onClick.call( ctx , eve ) !== false ) {
                            ctx.close();
                          } else {
                            resetClickable( ctx );
                          }
                        }, { once : true });
                    }
                }(this));


                Manager.time( o.timeout );

                Functions.resetPosition();

                Functions.timeout(function() {
                    if ( o.onShow.call( this ) === false ) {
                        return Manager.destroy();
                    }
                    a.setAttribute( 'is' , '' );
                    Functions.timeout(function() {
                        o.onShown.call( this );
                    },350);

                },350);
            }
            close() {
                return Manager.hide();
            }
            setEvent( type , callback ) {
                return Manager.event( type , callback );
            }
            setOptions( options , value ) {
                return Manager.option( arguments );
            }
            setTimeout( time ) {
                return Manager.time( time );
            }
        }

        return new PropBarElement( base , content , options , timeout );
    }

    // Default options that can be passed and what they takes as input
    var PropbarDefault = {
        allOptions : [
            'addClass',
            'align',
            'allowHTML',
            'animation',
            'buttons',
            'clickable',
            'closeButton',
            'onClick',
            'onClose',
            'onCreate',
            'onDestroy',
            'onHide',
            'onHidden',
            'onShow',
            'onShown',
            'onTimeout',
            'placement',
            'theme',
            'timeout',
        ],
        selectibles : {// Commented selectible options can be anything :: remove comment to not take anything outside of array
            align : [ 'left' , 'center' , 'right' ],
            allowHTML : [ false , true ],
            //animation : [ 'scale' , 'slide-down' , 'slide-left' , 'slide-right' , 'slide-up' ],
            clickable : [ false , true ],
            closeButton : [ false , true ],
            placement : [ 'bottom' , 'top' ],
            //theme : [ 'light' , 'dark' ],
        },
        eventOptions : [
            'onClick',
            'onClose',
            'onCreate',
            'onDestroy',
            'onHide',
            'onHidden',
            'onShow',
            'onShown',
            'onTimeout',
        ],
    };
    // Returns an number for how many elements have been created
    var PropbarIndex = (function() {
        var num = 0;
        return function() {
            return ++num;
        };
    }());

    // Propbar inatance manager :: not accessible from outside
    class PropBarManager {
        constructor( root , base ) {
            this.root = root;
            this.root.root = base;
            this.root.options = Functions.optionDefault();
        }
        config() {
            return this.root;
        }
        create( content , options , timeout ) {
            if ( ( parseInt( options ) || options === null ) && (timeout === undefined || timeout === null ) ) {
                timeout = options;
                options = {};
            }
            if ( !( typeof options === 'object' && options instanceof Object ) ) {
                options = {};
            }
            return createElement( this.root , content , options , timeout  );
        }
        default( options , value ) {
            Functions.optionAdd( this.root.options , Functions.sortObject( options , value ) );
            this.element().forEach(( item ) => {
                if ( item.base === this.root ) {
                    item.setOptions( this.root.options , null , 'offplace' , 'reset' );
                }
            });
            return this.root;
        }
        element( check ) {
            var result = [];
            if ( context.document.body ) {
                var match = context.document.body.querySelectorAll( '[propbar]' );
                if ( match.length ) {
                    for (var i = 0; i < match.length; i++) {
                        result.push( match[i]._propbar );
                        if ( check && check instanceof Node && check === match[i] ) {
                            return match[i]._propbar;
                        }
                    }
                }
            }
            return result;
        }
    }

    // Propbar instance creator class
    class PropBar {
        constructor( options ) {

            var Propbar = function( content , options = {} , timeout = null ) {
                return Manager.create( content , options , timeout );
            };
            var Manager = new PropBarManager( this , Propbar );
            Propbar.new = function( options = {} ) {
                return new PropBar( options );
            };
            Propbar.setDefault = function( options , value = null ) {
                return Manager.default( options , value );
            };
            Propbar.getElements = function( match = null ) {
                return Manager.element( match );
            };
            Propbar.config = function() {
                return Manager.config();
            };
            Propbar.setDefault( options );

            return Propbar;
        }
    }

    context[ name ] = new PropBar();
}( window , 'Propbar' ));
// NOTE-END: Conflict:: Change the second argument 'Propbar' above here
