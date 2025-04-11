/**
 * Simple test utility for manual component testing
 * This is a temporary solution until we can resolve dependency issues with Jest
 */

// Function to check if an element exists in the DOM
export function elementExists(selector: string): boolean {
  return document.querySelector(selector) !== null;
}

// Function to check if text content exists in the DOM
export function textExists(text: string): boolean {
  return Array.from(document.querySelectorAll('*'))
    .some(element => element.textContent?.includes(text));
}

// Function to simulate a click event
export function simulateClick(element: HTMLElement): void {
  element.click();
}

// Function to log test results
export function logTestResult(testName: string, passed: boolean): void {
  console.log(
    `%c${testName}: ${passed ? 'PASSED' : 'FAILED'}`,
    `color: ${passed ? 'green' : 'red'}; font-weight: bold;`
  );
}

// Function to run a simple test
export function runTest(testName: string, testFn: () => boolean): void {
  try {
    const result = testFn();
    logTestResult(testName, result);
  } catch (error) {
    console.error(`Error in test "${testName}":`, error);
    logTestResult(testName, false);
  }
}

// Function to run a group of tests
export function runTestSuite(suiteName: string, tests: Array<{ name: string, test: () => boolean }>): void {
  console.log(`%c${suiteName}`, 'color: blue; font-weight: bold;');
  tests.forEach(({ name, test }) => runTest(name, test));
}
