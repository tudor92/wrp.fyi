export const fetchRequest = async (url, params) => {
    const data = await fetch(url, params)
    return data;
}