define(['lib/react-production'], function(React) {
    var AnchorNode = React.createClass({
        handleMouseOver: function(event) {
            var selectedAnchorNode = event.currentTarget,
                anchorParentNode = selectedAnchorNode.parentNode,
                selectedAnchorNodeId = "#" + selectedAnchorNode.id,
                noWidthAnchorNodeArr = [],
                currentNode = anchorParentNode.firstChild;
            
            // Cache node which stand before selected node
            while(currentNode) {
                if (currentNode === selectedAnchorNode) {
                    break;
                }
                noWidthAnchorNodeArr.push(currentNode);
                currentNode = currentNode.nextSibling;
            }

            $(selectedAnchorNodeId).addClass("image-hover");
            // Add image-no-width class for cached node
            var len = noWidthAnchorNodeArr.length;
            if(len > 1) {
                for(var i=0; i<len-1; i++) {
                    var id = "#" + noWidthAnchorNodeArr[i].id;
                    $(id).addClass("image-no-width");
                }
            }
        },
        handleMouseOut: function(event) {
            var selectedAnchorNode = event.currentTarget,
                anchorParentNode = selectedAnchorNode.parentNode,
                selectedAnchorNodeId = "#" + selectedAnchorNode.id,
                noWidthAnchorNodeArr = [],
                currentNode = anchorParentNode.firstChild;
            
            // Cache node which stand before selected node
            while(currentNode) {
                if (currentNode === selectedAnchorNode) {
                    break;
                }
                noWidthAnchorNodeArr.push(currentNode);
                currentNode = currentNode.nextSibling;
            }

            $(selectedAnchorNodeId).removeClass("image-hover");
            // Remove image-no-width class for cached node
            var len = noWidthAnchorNodeArr.length;
            if(len > 1) {
                for(var i=0; i<len; i++) {
                    var id = "#" + noWidthAnchorNodeArr[i].id;
                    $(id).removeClass("image-no-width");
                }
            }
        },
        handleClick: function(event) {
            this.props.onUserClick($(event.currentTarget).find(".image-banner")[0].src);
        },
        render: function() {
            return (
                <a id={this.props.id} className="anchor-item" onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut} onClick={this.handleClick} >
                    <div className="image-expand">
                        <div className="image-left">
                            <img src={this.props.left1} className="image-poster" />
                            <img src={this.props.left2} className="image-logo" />
                        </div>
                        <div className="image-right">
                            <img src={this.props.right} className="image-banner" />
                        </div>
                    </div>
                </a>
            );
        }
    });

    var PictureExpandExample = React.createClass({
        handleClick: function(event) {
            console.dir($(event.currentTarget).find(".image-banner")[0].src);
            this.props.onUserClick($(event.currentTarget).find(".image-banner")[0].src);
        },
        render: function () {
            var rows = [],
                self = this;
            self.props.imgSrcUrlArr.forEach(function(item) {
                rows.push(<AnchorNode id={item.id} left1={item.left1} left2={item.left2} right={item.right} onUserClick={self.props.onUserClick} />)
            });
            return (
                <div id="outerContainer" className="outerContainer">
                    <div className="imageBox">
                        {rows}
                    </div>
                </div>
            );
        }
    });
    return PictureExpandExample;
});
