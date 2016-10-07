(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);


ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var list = this;

  list.items = ShoppingListCheckOffService.getList();
  list.show1 = ShoppingListCheckOffService.show1;
  list.markasbought = function(index){
    ShoppingListCheckOffService.markitem(index);
    list.show1 = ShoppingListCheckOffService.show1;
  }

}


AlreadyBoughtController.$inject = ['$scope', 'ShoppingListCheckOffService'];
function AlreadyBoughtController($scope, ShoppingListCheckOffService) {
  var goods = this;
  goods.showItems = ShoppingListCheckOffService.showItems();
  
  $scope.$watch(function(){
    goods.show2 = ShoppingListCheckOffService.show2;
  });
  
}


function ShoppingListCheckOffService() {
  var service = this;

  // List of shopping items
  var tobuy = [{name: 'cookies', amount: '10 bags'}, {name: 'chips', amount: '5 bags'}, {name: 'chicken', amount: '1 body'}, {name: 'lama\'s legs', amount: '2 pair'}, {name: 'goose\'s neck', amount: '1 item'}];

  var bought = [];

  service.show1 = true;
  service.show2 = true;
  service.markitem = function (index) {
    var markeditem = tobuy[index];
    tobuy.splice(index, 1);
    bought.push(markeditem);
    if(tobuy == false) {
      service.show1 = false;
      return service.show1;
    }
    if(bought != false) {
      service.show2 = false;
      return service.show2;
    }
  }

  service.showItems = function () {
    return bought;
  }

  // service.addItem = function (itemName, quantity) {
  //   if ((maxItems === undefined) ||
  //       (maxItems !== undefined) && (items.length < maxItems)) {
  //     var item = {
  //       name: itemName,
  //       quantity: quantity
  //     };
  //     items.push(item);
  //   }
  //   else {
  //     throw new Error("Error: Max items (" + maxItems + ") reached.");
  //   }
  // };

  // service.removeItem = function (itemIndex) {
  //   items.splice(itemIndex, 1);
  // };

  service.getList = function () {
    return tobuy;
  };
}

})();
