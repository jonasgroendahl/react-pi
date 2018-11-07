export function secondsToString(seconds) {
    let finalString = '';
    const numminutes = Math.floor((((seconds % 31536000) % 86400) % 3600) / 60);
    const numseconds = (((seconds % 31536000) % 86400) % 3600) % 60;
    if (numminutes > 0) {
        finalString += `${numminutes} minutes `;
    }
    return finalString += numseconds + " seconds";

}