import {toggleVisibility} from './helpers';

describe("Testing the helpers functionality", () => {
    test("Can toggle visibility on", () => {
        // Define the input for the function, if any, in the form of variables/array
        // Define the expected output, if any, in the form of variables/array
        // The expect() function, in combination with a Jest matcher, is used to check if the function produces the expected output
        // The general syntax is `expect(myFunction(arg1, arg2, ...)).toEqual(expectedValue);`, where `toEqual()` is a matcher
        const testElement = document.createElement('div');
        const childElement = document.createElement('div');
        const headerElement = document.createElement('h2');
        testElement.appendChild(childElement);
        testElement.appendChild(headerElement);
        childElement.style.display = 'none';
        toggleVisibility(testElement, true);
        expect(childElement.style.display = 'inherit');
        expect(headerElement.classList.contains('collapsed') === false);
    });
    test("Can toggle visibility off", () => {
        // Define the input for the function, if any, in the form of variables/array
        // Define the expected output, if any, in the form of variables/array
        // The expect() function, in combination with a Jest matcher, is used to check if the function produces the expected output
        // The general syntax is `expect(myFunction(arg1, arg2, ...)).toEqual(expectedValue);`, where `toEqual()` is a matcher
        const testElement = document.createElement('div');
        const childElement = document.createElement('div');
        const headerElement = document.createElement('h2');
        testElement.appendChild(childElement);
        testElement.appendChild(headerElement);
        childElement.style.display = 'inherit';
        toggleVisibility(testElement, false);
        expect(childElement.style.display = 'none');
        expect(headerElement.classList.contains('collapsed') === true);
    });
    test("Can toggle visibility", () => {
        // Define the input for the function, if any, in the form of variables/array
        // Define the expected output, if any, in the form of variables/array
        // The expect() function, in combination with a Jest matcher, is used to check if the function produces the expected output
        // The general syntax is `expect(myFunction(arg1, arg2, ...)).toEqual(expectedValue);`, where `toEqual()` is a matcher
        const testElement = document.createElement('div');
        const childElement = document.createElement('div');
        const headerElement = document.createElement('h2');
        testElement.appendChild(childElement);
        testElement.appendChild(headerElement);
        childElement.style.display = 'inherit';
        toggleVisibility(testElement);
        expect(childElement.style.display === 'none');
        expect(headerElement.classList.contains('collapsed') === true);
    });

    // I couldn't find a satisfying mock of localStorage, so I left it out for now.
});