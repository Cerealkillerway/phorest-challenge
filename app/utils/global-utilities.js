import ENV from 'phorest-challenge/config/environment';


let logStyles = {
    default: 'background-color: #222222; color: #eeeeee;',
    success: 'background-color: #4caf50; color: #eeeeee;'
}


// logger function with styling for dev mode
export function logger(message, type) {
    if (ENV.environment !== 'development') {
        return false;
    }

    if (!type) {
        type = 'default';
    }

    if (type === 'object') {
        // eslint-disable-next-line no-console
        console.log(message);
        return false;
    }

    let css, verb;

    switch (type) {
        case 'warning':
            css = '';
            verb = 'warn';
            break;

        case 'error':
            css = '';
            verb = 'error';
            break;

        default:
            css = logStyles[type] || '';
            verb = 'log';
    }

    // eslint-disable-next-line no-console
    console[verb](`%c ${message}`, css);
}
