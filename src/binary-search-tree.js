const { NotImplementedError } = require('../extensions/index.js');

 const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
module.exports = class BinarySearchTree {
  constructor() {
    this.treeRoot = null;
  }
  root() {
    
    return this.treeRoot;
  }

  add(data) {
  
    this.treeRoot  = addNode(this.treeRoot, data);

    function addNode(node, value) {
      if (!node) {
        return new Node(value);
      }
      if (node.data === value) {
        return node;
      }
      if (value < node.data) {
        node.left = addNode(node.left, value);
      }
      else {
        node.right = addNode(node.right, value);
      }
      return node;
    }
  }

  has(data) {
    return this.find(data) ? true : false;
  }

  find(data) {
    return this.search(this.treeRoot, data);
  }

  search(node, value) {
    if (!node) {
      return null;
    }

    if (node.data === value) {
      return node;
    }

    if (value < node.data) {
      return this.search(node.left, value);
    }
    else {
      return this.search(node.right, value);
    }
  }

  remove(data) {

    this.treeRoot = removeNode(this.treeRoot, data);

    function removeNode(node, value) {
      if (!node) {
        return null;  // точка остановки рекурсии
      }

      if (value < node.data) {
        node.left = removeNode(node.left, value);
        return node;
      } 
      else if (value > node.data) {
        node.right= removeNode(node.right, value);
        return node;
      }
      // искомое значение равно значению в текущем узле
      else {
        // текущий узел является листом
        if (!node.left && !node.right) {  
          return null;
        }
        // есть правое поддерево
        if (!node.left) {
          node = node.right;
          return node;
        }
        // есть левое поддерево
        if (!node.right) {
          node = node.left;
          return node;
        }
        // есть оба поддерева
        let minRight = node.right; //минимальный узел из правого поддерева
        while (minRight.left) {
          minRight = minRight.left;
        }
        node.data = minRight.data;

        node.right =  removeNode(node.right, minRight.data);//удалить минимальный узел из правого поддерева
     
        return node;
     
      }

    }
  } 

  min() {
    if (!this.treeRoot) {
      return;
    }
    let node = this.treeRoot;
    while(node.left) {
      node = node.left;
    }
    return node.data;
  } 

  max() {
    if (!this.treeRoot ) {
      return;
    }
    let node = this.treeRoot ;
    while(node.right) {
      node = node.right;
    }
    return node.data;
  }

}