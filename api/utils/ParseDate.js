/////////////this metod delivers substringed system date & hour
class ParseDate {
    static getDateTime() {
        let dateNow = new Date().toISOString();
        let date = dateNow.substring(0, 10);
        let time = dateNow.substring(11, 16);
        return { date, time };
    }
}
module.exports = ParseDate