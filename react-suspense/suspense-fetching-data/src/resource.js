export function useResource() {
    return {
        posts: wrapPromise(fetchPost()),
        users: wrapPromise(fetchUsers())
    };
}

const delay = ms => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function wrapPromise(promise) {
    let status = 'pending';
    let result;
    const suspender = promise
        .then(res => {
            result = res;
            status = 'success';
        },
        error => {
            result = error;
            status = 'error';
        })

    return {
        read() {
            if (status === 'pending') {
                throw suspender;
            } else if (status === 'error') {
                throw result;
            } else if (status === 'success') {
                return result;
            }
        }
    }
}

function fetchPost() {
    return delay(2000)
        .then(() => fetch('https://jsonplaceholder.typicode.com/posts?_limit=5'))
        .then(res => res.json());
}

async function fetchUsers() {
    await delay(4000);
    const res = await fetch('https://jsonplaceholder.typicode.com/users?_limit=5');
    return await res.json();
}