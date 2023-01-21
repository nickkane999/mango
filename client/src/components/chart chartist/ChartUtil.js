export async function pullData(filename) {
    const response = await fetch(filename);
    const json = await response.json();
    return json;
}