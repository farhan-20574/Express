module.exports = {
    cookieParser(headers) {
        if (!headers.cookie) return {};
        const cookieObj = {}
        const cookiesArr = headers.cookie.split('; ')
        for (let index = 0; index < cookiesArr.length; index++) {
            const cookie = cookiesArr[index];
            const cookieArr = cookie.split('=')
            cookieObj[cookieArr[0]] = cookieArr[1]
        }
        return cookieObj;
    }
}