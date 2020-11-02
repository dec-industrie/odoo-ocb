(function (factory) {
    /* global define */
    if (typeof define === 'function' && define.amd) {
      // AMD. Register as an anonymous module.
      define(['jquery'], factory);
    } else {
      // Browser globals: jQuery
      factory(window.jQuery);
    }
  }(function ($) {
    // template
    var tmpl = $.summernote.renderer.getTemplate();
    // core functions: range, dom
    var range = $.summernote.core.range;
    var dom = $.summernote.core.dom;
  
    /**
     * @class plugin.toggleclass 
     * 
     * Toggle Class Plugin  
     */
    $.summernote.addPlugin({
      name: 'toggleClass',
      buttons: { // buttons
        toggleClassDropdown: function () {
          classTags = ["text-muted", "text-primary", "text-warning", "text-danger", "text-success", "alert alert-success", "alert alert-info", "alert alert-warning", "alert alert-danger"];
          var list = '';
          for (var i=0; i<classTags.length; i++) {
            list += '<li><a style="display: inline-block;" data-event="toggleClassDropdown" href="#" data-value="'+classTags[i]+'" class="'+classTags[i]+'" >'+classTags[i]+'</a></li>';
          }
          // list += '<li><a data-event="toggleClassDropdown" href="#" data-value="codemirror">Code Mirror</a></li>';
          var dropdown = '<ul class="dropdown-menu" style="height: auto; width:400px; max-height: 200px; max-width:600px; overflow-x: hidden;">' + list + '</ul>';
  
          return tmpl.iconButton('fa fa-css3', {
            title: 'Toggle CSS class',
            hide: true,
            dropdown : dropdown
          });
        },
  
      },
  
      events: { // events
        toggleClassDropdown: function (event, editor, layoutInfo, value) {
          var $editable = layoutInfo.editable();
          var r = range.create();
          if (!r) {
              return;
          }
  
          // if range on anchor, expand range with anchor
          if (r.isOnAnchor()) {
            var anchor = dom.ancestor(r.sc, dom.isAnchor);
            r = range.createFromNode(anchor);
          }
  
          var nodes = dom.listBetween(r.sc, r.ec, r.so, r.eo);
          for (var i=0; i<nodes.length; i++) {
            console.log('nodes[i]', i, nodes[i]);
            $(nodes[i]).toggleClass(value);
          }
          r.select();
        },
      }
    });
  }));
  