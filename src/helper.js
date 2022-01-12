export async function fetchGET(url){
    try {
        const response = await fetch(url,{
            method:'GET',
            headers: {
                'Content-Type':'application/json'
             },
        });
        const result = await response.json();
        return result;
    }
    catch (err) {
        console.log(err);
    }
}