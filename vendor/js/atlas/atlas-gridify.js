
/*
Atlas Gridify
- 15.04.18 Brennan Nunamaker
- This library generates a dynamic grid of two columns using absolute positioning.

Usage:
- Parent grid containers should be given the class ".atl-grid"
- Grid element containers should be given the class ".atl-grid-item"

Important:
- Include the JS file AFTER Atlas/Rivets!
- Column overlap / widths need to be styled in the relevant template's CSS.
 */

(function() {
  $(document).ready(function() {
    var gridify;
    gridify = function(parent, options) {
      var buffer, colLefts, getIntFromCssPixelValue, getItemBottom, getLastItemInColumnWithLeft, getMaxColHeight, isItemLower, itemGridify, itemGridifyResponsive, itemSelector, newHeight;
      buffer = 10;
      colLefts = [0, parent.width() / 2 + buffer];
      itemSelector = ".atl-grid-item";
      getIntFromCssPixelValue = function(gridItem, key) {
        return parseInt($(gridItem).css(key).replace("px", ""));
      };
      getItemBottom = function(gridItem) {
        return getIntFromCssPixelValue(gridItem, "top") + $(gridItem).height();
      };
      isItemLower = function(minOneItem, minTwoItem) {
        return getItemBottom(minOneItem) > getItemBottom(minTwoItem);
      };
      getLastItemInColumnWithLeft = function(colLeft, itemIdx, siblings) {
        var gridItem, lastItemIdx;
        lastItemIdx = itemIdx - 1;
        gridItem = $(siblings).get(lastItemIdx);
        while (lastItemIdx > 0) {
          if (Math.abs(getIntFromCssPixelValue(gridItem, "left") - colLeft) < 5) {
            return gridItem;
          }
          lastItemIdx = lastItemIdx - 1;
          gridItem = $(siblings).get(lastItemIdx);
        }
        return gridItem;
      };
      itemGridify = function(itemIdx) {
        var colIdx, colOneItem, colZeroItem, left, top;
        $(this).css("position", "absolute");
        if ($(this).width() + buffer >= colLefts[1]) {
          itemGridifyResponsive(itemIdx, $(this));
          return;
        }
        if (itemIdx < 2) {
          colIdx = itemIdx % 2;
          $(this).css("top", 0 + "px");
          $(this).css("left", colLefts[colIdx] + "px");
          return;
        }
        colZeroItem = getLastItemInColumnWithLeft(colLefts[0], itemIdx, $(this).siblings(itemSelector));
        colOneItem = getLastItemInColumnWithLeft(colLefts[1], itemIdx, $(this).siblings(itemSelector));
        colIdx = 0;
        top = getItemBottom(colZeroItem) + buffer;
        if (isItemLower(colZeroItem, colOneItem)) {
          colIdx = 1;
          top = getItemBottom(colOneItem) + buffer;
        }
        left = colLefts[colIdx];
        $(this).css("top", top + "px");
        $(this).css("left", left + "px");
      };
      itemGridifyResponsive = function(itemIdx, gridItem) {
        var lastItem, top;
        if (itemIdx < 1) {
          $(gridItem).css("top", 0 + "px");
          $(gridItem).css("left", 0 + "px");
          return;
        }
        lastItem = $(gridItem).siblings(itemSelector).get(itemIdx - 1);
        top = getItemBottom(lastItem) + buffer;
        $(gridItem).css("top", top + "px");
        $(gridItem).css("left", 0 + "px");
      };
      parent.children(itemSelector).each(itemGridify);
      getMaxColHeight = function(parent, itemSelector) {
        var colHeight0, colHeight1;
        colHeight0 = 0;
        colHeight1 = 0;
        parent.children(itemSelector).each(function(itemIdx) {
          if ($(this).css("left") === colLefts[0] + "px") {
            return colHeight1 += $(this).height() + buffer;
          } else {
            return colHeight0 += $(this).height() + buffer;
          }
        });
        return Math.max(colHeight0, colHeight1);
      };
      newHeight = getMaxColHeight(parent, itemSelector);
      parent.css("height", newHeight);
    };
    $('.atl-grid').each(function(itemIdx) {
      $(this).css("position", "relative");
      gridify($(this), {});
    });
    $(window).resize(function() {
      $('.atl-grid').each(function(itemIdx) {
        gridify($(this), {});
      });
    });
  });

}).call(this);
