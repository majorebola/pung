'use strict';

const inputLength = 100;
const inputMaxSize = 50;
const inputMinSize = 10;

const containerSize = 200;
const containerNumber = 20;

const graphicMultiplier = 4;

var init = function() {
    console.log("init");

    var inputArray = createInput(inputLength, inputMinSize, inputMaxSize);
    inputArray = sort(inputArray);
    console.log(inputArray);
    var containers = createAllContainers(containerSize, containerNumber);
    fillContainers(containers, inputArray);
};

var fillContainers = function(containers, input) {
    for (var i = 0; i < input.length; i++) {
        inputInContainer(input[i], containers);
    }
};

var sort = function(input) {
    return input.sort(function(a,b) {return b-a});
};

var inputInContainer = function(input, containers) {
    for (var j = 0; j < containers.length; j++) {
        if(containers[j] > input) {
            containers[j] -= input;
            insertElementInContainer(j, input);
            break;
        }
    }
};

var insertElementInContainer = function(containerId, size) {
    var container = document.getElementById('container_' + containerId);
    container.appendChild(createElement(size));
};

var createElement = function(size) {
    var elem = document.createElement('div');
    elem.classList.add('element');
    elem.style.width = size * graphicMultiplier - 2;
    return elem;
};

var createInput = function(length, minSize, maxSize) {
    var array = [];
    for (var i = 0; i < length; i ++) {
        var n = minSize + (Math.random() * (maxSize-minSize));
        n = Math.round(n);
        array.push(n);
    }
    return array;
};

var createAllContainers = function(containerSize, containerNumber) {
    var elem = document.getElementById('container');
    var containers = [];
    for (var i = 0; i < containerNumber; i++) {
        elem.appendChild(createInnerContainer(containerSize, 'container_'+i));
        containers.push(containerSize);
    }
    return containers;
};

var createInnerContainer = function(containerSize, id) {
    var elem = document.createElement('div');
    elem.id = id;
    elem.classList.add('container');
    elem.style.width = containerSize * graphicMultiplier;
    return elem;
};


window.onload = init;