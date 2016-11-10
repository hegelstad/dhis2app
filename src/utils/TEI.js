export function fakeAsyncCall(s) {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(reverseString(s)), 1000);
    });
}

function reverseString(s) {
    return s.split('').reverse().join('');
}
