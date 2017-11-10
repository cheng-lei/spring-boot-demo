/**
 * Copyright 2015 Qiyi Inc. All rights reserved.
 *
 * @file:   Tree.View.js
 * @author: wangzhaohui@qiyi.com
 */

qui(function() {
    Tree.View = Arm.create('View', {
        name: 'Tree.View',
        properties: {
        },
        options: {
        },
        run: function() {
            
        },
        render: function(data) {
            
        },
        /**
         * initialize the program
         * @name init()
         */
        init: function() {
            // Global object of this program
            this.$container = this.options.$container;
            this.config = Tree.Action.getConfig(); // config
            this.class = this.class || this.getClass();
            // initialize
            this._initTVTree();
            this._initTVGrid();
            this.bindEvent();
        },
        /**
         * initialize the TV tree and generate it
         * @private
         * @name _initTVTree()
         */
        _initTVTree: function(){
            // Global objects about the tree
            this.$tree = this.$container.find('#TVTree');
            this.$iconBox = this.$container.find('#iconBox');
            this.$selectedNode = null; // current selected node

            this.$container.find('#setIconDialog').hide();


            /********************* custom plugin 'rowmenus' ************************/
            /* add custom plugin 'rowmenus' 2015-08-12*/

            var div = document.createElement('div'),
                deleteBtn = document.createElement('sapn');
            deleteBtn.className = 'delete-btn';
            div.appendChild(deleteBtn);

            $.jstree.plugins.rowmenus = function (options, parent) {
                this.bind = function () {
                    parent.bind.call(this);

                    this.element.on('hover_node.jstree dehover_node.jstree', $.proxy(function(e, data){
                        if (e.type === "hover_node" && this.is_disabled(data.node)) { return; }
                        if (data.node.parent === '#') { return; } // root node can't be removed
                        this.get_node(data.node, true).find('.delete-btn').first()[e.type === "hover_node"?"addClass":"removeClass"]('delete-btn-hovered');
                    }, this));

                    this.element.on('click.jstree', '.delete-btn', $.proxy(function(e){
                        e.stopPropagation();
                        console.log(e);
                        var inst = $.jstree.reference(e.currentTarget),
                            obj = inst.get_node(e.currentTarget);
                        inst.delete_node(obj);
                    }));

                    $(document).on('dnd_move.vakata.jstree', function(e){
                        console.log(e);
                    });
                };
                this.teardown = function () {
                    if(this.settings.wholerow) {
                        this.element.find(".jstree-wholerow").remove();
                    }
                    parent.teardown.call(this);
                };
                this.redraw_node = function(obj, deep, callback, force_render) {
                    obj = parent.redraw_node.apply(this, arguments);
                    if(obj) {
                        var tmp = div.cloneNode(true);
                        //tmp.style.height = this._data.core.li_height + 'px';
                        if($.inArray(obj.id, this._data.core.selected) !== -1) { tmp.className += ' jstree-wholerow-clicked'; }
                        if(this._data.core.focused && this._data.core.focused === obj.id) { tmp.className += ' jstree-wholerow-hovered'; }
                        obj.insertBefore(tmp, obj.childNodes[0]);
                    }
                    return obj;
                };
            };
            /*************************************************************/

            var self = this;
            /*
             * config the tree and generate it 
             */
            self.$tree.tree({
                'core': {
                    /* add condition for drag and drop 2015-08-12 */
                    'check_callback': function(operation, node, parent, position, more){
                        // nodes with 'folder' type can't move into node without 'folder' type
                        if (operation === 'move_node' &&
                            more &&
                            more.pos &&
                            more.pos === 'i' &&
                            more.ref &&
                            more.ref.type &&
                            more.ref.type !== 'folder') {
                            return false;
                        }
                        // root node can change order only
                        if (operation === 'move_node' &&
                            parent.id === '#' &&
                            more &&
                            more.ref &&
                            more.ref.parent &&
                            more.ref.parent === '#') {
                            return false;
                        }
                        return true;
                    },
                    'data': {
                        'url': function(node){
                            return self._getTreeAjaxUrl.call(self, node);
                        },
                        'data': function(node){
                            return {'id': node.id};
                        }
                    },
                    'themes': {
                        'name': 'proton',
                        'responsive': true,
                        'dots': false
                    }
                },
                'plugins': ['contextmenu', 'search', 'types', 'wholerow', 'dnd', 'rowmenus'], /* add 'dnd' and 'rowmenus' plugin 2015-08-12 */
                'types': {
                    'folder': {
                        'icon': self.config.TREE_ICON_FOLDER + 'closed_folder.png'
                    },
                    'default': {
                        'icon': self.config.TREE_ICON_FOLDER + 'file.png'
                    }
                },
                'contextmenu': {
                    'items': function(node){
                        return self._customContextmenu.call(self, node);
                    }
                }
            });
        },
        /**
         * get ajax url for loading tree node
         * @private
         * @name _getTreeAjaxUrl(node)
         * @param  {Object} node the node of the tree
         * @return {String} the url related to the node
         */
        _getTreeAjaxUrl: function(node){
            var URLS = this.config.TREE_JSON_FOLDER +
                        (this.config.TREE_AJAX_URLS)[node.id];
            return URLS;
        },
        /**
         * custom the TV tree contextmenu
         * @private
         * @name _customContextmenu(node)
         * @param  {Object} node the selected node on the tree
         * @return {Object} items the contextmenu items on the tree
         */
        _customContextmenu: function(node){
            var self = this;
            var items = $.jstree.defaults.contextmenu.items();

            // override the create.action
            items.create.action = function (data) {
                var inst = $.jstree.reference(data.reference),
                    obj = inst.get_node(data.reference);
                inst.create_node(obj, {'text': '某电视台'}, "last", function (new_node) {
                    setTimeout(function () { inst.edit(new_node); },0);
                });
            };

            // add 'set icon' items
            items.setIcon = {
                'action': function(){
                    // popNonModalDialog of alternative icons
                    var $setIconDialog = self.$container.find('#setIconDialog'),
                        oldIconUrl = self.$tree.jstree(true).get_icon(self.$selectedNode);
              
                    $setIconDialog.dialog({
                        'resizable': false,
                        'height': 'auto',
                        'modal': false,
                        'autoOpen': false,
                        'position': {
                            'my': 'left',
                            'at': 'right',
                            'of': self.$tree
                        },
                        'buttons': {
                            '取消': function(){
                                self.$tree.jstree(true).set_icon(self.$selectedNode, oldIconUrl);
                                $(this).dialog('close');
                            }
                        }
                    });
                    $setIconDialog.dialog('open');
                }
            };
            // add 'refreshGrid' items
            items.refreshGrid = {
                'action': function(node){// refresh the TV grid
                    self._showTvInfo(self.$selectedNode, null);
                }
            };
            // add 'refreshNode' menu
            items.refreshNode = {
                'action': function(node){// refresh the node
                    self.$tree.jstree(true).refresh_node(self.$selectedNode);
                }
            };

            // recursively configurate the items of the tree cotextmenu
            // label and icon
            (function(items, configs) {
                for (var configName in configs) {
                    for (var configValue in configs[configName]){
                        var temp = configs[configName][configValue];

                        if (!temp) { continue; }

                        if (typeof temp !== 'string') {
                            arguments.callee(items[configName][configValue], temp);
                        } else {
                            items[configName][configValue] = temp;
                        }
                    }
                }
            })(items, this.config.TREE_CONTEXTMENU_ITEMS_CONFIG);

            // differ the context menu's display of root, folder and file
            try{
                if (node.parent === '#') { // choose parent's id, because root node's type cannot be recognized
                    delete items.remove;
                    delete items.ccp.submenu.cut;
                    delete items.ccp.submenu.copy;
                    delete items.refreshGrid;
                } else if (node.type !== 'folder') {
                    delete items.create;
                    delete items.ccp.submenu.paste;
                    delete items.refreshNode;
                } else if (node.type === 'folder') {
                    delete items.refreshGrid;
                }
            } catch(error){
                //
            }

            return items;
        },
        /**
         * initialize the TV grid
         * @private
         * @name _initTVGrid()
         */
        _initTVGrid: function(){
            // Global obeject about grid
            this.$list = this.$container.find('#TVGrid');
            this.$tvInfo = this.$container.find('#tvInfo');
            // initialize the grid obejct
            this.$list.jqGrid(this.config.GRID_CONFIG);
        },
        events: {
        },
        /**
         * listen all events
         * @private
         * @name bindEvent()
         */
        bindEvent: function() {
            this._treeLoadNodeEvent();
            this._treeChangedEvent();
            this._initIconDialog();
            this._treeNodeOpenClosedEvent();
            this._treeDeleteNodeEvent();
            this._treeSearchEvent();
            this._treeReadyEvent();
        },
        /**
         * initialize icon of TV node on the tree while the node is loading
         * @private
         * @name _treeLoadNodeEvent()
         */
        _treeLoadNodeEvent: function(){
            var self = this;
            
            this.$tree.on('load_node.jstree', function(e, data){
                var children = data.node.children,
                    len = children.length,
                    i = 0;

                if (!children) { return; }

                for (i = 0; i < len; i++){
                    if (self.$tree.jstree(true).get_node(children[i]).type === 'folder') {
                        continue;
                    }
                    self.$tree.jstree(true).set_icon(children[i], self.config.TREE_TVLOGO_SMALL_FOLDER + children[i] + '.png');
                }
            });
        },
        /**
         * generate icon element of 'Icon Dialog', and show tv information on the grid while select a TV node on the tree
         * @private
         * @name _treeChangedEvent()
         */
        _treeChangedEvent: function(){
            var self = this;
            var iconNum = this.config.ICON_NUM, // icon number in server
                html = '',
                i = 0;
            // generate element for icons' display
            for (i = 1; i <= iconNum; i++) {
                html += '<i class="icon icon' + i + '"></i>';
            }
            this.$iconBox.html(html);
            // listen changed.jstree event
            self.$tree.on('changed.jstree', function(e, data){
                self.$selectedNode = data.node;
                try{
                    self._showTvInfo(data.node, data.event.currentTarget);
                } catch(error) {
                   //
                }
            });
        },
        /**
         * display the information synchronously about selected TV on tree.
         * @private
         * @name _showTvInfo(node, element)
         * @param {Object} node the selected tree node 
         * @param {DOMElement} element the element is used to be a container storing related cached data,
         *           'null' stands for not storing data 
         */
        _showTvInfo: function(node, element){
            var self = this;
            if (node.type === 'folder') { return; }

            // dislay the tv-logo and tv-name
            this.$tvInfo.find('.tv-logo').attr('src', this.config.TREE_TVLOGO_MIDDLE_FOLDER + node.id + '.png');
            this.$tvInfo.find('.tv-name').text(node.text);

            // preferentially, get cached data if it exists in cache
            var cachedData = null,
                $element = $(element),
                $data = $element.data(node.id);
            if ($element && $data) {
                cachedData = $data;
                this.$list.clearGridData(true);
                this.$list.addRowData('', cachedData);
                return;
            }

            // otherwise, to get new data from server and store it in cache
            this.class.getGridData(node,'',function(data){
                self.$list.clearGridData(true);
                self.$list.addRowData('',data);
                self.$list.trigger("reloadGrid");
                $element.data(node.id, data); // store data in cache
            });
        },
        /**
         * initialize the 'Set Icon' dialog
         * @private
         * @name _initIconDialog() 
         */
        _initIconDialog: function(){
            var self = this,
                $icon = this.$iconBox.children('.icon');
            // bind click event to every node
            $icon.each(function(index,element){
                $(this).bind('click',function(){
                    if (!self.$selectedNode) {
                        return;
                    }
                    self.$tree.jstree(true)
                        .set_icon(self.$selectedNode, self.config.TREE_ICON_FOLDER + 'icon_' + (index + 1) + '.png');
                });
            });
        },
        /**
         * toggle the icon of Tv tree folder node while it's opened or closed.
         * @private
         * @name _treeNodeOpenClosedEvent()
         */
        _treeNodeOpenClosedEvent: function(){
            var self = this;
            this.$tree.on('before_open.jstree', function(e, data){// listen before_open.jstree event
                self.$tree.jstree(true).set_icon(data.node, self.config.TREE_ICON_FOLDER + 'open_folder.png');
            }).on('after_close.jstree', function(e, data){// listen after_close.jstree event
                self.$tree.jstree(true).set_icon(data.node, self.config.TREE_ICON_FOLDER + 'closed_folder.png');
            });
        },
        /**
         * 
         * @private
         * @name _treeDeleteNodeEvent()
         */
        _treeDeleteNodeEvent: function(){
            var self = this;
            this.$tree.on('delete_node.jstree', function(e, data){
                if (!self.$tree.jstree(true).is_selected(data.node)) { return; }
                self.$list.clearGridData(true);
                self.$tvInfo.find('.tv-logo').attr('src', self.config.TREE_TVLOGO_MIDDLE_FOLDER + 'no_tv.png');
                self.$tvInfo.find('.tv-name').text('无电视台');
            });
        },
        /**
         * search nodes with name on TV tree.
         * @private
         * @name _treeSearchEvent()
         */
        _treeSearchEvent: function(){
            var self = this;
            var to = false, // timeout
                $search = this.$container.find('#search'),
                $searchedNodeNumber = this.$container.find('#searchedNodeNumber');
            $search.keyup(function(){
                if (to) { clearTimeout(to); }
                to = setTimeout(function(){
                        var  value = $search.val();
                        self.$tree.jstree(true).search(value);
                        if (!value.length) {
                            $searchedNodeNumber.text('');
                        }
                    }, 250);
            });
            // listen search event
            this.$tree.on('search.jstree',function(e, data){
                $searchedNodeNumber.text(data.nodes.length + '个');
            });
        },
        /**
         * initialize status of the TV tree after it loaded.
         * @private
         * @name _treeReadyEvent()
         */
        _treeReadyEvent: function(){
            var self = this;
            this.$tree.on('ready.jstree', function(){

                var tree = self.$tree.jstree(true),
                    domestic = tree.get_node('domestic'),
                    hkmacautaiwan = tree.get_node('hkmacautaiwan'),
                    cctv = null;

                tree.open_node(domestic);
                tree.open_node(hkmacautaiwan);

                setTimeout(function(){
                    cctv = tree.get_node('cctv');
                    tree.open_node(cctv);
                }, 500);
                setTimeout(function(){
                    tree.select_node(['cctv6']);
                    self._showTvInfo(self.$selectedNode);
                }, 800);
            });
        }
    });
});
